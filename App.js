// REDUX
import { Provider } from "react-redux";
import store from "./redux/store";

import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";

// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GamesLayout from "./components/student-components/play-tab/GamesLayout";
import { externalStyle } from "./styles/externalStyle";
import colors from "./config/colors";

import {
  Carousel,
  Login,
  VideosScreen,
  StudentScreens,
  TeacherScreens,
  FaqsTab,
  PlayTabScreen,
  PlayNowScreen,
  TakeQuizScreen,
  Number,
  Recognition,
  Symbol,
  Balloon,
  Birthday,
  Bubble,
  Cups,
  Owl,
  Pobble,
  Treasure,
  AddModuleScreen,
  EditModuleScreen,
  ViewModuleScreen,
  AddQuizScreen,
  EditQuizScreen,
  ViewQuizScreen,
  AddVideoScreen,
  EditVideoScreen,
  ViewVideoScreen,
  ViewTeacherScreen,
  NumberRecognitionScreen,
  MathSymbolScreen,
  ModulesScreen,
  ManageUser,
} from "./screens";

import ViewELearningVideoScreen from "./components/common-components/ViewELearningVideo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Introduction from "./components/teacher-components/Introduction";
import ChangePassword from "./components/common-components/ChangePassword";
import ChangeProfile from "./components/teacher-components/ChangeProfile";
import AssestmentPage from "./components/common-components/AssestmentPage";
import PreAssesstment from "./components/common-components/PreAssesstment";
import Modules from "./screens/student-screens/learn-tab/ModulesScreen";
import LeaderboardHistory from "./screens/teacher-screens/LeaderboardHistory";

export default function App() {
  const [initialPage, setInitialPage] = useState("game-menu");

  const checkSession = async () => {
    try {
      const user_session = await AsyncStorage.getItem("user");
      if (user_session) {
        let user_parse = JSON.parse(user_session);
        if (user_parse?.role == 2) setInitialPage("student-home");
        else setInitialPage("teacher-home");
      } else {
        const carousel_session = await AsyncStorage.getItem("newUser");
        if (carousel_session == "true") {
          setInitialPage("login");
        }
      }
    } catch (e) {
      console.log("Warning Occur in Home.js: " + e.message);
    }
  };
  useEffect(() => {
    const load = async () => {
      checkSession();
    };
    load();
  }, []);

  const Stack = createNativeStackNavigator();
  const [loaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialPage}>
          {/* carousel landing */}
          <Stack.Screen
            title="App-Mazing"
            name="carousel"
            component={Carousel}
            options={(props) => ({
              headerShown: false,
            })}
          />
          {/* login */}
          <Stack.Screen
            title="Login"
            name="login"
            component={Login}
            options={(props) => ({
              headerShown: false,
            })}
          />
          {/* landing student page   */}
          <Stack.Screen
            title=""
            name="student-home"
            component={StudentScreens}
            options={(props) => ({
              headerShown: false,
            })}
          />
          {/* landing teacher page   */}
          <Stack.Screen
            title=""
            name="teacher-home"
            component={TeacherScreens}
            options={(props) => ({
              headerShown: false,
            })}
          />

          <Stack.Screen
            title=""
            name="faQs"
            component={FaqsTab}
            options={(props) => ({
              title: "",
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            title=""
            name="manage-user"
            component={ManageUser}
            options={(props) => ({
              title: "User Management",
              headerShadowVisible: false,
            })}
          />
          {/* play page  */}
          <Stack.Screen
            title=""
            name="quiz"
            component={TakeQuizScreen}
            options={(props) => ({
              title: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: colors.yellow,
              },
            })}
          />
          <Stack.Screen
            title=""
            name="play_now"
            component={PlayNowScreen}
            options={(props) => ({
              title: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: colors.gray,
              },
              headerTintColor: "white",
            })}
          />
          <Stack.Screen
            title=""
            name="game_menu"
            component={GamesLayout}
            options={(props) => ({
              title: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: colors.gray,
              },
              headerTintColor: "white",
            })}
          />
          {/* DAYCARE GAMES  */}
          <Stack.Screen
            title=""
            name="game-1"
            component={Birthday}
            options={(props) => ({
              title: "Birthday Candle Counting",
              headerShadowVisible: false,
              headerTitleStyle: {
                fontFamily: "semibold",
              },
            })}
          />
          <Stack.Screen
            title=""
            name="game-2"
            component={Number}
            options={(props) => ({
              title: "Connect the number",
              headerShadowVisible: false,
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: colors.darkblue,
              },
            })}
          />
          <Stack.Screen
            title=""
            name="game-3"
            component={Symbol}
            options={(props) => ({
              title: "Math Symbol",
              headerShadowVisible: false,
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: colors.darkred,
              },
            })}
          />
          <Stack.Screen
            title=""
            name="game-4"
            component={Recognition}
            options={(props) => ({
              title: "Object Number Recognition",
              headerShadowVisible: false,
              headerTitleStyle: {
                fontFamily: "semibold",
              },
            })}
          />
          {/* GRADE 1-3 GAMES */}
          <Stack.Screen
            title=""
            name="game-6"
            component={Bubble}
            options={(props) => ({
              title: "Bubble Game",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "#8ed5e7",
              },
            })}
          />
          <Stack.Screen
            title=""
            name="game-7"
            component={Balloon}
            options={(props) => ({
              title: "Balloon Game",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerTintColor: colors.white,
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "#2a52c1",
              },
            })}
          />
          <Stack.Screen
            title=""
            name="game-8"
            component={Owl}
            options={(props) => ({
              title: "Owl Game",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
            })}
          />
          {/* GRADE 4-6 GAMES  */}
          <Stack.Screen
            title=""
            name="game-9"
            component={Cups}
            options={(props) => ({
              title: "Balance the cups",
              headerShadowVisible: false,
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerStyle: {
                backgroundColor: colors.yellow,
              },
            })}
          />
          <Stack.Screen
            title=""
            name="game-10"
            component={Pobble}
            options={(props) => ({
              title: "Multi Pobble Game",
              headerShadowVisible: false,
              headerTintColor: colors.white,
              headerTitleStyle: {
                fontFamily: "semibold",
                color: colors.white,
              },
              headerStyle: {
                backgroundColor: colors.darkblue,
              },
            })}
          />
          <Stack.Screen
            title=""
            name="game-11"
            component={Treasure}
            options={(props) => ({
              title: "Charting Treasure",
              headerShadowVisible: false,
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerStyle: {
                backgroundColor: "#6ea9f9",
              },
            })}
          />
          {/* learn page  */}
          <Stack.Screen
            title=""
            name="learn-modules"
            component={ModulesScreen}
            options={(props) => ({
              title: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: colors.violet,
              },
              headerTintColor: "white",
            })}
          />
          <Stack.Screen
            title=""
            name="learn-videos"
            component={VideosScreen}
            options={(props) => ({
              title: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: colors.red,
              },
              headerTintColor: "white",
            })}
          />
          <Stack.Screen
            title=""
            name="learn-teachers"
            component={ViewTeacherScreen}
            options={(props) => ({
              title: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: colors.green,
              },
              headerTintColor: "white",
            })}
          />

          <Stack.Screen
            title=""
            name="view-module"
            component={ViewModuleScreen}
            options={(props) => ({
              title: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "white",
              },
            })}
          />
          <Stack.Screen
            title=""
            name="view-video"
            component={ViewVideoScreen}
            options={(props) => ({
              title: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "white",
              },
            })}
          />
          <Stack.Screen
            title=""
            name="view-elearning-video"
            component={ViewELearningVideoScreen}
            options={(props) => ({
              title: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "white",
              },
            })}
          />
          <Stack.Screen
            title=""
            name="view-quiz"
            component={ViewQuizScreen}
            options={(props) => ({
              title: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "white",
              },
            })}
          />
          {/* teacher add  */}
          <Stack.Screen
            title=""
            name="add-video"
            component={AddVideoScreen}
            options={(props) => ({
              title: "Add Video",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            title=""
            name="add-module"
            component={AddModuleScreen}
            options={(props) => ({
              title: "Add Module",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            title=""
            name="add-quiz"
            component={AddQuizScreen}
            options={(props) => ({
              title: "Add Quiz",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
            })}
          />

          <Stack.Screen
            title=""
            name="edit-video"
            component={EditVideoScreen}
            options={(props) => ({
              title: "Edit Video",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            title=""
            name="edit-module"
            component={EditModuleScreen}
            options={(props) => ({
              title: "Edit Module",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            title=""
            name="leaderboard-history"
            component={LeaderboardHistory}
            options={(props) => ({
              title: "Attempt History",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            title=""
            name="edit-quiz"
            component={EditQuizScreen}
            options={(props) => ({
              title: "Edit Quiz",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
            })}
          />

          <Stack.Screen
            title=""
            name="introduction"
            component={Introduction}
            options={(props) => ({
              title: "Introduction",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            title=""
            name="change-password"
            component={ChangePassword}
            options={(props) => ({
              title: "Change Password",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            title=""
            name="change-profile"
            component={ChangeProfile}
            options={(props) => ({
              title: "Change Profile Picture",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
            })}
          />
          {/* assestments  */}
          <Stack.Screen
            // title=
            name="assestment"
            component={AssestmentPage}
            options={(props) => ({
              title: "",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerStyle: {
                backgroundColor: colors.blue,
              },
              headerTintColor: "white",
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            title=""
            name="pre-assestment"
            component={PreAssesstment}
            options={(props) => ({
              title: "",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerShadowVisible: false,
            })}
          />

          <Stack.Screen
            title=""
            name="number_recognition"
            component={NumberRecognitionScreen}
            options={(props) => ({
              title: "Number Recognition",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerStyle: {
                backgroundColor: colors.red,
              },
              headerTintColor: colors.white,
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            title=""
            name="math_symbol"
            component={MathSymbolScreen}
            options={(props) => ({
              title: "Basic Math Symbol",
              headerTitleStyle: {
                fontFamily: "semibold",
              },
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: colors?.red,
              },
              headerShadowVisible: false,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create(externalStyle);
