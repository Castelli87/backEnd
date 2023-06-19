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
