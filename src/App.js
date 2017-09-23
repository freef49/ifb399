import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';



import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import EventCard from './event/eventCard.js'
import DetailedPage from './details/detailedPage.js';
import Search from './searchPage/search.js';

import Menu from './menu/menu.js';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


// propably need for (let property in object) {
// do something with object property
// } to loop over the object

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      search: '',
      open:false
    };

  }
  componentDidMount() {}
  //part solution
  // shouldComponentUpdate(nextProps, nextState){
  //   if (nextState.search === this.state.search){
  //     return false;
  //   }
  //   else{
  //     return true;
  //   }
  // }

  componentDidUpdate() {
    //WARNING THIS WILL CALL OVER AND OVER AGAIN AFTER A SEARCH IS MADE.
    //need to pull the last set state, that is what is causing the loop

    let searchState = this.state.search;
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let targetUrl = 'https://brizzy-music.herokuapp.com/api/events/search/?genre=' + searchState;
    // console.log(targetUrl);
    fetch(proxyUrl + targetUrl).then(result => result.json())
    //.then(items=>capturedJson = items)
      .then(items => this.setState({items}))
  }

  handleChange(event) {
    this.setState({search: event.target.value});
    event.preventDefault();
  }

  handleToggle = () => this.setState({
    open: !this.state.open
  });

  render() {
    const event1 = this.state.items[0]
      ? this.state.items[0]
      : 'Loading...';




    return (


      <div>
        {/* <div>
            <div>
              <AppBar title="Muzix" iconClassNameRight="muidocs-icon-navigation-expand-more" onTouchTap={this.handleToggle}/>
              <Drawer open={this.state.open}>
                <MenuItem>Home</MenuItem>
              </Drawer>
            </div>
        </div> */}

          <Menu />


        {/* Search */}

        <Search value={this.state.value} onChangeValue={this.handleChange.bind(this)}/>



        {/* Event card */}
        <div>

            <EventCard image={event1.image}
            date={event1.date}
            title={event1.name}
            artist={event1.artist}
            link={event1.url}
          />

        </div>

        {/* Detailed Page */}
        {/* <div>
            <DetailedPage title={event1.name}
            genre={event1.genres}
            image={event1.image}
            date={event1.date}
            link={event1.url}
            venue={event1.venue}
            description={event1.description}/>
        </div> */}

      </div>

    );
  }
}

export default App;
