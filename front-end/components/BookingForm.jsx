import { Text, View, Button, TextInput,StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useContext, useState } from "react";
import { postVanBooking } from "../api";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../App";
import { Calendar } from 'react-native-calendars';

export const BookingForm = ({ pricePerNight, id, vanName, image }) => {
  const { navigate } = useNavigation();
  const [totalCost, setTotalCost] = useState(0);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [ selectedStartDate, setSelectedStartDate ] = useState("");
  const [ selectedEndDate, setSelectedEndDate ] = useState("");

  const [pressed, setPressed ] = useState(false);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (data) => {
    data.startDate = selectedStartDate;
    data.endDate = selectedEndDate;
    const numberOfNights = calculateNumberOfNights(
      data.startDate,
      data.endDate
    );
    const cost = numberOfNights * pricePerNight;
    return setTotalCost(cost);
  };

  const calculateNumberOfNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return numberOfNights;
  };
  const getDisabledDates = (startDate, endDate) => {
    const dates = [];
  const disabled = {};
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  dates.forEach(day => {
  disabled[day] = {
    disabled: true,
  };
});

  return disabled;
};
  

  const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  const marked = {};
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  dates.pop();
  dates.shift();

  dates.forEach(day => {
  marked[day] = {
    marked: true,
    color: "#50cebb",
  };
});

  return marked;
};

  const onSecondSubmit = (data) => {
    data.startDate = selectedStartDate;
    data.endDate = selectedEndDate;
    data.userId = currentUser.user._id;
    data.totalCost = totalCost;
    data.vanId = id;
    data.paymentDetails = "unpaid";
    // console.log(data);
    postVanBooking(data).then(({ data }) => {
      navigate("BookingConfirmation", {
        bookingId: data.newBooking._id,
        vanName: vanName,
        image: image,
      });
    });
  };
  const dates = getDatesInRange(selectedStartDate, selectedEndDate);

  const disabledDates1 = getDisabledDates("2023-06-12", "2023-06-14")

  const disabledDates2 = getDisabledDates("2023-07-01", "2023-07-08");

  const disabledDates = Object.assign({}, disabledDates1, disabledDates2);
  
  console.log(disabledDates)

  return (
    <View>
    <Calendar
    style={styles.box}
      onDayPress={day => {
        if(!pressed){
        setSelectedStartDate(day.dateString);
        setPressed(true)
          
        } else{
          setSelectedEndDate(day.dateString);
          setPressed(false)
        }
        
      }}
      markingType={"period"}
      markedDates={{
        [selectedStartDate]: {selected: true, startingDay: true, disableTouchEvent: true, selectedDotColor: 'orange', color: '#50cebb'},
        [selectedEndDate]: {selected: true, endingDay: true, disableTouchEvent: true, selectedDotColor: 'orange', color: '#50cebb'},
        ...dates,
        ...disabledDates
      }}
    />

      <Button  title="Click for price" onPress={handleSubmit(onSubmit)} />

      <Text style={{marginVertical:15,textAlign:"center"}} >Total cost: £{totalCost}</Text>

      <Button title="Submit" onPress={handleSubmit(onSecondSubmit)} />
    </View>
  );
};
const styles = StyleSheet.create({

  box: {
    margin: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    marginBottom:25
  },
  space:{
    marginVertical:15,
  }
});