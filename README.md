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
    
This will launch a headless PhantomJS browser and automatically run all unit tests after any change to the code, or the tests.  Results are reported within the original command prompt.

### Running the end-to-end tests
First, ensure the webserver is running by issuing the following command in the root directory:-  
    npm start
    
Then, from an additional command prompt, issue the following command:-  
    npm run protractor

This will then launch a Chrome browser, and execute the end-to-end UI based tests.  Results are reported within the original command prompt.

# What I'm pleased with
**The paging functionality.** Not only would it have been difficult to see the prime multiplication table when there were
more than a few hundred on the screen, rendering performance would have been terrible - especially considering the prime generation
feels quite quick (well, quick to me anyway!).

**The design.** The algorithm itself should be easily tweakable, and any util functions have all been split out
incase they need reuse.  The UI paging component should be re-usable too.

# What I'd do If I had more time...
**Improve the accuracy of the PrimeUtils.approximateNthPrimeNumber algorithm.**
This is designed to aid the sieve so it knows how far to 'sieve out' data.  Currently, this is quite wasteful as the accurecy isn't great.
Would like to swap it out for a proper Prime Number Theorem algorithm.

**Improve the table and paging layout.**
It's very bland.  I'm sure given a bit more time I could make the paging a bit more user friendly!  All UTs and E2E
tests have their own classes applied to the elements, so an html re-shuffle wouldn't affect tests.