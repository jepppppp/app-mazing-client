import {
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../../config/colors";
import { setPreAssestmentScore } from "../../../../redux";
import Timer from "../../../common-components/Timer";
import {
  createRangenArray,
  playSound,
  random,
} from "../../../../services/tools";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { FlatList } from "react-native";
const { width, height } = Dimensions.get("screen");

const Hand = (props) => {
  const [resultModal, setResultModal] = useState(null);

  const [points, setPoints] = useState(0);
  const [datas, setDatas] = useState();
  const [answer, setAnswer] = useState("");

  const choices = createRangenArray(0, 9);

  useEffect(() => {
    props?.setPreAssestmentScore(0);
    generateHandler();
  }, []);

  const generateHandler = () => {
    // checker
    if (datas?.sum == answer && answer) {
      let current_points = points + 2;
      setPoints(current_points);
      setResultModal("You are correct!");
      playSound(require("../../../../assets/audio/sfx/coins_sfx.wav"));
    } else if (datas?.sum != answer && answer) {
      setResultModal("You are wrong!");
      playSound(require("../../../../assets/audio/sfx/wrong_sfx.wav"));
    }

    const gestures = [random(5), random(5), random(5)];
    let temp_sum = 0;
    gestures.forEach((num) => {
      temp_sum += num;
    });
    const data = {
      sum: temp_sum,
      gestures_image: handHandler(gestures),
    };
    setDatas(data);
    setAnswer("");
  };
  const handHandler = (item) => {
    const hand_image = [
      require("../../../../assets/images/game-images/counting-finger-images/1finger.png"),
      require("../../../../assets/images/game-images/counting-finger-images/2finger.png"),
      require("../../../../assets/images/game-images/counting-finger-images/3finger.png"),
      require("../../../../assets/images/game-images/counting-finger-images/4finger.png"),
      require("../../../../assets/images/game-images/counting-finger-images/5finger.png"),
    ];
    let temp = [];
    for (let x of item) {
      temp.push(hand_image[x - 1]);
    }
    return temp;
  };

  return (
    <>
      <LinearGradient
        start={[0, 0]}
        end={[0, 1]}
        style={{ flex: 1, position: "absolute", top: 1, height, width }}
        colors={[colors.blue, colors.red]}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Timer
          isAssestment={true}
          game_number={8}
          setPoints={setPoints}
          height={height}
          width={width}
          points={points}
          playHandler={() => {
            props?.setPreAssestmentScore(props?.preassestment_score + points);
            props?.nextHandler();
          }}
          setResultModal={setResultModal}
          resultModal={resultModal}
        />
        <View
          style={{
            flex: 0.9,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.dialog_text}>
            What number will be the result when the number of hand gesture you
            see is added?
          </Text>
          <View style={{ flexDirection: "row" }}>
            {datas?.gestures_image?.map((_, key) => (
              <Image source={_} key={key} style={styles.gesture_image} />
            ))}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.character_picture}
              source={datas?.character_picture}
            />
            <Image style={styles.cake_picture} source={datas?.candle_picture} />
          </View>
          <View>
            <Text
              onChangeText={(e) => setAnswer(e)}
              value={answer}
              style={styles.input}
            >
              {answer?.length ? answer : 0}
            </Text>
            <View
              style={{ gap: 5, alignItems: "center", flexDirection: "row" }}
            >
              <TouchableOpacity onPress={() => generateHandler()}>
                <Text style={styles.continue_button}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAnswer("")}>
                <Text style={styles.continue_button}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    preassestment_score: state.playMenu.preassestment_score,
  };
};

export default connect(mapStateToProps, { setPreAssestmentScore })(Hand);

const styles = StyleSheet.create({
  dialog_text: {
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    backgroundColor: colors.white,
    fontSize: 0.027 * height,
    paddingHorizontal: 20,
    fontFamily: "semibold",
    textAlign: "center",
  },
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
  // start
  input: {
    textAlign: "center",
    padding: 10,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: colors.extralightgray,
    borderRadius: 10,
    fontSize: 0.04 * height,
    fontFamily: "semibold",
  },
  continue_button: {
    fontSize: 0.025 * height,
    fontFamily: "semibold",
    backgroundColor: colors.white,
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    padding: 10,
  },
  gesture_image: {
    width: 0.3 * width,
    height: 0.3 * width,
    resizeMode: "contain",
    margin: 5,
  },
});
