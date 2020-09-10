import axios from 'axios';

const BASE = 'http://localhost:3000'

export async function getSomething() {
  try {
    const { data } = await axios.get(`${ BASE }/api`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinks() {
  try {
    const { data } = await axios.get(`${BASE}/api/links`);
    console.log('Matthew look here', data)
    return data;
  } catch (error) {
    throw error;
  }
}