import { Text, View } from "react-native";
import Nav from "../components/Nav"

function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Nav></Nav>
      <Text>Home Screen</Text>
    </View>
  );
}

export default Home;
