import axios from "axios";
import { IP } from "./.env.js";

const instance = axios.create({
  baseURL: `http://${IP}:3000`,
});

export const getCampervans = async (filters) => {
  try {
    let endpoint = `/vans`;
    let query = "?";

    if (Object.keys(filters).length !== 0) {
      // console.log(Object.keys(filters.length))
      const newFilters = Object.entries(filters);
      newFilters.forEach((filter, index) => {
        console.log(Object.keys(filters).length);
        if (index === Object.keys(filters).length - 1) {
          query += `${filter[0]}=${filter[1]}`;
        } else {
          query += `${filter[0]}=${filter[1]}&`;
        }
      });
      endpoint += query;
      console.warn(endpoint);
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
    // data.images = data.images.split(",");
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

export const getReviewsByVanId = async (vanId) => {
  try {
    const reviews = await instance.get(`/vans/${vanId}/reviews`);
    return reviews;
  } catch (err) {
    console.log(err);
  }
};

export const postNewUser = async (data) => {
  try {
    data.location = { region: data.region, postcode: data.postcode };
    const newUser = await instance.post(`/users`, data);
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

export const deleteVan = async (vanId) => {
  try {
    const deletedVan = await instance.get(`/vans/${vanId}`);
    return deletedVan;
  } catch (err) {
    console.log(err);
  }
};

export const PostReviewsByVanId = async (data) => {
  console.log(data)
  try {
    const reviews = await instance.post(`/vans/${data.vanId}/reviews`,data);
    return reviews;
  } catch (err) {
    console.log(err);
  }
};