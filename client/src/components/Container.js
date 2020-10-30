import React from 'react';

class Container extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Container
