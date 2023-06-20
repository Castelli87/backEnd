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

export const getUser = async (userId) => {
  try {
    const userById = await instance.get(`/users/${userId}`);
    return userById;
  } catch (err) {
    console.log(err);
  }
};

export const postVanByOwner = async (data) => {
  try {
    data.location = { region: data.region, postcode: data.postcode };
    data.availabilityDates = {
      startDate: data.startDate,
      endDate: data.endDate,
    };
    data.amenities = data.amenities.split(",");
    data.images = data.images.split(",");
    delete data.region;
    delete data.postcode;
    delete data.endDate;
    delete data.startDate;
    const newVan = await instance.post(`/${data.owner}/vans`, data);
    return newVan;
  } catch (err) {
    console.log(err);
  }
};

export const postLoginUser = async (data) => {
  try {
    const userLoginAttempt = await instance.post(`/login`, data);
    return userLoginAttempt;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
