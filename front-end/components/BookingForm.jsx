import { Text, View, Button, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { postVanBooking } from "../api";

export const BookingForm = ({ pricePerNight, id }) => {
  const [totalCost, setTotalCost] = useState(0);
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
    data.userId = "648733606b77da2cfea3e774";
    data.totalCost = totalCost;
    data.vanId = id;
    data.paymentDetails = "unpaid";
    postVanBooking(data).then(({ data }) => {
      console.log(data);
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
