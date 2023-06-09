import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';

export default function App() {

  const fecthApi =()=>{
    axios.get('http://192.168.0.11:3000/users').then((res)=>{
      console.log(res.data)
    }).catch((err)=>{console.log(err)})
  }


  useEffect(()=>{
    fecthApi()

    
  },[])


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start workin on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
