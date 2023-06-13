import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import axios from "axios";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import { UserProfile } from "./pages/UserProfile";
import { Vans } from "./pages/Vans";
import Nav from "./components/Nav";
import * as React from "react";
import { Register } from "./pages/Register";
import { Login } from "./components/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  const fecthApi = () => {
    axios
      .get("http://192.168.0.11:3000/users")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fecthApi();
  }, []);

  return (
    <NavigationContainer>
      <Nav></Nav>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Vans" component={Vans} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
