const endpoint = 'http://localhost:8080/';
import axios from 'axios';

export const getToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    return token;
  } catch (e) {
    console.error(e);
  }
};

export async function getHeaders() {
  try {
    const token = await getToken();
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  } catch (e) {
    return {};
  }
}

export const get = async (url) => {
  try {
    const headers = await getHeaders();
    const response = await axios.get(`${endpoint}${url}`, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const post = async (url, data) => {
  try {
    const headers = await getHeaders();
    const response = await axios.post(`${endpoint}${url}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postWithoutAuth = async (url, data) => {
  try {
    `${endpoint}${url}`,
      data,
      { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.post(`${endpoint}${url}`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.users[0]._id));
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patch = async (url, data) => {
  try {
    const headers = await getHeaders();
    const response = await axios.patch(`${endpoint}${url}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const remove = async (url) => {
  try {
    const headers = await getHeaders();
    const response = await axios.delete(`${endpoint}${url}`, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
