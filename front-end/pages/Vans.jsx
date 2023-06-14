import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { getCampervans } from "../api";
import axios from "axios";

export const Vans = () => {
  const [campervans, setCampervans] = useState([]);
  useEffect(() => {

   getCampervans().then(({data}) => {
     setCampervans(data.allVans);
   })
  }, []);

  return (
    <ScrollView>
      {campervans.map((campervan) => {
        return (
          <>
            <Text>{campervan.vanName}</Text>
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: campervan.images[0],
              }}
            ></Image>
            <Text>{campervan.pricePerNight}</Text>
          </>
        );
      })}
    </ScrollView>
  );
};
