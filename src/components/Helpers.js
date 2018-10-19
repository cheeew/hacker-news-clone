import moment from "moment";

function getPostAge() {
  const timestamp = new Date();
  const date = timestamp.toLocaleDateString().replace(/\D+/g, '-');
  const time = timestamp.toLocaleTimeString();

return moment(`${date} ${time}`, "MM-DD-YYYY hh:mm:ss a").fromNow();
}

export function getPosts() {
  const newTopBestIds = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
  const askShowJobsIds = "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty";

  // Pulls top 100 blog posts from HN
  fetch(newTopBestIds)
  .then(resp => resp.json())
  .then(data => {
    console.log(data);
    return console.log(data.slice(0, 100).map(id => { 
      const newTopBestPosts = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
      fetch(newTopBestPosts)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }));
  });
}

export default getPostAge;
