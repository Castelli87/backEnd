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
import { getCamperVan, getReviewsByVanId, PostReviewsByVanId } from "../api";
import { BookingForm } from "../components/BookingForm";
import ReviewForm from "../components/ReviewForm";

export const IndividualVan = ({ route, navigation }) => {
  const [van, setVan] = useState({});
  const [reviews, setReviews] = useState([]);
  const { id } = route.params;
  const { navigate } = useNavigation();

  useEffect(() => {
    getCamperVan(id).then(({ data }) => {
      setVan(data);
    });
  }, [id]);

  useEffect(() => {
    getReviewsByVanId(id).then(({ data }) => {
      setReviews(data.reviews);
    });
  }, [id]);

  if (Object.keys(van).length === 0) {
    return null;
  }
  const handleReviewSubmit = (vanId, userId, rating, comment) => {
    // Perform submission logic here
    const newReview = {
      vanId: vanId,
      userId: userId,
      rating: rating,
      comment: comment,
    };
    setReviews([newReview, ...reviews]);
    PostReviewsByVanId(newReview);
  };
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={van._id}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>{van.vanName}</Text>
            <ScrollView horizontal>
              <View style={{ flexDirection: "row" }}>
                {van.images.map((image, index) => {
                  return (
                    <Image
                      key={index}
                      style={{ width: 150, height: 150,marginLeft:25,marginBottom:25}}
                      source={{
                        uri: image,
                      }}
                    />
                  );
                })}
              </View>
            </ScrollView>

            <ScrollView style={styles.box}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  paddingLeft: 120,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                Van Info
              </Text>
              <Text>
                Van Type: {van.make} {van.model}
              </Text>
              <Text>£{van.pricePerNight} per night</Text>
              <Text>Year: {van.year}</Text>
              <Text>Region: {van.location.region}</Text>
              <Text>{van.description}</Text>

              {/*             <VanDescriptionCard
              description={van.description}
            ></VanDescriptionCard> */}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginBottom: 5,
                  marginTop: 10,
                }}
              >
                Amentities:
              </Text>
              {van.amenities ? (
                <FlatList
                  data={van.amenities}
                  renderItem={({ item }) => (
                    <View>
                      <Text>-{item}</Text>
                    </View>
                  )}
                />
              ) : null}
            </ScrollView>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                paddingLeft: 100,
                marginBottom: 30,
                marginTop: 30,
              }}
            >
              Check availability
            </Text>
            <BookingForm
              pricePerNight={van.pricePerNight}
              vanName={van.vanName}
              image={van.images[0]}
              id={van._id}
            ></BookingForm>
            <ReviewForm
              vanId={van._id}
              onSubmit={handleReviewSubmit}
            ></ReviewForm>
            <ScrollView>
              <Text style={styles.title}>Reviews</Text>
              {!reviews.length > 0 ? (
                <Text>No Reviews</Text>
              ) : (
                reviews.map((review, index) => {
                  return (
                    <View key={index} style={styles.box}>
                      <Text>{review.userId.username}</Text>
                      <Text>Rating:{review.rating}</Text>
                      <Text>{review.comment}</Text>
                    </View>
                  );
                })
              )}
            </ScrollView>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    color: "black",
  },
  container: {
    flex: 1,
    margin: 3,
    padding: 5,
  },
  box: {
    margin: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
});
