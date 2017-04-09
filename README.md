# wiremazeWebApp
Wiremaze Message Board Web App

This project is a minimalist but fully functional Message Board as a prove of concept: The owner of the Message Board publish a document and the readers posts comments about it.

To post a comment, the reader does not need to sign up but its comments are only published after the approving of the administrator.

An administrative view is provided to the administrator to manage (approving to publishing and removing) the readers messages.

To switch between the regular an the administrative view, click the page title.

This application was developed using AngularJS for the front-end, NodeJS for the back-end and MongoDB (via Mongoose) as the DBMS. To configure the DB, look at the file "connection.js".

An script for the database initialization is provided ("initializeDB.js"). You can run it by itself (node bin/initializeDB.js) or throw the "initializeCollections" task (npm run initializeCollections).
