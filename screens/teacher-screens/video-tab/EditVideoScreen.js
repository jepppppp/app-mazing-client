import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import colors from "../../../config/colors";
import { TouchableOpacity } from "react-native";
import { setVideos } from "../../../redux";
import { connect } from "react-redux";
import { checkField, toastHandler } from "../../../services/tools";
import axios_config from "../../../config/axios_config";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const EditVideo = (props) => {
  const data = props.route.params.item;
  const [url, setUrl] = useState(data?.url);
  const [title, setTitle] = useState(data?.title);
  const [description, setDescription] = useState(data?.description);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async () => {
    const credentials = props.credentials;
    const newData = {
      url,
      title,
      teacher_name: credentials.first_name + " " + credentials.last_name,
      teacher_id: credentials._id,
      description,
      category: credentials.grade,
    };
    if (checkField(Object.values(newData)) > 0) {
      toastHandler({ type: "error", text1: "Please fill up the fields!" });
      return;
    }
    if (credentials?.profile_picture) {
      newData.profile_picture = credentials?.profile_picture;
    }
    setIsLoading(true);
    await axios_config
      .put("video/update/" + data._id, newData)
      .then(async () => {
        toastHandler({ type: "success", text1: "Updated Successfuly!" });
        await axios_config.get("video").then((res) => {
          props.setVideos(res?.data?.data);
        });
      })
      .catch((e) => {
        console.log(e);
        toastHandler({ type: "error", text1: "Something went wrong!" });
      });
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        editable={!isLoading}
        style={styles.fields}
        value={title}
        placeholder="Title"
        onChangeText={(e) => setTitle(e)}
      />
      <TextInput
        editable={!isLoading}
        style={styles.fields}
        value={url}
        placeholder="Youtube URL"
        onChangeText={(e) => setUrl(e)}
      />
      <TextInput
        editable={!isLoading}
        style={styles.fields}
        value={description}
        placeholder="Description"
        onChangeText={(e) => setDescription(e)}
      />

      {!isLoading ? (
        <TouchableOpacity activeOpacity={0.7} onPress={submitHandler}>
          <Text style={styles.submit_button}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.submit_button}>Submitting...</Text>
      )}
      <Toast />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
    videos: state.user.videos,
  };
};

export default connect(mapStateToProps, {
  setVideos,
})(EditVideo);
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
  },
});
