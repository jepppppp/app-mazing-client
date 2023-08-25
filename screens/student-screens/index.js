import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { externalStyle } from "../../styles/externalStyle";
import colors from "../../config/colors";
import { TrophySvg } from "../../components/svg-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setUserCredentials,
  setIsDone,
  setPreAssestmentScore,
} from "../../redux";
import { connect } from "react-redux";
import axios_config from "../../config/axios_config";
import ButtonCard from "../../components/common-components/ButtonCard";
import PlayTabScreen from "./play-tab/PlayTabScreen";
import LearnTabScreen from "./learn-tab/LearnTabScreen";
import LeaderboardTabScreen from "../common-screens/LeaderboardTabScreen";
import AccountTabScreen from "../common-screens/AccountTabScreen";
const { width } = Dimensions.get("screen");

const StudentScreens = (props) => {
  const [credentials, setCredentials] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    };
    checkSession();
  }, []);

  const slidesRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;

  const DATA = [
    {
      key: 1,
      icon: require("../../assets/icons/play.png"),
      label: "Play",
      component: <PlayTabScreen width={width} {...props} />,
      backgroundColor: colors.gray,
    },
    {
      key: 2,
      icon: require("../../assets/icons/learn.png"),
      label: "Learn",
      component: <LearnTabScreen width={width} {...props} />,
      backgroundColor: colors.yellow,
    },
    {
      key: 3,
      icon: require("../../assets/icons/leaderboard.png"),
      label: "Leaderboard",
      component: <LeaderboardTabScreen width={width} {...props} />,
      backgroundColor: colors.blue,
    },
    {
      key: 4,
      icon: require("../../assets/icons/account.png"),
      label: "Account",
      component: <AccountTabScreen width={width} {...props} />,
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
                          color,
                          fontSize: 0.026 * width,
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
    <SafeAreaView style={[styles.container]}>
      <StatusBar />
      {isLoading ? (
        <></>
      ) : (
        <>
          {props?.credentials?.pre_assestment == null ||
          props?.credentials?.pre_assestment == "" ? (
            <>
              <View style={[styles.home.header]}>
                <View style={styles.home.account}>
                  <Image
                    source={require("../../assets/images/account-images/profile.jpg")}
                    style={{ height: 30, borderRadius: 50, width: 30 }}
                  />
                  <Text style={styles.home.user}>
                    {credentials?.first_name} {credentials?.last_name}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const user_session = await AsyncStorage.removeItem(
                        "user"
                      );
                    } catch (e) {
                      console.log("Warning Occur in Home.js: " + e.message);
                    }
                    props.navigation.replace("login");
                  }}
                >
                  <Text style={styles.home.faQs}>Logout</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 50,
                  backgroundColor: colors.blue,
                  width,
                }}
              >
                <>
                  <View
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 20,
                      paddingVertical: 20,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TrophySvg />
                      <Text
                        style={{
                          fontFamily: "semibold",
                          color: colors.white,
                          fontSize: 25,
                        }}
                      >
                        Pre Assesstment
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 16,
                        textAlign: "center",
                        fontFamily: "regular",
                      }}
                    >
                      This will test you if you are having hard time to solve
                      math equations or anything related to math.
                    </Text>
                    {props?.isDone ? (
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 20,
                          marginTop: 10,
                          backgroundColor: colors.white,
                          padding: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 25,
                            textAlign: "center",
                            fontFamily: "semibold",
                          }}
                        >
                          {`${props.preassestment_score}\nTotal Score`}
                        </Text>
                        {(props?.credentials?.grade.toLowerCase() == "kinder" &&
                          props?.preassestment_score >= 10) ||
                        props?.preassestment_score >= 50 ? (
                          <Text
                            style={{
                              fontFamily: "regular",
                              textAlign: "center",
                            }}
                          >
                            Wow! Keep it up, your doing great at this point. You
                            passed the test that's it for now. Thank you for
                            taking assesstment
                          </Text>
                        ) : (
                          <>
                            <Text
                              style={{
                                fontFamily: "regular",
                                textAlign: "center",
                              }}
                            >
                              Based on your score, maybe your having trouble
                              with math anyway, We can help you improved it by
                              continuing using our application so you can learn
                              more. Best of luck!
                            </Text>

                            <TouchableOpacity
                              onPress={async () => {
                                await axios_config
                                  .put(
                                    "user/update/" + props?.credentials?._id,
                                    {
                                      pre_assestment: "failed",
                                    }
                                  )
                                  .then((res) => console.log(res))
                                  .catch((e) => console.log(e));
                                props?.setIsDone(false);
                                props?.setPreAssestmentScore(0);
                                props?.setUserCredentials({
                                  ...props?.credentials,
                                  pre_assestment: "failed",
                                });
                              }}
                            >
                              <Text
                                style={{
                                  padding: 10,
                                  paddingHorizontal: 20,
                                  fontFamily: "semibold",
                                  textAlign: "center",
                                  color: colors.white,
                                  borderRadius: 40,
                                  backgroundColor: colors.violet,
                                }}
                              >
                                Continue
                              </Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    ) : (
                      <ButtonCard
                        _={{
                          icon: require("../../assets/images/game-images/game-assestment-icons/assestment.png"),
                          title: `${
                            props?.credentials?.grade.toLowerCase() == "kinder"
                              ? "Object Number Recognition"
                              : "Plus Finger"
                          }  ${
                            props?.credentials?.grade.toLowerCase() != "kinder"
                              ? "\nCounting Bottlecaps\nNumeracy Test\nDiagnostic Test"
                              : ""
                          }`,
                          backgroundColor: colors.violet,
                          description:
                            "Complete the game's so we can help you getting better best of luck!",
                          handler: () =>
                            props.navigation.navigate("pre-assestment"),
                        }}
                      />
                    )}
                  </View>
                </>
              </View>
            </>
          ) : (
            <View style={[{ paddingTop: 0 }, styles.container]}>
              <View style={styles.home.header}>
                <View style={styles.home.account}>
                  <Image
                    source={require("../../assets/images/account-images/profile.jpg")}
                    style={{ height: 30, borderRadius: 50, width: 30 }}
                  />
                  <Text style={styles.home.user}>
                    {credentials?.first_name} {credentials?.last_name}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("faQs")}
                >
                  <Text style={styles.home.faQs}>FaQs</Text>
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
          )}
        </>
      )}
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
    preassestment_score: state.playMenu.preassestment_score,
    isDone: state.playMenu.isDone,
  };
};

export default connect(mapStateToProps, {
  setUserCredentials,
  setPreAssestmentScore,
  setIsDone,
})(StudentScreens);

const styles = StyleSheet.create(externalStyle);
