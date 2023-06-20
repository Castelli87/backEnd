import { Button, FlatList, Image, ScrollView, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { getCampervans } from "../api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {Picker} from '@react-native-picker/picker';

import { Select } from "../components/Select";

export const Vans = () => {
  const [campervans, setCampervans] = useState([]);
  const { navigate } = useNavigation();
  const [filters, setFilters] = useState({});
    const models = campervans.map(van => van.model);
    console.log(models, "all models")
  const modelOptions = ["Sprinter", "Transit", "California"];

  useEffect(() => {
    getCampervans(filters).then(({ data }) => {
      setCampervans(data.allVans);
    });
  }, [filters]);


  

  console.log(filters, "filters");
  console.log(modelOptions, "models")

  return (
    <ScrollView>
      {/* <Select selKey="model" options={modelOptions} currValue={filters.model} setFilters={setFilters} /> */}
      <Picker
  selectedValue={filters.model}
  onValueChange={(itemValue, itemIndex) => {
    setFilters((currFilters) => {
        return {...currFilters, "model": itemValue}
  });
  }
  }>
  {/* <Picker.item label="All Models" value={() => setFilters({})} /> */}
  <Picker.Item label="Select Model" value={undefined} />
  {modelOptions.map((val) => <Picker.Item label={val} value={val} />
  )}
</Picker>
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
