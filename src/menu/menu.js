import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import muiThemeable from 'material-ui/styles/muiThemeable';

import {logout} from "../helpers/firebase";
import {firebaseAuth} from "../constraints/constants";

import LoginDialog from '../login/loginDialog';
import Logo from '../assets/images/sob_logo.svg';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

const appTokenKey = "appToken"; // also duplicated in Login.js
const firebaseAuthKey = "firebaseAuthInProgress";

class Menu extends React.Component{
	constructor(props) {
			super(props);
			this.state = {
				open:false,
				showLogin:false,
				loggedIn:false
			}
		}

		componentWillMount() {
			// Account Detection
			firebaseAuth().onAuthStateChanged(user => {
					if (user) {
						if(!user.emailVerified) {
							user.sendEmailVerification();
						}
						this.setState({loggedIn: true});
							console.log("User signed in: ", JSON.stringify(user));
							localStorage.removeItem(firebaseAuthKey);
							// here authenticates with you web server to get the
							// application specific token so that you do not have to
							// authenticate with firebase every time a user logs in
							localStorage.setItem(appTokenKey, user.uid);

							// store the token
							// this.props.history.push("/app/home")
					}
			});
		}

		// Show Login Overlay
		showLoginOverlay = () => this.setState({
			showLogin:true,
			open:false
		});
		// Hide Login Overlay
		hideLoginOverlay = () => this.setState({
			showLogin:false,
			open:false
		});

		// Handle Logout
		handleLogout = () => {
			logout().then(function () {
					localStorage.removeItem(appTokenKey);
					// this.props.history.push("/login");
					console.log("user signed out from firebase");
			});
			this.setState({
				loggedIn: false,
				open: false
			});
		}

		// Toggle Menu Drawer
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
							<Drawer
								docked={false}
								open={this.state.open}
								onRequestChange={(open) => this.setState({open})}
							>
								<MenuItem onClick={this.handleToggle} containerElement={<Link to="/" />}
								primaryText="Home"></MenuItem>
								{this.state.loggedIn == false ? (
									<MenuItem onClick={this.showLoginOverlay} primaryText="Login"></MenuItem>
								):(
									<MenuItem onClick={this.handleLogout}
									primaryText="Logout"></MenuItem>
								)}
							</Drawer>
							<div>
								<LoginDialog hideLogin={this.hideLoginOverlay} open={this.state.showLogin}/>
							</div>
				</div>

			);
		}

}

export default muiThemeable()(Menu);
