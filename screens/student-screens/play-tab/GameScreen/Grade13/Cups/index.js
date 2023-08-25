import {
  Image,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import React, { useEffect, useState } from "react";
import colors from "../../../../../../config/colors";
import {
  addAudit,
  createRangenArray,
  playSound,
  random,
} from "../../../../../../services/tools";
import Timer from "../../../../../../components/common-components/Timer";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { PASSING_SCORE } from "../../../../../../services/var.services";
const { width, height } = Dimensions.get("screen");
const Cups = (props) => {
  const [isPassed, setIsPassed] = useState(false);
  const [resultModal, setResultModal] = useState(null);
  const [image, setImage] = useState();
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState();
  const images = [
    require("../../../../../../assets/images/game-images/balance-the-cups-images/scale1.png"),
    require("../../../../../../assets/images/game-images/balance-the-cups-images/scale2.png"),
    require("../../../../../../assets/images/game-images/balance-the-cups-images/scale3.png"),
    require("../../../../../../assets/images/game-images/balance-the-cups-images/scale4.png"),
  ];
  const generateHandler = () => {
    setImage(images[random(4) - 1]);
    const glass_one = 237;
    const glass_two = random(glass_one - 40);
    const glass_three = glass_one - glass_two;
    const newData = {
      glass_one,
      glass_two,
      glass_three,
    };
    setQuestion(newData);
  };
  const choices = createRangenArray(0, 9);

  const submitHandler = () => {
    if (question?.glass_three == answer) {
      let newPoints = points + 2;
      setPoints(newPoints);
      setIsPassed(PASSING_SCORE.GRADE13 <= newPoints);
      setResultModal("You are correct!");
      playSound(require("../../../../../../assets/audio/sfx/coins_sfx.wav"));
      generateHandler();
      setAnswer("");
    } else {
      setResultModal("You are wrong!");
      playSound(require("../../../../../../assets/audio/sfx/wrong_sfx.wav"));
    }
  };
  const [points, setPoints] = useState(0);
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
      "Balance the cups"
    );
  }, []);
  return (
    <>
      <LinearGradient
        start={[0, 0]}
        end={[0, 1]}
        style={{ flex: 1, position: "absolute", top: 1, height, width }}
        colors={[colors.darkviolet, colors.violet]}
      />
      <View
        style={{
          backgroundColor: colors.yellow,
          flex: 1,
          alignItems: "center",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Timer
          isPassed={isPassed}
          game_number={9}
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
          <Text
            style={{
              fontFamily: "semibold",
              textAlign: "center",
              fontSize: 0.05 * width,
            }}
          >
            Balance the amount inside the cup, provide answer to gain points.
          </Text>
          <Text
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              fontFamily: "semibold",
              textAlign: "center",
              fontSize: 0.04 * width,
            }}
          >
            The one glass holding milk of {question?.glass_one}ml and on the
            other side is holding {question?.glass_two}ml, How much much are
            needed to balance the cups?
          </Text>
          <Text
            style={{
              padding: 10,
              backgroundColor: colors.white,
              paddingHorizontal: 20,
              fontSize: 18,
              marginHorizontal: 20,
              fontFamily: "semibold",
              borderRadius: 100,
              textAlign: "center",
            }}
          >
            {!answer?.length ? "Answer" : answer}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              gap: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => submitHandler()}
            >
              <Text
                style={{
                  padding: 10,
                  backgroundColor: colors.darkyellow,
                  // color: colors.white,
                  paddingHorizontal: 40,
                  fontSize: 18,
                  fontFamily: "semibold",
                  borderRadius: 100,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setAnswer("")}>
              <Text
                style={{
                  padding: 10,
                  backgroundColor: colors.blue,
                  color: colors.white,
                  paddingHorizontal: 40,
                  fontSize: 18,
                  fontFamily: "semibold",
                  borderRadius: 100,
                }}
              >
                Clear
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              marginHorizontal: 10,
              marginVertical: 20,
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: width - 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={image}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <FlatList
              numColumns={5}
              data={choices}
              keyExtractor={(choices) => choices}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setAnswer(answer + item)}>
                  <View style={[styles.choices_button_wrapper, { margin: 3 }]}>
                    <Text style={styles.choices_button}>{item}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
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
export default connect(mapStateToProps, {})(Cups);

const styles = StyleSheet.create({
  choices_wrapper: {
    backgroundColor: colors.blue,
  },
  choices_button: {
    fontFamily: "semibold",
    fontSize: 0.08 * width,
  },
  choices_button_wrapper: {
    backgroundColor: colors.white,
    alignItems: "center",
    borderRadius: 10,
    width: 0.17 * width,
    height: 0.17 * width,
    justifyContent: "center",
  },
});
