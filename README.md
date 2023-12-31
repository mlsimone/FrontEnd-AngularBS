# on 10/4/23 I had to add a staticwebapp.config.json file in the dist/output folder.
# This contains a fallback route -- which based on readings -- appears to be needed for 
# my Single Page Application so that I don't get a Page Not Found when I go to any of my routes.

# FrontSide - made minor change to this file so I could PUSH up to GitHub repo.
GitHub PUSH will trigger a workflow to publish to Azure.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.3.

Node.js requirement:
You will need to install at least version 14 or above, in order for the site to work properly.
Microsoft's Authentication Library (MSAL) requires this version or above.

Version 18.16.0 was used to build this project.


## Development server

To Build: 

1) git clone ***.git off of gitHub
2) npm import *
where * = all the package dependencies listed in package.json.

For example, this project uses 
- MSAL (Microsoft Authentication Library)
- bootstrap 5 
- Observables

3) modify styles.css and add-item-page.component.css 
to use the css files within the node_modules directory. This is a hard-coded (full path),

which will most likely different from the one checked into the repo which is based on my working
directory path (G:\documents\Training\ProofOfConcept\FrontEnd-AngularBS\node_modules).

4) Run 'ng serve' for a dev server
Run 'ng build' to build a production server  where artifacts will be stored in the 'dist/' directory.


Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
