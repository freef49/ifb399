import React from 'react';
// Classes
import EventCard from '../event/eventCard.js'
import Geolocation from './geolocation.js';
import DateTime from './datetime.js';
// Assets
import VideoWebM from '../assets/videos/background.webm';
import VideoMP4 from '../assets/videos/background.mp4';
// Material UI
import AutoComplete from 'material-ui/AutoComplete';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import muiThemeable from 'material-ui/styles/muiThemeable';
// Additional Libraries
import Typed from 'typed.js';

// Temporary Hardcoded Genre Suggestions
const genres = [
	'Rock',
	'Indie',
	'Pop',
	'Jazz',
	'Blues',
	'R&B',
	'Comedy'
];

const appTokenKey = "appToken";

class SearchRouting extends React.Component {
	constructor(props) {
		super(props);
		// Search Filter Handlers
		//this.handleChange = this.handleChange.bind(this);
		this.handleChangeGenres = this.handleChangeGenres.bind(this);

		// Default DateTime Settings
		let currentDate = new Date();
		let date = currentDate.getDate() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getFullYear();
		let time = currentDate.getHours() + ':' + currentDate.getMinutes();

		// Get User Token
		let user = localStorage.getItem(appTokenKey);

		// Default State Settings
		this.state = {
			user: user,
			height: 'auto',
			location: {
				enabled: false,
				latitude: null,
				longitude: null,
				range: 10
			},
			date: {
				enabled: false,
				timestamp: currentDate,
				date: date,
				time: time
			},
			items: [],
			search: ''
		};
	}

	componentDidMount() {
		// Typed Properties
		const options = {
			strings: genres,
			stringsElement: null,
			// typing speed
			typeSpeed: 80,
			// time before typing starts
			startDelay: 1200,
			// backspacing speed
			backSpeed: 50,
			// time before backspacing
			backDelay: 500,
			// loop
			loop: true,
			// false = infinite
			loopCount: false,
			// show cursor
			showCursor: true,
			// character for cursor
			cursorChar: "|",
			// attribute to type (null == text)
			attr: null,
			// either html or text
			contentType: 'html',
			// call when done callback function
			callback: function() {},
			// starting callback function before each string
			preStringTyped: function() {},
			//callback for every typed string
			onStringTyped: function() {},
			// callback for reset
			resetCallback: function() {}
		};
		// Typed Setup
		this.typed = new Typed(this.el, options);
	};

	componentDidUpdate() {
		//WARNING THIS WILL CALL OVER AND OVER AGAIN AFTER A SEARCH IS MADE.
		//need to pull the last set state, that is what is causing the loop

		// Get User Token
		let user = localStorage.getItem(appTokenKey);
		if(this.state.user !== user) {
			this.setState({user: user});
		}

		function getResults(results) {
			if (Array.isArray(results)) {
				console.log(results);
				return Promise.resolve(results.json());
			} else {
				return Promise.resolve();
			}
		}

		//Create Search Request
		let searchState = this.state.search;
		let proxyUrl = 'http://cors-anywhere.herokuapp.com/';
		// let targetUrl = 'https://brizzy-music.herokuapp.com/api/events/search/?genre=' + searchState;
		let targetUrl = 'http://128.199.133.10:3000/api/events/search/?genres=' + searchState;
		// console.log(targetUrl);

		// Location Search
		let location = this.state.location.latitude + ',' + this.state.location.longitude;
		let range = this.state.location.range
		if (this.state.location.enabled) {
			targetUrl += '&location=' + location;
			// Range Search
			if(this.state.location.range) {
				targetUrl += '&range=' + range;
			}
		}

		// Date Search
		// TODO
		// Date Range Search
		let date = this.state.date.date;
		let time = this.state.date.time;
		if(this.state.date.enabled) {
			targetUrl += '&date=' + date;
			if(this.state.date.time) {
				targetUrl += '%20' + time;
			}
		}

		//TODO
		// Suburb Search

		fetch(proxyUrl + targetUrl).then(result => result.json())
		//.then(result => getResults(result))
		//.then(items=>capturedJson = items)
		.then(items =>(JSON.stringify(this.state.items) === JSON.stringify(items))
			? null
			: this.setState({items})
		);
	}

	// Update genres
	handleChangeGenres(searchValue) {
		this.setState({search: searchValue});
	}

	// Update Location State
	handleChangeLocation(enabled, newLocation) {
		// Update copy of location state with new values
		let location = this.state.location;
		location.enabled = enabled;
		location.latitude = newLocation.latitude;
		location.longitude = newLocation.longitude;
		// Set Location State
		this.setState({location: location});
	}

	// Update Range Value of Location State
	handleChangeRange(range) {
		let location = this.state.location;
		location.range = range;
		this.setState({
			location: location
		});
	}

	// Update Date Value
	handleChangeDateTime(newTimestamp) {
		// Set Date String
		let date = newTimestamp.getDate() + '-' + (newTimestamp.getMonth()+1) + '-' + newTimestamp.getFullYear();
		// Set Time String
		let time = newTimestamp.getHours() + ':' + ('0' + newTimestamp.getMinutes()).slice(-2);
		// Update State Values for Date and Time
		this.setState({
			date: {
				enabled: true,
				date: date,
				time: time
			}
		});
	}

/*	handleChange(event) {
		this.setState({search: event.target.value});
	}*/

	// Was in the parent
	// <Search value={this.state.value} onChangeValue={this.handleChange.bind(this)}/>

	render() {
		// Style Settings
		const pageStyle = {
			position: 'relative',
			top: '112px',
			width: '100%',
			height: '100%',
			backgroundColor: this.props.muiTheme.palette.canvasColor
		}
		const searchBarStyle = {
			position: 'fixed',
			top: '64px',
			width: '100%',
			height: 'auto',
			color: this.props.muiTheme.palette.alternateTextColor,
			background: this.props.muiTheme.palette.accent3Color,
			opacity: '80%'
		}
		const hintStyle = {
			color: this.props.muiTheme.palette.alternateTextColor
		}
		const dateStyle = {
			width: 'auto'
		}
		const timeStyle = {
			width: 'auto'
		}
		const overlayStyle = {
			backgroundColor: "rgba(4, 20, 38, 0.9)",
			opacity: '20%',
			fontFamily: this.props.muiTheme.fontFamily,
			fontSize: 50,
			color: this.props.muiTheme.palette.alternateTextColor,
			position: "fixed",
			top: "50%",
			left: "50%",
			minWidth: "100%",
			minHeight: "100%",
			width: "auto",
			height: "auto",
			zIndex: "-100",
			transform: "translateX(-50%) translateY(-50%)",
			backgroundSize: "cover"
		}
		const infoStyle = {
			position: "fixed",
			top: "50%",
			left: "50%",
			transform: "translateX(-50%) translateY(-50%)",
		}
		const videoStyle = {
			position: "fixed",
			top: "50%",
			left: "50%",
			minWidth: "100%",
			minHeight: "100%",
			width: "auto",
			height: "auto",
			zIndex: "-100",
			transform: "translateX(-50%) translateY(-50%)",
			//background: "url() no-repeat",
			backgroundSize: "cover"
		}

		return (
			<div style={pageStyle}>
				<Toolbar ref="searchBar" style={searchBarStyle}>
					<ToolbarGroup style={{width: '30%', marginLeft: 20}} firstChild={true}>
						<AutoComplete
							fullWidth
							hintText="Search"
							hintStyle={hintStyle}
							textFieldStyle={hintStyle}
							filter={AutoComplete.caseInsensitiveFilter}
							dataSource={genres}
							onUpdateInput={this.handleChangeGenres}
						/>
					</ToolbarGroup>
					<ToolbarGroup style={{width:'20%'}}>

						<Geolocation
							updateLocation={this.handleChangeLocation.bind(this)}
							updateRange={this.handleChangeRange.bind(this)}
						/>

					</ToolbarGroup>
					<ToolbarGroup style={{width: '30%'}}>
						<DateTime
							currentDateTime={this.state.date.timestamp} updateDateTime={this.handleChangeDateTime.bind(this)}
						/>
					</ToolbarGroup>
				</Toolbar>
				{this.state.items.length > 0 ? (
					<div ref="page" style={pageStyle}>
					{this.state.items.map((events, index)=>{
							return (
								<EventCard
									loggedIn = {(this.state.user != null)}
									key={index}
									image={events.image}
									date={events.date}
									title={events.name}
									artist={events.artist}
									link={events.id}
									favourited={events.favourited}
								/>
							)
						})
					}
					</div>
				) : (
					<div>
						<video style={videoStyle} playsInline autoPlay muted loop>
							<source src={VideoWebM} type="video/webm" />
							<source src={VideoMP4} type="video/mp4" />
						</video>
						<div ref="overlay" style={overlayStyle}>
							<p style={infoStyle}>{this.state.user}</p>
							<div style={infoStyle} className="type-wrap">
								Search for&nbsp;
								<span
									style={{ whiteSpace: 'pre' }}
									ref={(el) => { this.el = el; }}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
export default muiThemeable()(SearchRouting);
