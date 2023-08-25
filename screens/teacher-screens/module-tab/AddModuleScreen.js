import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios_config from "../../../config/axios_config";
import { connect } from "react-redux";
import colors from "../../../config/colors";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setModules } from "../../../redux";
import { checkField, toastHandler } from "../../../services/tools";

const AddModule = (props) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");

  const clearForm = () => {
    setTitle("");
    setDescription("");
  };

  const submitHandler = async () => {
    const credentials = props.credentials;
    const newData = {
      title,
      teacher_name: credentials.first_name + " " + credentials.last_name,
      teacher_id: credentials._id,
      text: description,
      category: credentials.grade,
    };
    if (checkField(Object.values(newData)) > 0) {
      toastHandler({ type: "error", text1: "Please fill up the fields!" });
      return;
    }
    newData.profile_picture = credentials?.profile_picture || "no-image";
    setIsLoading(true);
    await axios_config
      .post("module/add", newData)
      .then((res) => {
        props.setModules([...props.modules, res?.data?.data]);
        toastHandler({ type: "success", text1: "Uploaded Successfuly!" });
        clearForm();
      })
      .catch((e) => {
        console.log(e?.message);
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
        value={description}
        placeholder="Description"
        multiline={true}
        autoFocus={true}
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
    modules: state.user.modules,
  };
};

export default connect(mapStateToProps, {
  setModules,
})(AddModule);

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
