---
page_type: sample
languages:
- javascript
- nodejs
name: "JavaScript end-to-end - deploy Express.js MongoDB app to App Service from Visual Studio Code"
description: "Deploy the Express.js application which connects to MongoDB to Azure App Service (on Linux) and a CosmosDB."
products:
- azure
- vs-code
- azure-app-service
- azure-cosmos-db
---

# Archived repo - replacement available

This repo has been replaced with a seaparte repo: [https://github.com/Azure-Samples/js-e2e-express-mongodb](https://github.com/Azure-Samples/msdocs-nodejs-mongodb-azure-sample-app). Both can be deployed to Azure App Service.

##JavaScript end-to-end Express.js app with a MongoDB database

Express.js website, with SSR React, connecting to a MongoDB. Deploy to Azure to use:

* Azure App Service 
* Azure Cosmos DB (MongoDB API) 

The sample code is a JavaScript server written with Express.js and the native MongoDB API. The user adds data ( 2 text fields), can view data, and delete a single row or all rows. 

The programming work is done for you, this tutorial focuses on using the local and remote Azure environments successfully from inside Visual Studio Code with Azure extensions.

The tutorial demonstrates how to load and run the project locally with VSCode, using extensions, was well as how to run the code remotely on an App service. The tutorial includes creating a CosmosDB resource for the Mongo API, getting the connection information and setting that in the app service configuration setting to connect to a cloud database. 

## Version: Environment Variables

* Branch: main
* [Tutorial](https://docs.microsoft.com/azure/developer/javascript/tutorial/web-app-mongodb) 

## Version: Key Vault

* Branch: keyvault
* Tutorial: coming soon
* [JS KeyVault code snippet](https://github.com/Azure-Samples/js-e2e-express-mongodb/blob/keyvault/src/azure/azure-keyvault.js)

## Sample application

The Node.js app consists of the following elements:

* **Express.js server** hosted on port 8080
* Simple **React.js server-side view** engine
* **MongoDB native API** functions to insert, delete, and find data

## Features

This project framework provides the following features:

* Create Azure app resource
    * Create web app resource
    * Deploy Express.js app to web app resource
    * Set app configuration settings
* Create CosmosDB resource 
    * Create database resource for use with MongoDB API
    * Get connection string

## Getting Started

1. Clone or download repo.
1. Follow tutorial to create resources with Visual Studio Code extensions.
    * Create web app resource, to host Express.js app
    * Create CosmosDB resource, to host MongoDB database

## Create or use existing Azure Subscription 

* An Azure account with an active subscription. [Create one for free](https://azure.microsoft.com/free/?utm_source=campaign&utm_campaign=vscode-tutorial-appservice-extension&mktingSource=vscode-tutorial-appservice-extension).

## Install software

- [Node.js and npm](https://nodejs.org/en/download), the Node.js package manager installed to your local machine.
- [Docker](https://docs.docker.com/get-docker/) - Docker is used to provide a local MongoDB database without having to install MongoDB. 
    - If you need to use Docker to get a local MongoDB database, you also need to use:
        -  Visual Studio [Dev Containers](https://code.visualstudio.com/docs/remote/containers) provide several common containers for JavaScript development. 
        - [Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
    - If you already have a local MongoDB, and don't want to install Docker, you can still this step. Any steps using the Development Container to access a locally running MongoDB can be repurposed to use your own local MongoDB as long as the following MongoDB URL is available: 
        - `mongodb://localhost:27017`
- [Visual Studio Code](https://code.visualstudio.com/) installed to your local machine. 
- Visual Studio Code extensions:
    - [Azure App Service extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) for Visual Studio Code (installed from within Visual Studio Code).
    - [Azure Databases](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb)

## Installation

1. Install the sample's dependencies:

   ```javascript
    npm install
    ```

1. Run the command to run the web app.

    ```javascript
    npm start
    ```

1. Open a web browser and use the following url to view the web app on your local computer.

    ```url
    http://localhost:8080/
    ```

## Tests

The integration request depends on a real database connection, either locally or remotely. 

* Integration test file: test/data-integration.test.js

## Looking for more Azure JavaScript code?

* [JavaScript e2e repo](https://github.com/azure-samples/js-e2e)
