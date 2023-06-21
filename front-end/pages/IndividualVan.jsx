import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  FlatList,
  Button,
} from "react-native";
import { VanDescriptionCard } from "../components/VanDescriptionCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { getCamperVan,getReviewsByVanId } from "../api";
import { BookingForm } from "../components/BookingForm";

export const IndividualVan = ({ route, navigation }) => {
  const [van, setVan] = useState({});
  const [reviews,setReviews]= useState([])
  const { id } = route.params;
  const { navigate } = useNavigation();

  useEffect(() => {
    getCamperVan(id).then(({ data }) => {
      setVan(data);
    });
  }, []);

  useEffect(()=>{
    getReviewsByVanId(id).then(({data})=>{
      setReviews(data.reviews)
    })
  },[id])

  if (Object.keys(van).length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={van._id}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>{van.vanName}</Text>
            <Text>£{van.pricePerNight} per night</Text>
            {van.images.map((image, index) => {
              return (
                <Image
                  key={index}
                  style={{ width: 150, height: 150 }}
                  source={{
                    uri: image,
                  }}
                />
              );
            })}

            <Text>
              Van Type: {van.make} {van.model}
            </Text>
            <Text>Year: {van.year}</Text>
            <Text>region: {van.location.region}</Text>
            <Text>postcode: {van.location.postcode}</Text>
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
            <BookingForm
              pricePerNight={van.pricePerNight}
              vanName={van.vanName}
              image={van.images[0]}
              id={van._id}
            ></BookingForm>
      <View>
        {!reviews.length > 0 ? (<Text>No Reviews</Text>):(reviews.map((review,index)=>{
          return(
            <View key={index}>
              <Text>Username:{review.userId.username}</Text>
              <Text>Rating:{review.rating}</Text>
              <Text>{review.comment}</Text>

            </View>
          )
        }))}
      </View>
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
