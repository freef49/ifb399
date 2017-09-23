import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import AppRouting from './AppRouting.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
	cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500, grey800,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

// Theme Settings
const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
	palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey800,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: cyan500,
    shadowColor: fullBlack,
  },
});

export class Index extends React.Component {
  render() {
    return <MuiThemeProvider muiTheme={muiTheme}><AppRouting /></MuiThemeProvider>;
  }
}

ReactDOM.render(
  <Index/>, document.getElementById('root'));
