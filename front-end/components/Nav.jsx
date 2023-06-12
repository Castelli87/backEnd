import { ScreenContainer } from "react-native-screens";
import { Button, View } from "react-native";
import Home from "../pages/Home";

function Nav({navigation}) {
    return (
        <View>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
        <Button title="User Profile" onPress={() => navigation.navigate("UserProfile")} />
    </View>
    )
    
}

export default Nav;
