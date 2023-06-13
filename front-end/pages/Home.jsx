import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

function Home() {
  const { navigate } = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Advertise a Van"
        onPress={() => navigate("AdvertiseVan")}
      />
    </View>
  );
}

export default Home;
