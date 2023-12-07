import { Contacts } from "../models/index.js";

export async function getContactsByLabId(selectedRole, id) {
  const Contact = selectContact(selectedRole);

  const contacts = await Contact.findAll({
    where: {
      lab_id: id,
    },
    order: [["createdAt", "DESC"]],
  });

  return contacts;
}

export async function getContactByStudentId(selectedRole, id) {
  const Contact = selectContact(selectedRole);

  const contacts = await Contact.findAll({
    where: {
      student_id: id,
    },
    order: [["createdAt", "DESC"]],
  });

  return contacts;
}

export async function createContact(selectedRole, contact) {
  const Contact = selectContact(selectedRole);

  await Contact.create(
    {
      student_id: contact.student_id,
      lab_id: contact.lab_id,
      status: contact.status,
      portfolio_path: "not exist",
    }
  );

  const newContactsList = getContactsByLabId(selectedRole, contact.lab_id);

  return newContactsList;
}

export async function updateContact(selectedRole, id, status, lab_id) {
  const Contact = selectContact(selectedRole);

  const updatedContact = await Contact.update(
    {
      status: status,
    },
    {
      where: {
        student_id: id,
      },
    }   
  );

  const newContactsList = getContactsByLabId(selectedRole, lab_id);

  return newContactsList;
}

function selectContact(selectedRole) {
  let Contact = null;

  switch (selectedRole) {
    case "admin":
      Contact = Contacts.adminContact;
      break;
    case "reader":
      Contact = Contacts.readerContact;
      break;
    case "student":
      Contact = Contacts.studentContact;
      break;
    case "researcher":
      Contact = Contacts.researcherContact;
      break;
    case "lab_manager":
      Contact = Contacts.labManagerContact;
      break;
    case "banned":
      Contact = Contacts.bannedContact;
      break;
    default:
      throw new Error("Invalid role");
  }

  return Contact;
}
