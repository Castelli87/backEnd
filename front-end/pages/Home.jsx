import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../App";
import { useContext } from "react";

function Home() {
  const { navigate } = useNavigation();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <ImageBackground
      source={require("../assets/homePage.jpg")}
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {currentUser === "" ? (
          <Text style={styles.text}>Welcome</Text>
        ) : (
          <Text style={styles.text}>Welcome {currentUser.user.firstName}</Text>
        )}

        <TouchableOpacity
          onPress={() => navigate("AdvertiseVan")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Advertise a Van</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Vans")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>  View all Vans  </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2196F3",
    marginVertical: 5,
  },
  buttonText:{
    color: "white",
    fontWeight:'bold'
  }
});
export default Home;
