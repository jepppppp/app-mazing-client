import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import colors from "../../config/colors";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { toastHandler } from "../../services/tools";
import axios_config from "../../config/axios_config";
import { connect } from "react-redux";

const ChangePassword = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const clearForm = () => {
    setNewPassword("");
    setConfirmPassword("");
  };
  const submitHandler = async () => {
    if (newPassword.length < 8) {
      return toastHandler({
        type: "error",
        text1: "Password must have atleast 8 characters!",
      });
    }
    if (newPassword != confirmPassword) {
      return toastHandler({ type: "error", text1: "Password Mismatch!" });
    }
    setIsLoading(true);
    await axios_config
      .post("user/change-password/" + props.credentials._id, {
        password: newPassword,
      })
      .then((res) => {
        toastHandler({
          type: "success",
          text1: "Password changed successfuly!",
        });
      })
      .catch((e) => {
        console.log(e?.message);
        toastHandler({ type: "error", text1: "Something went wrong!" });
      });
    setIsLoading(false);
    clearForm();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.fields}
        editable={!isLoading}
        value={newPassword}
        secureTextEntry
        placeholder="New Password"
        onChangeText={(e) => setNewPassword(e)}
      />
      <TextInput
        style={styles.fields}
        editable={!isLoading}
        value={confirmPassword}
        secureTextEntry
        placeholder="Confim Password"
        onChangeText={(e) => setConfirmPassword(e)}
      />
      {!isLoading ? (
        <TouchableOpacity onPress={submitHandler}>
          <Text style={styles.submit_button}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.submit_button}>Submitting..</Text>
      )}
      <Toast />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

export default connect(mapStateToProps, {})(ChangePassword);

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
