import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'


export class EventButton extends React.Component {

  render() {

    let detailedLink = '/details/'+this.props.link;

  return(


        <RaisedButton
          label="Learn More..."
          primary={true}
          containerElement={<Link to={detailedLink}/>}
        />

  );

}}


export default EventButton;
