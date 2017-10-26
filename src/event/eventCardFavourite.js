import React from 'react';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
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
	handleChange(event, isInputChecked) {
		// Check favourited status
		if (isInputChecked) {
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
			this.setState({favourited: true});
		} else {
			// Remove Favourite
			console.log("Remove Favourite");
			this.setState({favourited: false});
		}
	}

	render() {
		return (
			<Checkbox
				checked={this.state.favourited}
				onCheck={this.handleChange.bind(this)}
	      checkedIcon={<FavouriteIcon />}
	      uncheckedIcon={<FavouriteBorderIcon />}
      />
		);
	}
}
export default muiThemeable()(Favourite);
