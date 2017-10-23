import React from 'react';
import EventCard from '../event/eventCard.js'
import SuggestedEventCard from '../event/suggestedEventCard.js'
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
// Target Address
import {targetAddress} from "../constraints/constants";

const appTokenKey = "appToken";
// Get User Token
let user = localStorage.getItem(appTokenKey);

class FavouriteRouting extends React.Component {
  constructor(props) {
    super(props);
    this.event1 = {};
    this.state = {
      items: [],
			suggested: []
    };
  }


  componentDidMount() {
		let favouritesPath = window.location.pathname;
		// Get User Token
		let user = localStorage.getItem(appTokenKey);

    let proxyUrl = 'http://cors-anywhere.herokuapp.com/';
    let targetUrl = targetAddress+'/api/events'+favouritesPath;

		// Get Suggested Event for User
		let suggestEventURL = targetAddress+'/api/events/suggested?user='+user;
		fetch(suggestEventURL).then(result => result.json())
		.then(suggested =>(JSON.stringify(this.state.suggested) === JSON.stringify(suggested))
			? null
			: this.setState({suggested})
		);

		// Get Favourites
		fetch(targetUrl).then(result => result.json())
      .then(items => this.setState({items}));
  }

	render () {
		// Style Settings
		const pageStyle = {
			position: 'relative',
			top: '112px',
			width: '100%',
			height: '100%',
			backgroundColor: this.props.muiTheme.palette.canvasColor
		}
		return (
			<div style={pageStyle}>
				<div>
					{(this.state.user != null) ? (
						this.state.suggested.map((events, index)=>{
							return (
								<SuggestedEventCard
									user = {this.state.user}
									key={index}
									image={events.image}
									date={events.date}
									title={events.name}
									artist={events.artist}
									eventID={events.id}
									favourited={events.favourited}
								/>
							)
						})
					) : (
						null
					)}
				</div>
				{this.state.items.map((events, index)=>{
					return (
						<EventCard
							user = {this.state.user}
							key={index}
							image={events.image}
							date={events.date}
							title={events.name}
							artist={events.artist}
							eventID={events.id}
							favourited={events.favourited}
						/>
					)
				})}
			</div>
		);
	}
} export default muiThemeable()(FavouriteRouting);
