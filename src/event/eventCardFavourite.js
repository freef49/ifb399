import React from 'react';
import IconButton from 'material-ui/IconButton';
import FavouriteIcon from 'material-ui/svg-icons/action/favorite';
import FavouriteBorderIcon from 'material-ui/svg-icons/action/favorite-border';
import muiThemeable from 'material-ui/styles/muiThemeable';

import {firebaseAuth, targetAddress} from "../constraints/constants";

const appTokenKey = "appToken";

class Favourite extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favourited: this.props.favourited
		};
	}

	componentDidMount() {
		this.setState({favourited: this.props.favourited});
	}

	// Handle Favourite Click
	handleClick(event) {
		// Check favourited status
		if (this.state.favourited == 1) {
			// Remove Favourite
			console.log("Remove Favourite");
			this.setState({favourited: 0});
		} else {
			let eventID = this.props.eventID;
			//console.log(eventID);
			// Get User ID token
			firebaseAuth().currentUser.getIdToken().then(function(token) {
				//console.log(token);
				// Send request to add favourite for user
				// Add Favourite
				let proxyUrl = 'http://cors-anywhere.herokuapp.com/';
				let targetUrl = targetAddress+'/api/users/favourites/add';
				fetch(targetUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						'event': eventID,
						'token': token
					})
				})
				.then(response => response.json())
				.then(body => console.log(body));
			}).catch(function(error) {
				console.log(error);
			});
			this.setState({favourited: 1});
		}
	}

	render() {
		return (
			<IconButton onClick={this.handleClick.bind(this)} tooltip="Favourite" touch={true} tooltipPosition="bottom-right">
	      { // Get Icon based on Favourite Status
					(this.props.favourited == 1)
						? <FavouriteIcon />
						: <FavouriteBorderIcon />
				}
	    </IconButton>
		);
	}
}
export default muiThemeable()(Favourite);
