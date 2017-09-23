import React from 'react';
import EventCard from '../event/eventCard.js'

import Geolocation from './geolocation.js';

import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

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

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeGenres = this.handleChangeGenres.bind(this);
    this.handleChangeDatePicker = this.handleChangeDatePicker.bind(this);
    this.handleChangeTimePicker = this.handleChangeTimePicker.bind(this);

    let currentDate = new Date();
    			let date = currentDate.getDate() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getFullYear();
    			let time = currentDate.getHours() + ':' + currentDate.getMinutes();
          this.state = {
    				date: {
    					enabled: false,
    					date: date,
    					time: time
    				},
    				location: {
    					enabled: false,
    					latitude: null,
    					longitude: null,
    					range: null
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
		onChangeLocation(enabled, location) {
			this.setState({
				location: {
					enabled: enabled,
					latitude: location.latitude,
					longitude: location.longitude
				}
			});
		}

		// Update Range Value of Location State
		onChangeRange(range) {
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

    return (

      <div>
           <form>
             <label>
               Genre:
               <AutoComplete
                 floatingLabelText="Search"
                 filter={AutoComplete.caseInsensitiveFilter}
                 dataSource={genres}
                 onUpdateInput={this.handleChangeGenres}
               />
             </label>
             <Geolocation
               updateLocation={this.onChangeLocation.bind(this)}
               updateRange={this.onChangeRange.bind(this)}
             />
             <label>
               <div>
               Date:
               <DatePicker
                 hintText="Select a Date"
                 container="inline"
                 mode="landscape"
                 value = {this.state.date.date}
                 onChange={this.handleChangeDatePicker}
               />
               <TimePicker
                 format="ampm"
                 hintText="Select a Time"
                 container="inline"
                 value={this.state.time}
                 onChange={this.handleChangeTimePicker}
               />
               </div>
             </label>
           </form>

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

export default SearchRouting;
