import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { setUserCredentials } from "../../redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { RightArrowV2Svg } from "../../components/svg-components";
import { useIsFocused } from "@react-navigation/native";
import { externalStyle } from "../../styles/externalStyle";
const Fields = ({ children }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};

const AccountTabScreen = (props) => {
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState();
  useEffect(() => {
    let pic;
    if (props?.credentials?.profile_picture) {
      pic = { uri: props?.credentials?.profile_picture };
    } else {
      pic = require("../../assets/images/account-images/profile.jpg");
    }
    setProfile(pic);
  }, [props?.credentials?.gender, isFocused]);

  const logOutHandler = async () => {
    try {
      const user_session = await AsyncStorage.removeItem("user");
    } catch (e) {
      console.log("Warning Occur in Home.js: " + e.message);
    }
    props.navigation.replace("login");
  };

  const { width, profileType } = props;
  const [isEditable, setIsEditable] = useState(false);
  return (
    <>
      <Toast />
      <View
        style={{
          flex: 1,
          paddingTop: 50,
          backgroundColor: colors.green,
          width,
        }}
      >
        <View
          style={{
            flex: 0.25,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              position: "relative",
            }}
          >
            <Image
              source={profile}
              style={{
                width: 120,
                height: 120,
                borderRadius: 100,
                borderColor: "white",
                borderWidth: 4,
              }}
            />
          </View>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <ScrollView style={[styles.learn.lowerWrapper]}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                padding: 15,
                paddingBottom: 5,
                fontFamily: "semibold",
              }}
            >
              {profileType == 1 ? "Teacher" : "Student"} Profile
            </Text>

            <View
              style={{
                paddingHorizontal: 20,
              }}
            >
              <Fields>
                <Text style={{ fontSize: 17, fontFamily: "semibold" }}>
                  Name
                </Text>
                <Text
                  style={{
                    paddingVertical: 10,
                    fontSize: 17,
                    borderRadius: 20,
                    fontFamily: "regular",
                  }}
                >
                  {props.credentials?.first_name} {props.credentials?.last_name}
                </Text>
              </Fields>
              <Fields>
                <Text style={{ fontSize: 17, fontFamily: "semibold" }}>
                  User ID
                </Text>
                <Text
                  style={{
                    paddingVertical: 10,
                    fontSize: 17,
                    borderRadius: 20,
                    fontFamily: "regular",
                  }}
                >
                  {props.credentials?.id_number}
                </Text>
              </Fields>
              <Fields>
                <Text style={{ fontSize: 17, fontFamily: "semibold" }}>
                  Gender
                </Text>
                <Text
                  style={{
                    paddingVertical: 10,
                    fontSize: 17,
                    borderRadius: 20,
                    fontFamily: "regular",
                  }}
                >
                  {props.credentials?.gender}
                </Text>
              </Fields>

              <Fields>
                <Text style={{ fontSize: 17, fontFamily: "semibold" }}>
                  Birthday
                </Text>
                <Text
                  style={{
                    paddingVertical: 10,
                    fontSize: 17,
                    borderRadius: 20,
                    fontFamily: "regular",
                  }}
                >
                  {props.credentials?.birthday}
                </Text>
              </Fields>

              {profileType == 1 ? (
                <Fields
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 10,
                      fontSize: 17,
                      fontFamily: "semibold",
                    }}
                  >
                    Introduction
                  </Text>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("introduction")}
                  >
                    <RightArrowV2Svg />
                  </TouchableOpacity>
                </Fields>
              ) : (
                <Fields>
                  <Text style={{ fontSize: 17, fontFamily: "semibold" }}>
                    Grade Level:
                  </Text>
                  <Text
                    style={{
                      paddingVertical: 10,
                      fontSize: 17,
                      borderRadius: 20,
                      fontFamily: "regular",
                    }}
                  >
                    {props.credentials?.grade?.replace("Grade", "")}
                  </Text>
                </Fields>
              )}
              <Fields>
                <Text
                  style={{
                    paddingVertical: 10,
                    fontSize: 17,
                    fontFamily: "semibold",
                  }}
                >
                  Change Password
                </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("change-password")}
                >
                  <RightArrowV2Svg />
                </TouchableOpacity>
              </Fields>
              {profileType == 1 && (
                <Fields>
                  <Text
                    style={{
                      paddingVertical: 10,
                      fontSize: 17,
                      fontFamily: "semibold",
                    }}
                  >
                    Change Profile Picture
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate({
                        merge: true,
                        name: "change-profile",
                      })
                    }
                  >
                    <RightArrowV2Svg />
                  </TouchableOpacity>
                </Fields>
              )}

              <View
                style={{
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity activeOpacity={0.7} onPress={logOutHandler}>
                  <Text
                    style={{
                      padding: 50,
                      paddingVertical: 10,
                      // width,
                      borderRadius: 50,
                      backgroundColor: colors.yellow,
                      borderWidth: 1,
                      fontSize: 15,
                      fontFamily: "semibold",
                      textAlign: "center",
                      borderColor: "white",
                    }}
                  >
                    Log Out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <Toast />
      </View>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

export default connect(mapStateToProps, {
  setUserCredentials,
})(AccountTabScreen);

const styles = StyleSheet.create(externalStyle);
