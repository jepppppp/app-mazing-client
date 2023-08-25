import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  addAudit,
  playAudio,
  playSound,
  random,
} from "../../../../../../services/tools";
import { useIsFocused } from "@react-navigation/native";
import colors from "../../../../../../config/colors";
import Timer from "../../../../../../components/common-components/Timer";
import { connect } from "react-redux";
import { PASSING_SCORE } from "../../../../../../services/var.services";

const { width, height } = Dimensions.get("screen");
const Bubble = (props) => {
  const [help, setHelp] = useState(true);
  const [bubbles, setBubbles] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const isFocused = useIsFocused();
  const [target, setTarget] = useState(random(10));
  const [bucketPoints, setBucketPoints] = useState(0);
  const [points, setPoints] = useState(0);
  const mountedRef = useRef();
  const [resultModal, setResultModal] = useState(null);
  const [isPassed, setIsPassed] = useState(false);
  useEffect(() => {
    if (!mountedRef.current) {
      addAudit(
        {
          full_name:
            props.credentials?.first_name + " " + props.credentials?.last_name,
          id_number: props.credentials?.id_number,
          grade: props.credentials?.grade?.replace("Grade", ""),
        },
        "play",
        "Bubble Game"
      );
      mountedRef.current = true;
    }
    const interval = setInterval(() => {
      // generate 4 random values and index
      const random_index_1 = random(12);
      const random_value_1 = random(10);
      let temp_bubbles = bubbles;
      temp_bubbles[random_index_1 - 1] = random_value_1 - 1;
      setBubbles([...temp_bubbles]);
    }, 500);
    if (!isFocused) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [bubbles]);
  const disappearClicked = (index) => {
    let newBubbles = bubbles;
    newBubbles[index] = 0;
    setBubbles(newBubbles);
  };
  const addHandler = (item, index) => {
    setBucketPoints(bucketPoints + item);
    disappearClicked(index);
    if (bucketPoints + item == target) {
      let newPoints = points + 2;
      setPoints(newPoints);
      setIsPassed(PASSING_SCORE.GRADE13 <= newPoints);
      setBucketPoints(0);
      setTarget(target + random(10));
      setResultModal("You are correct!");
      playSound(require("../../../../../../assets/audio/sfx/coins_sfx.wav"));
    }
    if (bucketPoints + item > target) {
      setBubbles([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setBucketPoints(0);
      setTarget(random(10));
      setResultModal("You are wrong!");
      playSound(require("../../../../../../assets/audio/sfx/wrong_sfx.wav"));
    }
    if (item != 0) {
      playSound(require("../../../../../../assets/audio/sfx/bubble_sfx.wav"));
    }
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
          left: 0,
          resizeMode: "cover",
          height,
        }}
        source={require("../../../../../../assets/images/game-images/bubble-images/water_bg.png")}
      />
      <Timer
        isPassed={isPassed}
        helpHandler={() => {
          if (help) {
            setHelp(false);
            playAudio(
              require("../../../../../../assets/audio/tutorial/bubble.m4a"),
              setHelp
            );
          }
        }}
        game_number={4}
        setPoints={setPoints}
        height={height}
        width={width}
        points={points}
        playHandler={() => {
          setBubbles([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          setPoints(0);
          setBucketPoints(0);
          setTarget(random(10));
          setIsPassed(false);
        }}
        setResultModal={setResultModal}
        resultModal={resultModal}
      />
      <View style={{ flex: 0.9 }}>
        <Text style={styles.text}>Target: {target}</Text>
        <Text style={styles.text}>Bucket: {bucketPoints}</Text>
        <FlatList
          numColumns={3}
          data={bubbles}
          keyExtractor={(item, key) => key}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => addHandler(item, index)}>
              <View
                style={{
                  width: width / 3,
                  height: width / 3,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item > 0 && (
                  <>
                    <Image
                      style={{
                        position: "absolute",
                        top: 0,
                        width: width / 3,
                        height: width / 3,
                      }}
                      source={require("../../../../../../assets/images/game-images/bubble-images/bubble_game.png")}
                    />
                    <Text style={styles.bubble}>{item}</Text>
                  </>
                )}
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
  };
};
export default connect(mapStateToProps, {})(Bubble);

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    textAlign: "center",
    fontFamily: "semibold",
    fontSize: 30,
  },
  text: {
    fontFamily: "semibold",
    padding: 20,
    paddingVertical: 5,
    fontSize: 17,
  },
});
