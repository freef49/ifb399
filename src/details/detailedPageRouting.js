import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Image from './detailedPageImage.js'
import Date from './detailedPageDate.js'

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
    let targetUrl = 'http://128.199.133.10:3000/api/events/'+detailsPath;
    fetch(proxyUrl+targetUrl).then(result => result.json())
      .then(detail => this.setState({items: detail}));

  }



// const event1 = {this.state.items[0]};

  render() {


    let venue = this.state.items.venue
      ? Object.create(this.state.items.venue)
      : '';
    let venueLocation = venue.location
      ? Object.create(venue.location)
      : '';
    let venueLocationURL = "http://maps.google.com/?q=" + (venueLocation.latitude) + "," + (venueLocation.longitude);

    return (

      <div>
        <h1>{this.state.items.title}</h1>
        <h2>{this.state.items.genre}</h2>
        <Image image={this.state.items.image}/>
        <Date date={this.state.items.date}/>
        <RaisedButton label="Get Tickets!" primary={true} fullWidth={true} href={this.state.items.link}/>
        <h2>Playing at the {venue.name}</h2>
        <div><img src={venue.image} alt={venue.name}/></div>
        <RaisedButton label="Get Directions" secondary={true} fullWidth={true} href={venueLocationURL}/>
        <h3>Some event details</h3>
        <p>{this.state.items.description}</p>
      </div>

    );
  }
}

export default DetailedPageRouting;
