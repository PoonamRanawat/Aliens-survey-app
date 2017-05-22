# Aliens_Survey App

## Overview
Aliens survey application allows customers to log in, then fill in the survey without itself.
Application includes:
    ##survey overview
    ##survey details page
Create Survey
Creating a survey consists of two steps, to be displayed as tabs:
    ##General information
    ##Survey management
User Management
An administrator can add / edit / delete. There need be only one administrator.
Each account must have the ability to create their own surveys and see the results.


### Node.js and Tools

- Get [Node.js][node].
- Install the tool dependencies: `npm install`


## Development with `aliens-survey-app`

The following docs describe how you can test and develop this application further.

### Installing Dependencies

The application relies upon various Node.js tools, such as [Bower][bower] You can install these by running:

```
npm install
```

This will also run Bower, which will download the Angular files needed for the current step of the
tutorial.

Most of the scripts described below will run this automatically but it doesn't do any harm to run
it whenever you like.

### Running the Application during Development

- Run `npm start`.
- Navigate your browser to [http://localhost:8000/](http://localhost:8000/) to see the application 
  running.


## Application Directory Layout
```
app/                     --> all the source code of the app
  src                   --> all the source code of the app
    core                  --> reusable components
        login              --> code related to login module
            assets         --> json files
            controllers    --> controllers realted to login
            services       --> services related to login
            templates      --> login.html (landing poage of application)

  app.config.js          --> app-wide configuration of Angular services

  app.module.js          --> the main app module
  index.html             --> app layout file (the main HTML template file of the app)



node_modules/...         --> development tools (fetched using `npm`)

bower.json               --> Bower specific metadata, including client-side dependencies
package.json             --> Node.js specific metadata, including development tools dependencies
```


## Contact

For more information on AngularJS, please check out https://angularjs.org/.


[angular-seed]: https://github.com/angular/angular-seed
[bower]: http://bower.io/
[git-home]: https://git-scm.com/
[git-setup]: https://help.github.com/articles/set-up-git
[node]: https://nodejs.org/

