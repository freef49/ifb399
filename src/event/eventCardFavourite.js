import React from 'react';
import IconButton from 'material-ui/IconButton';
import FavouriteIcon from 'material-ui/svg-icons/action/favorite';
import FavouriteBorderIcon from 'material-ui/svg-icons/action/favorite-border';
import muiThemeable from 'material-ui/styles/muiThemeable';

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
		} else {
			/*
			// Add Favourite
			var http = require('http');
			var body = JSON.stringify({
			    "event": result[2][0]['@id'],
						"name": req.body.name
					},
					"token": "Content Updated"
			});

			var request = new http.ClientRequest({
			    hostname: "localhost",
			    port: 3000,
			    path: "/api/users/favourites/add",
			    method: "POST",
			    headers: {
			        "Content-Type": "application/json",
			        "Content-Length": Buffer.byteLength(body)
			    }
			})

			request.end(body);*/
		}
	}

	render() {
		return (
			<IconButton tooltip="Favourite" touch={true} tooltipPosition="bottom-right">
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
