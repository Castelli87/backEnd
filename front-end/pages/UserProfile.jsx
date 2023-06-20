import { Text, View, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getUser } from "../api";

export const UserProfile = () => {
  const [userId, setUserId] = useState("648733606b77da2cfea3e770");
  const [user, setUser] = useState({});
  const [vans, setVans] = useState([]);
  const [bookings, setBookings] = useState();

  useEffect(() => {
    getUser(userId).then(({ data }) => {
      setUser(data.userById);
      setVans(data.vans);
      setBookings(data.bookings);
    });
  }, []);

  if (Object.keys(user).length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 150, height: 150 }}
        source={{
          uri: user.img,
        }}
      />
      <Text>{user.firstName}</Text>
      <Text>{user.lastName}</Text>
      <Text>{user.phoneNumber}</Text>
      <Text>{user.email}</Text>
      <Text>{user.location.region}</Text>
      <Text>My Vans:</Text>
      <View>
        {!vans.length > 0 ? (
          <Text>-Do you own a van that you're interested in renting out? Visit our "Advertise a Van" page and begin the process today!</Text>
        ) : (
          vans.map((van, index) => {
            return (
              <View key={index}>
                <Image
                  style={{ width: 200, height: 100 }}
                  source={{
                    uri: van.images[0],
                  }}
                />
                <Text>Name: {van.vanName}</Text>
                <Text>
                  Model: {van.make} {van.model}
                </Text>
                <Text>Price per night: £{van.pricePerNight}</Text>
                <Text>Sleeps: {van.sleeps}</Text>
              </View>
            );
          })
        )}
      </View>
    </View>
  );}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
  });