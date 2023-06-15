import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
export const Login = () => {
  const { goBack } = useNavigation();
  return (
    <View>
      <Text>Login Here</Text>
      <Button onPress={() => goBack()} title="X" />
    </View>
  );
};
