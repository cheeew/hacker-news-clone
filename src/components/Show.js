import React from "react";
import Header from "./Header";

class Show extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Header company="News Clone"/>
        <div className="canvas">
          <p>this is the show.js component.</p>
        </div>
      </div>
    );
  }
}

export default Show;
