import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import AppRouting from './AppRouting.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class Index extends React.Component {
  render() {
    return <MuiThemeProvider><AppRouting /></MuiThemeProvider>;
  }
}

ReactDOM.render(
  <Index/>, document.getElementById('root'));
