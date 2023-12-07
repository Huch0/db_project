
-- username: "uniconnect_admin",
-- password: "mudBob-sykwu4-zitxij",
-- "db_project",

GRANT role_reader TO uniconnect_admin WITH ADMIN OPTION;
GRANT role_student TO uniconnect_admin WITH ADMIN OPTION;
GRANT role_researcher TO uniconnect_admin WITH ADMIN OPTION;
GRANT role_lab_manager TO uniconnect_admin WITH ADMIN OPTION;
GRANT role_banned TO uniconnect_admin WITH ADMIN OPTION;

-- Create users
CREATE USER user_reader;
CREATE USER user_student;
CREATE USER user_researcher;
CREATE USER user_lab_manager;
CREATE USER user_banned;

-- Create roles
CREATE ROLE role_reader;
CREATE ROLE role_student;
CREATE ROLE role_researcher;
CREATE ROLE role_lab_manager;
CREATE ROLE role_banned;

-- Grant privileges to role_reader
GRANT ALL PRIVILEGES ON TABLE "Comments" TO role_reader;
GRANT SELECT ON TABLE "Contacts" TO role_reader;
GRANT SELECT ON TABLE "Labs" TO role_reader;
GRANT ALL ON TABLE "Likes" TO role_reader;
GRANT SELECT, INSERT ON TABLE "Majors" TO role_reader;
GRANT SELECT ON TABLE "Posts" TO role_reader;
GRANT ALL ON TABLE "Profiles" TO role_reader;
GRANT SELECT ON TABLE "Schools" TO role_reader;
GRANT SELECT, UPDATE ON TABLE "Users" TO role_reader;


-- Grant privileges to role_student

GRANT role_reader to role_student;
GRANT ALL ON TABLE "Contacts" TO role_student;

-- Grant privileges to role_researcher

GRANT role_student to role_researcher;
GRANT ALL ON TABLE "Posts" TO role_researcher;
GRANT INSERT ON TABLE "Manager_requests" TO role_researcher;
GRANT SELECT ON TABLE "Manager_requests" TO role_researcher;

-- Grant privileges to role_lab_manager

GRANT role_researcher to role_lab_manager;
GRANT ALL ON TABLE "Labs" TO role_lab_manager;

-- Grant privileges to role_banned

REVOKE ALL ON TABLE "Comments" FROM role_banned;
REVOKE ALL ON TABLE "Contacts" FROM role_banned;
REVOKE ALL ON TABLE "Labs" FROM role_banned;
REVOKE ALL ON TABLE "Likes" FROM role_banned;
REVOKE ALL ON TABLE "Majors" FROM role_banned;
REVOKE ALL ON TABLE "Manager_requests" FROM role_banned;
REVOKE ALL ON TABLE "Posts" FROM role_banned;
REVOKE ALL ON TABLE "Profiles" FROM role_banned;
REVOKE ALL ON TABLE "Schools" FROM role_banned;
REVOKE ALL ON TABLE "Subscriptions" FROM role_banned;
REVOKE ALL ON TABLE "Users" FROM role_banned;

-- Grant sequence privileges to roles

GRANT USAGE, SELECT ON SEQUENCE "Majors_id_seq" TO role_reader;
GRANT USAGE, SELECT ON SEQUENCE "Comments_id_seq" TO role_reader;
GRANT USAGE, SELECT ON SEQUENCE "Posts_id_seq" TO role_researcher;
GRANT USAGE, SELECT ON SEQUENCE "Manager_requests_id_seq" TO role_researcher;
GRANT USAGE, SELECT ON SEQUENCE "Labs_id_seq" TO role_lab_manager;

-- Grant roles to proper users

GRANT role_reader to user_reader;
GRANT role_student to user_student;
GRANT role_researcher to user_researcher;
GRANT role_lab_manager to user_lab_manager;
GRANT role_banned to user_banned;



