import { useNavigation } from "@react-navigation/native";
import { Button, Text, View, TextInput, Alert,StyleSheet } from "react-native";
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
    if(currentUser === ""){
      
      postLoginUser(data)
        .then(({ data }) => {
          setCurrentUser(data);
          // goBack();
        })
        .catch((err) => {
          Alert.alert("An error occurred, please try again!", err.message);
        });
    }
  };

  const handleLogout = () => {
    setCurrentUser("");
    navigate("Home");
  };
  console.log(currentUser, "user after logout");
  
  

  return (
    <View style={styles.container}>
      {currentUser !== "" ? (
        <Button  style={styles.button} title="Logout" onPress={() => handleLogout()}></Button>
      ) : (
        <View>
          <Text style={styles.title}>Login Here</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              
              style={styles.input}
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          {errors.username && <Text style={styles.error}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
                placeholder="password"
                secureTextEntry={true} 
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <Text style={styles.error}>This is required.</Text>}

          <Button  style={styles.button} title="Login!" onPress={handleSubmit(onSubmit)} />
        </View>
      )}
      {/* <Button style={styles.button} onPress={() => goBack()} title="X" /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
   /*  justifyContent: "center", */
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

