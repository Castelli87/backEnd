import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { UserContext } from "../App";

const ReviewForm = ({ vanId, onSubmit }) => {
  const { currentUser, setCurentUser } = useContext(UserContext);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (value) => {
    setComment(value);
  };

  const handleSubmit = () => {
    onSubmit(vanId, currentUser.user._id, rating, comment);
    setComment('')
    setRating('')
  };

  return (
    <View style={styles.container}>
      <Text>Rating:</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={handleRatingChange}
        keyboardType="numeric"
      />

      <Text>Comment:</Text>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={handleCommentChange}
        multiline
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    marginVertical:40,
    marginHorizontal: 5,
    padding:10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
   
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default ReviewForm;
