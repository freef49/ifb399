import React from 'react';
// Event Components
import EventCard from '../event/eventCard.js'

// Search Components
import Geolocation from './geolocation.js';

// MUI Components
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import muiThemeable from 'material-ui/styles/muiThemeable';

// Genre Tags
const genres = [
	'Rock',
	'Indie',
	'Pop',
	'Jazz',
	'Blues',
	'R&B',
	'Comedy'
];

class SearchRouting extends React.Component {
	constructor(props) {
		super(props);

		// Component Input Handlers
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeGenres = this.handleChangeGenres.bind(this);
		this.handleChangeDatePicker = this.handleChangeDatePicker.bind(this);
		this.handleChangeTimePicker = this.handleChangeTimePicker.bind(this);

		// Default Search State
		let currentDate = new Date();
		let date = currentDate.getDate() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getFullYear();
		let time = currentDate.getHours() + ':' + currentDate.getMinutes();
		this.state = {
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

	componentDidUpdate() {
		//WARNING THIS WILL CALL OVER AND OVER AGAIN AFTER A SEARCH IS MADE.
		//need to pull the last set state, that is what is causing the loop

		function getResults(results) {
			if (Array.isArray(results)) {
				console.log(results);
				return Promise.resolve(results.json());
			} else {
				return Promise.resolve();
			}
		}

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
		let date = this.state.date.date;
		let time = this.state.date.time;
		if(this.state.date.enabled) {
			targetUrl += '&date=' + date;
			if(this.state.date.time) {
				targetUrl += '%20' + time;
			}
		}

		fetch(proxyUrl + targetUrl).then(result => result.json())
		//.then(result => getResults(result))
		//.then(items=>capturedJson = items)
			.then(items => this.setState({items}));

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
	handleChangeDatePicker(event, newDate) {
		console.log(date);
		let date = newDate.getDate() + '-' + (newDate.getMonth()+1) + '-' + newDate.getFullYear();
		this.setState({
			date: {
				enabled: true,
				timestamp: newDate,
				date: date,
				time: this.state.time
			}
		});
	}

	// Update Time Value
	handleChangeTimePicker(event, newTime) {
		let time = newTime.getHours() + ':' + newTime.getMinutes();
		this.setState({
			date: {
				enabled: true,
				date: this.state.date.date,
				time: time
			}
		});
	}

	handleChange(event) {
		this.setState({search: event.target.value});
	}

	// Was in the parent

	// <Search value={this.state.value} onChangeValue={this.handleChange.bind(this)}/>

	render() {
		// Style Settings
		const searchBarStyle = {
				color: this.props.muiTheme.palette.alternateTextColor,
				background: this.props.muiTheme.palette.accent3Color,
				opacity: '80%'
		}
		const hintStyle = {
			color: this.props.muiTheme.palette.alternateTextColor
		}
		const timeStyle = {
			width: 100
		}

		return (
			<div>
				<Toolbar style={searchBarStyle} >
					<ToolbarGroup style={{width: '50%', marginLeft: 20}} firstChild={true}>
						<AutoComplete
							fullWidth="true"
							hintText="Search"
							hintStyle={hintStyle}
							textFieldStyle={hintStyle}
							filter={AutoComplete.caseInsensitiveFilter}
							dataSource={genres}
							onUpdateInput={this.handleChangeGenres}
						/>
						<ToolbarSeparator style={{background: this.props.muiTheme.palette.borderColor}}/>
					</ToolbarGroup>

					<ToolbarGroup style={{width: '20%'}}>
						<Geolocation
							updateLocation={this.handleChangeLocation.bind(this)}
							updateRange={this.handleChangeRange.bind(this)}
						/>
					</ToolbarGroup>

					<ToolbarGroup style={{width: '30%'}}>
						<DatePicker
							hintText="Date"
							hintStyle={hintStyle}
							value = {this.state.date.timestamp}
							textFieldStyle={hintStyle}
							onChange={this.handleChangeDatePicker}
						/>
						<ToolbarSeparator style={{background: this.props.muiTheme.palette.borderColor}}/>
						<TimePicker
							style={timeStyle}
							format="ampm"
							hintText="Time"
							hintStyle={hintStyle}
							value={this.state.time}
							textFieldStyle={hintStyle}
							onChange={this.handleChangeTimePicker}
						/>
					</ToolbarGroup>
				</Toolbar>

				{this.state.items.map((events, index)=>{
						return (<EventCard key={index}image={events.image}
						date={events.date}
						title={events.name}
						artist={events.artist}
						link={events.id}
					/>)})}
			</div>

		);
	}
}

export default muiThemeable()(SearchRouting);
