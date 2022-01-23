import React from 'react';
import {Camera , useCameraDevices} from 'react-native-vision-camera'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const OcrModule = () => {
  const [device , setDevice] = React.useState({id: "test"})
  
  Camera.requestCameraPermission().then(response =>{
    Camera.getAvailableCameraDevices().then(data =>{
      const selectedDevice = data.find(device => device.name === 'Back Triple Camera')
      setDevice(selectedDevice)

    })
  }).catch(e=>{
      console.log(e)

  })

  //if (device == null) return <Text>loading<Text/>
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  )
  
};


export default OcrModule;
