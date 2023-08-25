import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import { addAudit, playSound, random } from "../../../../../../services/tools";
import { useEffect } from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import Timer from "../../../../../../components/common-components/Timer";
import colors from "../../../../../../config/colors";
import { connect } from "react-redux";
import { PASSING_SCORE } from "../../../../../../services/var.services";
const { width, height } = Dimensions.get("screen");

const Owl = (props) => {
  const [resultModal, setResultModal] = useState(null);
  const [keys, setKeys] = useState([]);
  const [points, setPoints] = useState(0);
  const [target, setTarget] = useState("");
  const operators = ["+", "-", "/", "*"];
  const [answer, setAnswer] = useState(["", "", "", "", ""]);
  const positionY = useState(new Animated.Value(0))[0];
  const endgameRef = useRef(false);
  const [isPassed, setIsPassed] = useState(false);
  const moveUp = () => {
    Animated.timing(positionY, {
      toValue: -350,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const moveMiddle = () => {
    Animated.timing(positionY, {
      toValue: -300,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const moveDown = () => {
    Animated.timing(positionY, {
      toValue: height,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    moveMiddle();
    generateHandler();
    addAudit(
      {
        full_name:
          props.credentials?.first_name + " " + props.credentials?.last_name,
        id_number: props.credentials?.id_number,
        grade: props.credentials?.grade?.replace("Grade", ""),
      },
      "play",
      "Owl Game"
    );
  }, []);
  const generateHandler = () => {
    // 1st generate two operands in array
    let temp = [];
    let num1 = random(5);
    let num2 = random(5);
    let num3 = random(5);

    let op1 = operators[random(4) - 1];
    let op2 = operators[random(4) - 1];
    temp = [num1, num2, num3, op1, op2];
    temp.push(random(5));
    temp.push(random(5));
    temp.push(random(5));
    temp.push(random(5));
    temp.push(random(5));

    const tar = (
      Math.round(
        (eval(num1 + op1 + num2 + op2 + num3) + Number.EPSILON) * 100
      ) / 100
    )
      .toString()
      .replace(".", "");
    setTarget(tar);
    setKeys(temp);
    scrambleHandler(temp);
  };
  const scrambleHandler = (arr) => {
    let array = arr;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setKeys(array);
  };
  const submitHandler = (item, index) => {
    const length = answer.indexOf("");
    let temp_answer = answer;
    if (length < 5) {
      temp_answer[length] = item;
      setAnswer([...temp_answer]);
      if (length == 4) {
        let final_equation = temp_answer.join("");
        try {
          const tar = (
            Math.round((eval(final_equation) + Number.EPSILON) * 100) / 100
          )
            .toString()
            .replace(".", "");
          if (tar == target) {
            let newPoints = points + 2;
            setPoints(newPoints);
            setIsPassed(PASSING_SCORE.GRADE46 <= newPoints);
            moveUp();
            setResultModal("You are correct!");
            playSound(
              require("../../../../../../assets/audio/sfx/coins_sfx.wav")
            );
            setAnswer(["", "", "", "", ""]);

            generateHandler();
          } else {
            setPoints(0);
            endgameRef.current = true;
            setResultModal("You are wrong!");
            playSound(
              require("../../../../../../assets/audio/sfx/wrong_sfx.wav")
            );
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        return;
      }
    }
  };
  const removeHandler = (index) => {
    let temp_answer = answer;
    temp_answer[index] = "";
    setAnswer([...temp_answer]);
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
        source={require("../../../../../../assets/images/game-images/owl-images/owl_bg.jpg")}
      />
      <Timer
        isPassed={isPassed}
        game_number={6}
        setPoints={setPoints}
        height={height}
        width={width}
        points={points}
        endGame={endgameRef.current}
        playHandler={() => {
          generateHandler();
          moveMiddle();
          endgameRef.current = false;
          setAnswer(["", "", "", "", ""]);
          setIsPassed(false);
        }}
        setResultModal={setResultModal}
        resultModal={resultModal}
      />
      <View
        style={{
          flex: 0.9,
        }}
      >
        <View
          style={{
            flex: 0.5,
            height: 0.2 * height,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              top: 300,
              transform: [{ translateY: positionY }],
            }}
          >
            <Image
              source={require("../../../../../../assets/images/game-images/owl-images/owlgif.gif")}
              style={{
                height: 0.2 * height,
                width: 200,
                resizeMode: "contain",
              }}
            />
          </Animated.View>
        </View>
        <View
          style={{
            flex: 0.5,
          }}
        >
          <FlatList
            data={keys}
            numColumns={5}
            contentContainerStyle={{
              justifyContent: "flex-end",
            }}
            keyExtractor={(_, i) => i}
            renderItem={({ item, index }) => (
              <>
                {item != 0 ? (
                  <TouchableOpacity onPress={() => submitHandler(item, index)}>
                    <Text style={[styles.bubble]}>{item}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={[styles.bubble, { borderWidth: 0 }]}></Text>
                )}
              </>
            )}
          />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "semibold",
              fontSize: 0.04 * width,
              padding: 10,
            }}
          >
            You must complete the equation below to gain its momentum.
          </Text>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            {answer?.map((_, i) => (
              <TouchableOpacity onPress={() => removeHandler(i)} key={i}>
                <Text style={styles.answer}>{_}</Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.answer}>=</Text>
            <Text style={styles.answer}>{target}</Text>
          </View>
        </View>

        {/* <TouchableOpacity>
          <Text style={styles.check_button}>Check</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};
export default connect(mapStateToProps, {})(Owl);

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    fontFamily: "semibold",
    fontSize: 0.55 * (width / 5),
    width: (width / 5) * 1 - 4,
    borderWidth: 2,
    margin: 2,
    height: (width / 5) * 1 - 4,
    alignItems: "center",
    textAlign: "center",
  },
  answer: {
    borderWidth: 2,
    padding: 10,
    backgroundColor: colors.white,
    alignContent: "center",
    width: (width / 7) * 1 - 5,
    marginHorizontal: 2.5,
    height: (width / 7) * 1 - 5,
    textAlign: "center",
    fontFamily: "semibold",
    fontSize: 0.55 * (width / 7) - 5,
  },
});
