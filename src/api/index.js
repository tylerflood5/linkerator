import axios from "axios";

const BASE = "http://localhost:3000";

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
    console.log("Matthew look here", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addLink({ link, clickCount, comment, date, tags }) {
  try {
    // console.log("look here: ", link, clickCount, comment, date, tags);
    const { data } = await axios.post(`${BASE}/api`, {
      link,
      clickCount,
      comment,
      date,
      tags,
    });
    console.log(data);
    // return data;
  } catch (error) {
    throw error;
  }
}

// export async function addLink() {
//   axios
//     .post(`${BASE}/api`, {
//       link: "testing testing testing",
//       clickCount: 5,
//       comment: "test",
//       date: "1000-01-01",
//     })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
