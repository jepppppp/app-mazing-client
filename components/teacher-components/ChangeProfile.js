import { firebase } from "../../config/firebase_config";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import colors from "../../config/colors";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { connect } from "react-redux";
import { useState } from "react";
import { setUserCredentials } from "../../redux";

import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { toastHandler } from "../../services/tools";
import axios_config from "../../config/axios_config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangeProfile = (props) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = () => {
    setIsLoading(true);
    deleteFromFirebase(props?.credentials.profile_picture);
    uploadImage();
  };
  const deleteFromFirebase = (url) => {
    try {
      let pictureRef = firebase.storage().refFromURL(url);
      pictureRef
        .delete()
        .then(() => {
          ("Image deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log("DELETING IMAGE FROM FIREBASE", e);
    }
  };
  const storeHandler = async (item) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(item));
    } catch (e) {
      console.log("Warning set in Login.js: " + e);
    }
  };
  const updateHandler = async (newData) => {
    await axios_config
      .put("user/update/profile/" + props?.credentials._id, {
        image: newData?.profile_picture,
      })
      .then(() => {
        storeHandler({ ...props?.credentials, ...newData });
        props.setUserCredentials({ ...props.credentials, ...newData });

        toastHandler({
          type: "success",
          text1: "Profile Picture Changed Successfuly!",
        });
        setIsLoading(false);
      })
      .catch((e) => {
        toastHandler({ type: "error", text1: "Something went wrong!" });
        console.log("Error:" + e.message);
      });
    setIsLoading(false);
  };
  const uploadImage = async () => {
    try {
      const response = await fetch(image?.uri);
      const blob = await response.blob();
      const filename = image?.uri.substring(image?.uri.lastIndexOf("/") + 1);
      var refr = firebase.storage().ref().child(filename).put(blob);
      try {
        await refr;
        const storage = getStorage();
        const reference = ref(storage, filename);
        await getDownloadURL(reference)
          .then((x) => {
            updateHandler({ profile_picture: x });
          })
          .catch(() => {
          });
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        toastHandler({ type: "error", text1: "Something went wrong!" });
      }
    } catch (e) {
      toastHandler({ type: "error", text1: "Something went wrong!" });
      console.log(e);
      setIsLoading(false);
    }
  };

  const imagePickerHandler = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowEditing: true,
        // aspect: [16, 9],
        quality: 1,
      });
      if (!result.canceled) {
        const source = { uri: result.assets[0].uri };
        setImage(source);
      }
    } catch (e) {}
  };
  return (
    <View style={styles.container}>
      <Image
        style={[
          {
            // position: "absolute",
            // top: 0,
            // left: 0,
            width: "100%",
            borderRadius: 500,
            aspectRatio: 1 / 1,
          },
          styles.imageUpload,
          { borderColor: colors.gray },
        ]}
        source={{
          uri: image?.uri || props.credentials?.profile_picture,
        }}
      />
      {!isLoading && (
        <TouchableOpacity onPress={imagePickerHandler}>
          <Text
            style={[
              styles.submit_button,
              { backgroundColor: colors.lightgray },
            ]}
          >
            Choose Image
          </Text>
        </TouchableOpacity>
      )}
      {image?.uri &&
        (!isLoading ? (
          <TouchableOpacity onPress={submitHandler}>
            <Text style={styles.submit_button}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.submit_button}>Submitting..</Text>
        ))}
      <Toast />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

export default connect(mapStateToProps, {
  setUserCredentials,
})(ChangeProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  submit_button: {
    padding: 10,
    color: colors.white,
    fontFamily: "semibold",
    borderRadius: 10,
    marginTop: 5,
    textAlign: "center",
    backgroundColor: colors.gray,
  },
  fields: {
    padding: 10,
    fontFamily: "semibold",
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.extralightgray,
    // textAlign: "center",
    // backgroundColor: colors.gray,
  },
});
