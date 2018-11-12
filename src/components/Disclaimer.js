import React from "react";

const Disclaimer = (props) => (
  <div className="disclaimer">
    <p><strong>Disclaimer:</strong> To limit load times and the number of requests made to the Hacker News API, post threads will only contain original head comments and their first child replies.<br />
    <a href={`https://news.ycombinator.com/item?id=${props.id}`} target={"_blank"}>To view full thread click here.</a></p>
  </div>
);

export default Disclaimer;