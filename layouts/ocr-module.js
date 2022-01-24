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
  TouchableHighlight
} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },

    capture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: "blue",
        backgroundColor: "white",
        marginBottom: 15
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }

});

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
  const onPress = image => console.log(image)

  //if (device == null) return <Text>loading<Text/>
  return (
    <Camera
      style={styles.preview}
      device={device}
      isActive={true}
    >
      <TouchableHighlight
          style={styles.capture}
          onPress={onPress}
          >
          <View />
      </TouchableHighlight>
    </Camera>
  )
  
};


export default OcrModule;
