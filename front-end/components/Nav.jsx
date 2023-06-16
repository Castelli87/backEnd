import { ScreenContainer } from "react-native-screens";
import * as React from "react";

import { Button, View } from "react-native";
import Home from "../pages/Home";
import { useNavigation } from "@react-navigation/native";

function Nav() {
  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
      <Button title="Home" onPress={() => navigate("Home")} />
      <Button title="User Profile" onPress={() => navigate("UserProfile")} />
      <Button title="View Vans" onPress={() => navigate("Vans")} />
      <Button title="Register" onPress={() => navigate("Register")} />
      <Button title="Login" onPress={() => navigate("Login")} />
    </View>
  );
}

export default Nav;
