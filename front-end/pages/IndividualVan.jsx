import { Text, ScrollView, View, StyleSheet, Image, FlatList } from "react-native"
import { VanDescriptionCard } from "../components/VanDescriptionCard";
import { SafeAreaView } from "react-native-safe-area-context";

export const IndividualVan = () => {
    const van = {
    vanName: "The Voyager",
    owner: "648733606b77da2cfea3e770",
    description:
      "The Volkswagen California is a versatile and comfortable campervan that offers a perfect blend of functionality and style. It is an ideal choice for your next adventure. ",
    make: "Volkswagen",
    model: "California",
    year: 2022,
    location: {
      region: "barnsley",
      postcode: "s704qr",
    },
    pricePerNight: 50,
    amenities: ["kitchen", "sun roof", "dining area"],
    availabilityDates: {
      startDate: "2023-07-01",
      endDate: "2024-07-01",
    },
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wKy1lKY3Wx2cPvKVs1lUWVnltoy4V2YOsw&usqp=CAU",
      "https://media.gq-magazine.co.uk/photos/5e74910306bab00008958011/16:9/pass/20200320-VW-Electric-03.jpg",
      "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg",
    ],
    sleeps: 2,
  };
    console.log(van);
    return ( 
        <View style={styles.container }>
            <FlatList ListHeaderComponent={
            <>
            <Text style={styles.title}>{van.vanName}</Text>
            <Text>£{van.pricePerNight} per night</Text>
            <Image style={{width: 150, height: 150}} source={{
                uri: van.images[0]
            }} />
            <Text>Van Type: {van.make} {van.model}</Text>
            <Text>Year: {van.year}</Text>
            <Text>Area: {van.location.region}</Text>
            <Text>Postcode: {van.location.postcode}</Text>
            <VanDescriptionCard description={van.description}></VanDescriptionCard>
            {van.amenities ? <FlatList data={van.amenities} renderItem={({item}) => <View><Text>{item}</Text></View>} /> : null}
            </>
            } />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        color: "red"
    },
    container: {
        flex: 1
    }

})