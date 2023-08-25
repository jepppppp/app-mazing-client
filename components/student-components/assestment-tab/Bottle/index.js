import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  createRangenArray,
  playSound,
  random,
} from "../../../../services/tools";
import colors from "../../../../config/colors";
import Timer from "../../../../components/common-components/Timer";
import { setPreAssestmentScore } from "../../../../redux";
import { Dimensions } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { cap_images } from "../../../../services/var.services";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("screen");

const Bottle = (props) => {
  const [resultModal, setResultModal] = useState(null);
  const [answer, setAnswer] = useState(0);
  const [points, setPoints] = useState(0);
  const choices = createRangenArray(1, 10);
  const [caps, setCaps] = useState([]);
  const generateHandler = () => {
    let ran = random(10);
    setAnswer(ran);
    let arr = createRangenArray(1, ran)?.map((_, i) => ({
      key: i,
      image: cap_images[random(4) - 1],
    }));
    setCaps(arr);
  };
  const answerHandler = (item) => {
    if (item == answer) {
      setPoints(points + 2);
      setResultModal("You are correct!");
      playSound(require("../../../../assets/audio/sfx/coins_sfx.wav"));
    } else {
      setResultModal("You are wrong!");
      playSound(require("../../../../assets/audio/sfx/wrong_sfx.wav"));
    }
    generateHandler();
  };
  useEffect(() => {
    generateHandler();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Timer
        isAssestment={true}
        game_number={-1}
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
      <View style={{ flex: 0.9, alignItems: "center" }}>
        <Text style={styles?.dialog_text}>
          Count the bottle caps and select the right answer below.
        </Text>
        <FlatList
          numColumns={5}
          data={caps}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Image style={styles.img} source={item.image} />
          )}
        />
        <FlatList
          numColumns={5}
          data={choices}
          keyExtractor={(choices) => choices}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => answerHandler(item)}>
              <View style={[styles.choices_button_wrapper, { margin: 3 }]}>
                <Text style={styles.choices_button}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    preassestment_score: state.playMenu.preassestment_score,
  };
};

export default connect(mapStateToProps, { setPreAssestmentScore })(Bottle);

const styles = StyleSheet.create({
  choices_wrapper: {
    backgroundColor: colors.blue,
  },
  choices_button: {
    fontFamily: "semibold",
    fontSize: 0.08 * width,
  },
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
  choices_button_wrapper: {
    backgroundColor: colors.white,
    alignItems: "center",
    borderRadius: 10,
    width: 0.17 * width,
    height: 0.17 * width,
    justifyContent: "center",
    // margin: 0.01 * width,
  },
  img: {
    height: width / 5,
    width: width / 5,
  },
});
