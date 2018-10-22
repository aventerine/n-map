# React Neighborhood Map: A single Page App - Project 7


### Udacity Front-End Web Developer Nanodegree program - Project's Overview:

This is a single page app created from scratch with `create-react-app`: a React framework. It uses Google Maps API and FourSquare API with ReactJS to display a list of locations around my location. It allows you to search and select each venue and get information on its location.  It is accessible - people with disability can easily use this app. Functionality is presented in a usable and responsive manner. It can be used on any screen size device.  The App gives clarity on Reactjs, Service Workers, Responsive design and Accessibility.

## Table of Contents

* [Installation](#installation)
* [Dependencies](#dependencies)
* [How To Run App In Production](#how-to-run-app-in-production)
* [Attribution](#attribution)
* [License](#license)


## Installation

* Clone or download the repository
* Open terminal and cd into project's folder.
* Run `npm install`  or `yarn install` to install all of the project's dependencies.
* Then run `npm start` to launch the app if you have downloaded Node.js.
* A new browser window should automatically open displaying the app if not,
* Open browser to `http://localhost:3000`.
* If Node.js is not installed, download it [here](https://nodejs.org/en/download/)
* Then follow the above steps 1-4 to install its dependencies and launch the App.
* To use service worker, run `npm build`. Run it only in production mode.


## Dependencies

* Reactjs
* axios API
* Google Maps API
* FourSquare API
* Bootstrap

## How To Run App In Production Mode

* Please note that the service worker will only cache the site
  when it's in production mode. Therefore go:
* In your terminal, `run npm build`
* Next, npm install -g serve
* Then Serve -s build
* Then navigate to localhost:5000


## Resources

These resources were very useful in understanding how to build this project:
1. [React Docs](https://reactjs.org/)
2. [create React documentation](https://github.com/facebookincubator/create-react-app)
3. [Google Maps API Docs](https://developers.google.com/maps/documentation/javascript/adding-a-google-map)
4. [w3schools](https://www.w3schools.com)

## License

This project is licensed under the terms of the MIT license