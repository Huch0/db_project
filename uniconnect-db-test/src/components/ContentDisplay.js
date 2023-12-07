import React from "react";
import PostList from "./PostList";
import UserList from "./UserList";
import LabList from "./LabList";
import MajorEditor from "./MajorEditor";
import DegreeEditor from "./DegreeEditor";
import PostEditor from "./PostEditor";
import LabContactList from "./LabContactList";
import ManagerRequestList from "./ManagerRequestList";

export default function ContentDisplay({
  selectedUser,
  fetchedData,
  setFetchedData,
  contentType,
  setContentType,
}) {
  if (!contentType) {
    return null;
  }

  console.log(contentType);

  let ContentComponent;
  switch (contentType) {
    case "post":
      ContentComponent = PostList;
      break;
    case "lab":
      ContentComponent = LabList;
      break;
    case "majorEditor":
      ContentComponent = MajorEditor;
      break;
    case "degreeEditor":
      ContentComponent = DegreeEditor;
      break;
    case "postEditor":
      ContentComponent = PostEditor;
      break;
    case "labContact":
      ContentComponent = LabContactList;
      break;
    case "labManagerRequest":
      ContentComponent = ManagerRequestList;
      break;
    case "user":
      ContentComponent = UserList;
      break;
    // Add more cases as needed
    default:
      ContentComponent = null;
  }

  return (
    <div>
      {JSON.stringify(fetchedData)}

      <div>
        <div className="mx-auto mt-10 max-w-2xl gap-x-8 border-t border-gray-200 pt-10">
          {ContentComponent && (
            <ContentComponent
              fetchedData={fetchedData}
              setFetchedData={setFetchedData}
              selectedUser={selectedUser}
              setContentType={setContentType}
            />
          )}
        </div>
      </div>
    </div>
  );
}
