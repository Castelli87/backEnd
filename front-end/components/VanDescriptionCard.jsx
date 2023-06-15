import { View, Text, StyleSheet } from "react-native"

export const VanDescriptionCard = ({description}) => {
    return (
            <View style={styles.card}>
                <Text>{description}</Text>
            </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "yellow"
    }
})