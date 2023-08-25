import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  addAudit,
  playAudio,
  playSound,
  random,
} from "../../../../../../services/tools";
import { useEffect } from "react";
import {
  PASSING_SCORE,
  number_data,
} from "../../../../../../services/var.services";
import colors from "../../../../../../config/colors";
import Timer from "../../../../../../components/common-components/Timer";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { useRef } from "react";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("screen");

const Number = (props) => {
  const [isPassed, setIsPassed] = useState(false);
  const answerRef = useRef({ number: "", word: "" });
  const [help, setHelp] = useState(true);
  const [resultModal, setResultModal] = useState(null);
  const [points, setPoints] = useState(0);
  const [matchA, setMatchA] = useState([]);
  const [matchB, setMatchB] = useState([]);
  const [data, setData] = useState([]);

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
      "Connect the number"
    );
  }, []);

  const generateHandler = () => {
    let temp_data = [];

    while (temp_data.length < 5) {
      let ran = number_data[random(10) - 1];
      if (temp_data.filter((_) => _.number == ran.number).length == 0) {
        temp_data.push(ran);
      }
    }
    setData(temp_data);
    setMatchA(scrambleHandler(temp_data.map((_) => _.number)));
    setMatchB(scrambleHandler(temp_data.map((_) => _.word)));
  };
  const scrambleHandler = (arr) => {
    let array = arr;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array.map((_) => ({
      ans: _,
      disabled: false,
    }));
  };

  const checkAnswerHandler = (newData) => {
    answerRef.current = { ...answerRef.current, ...newData };
    let answer = answerRef.current;
    if (
      data.filter(
        (d) => d.number == answer?.number?.ans && d.word == answer?.word?.ans
      ).length
    ) {
      setResultModal("You are correct!");
      playSound(require("../../../../../../assets/audio/sfx/coins_sfx.wav"));
      let index_a = answer?.number?.index;
      let list_a = matchA;
      list_a[index_a] = { ...list_a[index_a], disabled: true };
      setMatchA([...list_a]);

      let index_b = answer?.word?.index;
      let list_b = matchB;
      list_b[index_b] = { ...list_b[index_b], disabled: true };
      setMatchB([...list_b]);
      if (matchA.filter((item) => item?.disabled == true).length == 5) {
        generateHandler();
      }
      answerRef.current = {};
      let newPoints = points + 2;
      setPoints(newPoints);
      setIsPassed(PASSING_SCORE.KINDER <= newPoints);
    } else {
      if (answer?.number && answer?.word) {
        setResultModal("You are wrong!");
        playSound(require("../../../../../../assets/audio/sfx/wrong_sfx.wav"));
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        backgroundColor: colors.darkblue,
      }}
    >
      <Timer
        isPassed={isPassed}
        helpHandler={() => {
          if (help) {
            setHelp(false);
            playAudio(
              require("../../../../../../assets/audio/tutorial/number.m4a"),
              setHelp
            );
          }
        }}
        game_number={2}
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
      <Text
        style={{
          fontFamily: "semibold",
          fontSize: 0.05 * width,
          textAlign: "center",
          color: colors.white,
        }}
      >
        Match the numbers into the corresponding words.
      </Text>
      <View
        style={{
          flex: 0.9,
          flexDirection: "row",
          gap: 10,
          padding: 20,
        }}
      >
        <View style={{ width: width / 2 - 25, gap: 10 }}>
          {matchA.map((_, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={!_.disabled ? 0.7 : 1}
              onPress={() => {
                if (!_.disabled)
                  checkAnswerHandler({ number: { ..._, index: i } });
              }}
            >
              <Text
                style={{
                  backgroundColor: _.disabled ? colors.extralightgray : "white",
                  padding: 20,
                  fontFamily: "regular",
                  borderRadius: 10,

                  textAlign: "center",
                  fontSize: 0.07 * width,
                }}
              >
                {_?.ans}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ width: width / 2 - 25, gap: 10 }}>
          {matchB.map((_, i) => (
            <TouchableOpacity
              activeOpacity={!_.disabled ? 0.7 : 1}
              key={i}
              onPress={() => {
                if (!_.disabled)
                  checkAnswerHandler({ word: { ..._, index: i } });
              }}
            >
              <Text
                style={{
                  backgroundColor: _.disabled ? colors.extralightgray : "white",
                  padding: 20,
                  fontFamily: "regular",
                  borderRadius: 10,
                  textAlign: "center",
                  fontSize: 0.07 * width,
                }}
              >
                {_?.ans}
              </Text>
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
export default connect(mapStateToProps, {})(Number);

const styles = StyleSheet.create({});
