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
import { useState } from "react";

export const IndividualVan = ({ id }) => {
  const [van, setVan] = useState();

  useEffect(() => {
    setVan()
  }, [])
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.title}>{van.vanName}</Text>
            <Text>£{van.pricePerNight} per night</Text>
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: van.images[0],
              }}
            />
            <Text>
              Van Type: {van.make} {van.model}
            </Text>
            <Text>Year: {van.year}</Text>
            <Text>Area: {van.location.region}</Text>
            <Text>Postcode: {van.location.postcode}</Text>
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
