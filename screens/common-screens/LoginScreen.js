import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { checkField, toastHandler } from "../../services/tools";
import Toast from "react-native-toast-message";
import axios_config from "../../config/axios_config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { setUserCredentials } from "../../redux";
import { externalStyle } from "../../styles/externalStyle";
const LoginScreen = (props) => {
  const [id_number, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const storeHandler = async (item) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(item));
    } catch (e) {
      console.log("Warning set in Login.js: " + e);
    }
  };
  const signInHandler = async () => {
    const newData = {
      id_number,
      password: password,
    };

    if (checkField(Object.values(newData)) > 0) {
      toastHandler({ type: "error", text1: "Please fill up the fields!" });
      return;
    }

    setIsLoading(true);
    await axios_config
      .post("auth/login", newData)
      .then((res) => {
        let response = res?.data;
        if (response.errors) {
          toastHandler({
            type: "error",
            text1: "Wrong Password or ID Number",
          });
          setIsLoading(false);
        } else {
          toastHandler({
            type: "success",
            text1: `Welcome ${response?.data?.first_name} ${response?.data?.last_name}`,
            onShow: () => {},
            onHide: () => {
              storeHandler(response?.data);
              setIsLoading(false);
              props?.setUserCredentials(response?.data);
              if (response?.data?.role == 2)
                props.navigation.replace("student-home");
              else props.navigation.replace("teacher-home");
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);

        toastHandler({
          type: "error",
          text1: "Something went wrong or network error!",
        });
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <StatusBar />
      <View style={styles.login.upperView}>
        <View>
          <Image
            style={styles.login.image}
            source={require("../../assets/images/login-images/logo.png")}
          />
        </View>
        <Text style={styles.login.title}>Welcome to App-Mazing</Text>
        <Text style={styles.login.header}>Log In</Text>

        <TextInput
          editable={!isLoading}
          keyboardType="numeric"
          onChangeText={(e) => setIdNumber(e)}
          placeholder="Enter your ID Number"
          placeholderTextColor={"white"}
          style={styles.login.input}
        />
        <TextInput
          editable={!isLoading}
          onChangeText={(e) => setPassword(e)}
          placeholder="Enter your password"
          secureTextEntry
          placeholderTextColor={"white"}
          style={styles.login.input}
        />
        {isLoading ? (
          <Text style={styles.login.login_btn}>Signing In...</Text>
        ) : (
          <TouchableOpacity onPress={signInHandler}>
            <Text style={styles.login.login_btn}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
      <Toast />
    </KeyboardAvoidingView>
  );
};


export default connect(null, {
  setUserCredentials,
})(LoginScreen);

const styles = new StyleSheet.create(externalStyle);
