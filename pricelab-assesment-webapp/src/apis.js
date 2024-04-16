import axios from "axios"

export const apiRequest = (data) => {
    const { address, pageSize } = data;
    return axios.get(`http://localhost:8081/api/post?address=${address}&pageSize=${pageSize}`);
  };