import { useContext, useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { postVanByOwner } from "../api";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../App";
import * as ImagePicker from 'expo-image-picker';

export const AdvertiseVan = () => {
  const { navigate } = useNavigation();
  const [date, setDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  const [clicked, setClicked] = useState(false);
  const [images, setImages] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      vanName: "",
      description: "",
      make: "",
      model: "",
      year: "",
      region: "",
      postcode: "",
      amenities: "",
      startDate: "",
      endDate: "",
      pricePerNight: "",
      sleeps: "",
      images: "",
    },
  });
  const onSubmit = (formData) => {
    formData.owner = currentUser.user._id;
    formData.images = images;
    console.log(formData);
    postVanByOwner(formData).then(({ data }) => {
      navigate("IndividualVan", {
        id: data.newVan._id,
      });
    });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const year = selectedDate.getFullYear();
    let month = selectedDate.getMonth() + 1;
    let day = selectedDate.getDate();

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    if (!clicked) {
      setDate(currentDate);
      setValue("startDate", `${year}-${month}-${day}`);
    } else {
      setFinishDate(currentDate);
      setValue("endDate", `${year}-${month}-${day}`);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      allowsMultipleSelection: true,
      quality: 1
    })

    if (!result.cancelled) {
      const imagesArr = result.assets.map(image => image.uri);

      setImages((currImages) => [...currImages, ...imagesArr])
      
    } else {
      alert('You did not select any image.');
    }
  };

  const showMode = (currentMode) => {
    if (!clicked) {
      DateTimePickerAndroid.open({
        onChange,
        value: date,
        mode: currentMode,
        is24Hour: true,
      });
      setClicked(true);
    } else {
      DateTimePickerAndroid.open({
        onChange,
        value: finishDate,
        mode: currentMode,
        is24Hour: true,
      });
      setClicked(false);
    }
  };

  const showDatepicker = () => {
    showMode("date");
  };

  console.log(images);

  return (
    <ScrollView>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="van name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="vanName"
      />
      {errors.vanName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={true}
          />
        )}
        name="description"
      />
      {errors.description && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="make"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="make"
      />
      {errors.make && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="model"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="model"
      />
      {errors.model && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="year"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="number-pad"
          />
        )}
        name="year"
      />
      {errors.year && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="region"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="region"
      />
      {errors.region && <Text>This is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="postcode"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            maxLength={8}
          />
        )}
        name="postcode"
      />
      {errors.postcode && <Text>This is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="amenities - fridge, cooker etc"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={true}
          />
        )}
        name="amenities"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Button
              onPress={showDatepicker}
              // disable={}
              title="Please pick start Date"
            />
            <Text>selected: {date.toLocaleString()}</Text>
          </View>
        )}
        name="startDate"
      />
      {errors.startDate && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Button onPress={showDatepicker} title="Please pick end Date" />
            <Text>selected: {finishDate.toLocaleString()}</Text>
          </View>
        )}
        name="endDate"
      />
      {errors.endDate && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="price per night"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="number-pad"
          />
        )}
        name="pricePerNight"
      />
      {errors.pricePerNight && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="sleeps"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="number-pad"
          />
        )}
        name="sleeps"
      />
      {errors.sleeps && <Text>This is required.</Text>}
          <Button title="image upload" label="Upload Image" onPress={() => pickImage()} />
          <Button title="reset-images" label="Reset" onPress={() => setImages([])
          } />
          

      <ScrollView>
          {images.map((image, index) => {
            {/* console.log(image) */}
            return (<Image key={index} style={{width: 80, height: 80}} source={{ uri: image}} />)})
            
            }
            </ScrollView>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};
