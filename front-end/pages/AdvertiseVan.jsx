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
  TouchableOpacity
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { postVanByOwner } from "../api";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../App";
import * as ImagePicker from "expo-image-picker";

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
      quality: 1,
    });

    if (!result.cancelled) {
      const imagesArr = result.assets.map((image) => image.uri);

      setImages((currImages) => [...currImages, ...imagesArr]);
    } else {
      alert("You did not select any image.");
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/*  <Text style={styles.title}>Advertise a Van</Text> */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Van Name</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="The Voyager"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="vanName"
          />
          {errors.vanName && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputDescription}
              /*   placeholder="......." */
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline={true}
              />
            )}
            name="description"
          />
          {errors.description && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Make</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Volkswagen"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="make"
          />
          {errors.make && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Model</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="California"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="model"
          />
          {errors.model && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Year</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="1985"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
              />
            )}
            name="year"
          />
          {errors.year && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Region</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Barnsley"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="region"
          />
          {errors.region && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>PostCode</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="s914ar"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={8}
              />
            )}
            name="postcode"
          />
          {errors.postcode && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Amenities</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="fridge, cooker..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline={true}
              />
            )}
            name="amenities"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Price per night </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="25"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
              />
            )}
            name="pricePerNight"
          />
          {errors.pricePerNight && <Text style={styles.errorText}>This is required.</Text>}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Sleeps</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            style={styles.input}
              placeholder="2"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="number-pad"
            />
          )}
          name="sleeps"
        />
        {errors.sleeps && <Text style={styles.errorText}>This is required.</Text>}
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your availability</Text>
              <Button
                style={styles.datePickerButton}
                onPress={showDatepicker}
                // disable={}
                title="Please pick start Date"
              />
              <Text style={styles.dateSelectedText}>
                selected: {date.toLocaleString()}
              </Text>
            </View>
          )}
          name="startDate"
        />
        {errors.startDate && (
          <Text style={styles.errorText}>This is required.</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.formGroup}>
              <Button onPress={showDatepicker} title="Please pick end Date" />
              <Text style={styles.dateSelectedText}>
                selected: {finishDate.toLocaleString()}
              </Text>
            </View>
          )}
          name="endDate"
        />
        {errors.endDate && (
          <Text style={styles.errorText}>This is required.</Text>
        )}

        <TouchableOpacity
          title="image upload"
          label="Upload Image"
          onPress={() => pickImage()}
          style={styles.button}
        >
           <Text style={styles.text}>Image upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
          title="reset-images"
          label="Reset"
          onPress={() => setImages([])}
          style={styles.button}
        >
          <Text style={styles.text}>Reset-images</Text>
        </TouchableOpacity>

        <ScrollView >
          {images.map((image, index) => {
            {
              /* console.log(image) */
            }
            return (
              <Image
                key={index}
                style={{ width:'100%', height: 200,marginVertical:10}}
                source={{ uri: image }}
              />
            );
          })}
        </ScrollView>
        <TouchableOpacity title="Submit" onPress={handleSubmit(onSubmit)} style={styles.button} >
        <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputDescription: {
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
  datePickerButton: {
    marginBottom: 8,
  },
  dateSelectedText: {
    fontSize: 14,
    marginVertical: 5,
  },
  submitButton: {
    marginTop: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2196F3',
    marginVertical:5
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
