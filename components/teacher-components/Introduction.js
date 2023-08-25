import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../config/colors";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { toastHandler } from "../../services/tools";
import { connect } from "react-redux";
import { setUserCredentials } from "../../redux";
import axios_config from "../../config/axios_config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Introduction = (props) => {
  const [description, setDescription] = useState(
    props?.credentials?.description
  );
  const [isLoading, setIsLoading] = useState(false);

  const storeHandler = async (item) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(item));
    } catch (e) {
      console.log("Warning set in Login.js: " + e);
    }
  };
  const submitHandler = async () => {
    setIsLoading(true);
    await axios_config
      .put("user/update/" + props.credentials._id, {
        description,
      })
      .then((res) => {
        storeHandler({ ...props.credentials, description });
        props.setUserCredentials({ ...props.credentials, description });
        toastHandler({
          type: "success",
          text1: `Update Successfully!`,
        });
      })
      .catch((e) => {
        console.log(e);
        toastHandler({
          type: "error",
          text1: `Something went wrong!`,
        });
      });
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        editable={!isLoading}
        onChangeText={(e) => setDescription(e)}
        value={description}
        style={styles.fields}
        multiline={true}
        autoFocus={true}
      />
      <View style={{ flexDirection: "column", gap: 10 }}>
        {!isLoading ? (
          <>
            <TouchableOpacity activeOpacity={0.7} onPress={submitHandler}>
              <Text style={[styles.submit_button]}>Save Changes</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.submit_button}>Saving..</Text>
        )}
      </View>
      {/* )} */}
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
})(Introduction);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  fields: {
    padding: 10,
    fontFamily: "semibold",
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.extralightgray,
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
});
