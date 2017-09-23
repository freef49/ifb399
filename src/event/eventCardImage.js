import React from 'react';

export class Image extends React.Component {
  render() {
    const Imagestyle = {
      height: 100,
      width: 200,

      marginBottom: 4,
      backgroundImage:"url(" + this.props.image + ")",
      display: 'inline-block',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }

    return <div style={Imagestyle}></div>;
  }
}

export default Image;
