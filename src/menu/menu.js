import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Logo from '../assets/images/sob_logo.svg';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'


class Menu extends React.Component{
	constructor(props) {
			super(props);
			this.state = {
				open:false
			}
		}

		handleToggle = () => this.setState({
			open: !this.state.open
		});

		render() {
			const style = {
				position: "fixed",
				height: this.props.height,
				backgroundColor: this.props.muiTheme.palette.accent1Color
			}
			const titleStyle = {
				fontFamily: "refrigerator-deluxe, sans-serif",
				fontStyle: "normal",
				fontWeight: 400,
				textAlign: "center",
				backgroundColor: this.props.muiTheme.palette.accent1Color,
				backgroundImage: "url("+Logo+")",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center"
			}

			return (
				<div>
							<AppBar title="SOUNDS OF BRISBANE" style={style} titleStyle={titleStyle} iconClassNameRight="muidocs-icon-navigation-expand-more" onTouchTap={this.handleToggle}/>
							<Drawer open={this.state.open}>
								<MenuItem containerElement={<Link to="/" />}
								primaryText="Home"></MenuItem>
								<MenuItem containerElement={<Link to="/login" />}
								primaryText="Login"></MenuItem>
								<MenuItem containerElement={<Link to="/logout" />}
								primaryText="Logout"></MenuItem>
							</Drawer>
				</div>
			);
		}

}

export default muiThemeable()(Menu);
