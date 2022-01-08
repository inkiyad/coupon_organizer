import React, { useState } from 'react'
import { 
  Text, 
  StyleSheet,
  View ,
  Image,
  TouchableOpacity,
  WrapLoading
} from 'react-native';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNTextDetector from "rn-text-detector";

const styles = StyleSheet.create({
  content: {
    background: 'blue'
  },
  title:{
    color: 'yellow'
  },
  button: {
    borderColor: 'black' 
  },
  shadow: {
   shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3, 
  },

})


function getSpace(space){

  return {
    width: space
  }
}


const OcrModule = () =>{
  const [state, setState] = useState({
    loading: false,
    image: null,
    textRecognition: null,
  })
  function onPress(type) {
    setState({ ...state, loading: true });
    type === "capture"
      ? launchCamera({ mediaType: "image" }, onImageSelect)
      : launchImageLibrary({ mediaType: "image" }, onImageSelect);
  }
  async function onImageSelect(media) {
    if (!media) {
      setState({ ...state, loading: false });
      return;
    }
    if (!!media && media.assets) {
      const file = media.assets[0].uri;
      const textRecognition = await RNTextDetector.detectFromUri(file);

      // textRecognition
      console.log(textRecognition)

    }
  }



  return (
    <View style={styles.content}>
      <View style={getSpace(200)}>
        <TouchableOpacity style={[styles.button, styles.shadow]}
          onPress={() => onPress("capture")}>
          <Text>Take Photo</Text>
        </TouchableOpacity>
        <View style={getSpace(200)}>
          <TouchableOpacity
            style={[styles.button, styles.shadow]}
            onPress={() => onPress("library")}
          >
            <Text>Pick a Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={getSpace(500)}>
          <View style={{ alignItems: "center" }}>
            <Image style={[styles.image, styles.shadow]}
              source={{ uri: state.image }} />
          </View>
          {!!state.textRecognition &&
            state.textRecognition.map(
              (item, i) => (
                <Text key={i} style={getSpace(100)}>
                  {item.text}
                </Text>
                ))}
        </View>
      </View>
    </View>
  )

}


export default OcrModule
