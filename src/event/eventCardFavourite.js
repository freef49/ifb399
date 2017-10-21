import React from 'react';
import IconButton from 'material-ui/IconButton';
import FavouriteIcon from 'material-ui/svg-icons/action/favorite';
import FavouriteBorderIcon from 'material-ui/svg-icons/action/favorite-border';
import muiThemeable from 'material-ui/styles/muiThemeable';

import {firebaseAuth} from "../constraints/constants";

const appTokenKey = "appToken";

class Favourite extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favourited: this.props.favourited
		};
	}

	// Handle Favourite Click
	handleClick(event) {
		// Check favourited status
		if (this.state.favourited === true) {
			// Remove Favourite
			console.log("Remove Favourite");
		} else {
			let eventID = this.props.eventID;
			console.log(eventID);
			// Get User ID token
			firebaseAuth().currentUser.getIdToken().then(function(token) {
				//console.log(token);
				// Send request to add favourite for user
				// Add Favourite
				let proxyUrl = 'http://cors-anywhere.herokuapp.com/';
				let targetUrl = 'http://128.199.133.10:3000/api/users/favourites/add';
				fetch(proxyUrl+targetUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						'event': eventID,
						'token': token
					})
				})
			}).catch(function(error) {
				console.log(error);
			});

		}
	}

	render() {
		return (
			<IconButton onClick={this.handleClick.bind(this)} tooltip="Favourite" touch={true} tooltipPosition="bottom-right">
	      { // Get Icon based on Favourite Status
					(this.state.favourited === true)
						? <FavouriteIcon />
						: <FavouriteBorderIcon />
				}
	    </IconButton>
		);
	}
}
export default muiThemeable()(Favourite);
