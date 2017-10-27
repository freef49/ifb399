import React from 'react';
import {FontIcon, RaisedButton, FlatButton, TextField, Dialog} from "material-ui";
import muiThemeable from 'material-ui/styles/muiThemeable';

import {loginWithGoogle, loginWithEmail, sendPasswordResetEmail, signupEmail} from "../helpers/firebase";
import {firebaseAuth} from "../constraints/constants";

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";


class LoginDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			open: this.props.open,
		};
	}

	// Handle Incoming Properties
	componentWillReceiveProps(props) {
    this.setState({open: props.open});
	}

	// Handle Cancel
	handleCancel = () => {
		this.setState({open:false});
		this.props.hideLogin();
	}

	// Handle Google Login
	handleGoogleLogin = () => {
			loginWithGoogle()
					.catch(function (error) {
							alert(error); // or show toast
							localStorage.removeItem(firebaseAuthKey);
					});
			localStorage.setItem(firebaseAuthKey, "1");
	}

	// Handle Email Login
	handleEmailLogin = () => {
		loginWithEmail(this.state.email, this.state.password)
				.catch(function (error) {
						alert(error); // or show toast
						localStorage.removeItem(firebaseAuthKey);
				});
		localStorage.setItem(firebaseAuthKey, "1");
		this.setState({open:false});
		this.props.hideLogin();
	}

	// Handle Email Login
	handleEmailSignup = () => {
		signupEmail(this.state.email, this.state.password)
				.catch(function (error) {
						alert(error); // or show toast
						localStorage.removeItem(firebaseAuthKey);
				});
		localStorage.setItem(firebaseAuthKey, "1");
		this.setState({open:false});
		this.props.hideLogin();
	}

	// Handle Password Reset from Supplied Email
	handlePasswordReset = () => {
		sendPasswordResetEmail(this.state.email)
				.catch(function (error) {
						alert(error); // or show toast
						localStorage.removeItem(firebaseAuthKey);
				});
		localStorage.setItem(firebaseAuthKey, "1");
	}

	// Update Email State
	updateEmail = (event, newValue) => {
		this.setState({email: newValue});
	}

	// Update Password State
	updatePassword = (event, newValue) => {
		this.setState({password: newValue});
	}

	render() {
		const position = {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			alignItems:'center',
			justifyContent:'center'
		}
		const iconStyles = {
				color: "#ffffff"
		};

		const actions = [
      <FlatButton
				label="Cancel"
				onClick={this.handleCancel}
			/>
    ];
		return (
			<Dialog
				autoDetectWindowHeight
				title="Login"
				bodyStyle={{height:'100%'}}
				titleStyle={{height:'30px', padding:'24px', paddingTop:'10px', paddingBottom:'0px'}}
				actions={actions}
				open={this.state.open}
				modal={false}
				onRequestClose={this.handleCancel}
			>
			<div style={position}>
				<div style={{}}>
					<TextField
						id="login-email"
						ref="email"
						floatingLabelStyle={{color: this.props.muiTheme.palette.accent3}}
						textareaStyle={{color: this.props.muiTheme.palette.textColor}}
						inputStyle={{color: this.props.muiTheme.palette.textColor}}
						style={{textAlign:'center', margin:'0px', width:'100%'}}
						hintText="Email"
						floatingLabelText="Email"
						type="text"
						onChange={this.updateEmail}
					/>
					<br />
					<TextField
						id="login-password"
						ref="password"
						floatingLabelStyle={{color: this.props.muiTheme.palette.accent3}}
						textareaStyle={{color: this.props.muiTheme.palette.textColor}}
						inputStyle={{color: this.props.muiTheme.palette.textColor}}
						style={{margin: '0px', width: '100%'}}
						hintText="Password"
						floatingLabelText="Password"
						type="password"
						onChange={this.updatePassword}
					/>
					<br/>
					<FlatButton
						label="Forgot Password"
						onTouchTap={this.handlePasswordReset}
					/>
					<RaisedButton
							label="Sign in"
							labelColor={this.props.muiTheme.palette.alternateTextColor}
							backgroundColor={this.props.muiTheme.palette.primary1Color}
							onTouchTap={this.handleEmailLogin}
					/>
				</div>
				<h3 style={{margin:'5px'}}>OR</h3>
				<div>

					<hr style={{margin:'2px', padding: '0px'}}/>
					<RaisedButton
							label="Sign in with Google"
							labelColor={"#ffffff"}
							backgroundColor="#dd4b39"
							icon={<FontIcon className="fa fa-google-plus" style={iconStyles}/>}
							onTouchTap={this.handleGoogleLogin}
					/>
					<RaisedButton
							label="New User? Sign Up"
							labelColor={this.props.muiTheme.palette.alternateTextColor}
							backgroundColor={this.props.muiTheme.palette.primary1Color}
							onTouchTap={this.handleEmailSignup}
					/>
				</div>
			</div>
			</Dialog>
		);
	}

}
export default muiThemeable()(LoginDialog);
