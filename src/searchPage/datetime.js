import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';

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

// resetDate(){
// 	this.props.updateDateTime("undefined");
// }

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
		const dateTimeStyle ={
			display: 'flex'
		}

		return (
			<div style={dateTimeStyle}>
				<DatePicker
					style={dateStyle}
					hintText="Date"
					hintStyle={hintStyle}
					value = {this.state.timestamp}
					textFieldStyle={dateStyle}
					style={dateStyle}
					onChange={this.handleChangeDate.bind(this)}
				/>
				{/* <RaisedButton
          label="Reset"
          primary={true}
          onClick={this.resetDate}
					buttonStyle={{backgroundColor: this.props.muiTheme.palette.accent1Color}}
        /> */}
				{/* <TimePicker
					style={timeStyle}
					format="ampm"
					hintText="Time"
					hintStyle={hintStyle}
					value={this.state.timestamp}
					textFieldStyle={dateStyle}
					onChange={this.handleChangeTime.bind(this)}
				/> */}
			</div>
		);
	}

}
export default muiThemeable()(DateTime);
