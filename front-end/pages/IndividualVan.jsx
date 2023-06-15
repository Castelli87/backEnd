import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { VanDescriptionCard } from "../components/VanDescriptionCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { getCamperVan } from "../api";

export const IndividualVan = ({ route, navigation }) => {
  const [van, setVan] = useState({});
  const { id } = route.params;

  useEffect(() => {
    getCamperVan(id).then(({ data }) => {
      setVan(data);
    });
  }, []);

  console.log(van);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={van._id}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>{van.vanName}</Text>
            <Text>£{van.pricePerNight} per night</Text>
            {/* {van.images.map((image) => {
              return (
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{
                    uri: image,
                  }}
                />
              );
            })} */}

            {/* <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: van.images[0],
              }}
            /> */}

            <Text>
              Van Type: {van.make} {van.model}
            </Text>
            <Text>Year: {van.year}</Text>
            {/* <Text>region: {van.location.region}</Text>
            <Text>postcode: {van.location.postcode}</Text> */}
            <VanDescriptionCard
              description={van.description}
            ></VanDescriptionCard>
            {van.amenities ? (
              <FlatList
                data={van.amenities}
                renderItem={({ item }) => (
                  <View>
                    <Text>{item}</Text>
                  </View>
                )}
              />
            ) : null}
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    color: "red",
  },
  container: {
    flex: 1,
  },
});
