import moment from "moment";

export default function getPostAge(s) {
  const ms = Number(s + "000");
  const timestamp = new Date(ms);
  const date = timestamp.toLocaleDateString().replace(/\D+/g, '-');
  const time = timestamp.toLocaleTimeString();

  return moment(`${date} ${time}`, "MM-DD-YYYY hh:mm:ss a").fromNow();
}

export const urls = {
  ask: "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty",
  best: "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty",
  jobs: "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty",
  maxItem: "https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty",
  new: "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty",
  show: "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty",
  top: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
};

export function shortUrl(str) {
  if(str.includes('www')) {
    return `(${str.split('.')[1]}.com)`;
  } else {
    return `(${str.split('/')[2]})`;
  }
}

export function fetchItem(id) {
  const endpoint = "https://hacker-news.firebaseio.com/v0/item/";
  const format = ".json?print=pretty";
  return fetch(endpoint+id+format);
}

export async function fetchItems(iterable, dataContainer) {
  for (let childId of iterable) {
    const resp = await fetchItem(childId);
    const data = await resp.json();
    dataContainer.push(data);
  }
}

export async function fetchUser(user) {
  const endpoint = `https://hacker-news.firebaseio.com/v0/user/${user}.json?print=pretty`
  const resp = await fetch(endpoint);
  const userInfo = await resp.json();
  return userInfo;
}

export async function getRecentComments() {
  const resp = await fetch(urls.maxItem);
  const data = await resp.json();
  let comments = [];
  let counter = 0

  while(comments.length < 20) {
    let id = data - counter;
    const response = await fetchItem(id);
    const story = await response.json();
    if(story && story.type === "comment") {
      comments.push(story);
      counter++;
    } else {
      counter++;
    }
  }
  return comments;
}

export async function findStories() {
  const comments = await getRecentComments();
  let bin = comments;
  let i = 0;

  for (let child of comments) {
    let resp = await fetchItem(child.parent);
    let story = await resp.json();

    while(story.type !== "story") {
      const resp = await fetchItem(story.parent);
      const data = await resp.json();
      story = data;
    }
    bin[i].parentPost = {id: story.id, title: story.title, url: story.url};
    i++;
  }

  return bin;
}

export function paginatePosts(page) {
  const x = page > 0
  ? (page * 30)
  : 0;

  const y = page > 0
  ? 30 + x
  : 30;

  return [x, y]
}
