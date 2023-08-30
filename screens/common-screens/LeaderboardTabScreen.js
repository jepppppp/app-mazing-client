import {
  Animated,
  Easing,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import colors from "../../config/colors";
import { externalStyle } from "../../styles/externalStyle";
import { DownArrowSvg, TrophySvg } from "../../components/svg-components";
import { GAMES } from "../../services/var.services";
import axios_config from "../../config/axios_config";
import { useEffect } from "react";
import { RefreshControl } from "react-native";
import { connect } from "react-redux";
import { timeFormatter } from "../../services/tools";

const LeaderboardTabScreen = ({ width, credentials, navigation }) => {
  const [dropDownEnabled, setDropDownEnabled] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const scaleRef = useRef(0);
  const [data, setData] = useState([]);
  const GAME_LIST = GAMES.filter((g) => g.allowed.includes(credentials?.grade));
  const [game, setGame] = useState(GAME_LIST[0]);
  const startAnimation = (event) => {
    if (dropDownEnabled) {
      setDropDownEnabled(false);
      scaleRef.current = !scaleRef.current;
      Animated.timing(animation, {
        toValue: scaleRef.current,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        event?.preHandler();
        setDropDownEnabled(true);
      }, 1100);
    }
  };

  const uniqueArray = (arrayOfObjects) => {
    return Array.from(new Set(arrayOfObjects?.map((obj) => obj.lrn)))?.map(
      (lrn) => {
        return arrayOfObjects?.find((obj) => obj?.lrn === lrn);
      }
    );
  };

  const load = async () => {
    await axios_config
      .get("highscore/find/" + game?.value)
      .then((res) => {
        let d =
          credentials?.role == 2
            ? res?.data?.data
                .filter(
                  (d) =>
                    d.lrn == credentials?.id_number &&
                    d?.grade == credentials?.grade
                )
                .sort((a, b) => {
                  // Compare by 'points' first
                  if (a.points < b.points) return 1;
                  if (a.points > b.points) return -1;

                  // If 'points' is the same, compare by 'duration'
                  if (a.duration < b.duration) return 1;
                  if (a.duration > b.duration) return -1;

                  return 0; // Objects are equal in both keys
                })
            : uniqueArray(
                res?.data?.data.filter((d) => d?.grade == credentials?.grade)
              ).sort((a, b) => a.name.localeCompare(b.name));
        setData(d);
      })
      .catch((e) => console.log(e));
  };
  const refresHandler = async () => {
    setIsRefreshing(true);
    await load();
    setIsRefreshing(false);
  };
  useEffect(() => {
    load();
  }, [game, isRefreshing]);

  return (
    <>
      <View
        style={{
          flex: 1,
          paddingTop: 50,
          backgroundColor: colors.blue,
          width,
        }}
      >
        <View
          style={{
            flex: 0.25,
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            paddingVertical: 20,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TrophySvg />
            <Text
              style={{
                fontFamily: "semibold",
                color: colors.white,
                fontSize: 25,
              }}
            >
              Leaderboards
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
            Change below the game type.
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => startAnimation()}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: width - 40,
                  backgroundColor: "white",
                  borderColor: colors.darkblue,
                  borderWidth: 3,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 50,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "regular",
                    fontSize: width * 0.04,
                  }}
                >
                  {game?.label || GAME_LIST[0]?.label}
                </Text>
                <DownArrowSvg />
              </View>
            </TouchableOpacity>
            <View
              style={{
                top: 70,
                position: "absolute",
                backgroundColor: "white",
                borderRadius: 20,
              }}
            >
              <FlatList
                numColumns={3}
                data={GAME_LIST}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      startAnimation({ preHandler: () => setGame(item) });
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: (width - 40) / 3,
                        minHeight: (width - 40) / 3,
                      }}
                    >
                      {item?.image && (
                        <Image
                          source={item?.image}
                          style={{ width: 30, height: 30, resizeMode: "cover" }}
                        />
                      )}
                      <Text
                        style={{
                          textAlign: "center",
                          paddingHorizontal: width * 0.05,
                          fontFamily: "semibold",
                          fontSize: width * 0.03,
                          borderColor: colors.lightgray,
                        }}
                      >
                        {item.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>

        <Animated.View
          style={{
            flex: 0.75,
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            overflow: "hidden",
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 260],
                }),
              },
              {
                scaleX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                }),
              },
              {
                scaleY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                }),
              },
            ],
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 20,
              borderRadius: 10,
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 17, fontFamily: "semibold" }}>
              {credentials?.role == 2 ? "Top Score" : "Students"}
            </Text>
            {
              // is teacher
              credentials?.role == 2 && (
                <Text style={{ fontSize: 17, fontFamily: "semibold" }}>
                  Points and Duration
                </Text>
              )
            }
          </View>
          {data?.length > 0 ? (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={refresHandler}
                />
              }
              keyboardShouldPersistTaps={"handled"}
              nestedScrollEnabled={true}
              numColumns={1}
              data={data}
              contentContainerStyle={{
                paddingHorizontal: 20,
              }}
              keyExtractor={(item, key) => "user-" + key}
              renderItem={({ item, index }) => (
                <View
                  key={`user-${index}`}
                  style={{
                    paddingVertical: 7,
                    borderRadius: 10,
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        marginRight: 5,
                        fontFamily: "semibold",
                        color: index == 0 && colors.blue,
                      }}
                    >
                      #{index + 1}
                    </Text>

                    <Text
                      style={{
                        fontSize: 17,
                        paddingHorizontal: 5,
                        fontFamily: index == 0 ? "semibold" : "regular",
                        color: index == 0 && colors.blue,
                      }}
                    >
                      {item?.name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      credentials?.role == 1 &&
                        navigation?.navigate({
                          name: `leaderboard-history`,
                          params: { lrn: item?.lrn, game_title: game?.value },
                          merge: true,
                        });
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: index == 0 ? "semibold" : "regular",
                        fontSize: 17,
                        color: index == 0 && colors.blue,
                      }}
                    >
                      {credentials?.role == 2
                        ? `${item?.points} in ${timeFormatter(item?.duration)}`
                        : "History"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontFamily: "semibold",
                fontSize: 17,
                color: colors.lightgray,
              }}
            >
              No player data available right now.
            </Text>
          )}
        </Animated.View>
      </View>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};
export default connect(mapStateToProps, {})(LeaderboardTabScreen);

const styles = StyleSheet.create(externalStyle);