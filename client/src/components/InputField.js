import React from 'react';

class InputField extends React.Component {
  render() {
    return (
      <div class="form-group">
        <label for={this.props.name}>{this.props.text}</label>
        <input
          type={this.props.type}
          class="form-control"
          name={this.props.name}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
        />
      </div>
    );
  }
}

export default InputField
