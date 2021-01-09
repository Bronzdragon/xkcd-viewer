# XKCD-viewer

**You can see a live demo of this project here.**

## Development

To install the dependencies using NPM:\
`npm install`

Using Yarn:\
`yarn install`

### Available Scripts
In the project directory, you can run:

#### `npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm build` or `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimises the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm eject` or `yarn eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

This application is buit with `create-react-app`, and thus hides a lot of configuration. Before ejecting to expose this, I reccomend researching to see if this application can be configured in some other way.

## Limitations

Because the XKCD API does not provide CORS headers, it must be accessed via  a proxy. For a full project, I would build a proxy under my own control, but for this project, I'm making use of [Heroku's CORS-Anywhere](https://cors-anywhere.herokuapp.com/) public API.

## Special thanks:
Facebook for [React](https://github.com/facebook/react), and [create-react-app](https://github.com/facebook/create-react-app).

User 'nickeljew' for [react-month-picker](https://github.com/nickeljew/react-month-picker).

Our star assets from Wikmedia Commons [Empty](https://commons.wikimedia.org/wiki/File:Empty_Star.svg) and [Filled](https://commons.wikimedia.org/wiki/File:Full_Star_Yellow.svg).