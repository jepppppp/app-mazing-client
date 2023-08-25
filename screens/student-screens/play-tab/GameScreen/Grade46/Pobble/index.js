import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  addAudit,
  createRangenArray,
  playSound,
  random,
} from "../../../../../../services/tools";
import { useState } from "react";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import colors from "../../../../../../config/colors";
import { TouchableOpacity } from "react-native";
import { Animated } from "react-native";
import Timer from "../../../../../../components/common-components/Timer";
import { connect } from "react-redux";
import { PASSING_SCORE } from "../../../../../../services/var.services";
const { height, width } = Dimensions.get("screen");
const Pobble = (props) => {
  const [resultModal, setResultModal] = useState(null);
  const [target, setTarget] = useState(0);
  const [range, setRange] = useState(createRangenArray(1, 6));
  const [points, setPoints] = useState(0);
  const positionY = useState(new Animated.Value(0))[0];
  const [isPassed, setIsPassed] = useState(false);
  const moveUp = () => {
    Animated.timing(positionY, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    generateHandler();
    addAudit(
      {
        full_name:
          props.credentials?.first_name + " " + props.credentials?.last_name,
        id_number: props.credentials?.id_number,
        grade: props.credentials?.grade?.replace("Grade", ""),
      },
      "play",
      "Multi Pobble Game"
    );
  }, []);
  const generateHandler = () => {
    const new_range = createRangenArray(1, 6);
    setRange(new_range);
    let ct = 0;
    while (ct == 0) {
      let new_target = random(23) + 1;
      if (new_target % 2 === 0 || new_target % 3 === 0) {
        setTarget(new_target);
        ct += 1;
      }
    }
  };
  const checkHandler = () => {
    if (target % range.length === 0) {
      let newPoints = points + 2;
      setPoints(newPoints);
      setIsPassed(PASSING_SCORE.GRADE46 <= newPoints);

      setResultModal("You are correct!");
      playSound(require("../../../../../../assets/audio/sfx/coins_sfx.wav"));
    } else {
      setResultModal("You are wrong!");
      playSound(require("../../../../../../assets/audio/sfx/wrong_sfx.wav"));
    }
    moveUp();
    // setTimeout(() => {
    generateHandler();
    // }, [1000]);
  };
  const incrementHandler = () => {
    if (range.length < 6) {
      const new_range = createRangenArray(1, range.length + 1);
      setRange(new_range);
    }
  };
  const decrementHandler = () => {
    if (range.length > 2) {
      const new_range = createRangenArray(1, range.length - 1);
      setRange(new_range);
    }
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.darkblue,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Timer
          isPassed={isPassed}
          game_number={10}
          setPoints={setPoints}
          height={height}
          width={width}
          points={points}
          playHandler={() => {
            generateHandler();
            setIsPassed(false);
          }}
          setResultModal={setResultModal}
          resultModal={resultModal}
        />
        <View style={{ flex: 0.9 }}>
          <View
            style={{
              flex: 0.3,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                padding: 10,
                paddingHorizontal: 20,
                textAlign: "center",
                fontFamily: "semibold",
                fontSize: 0.05 * width,
                color: colors.white,
              }}
            >
              Make pobbles align and equal by row and column, It must be
              divisible so that they can go home.
            </Text>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 5,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  marginBottom: 5,
                  textAlign: "center",
                  fontFamily: "semibold",
                  fontSize: 0.05 * width,
                  color: colors.white,
                }}
              >
                Target Pobble: {target}
              </Text>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  transform: [{ translateY: -5 }],
                  resizeMode: "contain",
                }}
                source={require("../../../../../../assets/images/game-images/multi-pobble-images/pobble.png")}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              {range?.map((item, key) => (
                <View
                  key={key}
                  style={{
                    borderTopRightRadius: 100,
                    borderTopLeftRadius: 100,
                    backgroundColor: colors.orange,
                    borderWidth: 2,
                    width: width / range.length - 10,
                    height: width / range.length - 10,
                    marginHorizontal: 5,
                  }}
                ></View>
              ))}
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
              backgroundColor: colors.yellow,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {createRangenArray(1, target)?.map((item, key) => (
              <Animated.View
                key={`po${key}`}
                style={{
                  width: width / 6,
                  height: width / 6,
                  transform: [
                    { translateY: key > 10 ? random(2) : random(20) },
                    { translateX: key % 6 ? 2 : 20 },
                  ],
                }}
              >
                <Image
                  style={{
                    width: width / 6,
                    height: width / 6,
                    resizeMode: "contain",
                  }}
                  source={require("../../../../../../assets/images/game-images/multi-pobble-images/pobble.png")}
                />
              </Animated.View>
            ))}
          </View>
          <View
            style={{
              flex: 0.2,
              alignItems: "center",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={decrementHandler}>
                <Text
                  style={[
                    styles.button,
                    { fontSize: 17, fontFamily: "semibold" },
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text style={[styles.button, { backgroundColor: "transparent" }]}>
                {range.length}
              </Text>
              <TouchableOpacity onPress={incrementHandler}>
                <Text
                  style={[
                    styles.button,
                    { fontSize: 17, fontFamily: "semibold" },
                  ]}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={checkHandler}>
              <Text
                style={[
                  styles.button,
                  {
                    textAlign: "center",
                    borderRadius: 100,
                    backgroundColor: colors.blue,
                    color: "white",
                    paddingHorizontal: 40,
                  },
                ]}
              >
                Check
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};
export default connect(mapStateToProps, {})(Pobble);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontFamily: "semibold",
    backgroundColor: "white",
    fontSize: 18,
  },
});
