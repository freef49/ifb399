import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import muiThemeable from 'material-ui/styles/muiThemeable';

export class EventButton extends React.Component {

  render() {

    let detailedLink = '/details/'+this.props.link;

  return(


        <RaisedButton
          label="Learn More..."
          primary={true}
          containerElement={<Link to={detailedLink}/>}
					buttonStyle={{backgroundColor: this.props.muiTheme.palette.accent1Color}}
        />

  );

}}


export default muiThemeable()(EventButton);
