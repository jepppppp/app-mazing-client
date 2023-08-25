import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  Animated,
} from "react-native";
import React from "react";
import {
  addAudit,
  playAudio,
  playSound,
  random,
} from "../../../../../../services/tools";
import { useEffect } from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import colors from "../../../../../../config/colors";
import Timer from "../../../../../../components/common-components/Timer";
import { connect } from "react-redux";
import { PASSING_SCORE } from "../../../../../../services/var.services";

const { width, height } = Dimensions.get("screen");

const Balloon = (props) => {
  const [isPassed, setIsPassed] = useState(false);
  const [help, setHelp] = useState(true);
  const [resultModal, setResultModal] = useState(null);
  const [equation, setEquation] = useState([]);
  const [points, setPoints] = useState(0);
  const [target, setTarget] = useState("");
  const operators = ["+", "-", "/", "*"];
  const topValue = useState(new Animated.Value(0))[0];

  const moveBalloon = () => {
    Animated.timing(topValue, {
      toValue: height * -1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    addAudit(
      {
        full_name:
          props.credentials?.first_name + " " + props.credentials?.last_name,
        id_number: props.credentials?.id_number,
        grade: props.credentials?.grade?.replace("Grade", ""),
      },
      "play",
      "Balloon Game"
    );
    generateHandler();
  }, []);
  const generateHandler = () => {
    moveBalloon();
    // 1st generate two operands in array
    let temp = [];
    temp.push(random(10) + operators[random(4) - 1] + random(10));
    temp.push(random(10) + operators[random(4) - 1] + random(10));
    temp.push(random(10) + operators[random(4) - 1] + random(10));
    temp.push(random(10) + operators[random(4) - 1] + random(10));
    setTarget(eval(temp[random(4) - 1]).toFixed(2) * 1);
    setEquation(temp);
  };
  const submitHandler = (item) => {
    if (eval(item).toFixed(2) * 1 == target) {
      let newPoints = points + 2;
      setPoints(newPoints);
      setIsPassed(PASSING_SCORE.GRADE13 <= newPoints);
      setResultModal("You are correct!");
      playSound(require("../../../../../../assets/audio/sfx/coins_sfx.wav"));
    } else {
      setResultModal("You are wrong!");
      playSound(require("../../../../../../assets/audio/sfx/wrong_sfx.wav"));
    }
    generateHandler();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={{
          position: "absolute",
          top: 0,
          // left: 0,
          resizeMode: "cover",
          // height,
        }}
        source={require("../../../../../../assets/images/game-images/baloon-images/balloon_bg.jpg")}
      />
      <Timer
        helpHandler={() => {
          if (help) {
            setHelp(false);
            playAudio(
              require("../../../../../../assets/audio/tutorial/baloon.m4a"),
              setHelp
            );
          }
        }}
        game_number={5}
        setPoints={setPoints}
        height={height}
        width={width}
        points={points}
        playHandler={() => {
          generateHandler();
          setIsPassed(false);
        }}
        isPassed={isPassed}
        setResultModal={setResultModal}
        resultModal={resultModal}
      />
      <View style={{ flex: 0.9 }}>
        <Text style={[styles.text, { color: colors.white, fontSize: 20 }]}>
          Choose the right equation that equals to target value
        </Text>
        <Text style={[styles.text, { color: colors.white, fontSize: 25 }]}>
          Target: {target}
        </Text>
        <View
          style={{
            flexDirection: "row",
            // paddingTop: height,
          }}
        >
          {equation.map((item, key) => (
            <TouchableOpacity key={key} onPress={() => submitHandler(item)}>
              <View
                style={{
                  width: width / 4,
                  height: width / 4,
                  // transform: [{ translateY: topValue }],
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    width: width / 4,
                    height: width / 4,
                  }}
                  source={require("../../../../../../assets/images/game-images/baloon-images/balloon.png")}
                />
                <Text style={styles.balloon_text}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};
export default connect(mapStateToProps, {})(Balloon);

const styles = StyleSheet.create({
  balloon_text: {
    fontFamily: "semibold",
    fontSize: width * 0.05,
    // paddingBottom: 10,
    transform: [{ translateY: -10 }, { translateX: 5 }],
  },
  text: {
    fontFamily: "semibold",
    padding: 20,
    textAlign: "center",
    paddingVertical: 5,
    fontSize: 17,
  },
});
