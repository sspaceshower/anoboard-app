# ANOBOARD - CS473 Project
Update:
* 18/11/20 refactoring, adding new sections
* 18/11/07 remove reactstrap & change react-bootstrap version
* 18/11/08
  * update to remove trello & migrating to GitHub project board, set automation
  * use pull request instead of pushing to master.
  * use `npm ci` instead of `npm install`
* 18/11/22 Add redux and react-redux

# Description
![](https://img.shields.io/badge/nodejs-11.2.0-green.svg)
![](https://img.shields.io/badge/npm-6.4.1-red.svg)
![](https://img.shields.io/badge/react%20-16.6.0-blue.svg)

ANOBoard is a web application running in NodeJS environment and using Firebase platform for a database. Front-end is build with ReactJS library and Sass stylesheet.

## Codebase
* This project is implemented with ReactJS framework with SASS/SCSS stylesheet. All the JavaScript file can be found in `anoboard-app/src/` folder, and assets such as fonts and third-party js/css are put in `anoboard-app/public/`. The base directory from here on will refer to `anoboard-app/src/`
* Each page component can be found in the directory. This incluse `index.js` which calls render, `Sidebar.js` for rendering sidebar, `Homepage` and so on.
* Each page is reduced into several subcomponents that can be found in folder `/components`
* The backend/database controls are kept in `/firebase`
* `/helper.js` is used to keep the file for helper functions used in several place across the application
* `/constants`is for declaring constants.
* Other subfolders are used to keep the file implemented in the use of third-party libraries, such as react-redux or font-awesome

# Dev Instructions
Please read the instruction on this file before working on the project.

## Index
1. [How to run the application](#HOW-TO)
2. [TO-DO List](#TO-DO-List)
3. [Appendix: Additional React Library & Framework](#React-Libraries-and-Framework)
4. [Appendix: Public Assets](#Assets)
5. [React Command Guide](#React-Command-Guide)

## HOW TO
Here, we are using **ReactJS** and **CSS/SCSS** stylesheet.

1. To start working, first clone the repository, then go to the project folder (where package.json is) and then run `npm ci` and `npm start`. note that we are using `npm ci` instead of `npm install` because it will install package according to the package-lock file and will not rewrite it. After the first pull, you can run project only with `npm start`.You also have to install sass package for scss reference, so run the command the npm prompt you when trying to run the project
2. The directory we'll be working on is `src` and `public`. React and JavaScript files are kept in `/src`, and stylesheets are kept in `/src/scss`. Downloaded Fonts and assets should be kept in `public`. Creating a new folder in the dir is fine if you need it. Just try to be as organized as possible.
3. Before pulling and start working for the day, please review any pull request that is still pending and merge them if you think there is no problem. This is just to make sure that we will be as much as possible on the same version on each branch and have to solve less conflict.
4. During working, if you found a part that someone else should be working on, please mark it with `TODO:` and add it to TODO section *(refer to TO-DO LIST section for more information)*
5. If you want to use any library that is not yet included in the work, please install it using`npm install` and add the name of the library to *React Library* Section. Including css file and stuffs using linking are fine, but please see if there exists a react plugin to be installed (just because it is easier)<br>
6. Please create your own branch and use git PULL REQUEST instead of pushing to master. You can decide to merge it yourself if you have already test the code or are confident, but please keep buggy/unfinished to pull request until they are reviewed.
7. **In the last, all the files in this repository will be packed using webpack to get `bundle.js` and `bundle.css`**, but we will wait until front-end and API are finished before packing.

please **DO NOT** copy assets from the old repository to here if you are not using it. there're too many unused files there, and I am not sure which one are actually used, so this way (ideally) we could delete everything there after we finish with this one.

before making the first commit, be sure to run this command in your cloned repository to make global .gitconfig work
```bash
git config --local include.path ../.gitconfig
```

## TO-DO List
### Guide
- Please add the comment with keyword `TODO:` and include a short tag/category in <> before describing the task. For example:
`TODO: <API> request ___ from the server`
- Please also add new git issue with labels and add to corresponding project board + Anoboard App Board. The issue will automatically move into To Do section of the project board. Please write the description and location(filename) too if you see it necessary. you can freely create a new tag/label if you want to.
- When working on something, please move the task to DOING section on project board; also assign your name to the issue if possible. This is the only column with no automation
- If you are done with the task, delete the comment `TODO:` from the source code, close the issue on git and the automation will bring the corresponding card to DONE section

### Tag List
- `API`: request/pushing of information between front-end to back-end
- `mockup`: fake information used to preview the website, to be changed/deleted when the corresponding API part is finished.
- `frontend`: interface/design
- `general`
- `optional`
- `unidentified` : priority to be decided.

## Appendix
### React Libraries and Framework
you can also find the list in `package.json` file
- [react-bootstrap](https://react-bootstrap.netlify.com)
- [react-fontawesome](https://fontawesome.com)
- [react-router](https://reacttraining.com/react-router/core/guides/philosophy)
- [redux](https://redux.js.org)

**updated** deleting `reactstrap` and `react-bootstrap (v3)`. now use only `react-bootstrap (v4)`

### Assets
- fonts: Source Sans Pro, Lato

## React Command Guide

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts
This is from the official README file. In the project directory, you can run:

```bash
npm start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

```bash
npm test
```

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```bash
npm run build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```bash
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Firebase introduction [Firebase Realtime Database](https://firebase.google.com/products/realtime-database/?authuser=0)
