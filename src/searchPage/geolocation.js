import React from 'react';

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
		console.log(event.target.checked);
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

	updateRange(event) {
		this.setState({range: event.target.value});
		this.props.updateRange(event.target.value);
	}

	render() {
		return (
			<div>
				<label>
					Location
					<input type="checkbox" onClick={this.updateLocation.bind(this)} checked={this.state.enabled} />
				</label>
				<label>
					Range
					<input type="range"
						value={this.state.location.range}
						onChange={this.updateRange.bind(this)}
					/>
				</label>
			</div>
		);
	}

}
export default Geolocation;
