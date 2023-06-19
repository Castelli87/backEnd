import { Image, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { getBookingById } from "../api";

export const BookingConfirmation = ({ route }) => {
  const { bookingId, vanName, image } = route.params;
  const [bookingById, setBookingById] = useState({});

  useEffect(() => {
    getBookingById(bookingId).then(({ data }) => {
      console.log(data);
      data.booking.startDate = data.booking.startDate.slice(0, 10);
      data.booking.endDate = data.booking.endDate.slice(0, 10);
      setBookingById(data.booking);
    });
  }, []);

  return (
    <View>
      <Text>Booking confirmation: {bookingId}</Text>
      <Text>{vanName}</Text>
      <Image
        style={{ width: 150, height: 150 }}
        source={{
          uri: image,
        }}
      />
      <Text>Start Date: {bookingById.startDate}</Text>
      <Text>End Date: {bookingById.endDate}</Text>
      <Text>Cost: £{bookingById.totalCost}</Text>
      <Text>Payment status: {bookingById.paymentDetails}</Text>
    </View>
  );
};
