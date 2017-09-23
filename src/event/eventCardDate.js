import React from 'react';

export class Date extends React.Component {

  render() {
    let date = this.props.date ? Object.create(this.props.date) : '';
    console.log();

    const style = {
      fontSize: 12,
      textAlign: "left",
      marginTop: 0,
    }

    //const day = this.props.date.day ? this.props.date.day : 'Loading...';
    return <p style={style}><strong>{date.day}</strong> - {date.time}</p>;
  }
}

export default Date;
