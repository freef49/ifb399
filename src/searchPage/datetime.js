import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import muiThemeable from 'material-ui/styles/muiThemeable';

class DateTime extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timestamp: this.props.currentDateTime,
		};
	}

	// Update Date Value
	handleChangeDate(event, newDate) {
		// Send Date to Timestamp
		this.setState({
			timestamp: newDate,
		});
		// Send Timestamp to Parent
		this.props.updateDateTime(newDate);
	}

	// Update Time Value
	handleChangeTime(event, newTime) {
		// Get Current Timestamp
		let timestamp = this.state.timestamp;
		// Adjust Timestamp Time
		timestamp.setHours(newTime.getHours());
		timestamp.setMinutes(newTime.getMinutes());
		// Set State Timestamp to Adjusted Timestamp
		this.setState({
			timestamp: timestamp
		});
		// Send Timestamp to Parent
		this.props.updateDateTime(timestamp);
	}

	render() {
		const hintStyle = {
			color: this.props.muiTheme.palette.alternateTextColor
		}
		const dateStyle = {
			width: 'auto'
		}
		const timeStyle = {
			width: 'auto'
		}

		return (
			<div>
				<DatePicker
					style={dateStyle}
					hintText="Date"
					hintStyle={hintStyle}
					value = {this.state.timestamp}
					textFieldStyle={dateStyle}
					onChange={this.handleChangeDate.bind(this)}
				/>
				<TimePicker
					style={timeStyle}
					format="ampm"
					hintText="Time"
					hintStyle={hintStyle}
					value={this.state.timestamp}
					textFieldStyle={dateStyle}
					onChange={this.handleChangeTime.bind(this)}
				/>
			</div>
		);
	}

}
export default muiThemeable()(DateTime);
