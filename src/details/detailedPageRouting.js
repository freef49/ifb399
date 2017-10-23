import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Image from './detailedPageImage.js'
import Date from './detailedPageDate.js'
import muiThemeable from 'material-ui/styles/muiThemeable';
// Target Address
import {targetAddress} from "../constraints/constants";

class DetailedPageRouting extends React.Component {
  constructor(props) {
    super(props);
    this.event1 = {};
    this.state = {
      items: {}
    };

  }


  componentDidMount() {
    let detailsPath = window.location.pathname;
    let proxyUrl = 'http://cors-anywhere.herokuapp.com/';
    let targetUrl = targetAddress+'/api/events/'+detailsPath;
    fetch(targetUrl).then(result => result.json())
      .then(detail => this.setState({items: detail}));

  }



// const event1 = {this.state.items[0]};

  render() {
    const sideBySide = {
      width: '100%',
      height: 'auto',
      opacity: '80%',
      display: 'flex',
      display: '-webkit-box',
      display: '-moz-box',
      display: '-ms-flexbox',
      display: '-webkit-flex',
      display: 'flex',

      flexFlow: 'row wrap',
      justifyContent: 'space-around'
    }

    const fullWidthButtons ={
      marginTop: '20px'
    }

    let venue = this.state.items.venue
      ? Object.create(this.state.items.venue)
      : '';
    let venueLocation = venue.location
      ? Object.create(venue.location)
      : '';
    let venueLocationURL = "http://maps.google.com/?q=" + (venueLocation.latitude) + "," + (venueLocation.longitude);

    return (

      <div style={{paddingTop:"90px"}}>
        <div style={sideBySide}>
          <div style={{paddingTop:"20px"}}>
            <h1 style={{marginTop:"-20px",padding:"0 10px 10px"}}>{this.state.items.name}</h1>
            <h2 style={{marginTop:"-20px",padding:"0 10px 10px"}}>{this.state.items.genres}</h2>
<Date date={this.state.items.date}/>
          </div>
          <div>
              <Image image={this.state.items.image}/>

          </div>
        </div>
          <RaisedButton label="Get Tickets!" primary={true} fullWidth={true} href={this.state.items.link} style={fullWidthButtons}/>
          <RaisedButton label="Get Directions" secondary={true} fullWidth={true} href={venueLocationURL} style={fullWidthButtons}/>

          <div style={sideBySide}>
            <div style={{maxWidth:"100%"}}>
              <h2 style={{padding:"0 10px 10px"}}>Playing at the {venue.name}</h2>
              <img src={venue.image} alt={venue.name}/>
            </div>
            <div style={{maxWidth:"40rem"}}>
              <h3 style={{padding:"0 10px 10px"}}>Some event details</h3>
              <p style={{padding:"0 20px 10px"}}>{this.state.items.description}</p>
            </div>
          </div>


      </div>

    );
  }
}

export default muiThemeable()(DetailedPageRouting);
