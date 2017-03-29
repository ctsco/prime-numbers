# prime-numbers

This application is written using Angular, and was initially based off the angular-seed project.
See - https://github.com/angular/angular-seed

## Pre-requisites
* Node and NPM (tested on v6.9.5 and 3.10.10)  
* Chrome (to run the unit tests using the existing configuration)  
* A JDK (to run the end-to-end tests)

## Installing and Running
### Starting the application
First, from a command prompt in the root directory, issue the following command:-  
    npm install

Then, the following command will start the webserver:-  
    npm start

Launching a browser and navigating to the following url will then display the web-application:-  
    http://localhost:8000/

### Running the unit tests
From a command prompt in the root directory, issue the following command:-  
    npm test
    
This will launch a chrome browser and automatically run all unit tests after any change to the code, or the tests.  Results are reported within the original command prompt.

### Running the end-to-end tests
First, ensure the webserver is running by issuing the following command in the root directory:-  
    npm start
    
Then, from an additional command prompt, issue the following command:-  
    npm run protractor

This will then launch a Chrome browser, and execute the end-to-end UI based tests.  Results are reported within the original command prompt.