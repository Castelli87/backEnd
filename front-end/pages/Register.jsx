import { Text, Button, ScrollView, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { postNewUser } from "../api";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const Register = () => {
  const [createUser, setCreateUser] = useState(false);
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
    postNewUser(data).then(({ data }) => {
      setCreateUser(true);
    });
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

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="image url"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="img"
          />

          <Button title="Sign up!" onPress={handleSubmit(onSubmit)} />
        </ScrollView>
      )}
    </View>
  );
};
