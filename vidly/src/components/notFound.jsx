import React, { Component } from "react";

class NotFound extends Component {
  render() {
    /*
    window.onpopstate = () => {
      this.props.history.go(-2);
    };
    */

    return (
      <main className="container">
        <div className="row">
          <h1>Not Found</h1>
        </div>
      </main>
    );
  }
}

export default NotFound;
