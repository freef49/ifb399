import React from 'react';

export class Title extends React.Component {
  render() {
    const style = {
      fontSize: 15,
      textAlign: "left",
      marginTop: 0
    }
    return <h1 style={style}>{this.props.name}</h1>;
  }
}

export default Title;
