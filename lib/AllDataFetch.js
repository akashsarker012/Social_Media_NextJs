
import axios from 'axios';

export async function fetchPosts() {
  const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
  const res = await axios.get(`${backendApi}/api/v1/get-allpost`);
  return res.data;
}



