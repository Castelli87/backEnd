import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import axios from "axios";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./pages/Home";
import { UserProfile } from "./pages/UserProfile";
import { Vans } from "./pages/Vans";
import Nav from "./components/Nav";
import * as React from "react";
import { Register } from "./pages/Register";
import { Login } from "./components/Login";
import { AdvertiseVan } from "./pages/AdvertiseVan";
import { IndividualVan } from "./pages/IndividualVan";
import { BookingConfirmation } from "./pages/BookingConfirmation";
import { useState } from "react";

const Drawer = createDrawerNavigator();

export const UserContext = React.createContext(null);

export default function App() {
  const [currentUser, setCurrentUser] = useState("");

  // const fecthApi = () => {
  //   axios
  //     .get("http://192.168.0.11:3000/users")
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   fecthApi();
  // }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" headerBackTitle="back">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="UserProfile" component={UserProfile} />
          <Drawer.Screen name="Vans" component={Vans} />
          <Drawer.Screen name="SignUp" component={Register} />
          <Drawer.Screen name="AdvertiseVan" component={AdvertiseVan} />
          {currentUser === "" ? (
            <Drawer.Screen
              name="Login"
              component={Login}
              options={{ presentation: "modal" }}
            />
          ) : (
            <Drawer.Screen
              name="Logout"
              component={Login}
              options={{ presentation: "modal" }}
            />
          )}
          <Drawer.Screen
            name="BookingConfirmation"
            component={BookingConfirmation}
            options={{ drawerLabel: () => null }}
          />
          <Drawer.Screen
            name="IndividualVan"
            component={IndividualVan}
            options={{ drawerLabel: () => null }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
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
