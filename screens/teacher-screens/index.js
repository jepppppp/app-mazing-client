import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { externalStyle } from "../../styles/externalStyle";
import colors from "../../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserCredentials } from "../../redux";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import LeaderboardTabScreen from "../common-screens/LeaderboardTabScreen";
import ViewVideoScreen from "./video-tab/ViewVideoScreen";
import ViewModuleScreen from "./module-tab/ViewModuleScreen";
import ViewQuizScreen from "./quiz-tab/ViewQuizScreen";
import AccountTabScreen from "../common-screens/AccountTabScreen";

const { width } = Dimensions.get("screen");

const TeacherHome = (props) => {
  const isFocused = useIsFocused();
  const [credentials, setCredentials] = useState({});
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user_session = await AsyncStorage.getItem("user");
        if (user_session) {
          let user_parse = JSON.parse(user_session);
          setCredentials(user_parse);
          props.setUserCredentials(user_parse);
        }
      } catch (e) {
        console.log("Warning Occur in Home.js: " + e.message);
      }
    };
    checkSession();
  }, [props?.credentials?.profile_picture, isFocused]);
  const slidesRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;

  const DATA = [
    {
      key: 1,
      icon: require("../../assets/icons/learn.png"),
      label: "Modules",
      component: <ViewModuleScreen width={width} {...props} />,
      backgroundColor: colors.gray,
    },
    {
      key: 2,
      icon: require("../../assets/icons/video.png"),
      label: "Videos",
      component: <ViewVideoScreen width={width} {...props} />,
      backgroundColor: colors.yellow,
    },
    {
      key: 4,
      icon: require("../../assets/icons/quiz.png"),
      label: "Quiz",
      component: <ViewQuizScreen width={width} {...props} profileType={1} />,
      backgroundColor: colors.lightgray,
    },
    {
      key: 3,
      icon: require("../../assets/icons/leaderboard.png"),
      label: "Leaderboard",
      component: <LeaderboardTabScreen width={width} {...props} />,
      backgroundColor: colors.blue,
    },
    {
      key: 5,
      icon: require("../../assets/icons/account.png"),
      label: "Account",
      component: <AccountTabScreen width={width} {...props} profileType={1} />,
      backgroundColor: colors.lightgray,
    },
  ];

  const Indicator = ({ scrollX, scrollTo }) => {
    return (
      <View>
        <View style={{ flexDirection: "row", width, marginBottom: 10 }}>
          {DATA.map((_, i) => {
            const inputRange = [
              (i - 2) * width,
              (i - 1) * width,
              i * width,
              (i + 1) * width,
              (i + 2) * width,
            ];

            const color = scrollX.interpolate({
              inputRange,
              outputRange: [
                colors.extralightgray,
                colors.extralightgray,
                colors.black,
                colors.extralightgray,
                colors.extralightgray,
              ],
            });
            return (
              <Animated.View
                key={`indicator-${i}`}
                style={styles.home.indicatorContainer}
              >
                <TouchableOpacity
                  onPress={() => {
                    scrollTo(i);
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Animated.Image
                        source={_.icon}
                        style={[
                          {
                            tintColor: color,
                          },
                          styles.home.indicatorImage,
                        ]}
                      />
                    </View>
                    <Animated.Text
                      style={[
                        styles.home.indicatorLabel,
                        {
                          fontSize: width * 0.022,
                          color,
                        },
                      ]}
                    >
                      {_.label}
                    </Animated.Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={[{ paddingTop: 0 }, styles.container]}>
      <StatusBar style="#acaec5" />

      <View style={styles.home.header}>
        <View style={styles.home.account}>
          <Image
            source={
              credentials?.profile_picture
                ? { uri: credentials?.profile_picture }
                : require("../../assets/images/account-images/profile.jpg")
            }
            style={{ height: 30, borderRadius: 50, width: 30 }}
          />
          <Text style={styles.home.user}>
            {credentials?.first_name} {credentials?.last_name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("manage-user")}
        >
          <View style={{ padding: 10 }}>
            <Image
              source={require("../../assets/icons/manage-user.png")}
              style={{ height: 30, width: 30 }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        ref={slidesRef}
        data={DATA}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: width,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.component}
            </View>
          );
        }}
      />
      <Indicator
        scrollX={scrollX}
        scrollTo={(id) => {
          slidesRef.current.scrollToIndex({ index: id });
        }}
      />
    </View>
  );
};
export default connect(null, {
  setUserCredentials,
})(TeacherHome);

const styles = StyleSheet.create(externalStyle);
