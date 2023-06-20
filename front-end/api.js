import axios from "axios";

const instance = axios.create({
  baseURL: `http://192.168.0.42:3000`,
});

export const getCampervans = async (filters) => {
  try {
    let endpoint = `/vans`;
    let query = "?"
    
    if(Object.keys(filters).length !== 0) { 
      // console.log(Object.keys(filters.length))
      const newFilters = Object.entries(filters)
    newFilters.forEach((filter, index) => {
      console.log(Object.keys(filters).length)
      if(index === Object.keys(filters).length-1){
        query += `${filter[0]}=${filter[1]}`
      } else {
        query += `${filter[0]}=${filter[1]}&`
      }
      
    })
      endpoint += query
      console.warn(endpoint)
  }
    const vans = await instance.get(endpoint);
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

export const postVanBooking = async (data) => {
  try {
    const booking = await instance.post(`/bookings`, data);
    return booking;
  } catch (err) {
    console.log(err);
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const bookingById = await instance.get(`/bookings/${bookingId}`);
    return bookingById;
  } catch (err) {
    console.log(err);
  }
};
