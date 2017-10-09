import React from "react";
import {FontIcon, RaisedButton, TextField} from "material-ui";
import {loginWithGoogle, loginWithEmail} from "../helpers/firebase";
import {firebaseAuth} from "../constraints/constants";

import LoginDialog from "./loginDialog";

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

class Login extends React.Component {
		constructor(props) {
				super(props);
				this.state = {
						splashScreen: false,
						email: "",
						password: ""
				};

				this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
				this.handleEmailLogin = this.handleEmailLogin.bind(this);
		}

		handleGoogleLogin() {
				loginWithGoogle()
						.catch(function (error) {
								alert(error); // or show toast
								localStorage.removeItem(firebaseAuthKey);
						});
				localStorage.setItem(firebaseAuthKey, "1");
		}

		handleEmailLogin() {
				loginWithEmail(this.state.email, this.state.password)
						.catch(function (error) {
								alert(error); // or show toast
								localStorage.removeItem(firebaseAuthKey);
						});
				localStorage.setItem(firebaseAuthKey, "1");
		}

		handleEmail = (event, newValue) => {
			this.setState({email: newValue});
		}

		handlePassword = (event, newValue) => {
			this.setState({password: newValue});
		}



		componentWillMount() {
				/*         firebaseAuth().getRedirectResult().then(function(result) {
				 if (result.user) {
				 console.log("GoogleLogin Redirect result");
				 if (result.credential) {
				 // This gives you a Google Access Token. You can use it to access the Google API.
				 let token = result.credential.accessToken;
				 // ...
				 }
				 // The signed-in user info.
				 let user = result.user;
				 console.log("user:", JSON.stringify(user));
				 }
				 }).catch(function(error) {
				 // Handle Errors here.
				 var errorCode = error.code;
				 var errorMessage = error.message;
				 // The email of the user's account used.
				 var email = error.email;
				 // The firebase.auth.AuthCredential type that was used.
				 var credential = error.credential;
				 // ...
				 alert(error);
				 })*/
				;


// I dont think that I need the below
				/**
				 * We can have appToken relevant for our backend API
				 */
				// if (localStorage.getItem(appTokenKey)) {
				//     this.props.history.push("/app/home");
				//     return;
				// }

				firebaseAuth().onAuthStateChanged(user => {
						if (user) {
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

		render() {
				console.log(firebaseAuthKey + "=" + localStorage.getItem(firebaseAuthKey));
				if (localStorage.getItem(firebaseAuthKey) === "1") return <SplashScreen />;
				return <LoginPage handleGoogleLogin={this.handleGoogleLogin} handleEmailLogin={this.handleEmailLogin}/>;
		}
}

const iconStyles = {
		color: "#ffffff"
};
const LoginPage = ({handleGoogleLogin, handleEmailLogin}) => (
		<div>
				<h1>Login</h1>
				<LoginDialog />
		</div>
);
const SplashScreen = () => (<p>Loading...</p>)

export default Login;
