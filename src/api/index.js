import axios from "axios";

const BASE = "https://dry-atoll-40838.herokuapp.com";

export async function getSomething() {
  try {
    const { data } = await axios.get(`${BASE}/api`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinks() {
  try {
    const { data } = await axios.get(`${BASE}/api/links`);
    // console.log("Matthew look here", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addLink({ link, clickCount, comment, date, tags }) {
  try {
    console.log(link, clickCount, comment, date, tags);
    const { data } = await axios.post(`${BASE}/api`, {
      link,
      clickCount,
      comment,
      date,
      tags,
    });
    console.log(data);
  } catch (error) {
    throw error;
  }
}

export async function deleteLink(linkId) {
  try {
    const { data } = await axios.delete(`${BASE}/api/${linkId}`);
  } catch (error) {
    throw error;
  }
}

export async function searchLinks(query) {
  try {
    const { data } = await axios.get(`${BASE}/api/links/${query}`);
    // console.log(data,'axios data flag')
    return data;
  } catch (error) {
    throw error;
  }
}
