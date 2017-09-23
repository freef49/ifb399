import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';



import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import EventCard from './event/eventCard.js'
import DetailedPageRouting from './details/detailedPageRouting.js';
import SearchRouting from './searchPage/searchRouting.js';

import Menu from './menu/menu.js';
import Login from './login/loginAuth.js';
import Logout from './login/logout.js';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class AppRouted extends React.Component {

  render(){
    return(
      <Router>
        <div>
          <div>
            <Menu />
          </div>


          <Route exact path="/" component={Home}/>
          <Route path="/details" component={Details}/>
          <Route path="/login" component={Auth}/>
          <Route path="/logout" component={Deauth}/>

        </div>
      </Router>
    )

  }

}

const Home = () => (
  <div>
    <SearchRouting />
  </div>
)

const Details = () => (
  <div>
    <DetailedPageRouting />
  </div>
)
const Auth = () => (
  <div>
    <Login />
  </div>
)
const Deauth = () => (
  <div>
    <Logout />
  </div>
)
