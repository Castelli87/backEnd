import axios from "axios";

const instance = axios.create({
  baseUrl: "127.0.0.1:3000",
});

console.log(axios);
export const getCampervans = async () => {
  try {
    const vans = await instance.get("/vans");
    return vans;
  } catch (err) {
    console.log(err);
  }
};
