import { Text, Button, ScrollView, TextInput, View,StyleSheet } from "react-native";
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
    <View style={styles.container}>
      {createUser ? (
        <View>
          <Text>User created successfully!</Text>
          <Button title="Login  now" onPress={() => navigate("Login")} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.formContainer} >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="first name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          {errors.username && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="region"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="region"
          />
          {errors.region && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="postcode"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="postcode"
          />
          {errors.postcode && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            )}
            name="email"
          />
          {errors.email && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="phone number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && <Text style={styles.errorText}>This is required.</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});