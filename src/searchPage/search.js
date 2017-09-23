import React from 'react';
class Search extends React.Component{
  constructor(props) {
      super(props);
      this.state = {value: ''};
    }

    render() {
      return (
        <form onSubmit={this.state.handleClick}>
          <label>
            Genre:
            <input type="text" value={this.props.value} onChange={this.props.onChangeValue} />
          </label>
        </form>
      );
    }

}

export default Search;
