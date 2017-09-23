import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Image from './detailedPageImage.js'
import Date from './detailedPageDate.js'

class DetailedPage extends React.Component {
  render() {

    let venue = this.props.venue ? Object.create(this.props.venue) : '';
    let venueLocation = venue.location ? Object.create(venue.location) : '';
    let venueLocationURL = "http://maps.google.com/?q="+(venueLocation.latitude)+","+(venueLocation.longitude);

    return(

      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.genre}</h2>
        <Image image={this.props.image}/>
        <Date date={this.props.date}/>
        <RaisedButton label="Get Tickets!" primary={true} fullWidth={true} href={this.props.link} />
        <h2>Playing at the {venue.name}</h2>
        <div><img src={venue.image} alt={venue.name} /></div>
        <RaisedButton label="Get Directions" secondary={true} fullWidth={true} href={venueLocationURL}/>
        <h3>Some event details</h3>
        <p>{this.props.description}</p>
      </div>

    );
  }
}

export default DetailedPage;
