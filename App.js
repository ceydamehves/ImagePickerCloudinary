import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

const App = () => {
  const [photo, setPhoto] = useState('https://res.cloudinary.com/ceydamehves/video/upload/v1630569614/SampleVideo_1280x720_1mb_lzg9k7.mp4');

  const selectPhotoTapped = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'pictures',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        const type = response.type;
        const name = response.fileName;
        const source = {
          uri,
          type,
          name,
        }
        cloudinaryUpload(source)
      }
    });
  }
  const cloudinaryUpload = (photo) => {
    console.log(photo.uri)
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'ceydamehves')
    data.append("cloud_name", "ceydamehves")
    fetch("https://api.cloudinary.com/v1_1/ceydamehves/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        setPhoto(data.secure_url)
      }).catch(err => {
        Alert.alert("An Error Occured While Uploading")
      })
  }

  return (
    <View>
      <View style={styles.videoContainer}>
        <Video source={{ uri: photo }} style={styles.backgroundImage} />
      </View>
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadContainerTitle}>Pick a Video</Text>
        <TouchableOpacity onPress={selectPhotoTapped} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    backgroundColor: '#fe5b29',
    height: Dimensions.get('window').height,
  },
  backgroundImage: {
    
    height: Dimensions.get('window').height,
    position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
  },
  uploadContainer: {
    backgroundColor: '#f6f5f8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 200,
  },
  uploadContainerTitle: {
    alignSelf: 'center',
    fontSize: 25,
    margin: 20,
    fontFamily: 'Roboto'
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: '#fe5b29',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center'
  },
  uploadButtonText: {
    color: '#f6f5f8',
    fontSize: 20,
    fontFamily: 'Roboto'
  }
});
export default App;