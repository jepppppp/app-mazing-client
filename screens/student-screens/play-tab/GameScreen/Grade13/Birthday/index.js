import {
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../../../../config/colors";
import Timer from "../../../../../../components/common-components/Timer";
import {
  addAudit,
  playAudio,
  playSound,
} from "../../../../../../services/tools";
import { connect } from "react-redux";
import { PASSING_SCORE } from "../../../../../../services/var.services";
const { width, height } = Dimensions.get("screen");

const Cake = (props) => {
  const [isPassed, setIsPassed] = useState(false);
  const [datas, setDatas] = useState();
  const [help, setHelp] = useState(true);
  const [resultModal, setResultModal] = useState(null);

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
      "Birthday Candle Counting"
    );
  }, []);

  const generateHandler = (answer) => {
    // checker
    if (datas?.candles == answer && answer) {
      let newPoints = points + 2;
      setPoints(newPoints);
      setIsPassed(PASSING_SCORE.KINDER <= newPoints);
      setResultModal("You are correct!");
      playSound(require("../../../../../../assets/audio/sfx/coins_sfx.wav"));
    } else if (datas?.candles != answer && answer) {
      setResultModal("You are wrong!");
      playSound(require("../../../../../../assets/audio/sfx/wrong_sfx.wav"));
    }

    // 0 = boy, 1 = girl
    const character = Math.floor(Math.random() * 2);
    const candle = Math.floor(Math.random() * 4);

    const character_reference = [
      require("../../../../../../assets/images/game-images/birthday-candle-counting-images/boy.png"),
      require("../../../../../../assets/images/game-images/birthday-candle-counting-images/girl.png"),
    ];

    const candles_reference = [
      require("../../../../../../assets/images/game-images/birthday-candle-counting-images/cake.png"),
      require("../../../../../../assets/images/game-images/birthday-candle-counting-images/cake2.png"),
      require("../../../../../../assets/images/game-images/birthday-candle-counting-images/cake3.png"),
      require("../../../../../../assets/images/game-images/birthday-candle-counting-images/cake4.png"),
    ];
    const data = {
      character_picture: character_reference[character],
      character_name: character ? "Anna" : "Bob",
      candle_picture: candles_reference[candle],
      candles: candle + 1,
    };
    setDatas(data);
  };
  const [points, setPoints] = useState(0);
  const choices = Array(4).fill(1);
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
        style={styles.banner}
        source={require("../../../../../../assets/images/game-images/birthday-candle-counting-images/happy-birthday.png")}
      />
      <Timer
        isPassed={isPassed}
        helpHandler={() => {
          if (help) {
            setHelp(false);
            if (datas?.character_name == "Bob") {
              playAudio(
                require("../../../../../../assets/audio/tutorial/bob.m4a"),
                setHelp
              );
            } else {
              playAudio(
                require("../../../../../../assets/audio/tutorial/anna.m4a"),
                setHelp
              );
            }
          }
        }}
        game_number={1}
        setPoints={setPoints}
        height={height}
        width={width}
        points={points}
        playHandler={() => {
          generateHandler;
          setIsPassed(false);
        }}
        setResultModal={setResultModal}
        resultModal={resultModal}
      />
      <View style={{ flex: 0.9 }}>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              width: 0.5 * width,
              height: 0.5 * width,
            }}
          >
            <Image
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 0.5 * width,
                height: 0.5 * width,
                resizeMode: "contain",
              }}
              source={require("../../../../../../assets/images/game-images/birthday-candle-counting-images/dialog.png")}
            />
            <Text style={styles.dialog_text}>
              How old is {datas?.character_name}?
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Image
              style={styles.character_picture}
              source={datas?.character_picture}
            />
            <Image style={styles.cake_picture} source={datas?.candle_picture} />
          </View>
        </View>
        <View style={styles?.choices_wrapper}>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 0.022 * height,
              fontFamily: "semibold",
              color: "white",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            click on the candles to count them, then select the correct number.
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            {choices?.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => generateHandler(key + 1)}
              >
                <View style={styles.choices_button_wrapper}>
                  <Image
                    style={styles.balloon_wrapper}
                    source={require("../../../../../../assets/images/game-images/baloon-images/balloon.png")}
                  />
                  <Text style={styles.choices_button}>{key + 1}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
export default connect(mapStateToProps, {})(Cake);

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
    width: 0.4 * width,
    height: 0.15 * height,
    resizeMode: "contain",
  },
  cake_picture: {
    width: 0.6 * width,
    height: 0.2 * height,
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
    fontSize: 0.022 * height,
    fontFamily: "semibold",
  },
  choices_wrapper: {
    padding: 20,
    flexDirection: "column",
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 10,
  },
  choices_button: {
    fontFamily: "semibold",
    color: colors.white,
    fontSize: 0.09 * width,
  },
  choices_button_wrapper: {
    alignItems: "center",
    borderRadius: 10,
    width: 0.21 * width,
    height: 0.21 * width,
    justifyContent: "center",
  },
  banner: {
    position: "absolute",
    width: width,
    top: 0,
    resizeMode: "contain",
    height: 0.35 * height,
  },
  balloon_wrapper: {
    position: "absolute",
    top: 10,
    left: -3,
    width: 0.21 * width,
    height: 0.21 * width,
    resizeMode: "cover",
  },
});
