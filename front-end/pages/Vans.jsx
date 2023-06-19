import { Button, FlatList, Image, ScrollView, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { getCampervans } from "../api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export const Vans = () => {
  const [campervans, setCampervans] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    getCampervans().then(({ data }) => {
      setCampervans(data.allVans);
    });
  }, []);

  return (
    <ScrollView>
      {campervans.map((campervan, index) => {
        return (
          <View key={index}>
            <Text>{campervan.vanName}</Text>
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: campervan.images[0],
              }}
            ></Image>
            <Text>{campervan.pricePerNight}</Text>
            <Button
              title={campervan._id}
              onPress={() =>
                navigate("IndividualVan", {
                  id: campervan._id,
                })
              }
            ></Button>
          </View>
        );
      })}
    </ScrollView>
  );
};
