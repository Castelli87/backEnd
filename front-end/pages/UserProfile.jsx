import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { getUser, deleteVan } from "../api";
import { UserContext } from "../App";

export const UserProfile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [vans, setVans] = useState([]);
  const [bookings, setBookings] = useState([]);


  const handleDeleteVan = (id) => {
    deleteVan(id).then(()=>{
      setVans(vans.filter((van) => van._id !== id))
    }).catch((err)=>{
      console.log(err)
    })
  };

  useEffect(() => {
    if(currentUser !== ""){

      getUser(currentUser.user._id).then(({ data }) => {
        console.log(data, "user from db")
        console.log(currentUser, "currentUser")
        setUser(data.userById);
        setVans(data.vans);
        setBookings(data.bookings);
      });
    }
  }, [currentUser]);

  if (Object.keys(user).length === 0) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        /* style={{ width: 150, height: 150 }} */
        source={{
          uri: user.img,
        }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user.firstName}</Text>
      <Text style={styles.info} >{user.lastName}</Text>
      <Text style={styles.info}>{user.phoneNumber}</Text>
      <Text style={styles.info}>{user.email}</Text>
      <Text style={styles.info}>{user.location.region}</Text>
      <Text style={styles.sectionTitle}>My Vans:</Text>
      <ScrollView>
        {!vans.length > 0 ? (
          <Text style={styles.noVansText}>
            -Do you own a van that you're interested in renting out? Visit our
            "Advertise a Van" page and begin the process today!
          </Text>
        ) : (
          vans.map((van, index) => {
            /*             console.log(van._id,van.vanName,'<<<map') */
            return (
              <ScrollView key={index} style={styles.vanContainer}>
                <Image
                 /*  style={{ width: 200, height: 100 }} */
                  source={{
                    uri: van.images[1],
                  }}
                  style={styles.vanImage}
                />
                <Text style={styles.vanInfo}>Name: {van.vanName}</Text>
                <Text style={styles.vanInfo}>
                  Model: {van.make} {van.model}
                </Text>
                <Text style={styles.vanInfo}>Price per night: £{van.pricePerNight}</Text>
                <Text style={styles.vanInfo}>Sleeps: {van.sleeps}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteVan(van._id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </ScrollView>
            );
          })
        )}
      </ScrollView>
      <ScrollView>
        {!bookings.length > 0 ? (
          <Text style={styles.noBookingsText}>No upcoming trips</Text>
        ) : (
          bookings.map((booking, index) => {
            return (
              <ScrollView key={index} style={styles.bookingContainer}>
                <Text style={styles.bookingTitle}>UpComing:{index + 1} trip</Text>
                <Text  style={styles.bookingInfo}>Start Date:{booking.startDate.slice(0, 10)}</Text>
                <Text  style={styles.bookingInfo}>End Date:{booking.endDate.slice(0, 10)}</Text>
                <Text  style={styles.bookingInfo}> £:{booking.totalCost}</Text>
              </ScrollView>
            );
          })
        )}
      </ScrollView>
    </ScrollView>
  );
};

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  box: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 3,
    margin: 2,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
}); */


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  noVansText: {
    fontStyle: "italic",
    marginBottom: 10,
  },
  vanContainer: {
    marginBottom: 10,
  },
  vanImage: {
    width: 200,
    height: 100,
    marginBottom:10,
  },
  vanInfo: {
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  noBookingsText: {
    fontStyle: "italic",
    marginBottom: 10,
  },
  bookingContainer: {
    marginBottom:25,
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bookingInfo: {
    marginBottom: 5,
  },
});
