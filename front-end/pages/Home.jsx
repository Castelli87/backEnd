import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { UserContext } from "../App";
import { useContext } from "react";

function Home() {
  const { navigate } = useNavigation();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {currentUser === "" ? (
        <Text>Welcome</Text>
      ) : (
        <Text>Welcome {currentUser.user.firstName}</Text>
      )}
      <Button
        title="Advertise a Van"
        onPress={() => navigate("AdvertiseVan")}
      />
    </View>
  );
}

export default Home;
