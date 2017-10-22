import React from 'react';
import Paper from 'material-ui/Paper';
import Image from './eventCardImage.js';
import Date from './eventCardDate.js';
import Title from './eventCardTitle.js';
import Artist from './eventCardArtist.js';
import EventButton from './eventCardButton.js';
import Favourite from './eventCardFavourite.js';
import muiThemeable from 'material-ui/styles/muiThemeable';

// Assets
import DefaultImage from '../assets/images/default.png';

class SuggestedEventCard extends React.Component {
  render() {
    const style = {
      height: 375,
      width: '90%',
			minWidth: 300,
      margin: 20,
      padding: "10px 20px",
			color: this.props.muiTheme.palette.alternateTextColor,
      textAlign: 'center',
      display: 'inline-block',
			backgroundColor: this.props.muiTheme.palette.accent1Color
    }

    return (
      <Paper style={style} zDepth={3} >
				<h2>Suggested Event</h2>
        <Image image={(this.props.image == "") ? DefaultImage : this.props.image}/>
        <Date date={this.props.date} />
        <Title name={this.props.title} />
        <Artist artist={this.props.artist} />
				<hr />
				<div style={{backgroundColor: 'rgba(255,255,255,0.75)'}}>
        <EventButton link={this.props.eventID} />
				{
					// Add Favourite Button for Logged In Users
					(this.props.user != null)
						? <Favourite eventID={this.props.eventID} favourited={this.props.favourited} />
						: null
				}
				</div>
      </Paper>

    );
  }
}

export default muiThemeable()(SuggestedEventCard);
