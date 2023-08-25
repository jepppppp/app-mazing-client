import { StyleSheet, Image, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import colors from "../../../../../../config/colors";
import { Dimensions } from "react-native";
import { FlatList } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import { setPreAssestmentScore } from "../../../../../../redux";
import Timer from "../../../../../../components/common-components/Timer";
import {
  addAudit,
  createRangenArray,
  playAudio,
  playSound,
  random,
} from "../../../../../../services/tools";
import { connect } from "react-redux";
import { PASSING_SCORE } from "../../../../../../services/var.services";

const { width, height } = Dimensions.get("screen");

const Recognition = (props) => {
  const [isPassed, setIsPassed] = useState(false);
  const [resultModal, setResultModal] = useState(null);
  const [datas, setDatas] = useState(null);
  const [points, setPoints] = useState(0);
  const [help, setHelp] = useState(true);

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
      "Object Number Recognition"
    );
  }, []);

  const choices = createRangenArray(1, 10);

  const generateHandler = () => {
    // 0 = cyan, 1 = red, 2 = green, 3 = yellow;
    const car = random(4);
    let flag = false;
    while (!flag) {
      let row1 = [random(4), random(4), random(4), random(4)];
      let row2 = [random(4), random(4), random(4), random(4)];
      let row3 = [random(4), random(4), random(4), random(4)];
      let row4 = [random(4), random(4), random(4), random(4)];

      let count =
        row1.filter((item) => item == car)?.length +
        row2.filter((item) => item == car)?.length +
        row3.filter((item) => item == car)?.length +
        row4.filter((item) => item == car)?.length;

      if (count <= 10 && count > 0) {
        setDatas({
          cars: objectImageHandler([...row1, ...row2, ...row3, ...row4]),
          count,
          car_name: car,
        });
        flag = true;
      }
    }
  };
  const answerHandler = (item) => {
    if (datas?.count == item) {
      let newPoints = points + 2;
      setPoints(newPoints);
      setIsPassed(PASSING_SCORE.KINDER <= newPoints);
      setResultModal("You are correct!");
      playSound(require("../../../../../../assets/audio/sfx/coins_sfx.wav"));
    } else {
      setResultModal("You are wrong!");
      playSound(require("../../../../../../assets/audio/sfx/wrong_sfx.wav"));
    }
    generateHandler();
  };
  const objectImageHandler = (item) => {
    const car_image = [
      require("../../../../../../assets/images/game-images/object-recognition-images/apple.png"),
      require("../../../../../../assets/images/game-images/object-recognition-images/bird.png"),
      require("../../../../../../assets/images/game-images/object-recognition-images/green.png"),
      require("../../../../../../assets/images/game-images/object-recognition-images/pencil.png"),
    ];
    let temp = [];
    for (let x of item) {
      temp.push(car_image[x - 1]);
    }
    return temp;
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
        style={{ position: "absolute", top: 0, left: 0, resizeMode: "contain" }}
        source={require("../../../../../../assets/images/game-images/object-recognition-images/recognition_bg.jpg")}
      />
      <Timer
        isPassed={isPassed}
        isAssestment={props?.isAssestment}
        helpHandler={() => {
          if (help) {
            setHelp(false);
            playAudio(
              require("../../../../../../assets/audio/tutorial/car.m4a"),
              setHelp
            );
          }
        }}
        game_number={7}
        setPoints={setPoints}
        height={height}
        width={width}
        points={points}
        playHandler={() => {
          if (props?.isAssestment) {
            props?.setPreAssestmentScore(props?.preassestment_score + points);
            props?.nextHandler();
          } else {
            generateHandler();
            setIsPassed(false);
          }
        }}
        setResultModal={setResultModal}
        resultModal={resultModal}
      />
      <View
        style={{
          flex: 0.9,
          // backgroundColor: colors.red,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Text style={styles.heading}>
          How many{" "}
          {datas?.car_name == 1
            ? "apple"
            : datas?.car_name == 2
            ? "bird"
            : datas?.car_name == 3
            ? "car"
            : "pencil"}{" "}
          do you see?
        </Text>
        <FlatList
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.white,
            borderRadius: 20,
            padding: 10,
          }}
          numColumns={4}
          data={datas?.cars}
          renderItem={({ item, keys }) => (
            <View key={keys} style={styles.choices_button_wrapper}>
              <Image source={item} style={styles.car_image} />
            </View>
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
    credentials: state.user.credentials,
    preassestment_score: state.playMenu.preassestment_score,
  };
};
export default connect(mapStateToProps, { setPreAssestmentScore })(Recognition);

const styles = StyleSheet.create({
  generate: {
    padding: 20,
    backgroundColor: colors.blue,
    color: colors.white,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "semibold",
  },
  character_picture: {
    width: 0.5 * width,
    height: 0.15 * height,
    resizeMode: "contain",
  },
  car_image: {
    width: 0.1 * width,
    height: 0.1 * width,
    resizeMode: "contain",
  },
  cake_picture: {
    width: 0.5 * width,
    height: 0.15 * height,
    resizeMode: "contain",
  },
  dialog_image: {
    width: 0.5 * width,
    height: 0.15 * height,
    resizeMode: "contain",
  },
  dialog_card: {
    position: "relative",
  },
  dialog_text: {
    fontSize: 0.05 * height,
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
    // margin: 0.01 * width,
  },
  banner: {
    width: width,
    resizeMode: "contain",
    height: 0.3 * height,
  },
  heading: {
    padding: 10,
    // paddingHorizontal:20,
    borderRadius: 20,
    backgroundColor: colors.white,
    fontFamily: "semibold",
    fontSize: 0.025 * height,
  },
});
