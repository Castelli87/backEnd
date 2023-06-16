import axios from "axios";

const instance = axios.create({
  baseURL: `http://192.168.1.103:3000`,
});

export const getCampervans = async () => {
  try {
    const vans = await instance.get("/vans");
    return vans;
  } catch (err) {
    console.log(err);
  }
};

export const getCamperVan = async (id) => {
  try {
    const van = await instance.get(`/vans/${id}`);
    return van;
  } catch (err) {
    console.log(err);
  }
};
