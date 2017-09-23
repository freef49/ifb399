import React from 'react';

export class Artist extends React.Component {


  render() {
    let artist = this.props.artist ? Object.create(this.props.artist) : '';
    
    const style = {
      fontSize: 12,
      textAlign: "left",
      marginTop: 0
    }
    return <h1 style={style}>{artist.name}</h1>;
  }
}

export default Artist;
