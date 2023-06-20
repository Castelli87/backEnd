import {Picker} from '@react-native-picker/picker';
import { View } from 'react-native';

export const Select = (selKey, currValue, options, setFilters) => {
    console.log(options)
    return (
        <View>
        <Picker
  selectedValue={currValue}
  onValueChange={(itemValue, itemIndex) => {
    setFilters((currFilters) => {
        return {...currFilters, "model": itemValue}
  });
  }
  }>
  {options.map((val) => <Picker.Item label={val} value={val} /> )}
</Picker>
</View>
    )
}