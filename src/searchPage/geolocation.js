import React from 'react';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import muiThemeable from 'material-ui/styles/muiThemeable';

class Geolocation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			enabled: false,
			location: {
				latitude: null,
				longitude: null,
			},
			range: 10
		};
	}

	updateLocation(event) {
		// Toggle State
		//console.log(event.target.checked);
		if(event.target.checked) {
			// Get Geolocation
			navigator.geolocation.getCurrentPosition(
				(position) => {
					this.setState({
						enabled: true,
						location: {
							latitude: position.coords.latitude,
							longitude: position.coords.longitude
						}
					});
					this.props.updateLocation(true, this.state.location, this.state.range);
				},
				(error) => {
					this.setState({enabled: false});
					console.log(error);
					this.props.updateLocation(false, this.state.location, this.state.range);
				}
			);

		} else {
			this.setState({enabled: false});
			this.props.updateLocation(event.target.checked, this.state.location, this.state.range);
		}
	}

	updateRange(event, newValue) {
		newValue = Math.round(newValue * 100);
		this.setState({range: newValue});
		this.props.updateRange(newValue);
	}

	render() {
		const position = {
			display: 'flex',
			flexDirection: 'row',
			height: '100%',
			alignItems:'center',
			justifyContent:'center'
		}
		const sliderStyle = {
			marginLeft: 20,
			marginTop: 0,
			marginBottom: 0
		};
		const textStyle = {
			width: 20,
			marginLeft: 30,
			lineHeight: 4,
			fontFamily: 'Roboto, sans-serif'
		}

		return (
			<div style={position}>
				<div>
					<Toggle
						labelStyle={{color: this.props.muiTheme.palette.alternateTextColor}}
			      label="Location"
						onToggle={this.updateLocation.bind(this)}
						defaultToggled={this.state.enabled}
			    />
				</div>
				<div style={{width: '50%', display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
					<Slider
						style={{width: 100}}
						disabled={!this.state.enabled}
						sliderStyle={sliderStyle}
						defaultValue={this.state.range/100}
						onChange={this.updateRange.bind(this)}
					/>
					<span style={textStyle}>{this.state.range}km</span>
				</div>
			</div>
		);
	}

}
export default muiThemeable()(Geolocation);
