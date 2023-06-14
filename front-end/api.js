import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.42:3000",
});

export const getCampervans = async () => {
    try{
      const vans = await instance.get("/vans")
      return vans; 
    } catch(err) {
      console.log(err);
    } 
    
    
  
};
