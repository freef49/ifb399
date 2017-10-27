import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';

class DateTime extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			enabled: false,
			timestamp: this.props.currentDateTime,
		};
	}

	// Update Date Value
	handleChangeDate(event, newDate) {
		newDate.setHours(0);
		newDate.setMinutes(0);
		// Send Date to Timestamp
		this.setState({
			enabled: true,
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
		timestamp.setHours(0);
		timestamp.setMinutes(0);
		// Set State Timestamp to Adjusted Timestamp
		this.setState({
			timestamp: timestamp
		});
		// Send Timestamp to Parent
		this.props.updateDateTime(timestamp);
	}

	// Open Date Picker from Button
	openDatePicker() {
		this.refs.datepicker.openDialog();
	}

	clearDatePicker() {
		this.setState({
			enabled: false,
			timestamp: this.props.currentDateTime
		});
		this.props.updateDateTime(null);
	}

// resetDate(){
// 	this.props.updateDateTime("undefined");
// }

	render() {
		const hintStyle = {
			color: this.props.muiTheme.palette.alternateTextColor
		}
		const dateStyle = {
			width: 'auto',
			maxWidth: '100px'
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
					ref="datepicker"
					hintText="Date"
					hintStyle={hintStyle}
					value = {this.state.timestamp}
					textFieldStyle={(this.state.enabled) ? dateStyle : {display: 'none'}}
					style={dateStyle}
					onChange={this.handleChangeDate.bind(this)}
				/>
				{
					(this.state.enabled)
						?	<RaisedButton
								primary={true}
								buttonStyle={{backgroundColor: '#dd4b39'}}
								style={{backgroundColor: 'none', padding:'10px', boxShadow: 'none'}}
								onTouchTap={this.clearDatePicker.bind(this)}
								label="Clear Date"
							/>
						: <RaisedButton
								primary={true}
								buttonStyle={{backgroundColor: this.props.muiTheme.palette.accent1Color}}
								style={{backgroundColor: 'none', padding:'10px', boxShadow: 'none'}}
								onTouchTap={this.openDatePicker.bind(this)}
								label="Search Date"
							/>
				}
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
