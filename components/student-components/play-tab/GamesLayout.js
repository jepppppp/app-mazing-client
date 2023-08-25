import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { externalStyle } from "../../../styles/externalStyle";
import colors from "../../../config/colors";
import { connect } from "react-redux";
import { useRef } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { PLAY_MENU_DATA } from "../../../services/var.services";
const { width, height } = Dimensions.get("window");
const PlayMenu = (props) => {
  const slidesRef = useRef();
  const headerHeight = useHeaderHeight();

  const scrollY = useRef(new Animated.Value(0)).current;
  const DATA = PLAY_MENU_DATA[props.grade_category];

  const Indicator = ({ scrollY, scrollTo }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          height: height - headerHeight,
        }}
      >
        <View
          style={{
            height: 165,
            position: "relative",
            marginLeft: 20,
            transform: [{ rotate: "180deg" }],
          }}
        >
          <View
            style={{
              width: 2,
              left: 16.5,
              backgroundColor: colors.extralightgray,
              position: "absolute",
              height: DATA.length == 3 ? 155 : 210,
              top: 5,
              flex: 1,
            }}
          />
          {DATA.map((_, i) => {
            const inputRange = [
              // (i - 5) * height,

              (i - 6) * height,
              (i - 5) * height,
              (i - 4) * height,

              (i - 3) * height,
              (i - 2) * height,
              (i - 1) * height,
              i * height,
              (i + 1) * height,
              (i + 2) * height,
              (i + 3) * height,
              (i + 4) * height,
              (i + 5) * height,
              (i + 6) * height,
              (i + 7) * height,
            ];

            const color = scrollY.interpolate({
              inputRange,
              outputRange: [
                // colors.extralightgray,
                colors.extralightgray,
                colors.extralightgray,
                colors.extralightgray,
                colors.extralightgray,
                colors.extralightgray,
                colors.extralightgray,
                i == 0
                  ? colors.yellow
                  : i == 1
                  ? colors.blue
                  : i == 2
                  ? colors.red
                  : i == 3
                  ? colors.green
                  : i == 4
                  ? colors.violet
                  : i == 5 && colors.green,
                colors.extralightgray,
                colors.extralightgray,
                colors.extralightgray,
                colors.extralightgray,
                colors.extralightgray,
                colors.extralightgray,
                colors.extralightgray,
              ],
            });
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [
                0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 1.2, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8,
                0.8,
              ],
            });
            const border = scrollY.interpolate({
              inputRange,
              outputRange: [0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0],
            });
            return (
              <Animated.View
                key={`indicator-${i}`}
                style={{
                  marginVertical: i == 1 || i == 3 ? 30 : 0,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    scrollTo(i);
                  }}
                  activeOpacity={0.9}
                >
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Animated.View
                      style={[
                        {
                          backgroundColor: color,
                          borderRadius: 50,
                          height: 35,
                          width: 35,
                          borderWidth: border,
                          borderColor: "rgba(0,0,0,.5)",
                          transform: [
                            {
                              scale,
                            },
                          ],
                        },
                      ]}
                    />
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
    <View
      style={[
        {
          backgroundColor: colors.gray,
        },
      ]}
    >
      <StatusBar />

      <Animated.FlatList
        inverted
        ref={slidesRef}
        data={DATA}
        pagingEnabled
        vertical
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                height: height - headerHeight,
                //   backgroundColor: "red",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
                width,
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  //   flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  flexShrink: 1,
                  marginRight: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate(`game-${item.key}`);
                  }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: item.backgroundColor,
                      padding: 20,
                      borderRadius: 100,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: 150,
                        resizeMode: "contain",
                        height: 150,
                      }}
                    />
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    marginLeft: 100,
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      color: "white",
                      fontFamily: "semibold",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: "white",
                      textAlign: "center",
                      flexShrink: 1,
                      textAlign: "left",
                      fontFamily: "regular",
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.key}
      />
      <Indicator
        scrollY={scrollY}
        scrollTo={(id) => {
          slidesRef.current.scrollToIndex({ index: id });
        }}
      />
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    grade_category: state.playMenu.grade_category,
  };
};
export default connect(mapStateToProps, {})(PlayMenu);

const styles = StyleSheet.create(externalStyle);
