import { useNavigation } from "@react-navigation/native";
import { Button, Text, View, ImageBackground,StyleSheet} from "react-native";
import { UserContext } from "../App";
import { useContext } from "react";

function Home() {
  const { navigate } = useNavigation();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <ImageBackground source={require("../assets/homePage.jpg")} style={styles.backgroundImage}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {currentUser === "" ? (
          <Text style={styles.text}>Welcome</Text>
        ) : (
          <Text style={styles.text}>Welcome {currentUser.user.firstName}</Text>
        )}
        <Button
          title="Advertise a Van"
          onPress={() => navigate("AdvertiseVan")}
        />
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
});
export default Home;
