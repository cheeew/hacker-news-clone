import moment from "moment";

function getPostAge() {
  const timestamp = new Date();
  const date = timestamp.toLocaleDateString().replace(/\D+/g, '-');
  const time = timestamp.toLocaleTimeString();

return moment(`${date} ${time}`, "MM-DD-YYYY hh:mm:ss a").fromNow();
}

export default getPostAge;

