import { Text, Button, ScrollView, TextInput, View, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { postNewUser } from "../api";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export const Register = () => {
  const [createUser, setCreateUser] = useState(false);
  const [image, setImage] = useState("");

  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      region: "",
      postcode: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      img: "",
    },
  });

  const onSubmit = (data) => {
    data.img = image
    postNewUser(data).then(({ data }) => {
      setCreateUser(true);
    });
  };

   const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1
    })

    if (!result.cancelled) {
      const img = result.assets[0].uri;
      console.log(img)

      setImage(img)
      
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View>
      {createUser ? (
        <View>
          <Text>User created successfully!</Text>
          <Button title="Login  now" onPress={() => navigate("Login")} />
        </View>
      ) : (
        <ScrollView>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="first name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          {errors.username && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}

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
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="postcode"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="postcode"
          />
          {errors.postcode && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            )}
            name="email"
          />
          {errors.email && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="phone number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && <Text>This is required.</Text>}

          <Button title="image upload" label="Upload Image" onPress={() => pickImage()} />
          <Button title="reset-images" label="Reset" onPress={() => setImage("")
          } />
          <Image style={{width: 80, height: 80}} source={{ uri: image}} />

          <Button title="Sign up!" onPress={handleSubmit(onSubmit)} />
        </ScrollView>
      )}
    </View>
  );
};
