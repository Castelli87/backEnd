import { useNavigation } from "@react-navigation/native";
import { Button, Text, View, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { UserContext } from "../App";
import { useContext } from "react";
import { postLoginUser } from "../api";

export const Login = () => {
  const { goBack, navigate } = useNavigation();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    postLoginUser(data)
      .then(({ data }) => {
        setCurrentUser(data);
        // goBack();
      })
      .catch((err) => {
        Alert.alert("An error occurred, please try again!", err.message);
      });
  };

  const handleLogout = () => {
    setCurrentUser("");
    navigate("Home");
  };

  // console.log(currentUser);

  return (
    <View>
      {currentUser !== "" ? (
        <Button title="Logout" onPress={() => handleLogout()}></Button>
      ) : (
        <View>
          <Text>Login Here</Text>
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

          <Button title="Login!" onPress={handleSubmit(onSubmit)} />
        </View>
      )}
      <Button onPress={() => goBack()} title="X" />
    </View>
  );
};
