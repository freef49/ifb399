import React from 'react';

export class Date extends React.Component {

  render() {

     let date = this.props.date ? Object.create(this.props.date) : '';

    const style = {
      fontSize: 12,
      textAlign: "left",
      marginTop: 0,
      padding:"0 10px 10px"
    }


   return <p style={style}><strong>{date.day}</strong> - {date.time}</p>;
  }
}

export default Date;
