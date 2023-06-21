import { Text, View, Button, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useContext, useState } from "react";
import { postVanBooking } from "../api";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../App";

export const BookingForm = ({ pricePerNight, id, vanName, image }) => {
  const { navigate } = useNavigation();
  const [totalCost, setTotalCost] = useState(0);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (data) => {
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

  const onSecondSubmit = (data) => {
    data.userId = currentUser.user._id;
    data.totalCost = totalCost;
    data.vanId = id;
    data.paymentDetails = "unpaid";
    postVanBooking(data).then(({ data }) => {
      console.log(data);
      navigate("BookingConfirmation", {
        bookingId: data.newBooking._id,
        vanName: vanName,
        image: image,
      });
    });
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="start date"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="startDate"
      />
      {errors.startDate && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="end date"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="endDate"
      />
      {errors.endDate && <Text>This is required.</Text>}

      <Button title="Click for price" onPress={handleSubmit(onSubmit)} />

      <Text>Total cost: £{totalCost}</Text>

      <Button title="Submit" onPress={handleSubmit(onSecondSubmit)} />
    </View>
  );
};
