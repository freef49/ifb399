import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FaceIcon from 'material-ui/svg-icons/action/face';
import muiThemeable from 'material-ui/styles/muiThemeable';

import {logout} from "../helpers/firebase";
import {firebaseAuth, targetAddress} from "../constraints/constants";

import LoginDialog from '../login/loginDialog';
import Logo from '../assets/images/sob_logo.svg';
import DefaultImage from '../assets/images/default.png';

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
				loggedIn:false,
				photo: "./default.png",
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
						(user.photoURL != null)
							? this.setState({photo: user.photoURL})
							: this.setState({photo: null})
						this.setState({email: user.email});
						this.setState({displayname: user.displayName});
						console.log("User signed in: ", JSON.stringify(user));
						localStorage.removeItem(firebaseAuthKey);
						// here authenticates with you web server to get the
						// application specific token so that you do not have to
						// authenticate with firebase every time a user logs in
						localStorage.setItem(appTokenKey, user.uid);

						// store the token
						// this.props.history.push("/app/home")
						firebaseAuth().currentUser.getIdToken().then(function(token) {
							console.log(user.email);
							// Send request to add favourite for user
							// Add Favourite
							let targetUrl = targetAddress+'/api/users/add';
							fetch(targetUrl, {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									'email': user.email,
									'token': token
								})
							})
							.then(response => response.json())
							.then(body => console.log(body));
						}).catch(function(error) {
							console.log(error);
						});
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
				height: "auto",
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
						{this.state.loggedIn === true ? (
							<MenuItem
								disabled
								style={{marginTop: 10, minHeight: 100, textAlign: 'center'}}
								primaryText={(this.state.displayname != null) ? this.state.displayname : this.state.email}
							>
								<Avatar
									color={this.props.muiTheme.palette.alternateTextColor} backgroundColor={this.props.muiTheme.palette.accent1Color}
									src={this.state.photo}
									icon={<FaceIcon />}
								/>
							</MenuItem>
						) : null}
						<Divider />
						<MenuItem
							onClick={this.handleToggle}
							containerElement={<Link to="/" />}
							primaryText="Home"
						/>
						{this.state.loggedIn === false ? (
							<MenuItem
								onClick={this.showLoginOverlay}
								primaryText="Login"
							/>
						):(
							<div>
								<MenuItem
									onClick={this.handleLogout}
									primaryText="Logout"
								/>
								<MenuItem
									onClick={this.handleToggle}
									containerElement={<Link to={"/favourites/"+localStorage.getItem(appTokenKey)}/>}
									primaryText="Favourites"
								/>
							</div>
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
