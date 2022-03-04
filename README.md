# IBSConstructionManagementProgressTracker | DEV
:warning: In development

A web-based automated IBS Construction Progress Tracker with Site Diary entry, progress Charts and 3D Model Visualisation of progress.

## Development Stack

Core | Tool
------------ | -------------
Client-side | React JS
Server-side | Express
API-backend | GraphQL
Database| MongoDB
Authentication | Auth0
External BIM APIs | Autodesk Forge
External Chart APIs | Mongo Charts

## Getting started locally

* Clone this github repository

Open up a terminal and move to where you want to clone the project on your local machine using the `cd` (change directory) command and then run the command:

```bash
git clone https://github.com/Kwan-Yee/IBSConstructionManagementProgressTracker.git
```

* `cd` into the IBSConstructionManagementProgressTracker cloned project directory and install the project dependencies
```bash
cd IBSConstructionManagementProgressTracker
```
```bash
npm install
```
* At the project root, create a `development.env` file to hold your environment variables needed for development. Similarly you can set up a `production.env` file for production. Each `.env` files should contain the following configuration variables that you need to define.

Variable Name | Default Value | Usage | Context
------------ | ------------- | ------------| ---------- |
`JWT_SECRET` | `<undefined>` | Your Auth0 JWT secret private key to decrypt token sent by client to server and api. | All
`FORGE_CREDENTIALS_CLIENT_SECRET` | `<undefined>` | Your Forge Client Secret | All
`FORGE_CREDENTIALS_CLIENT_ID` | `<undefined>` | Your Forge Client ID | All
`MONGODB` | <undefined> | Your MongoDB connection uri with your password and cluster name | All

For __MongoDB__ related configurations, please visit the Neo4j documentation on how to set up a database instance locally or on the cloud at <https://docs.mongodb.com/manual>

For __Forge__ related configurations, please visit the Autodesk Forge Getting Started page for how to setup an Application with the Forge APIs at <https://forge.autodesk.com/developer/getting-started>

## Running the project 
* __In Development__: While still at the project root, start the project by running:
```bash
npm start
```
  
