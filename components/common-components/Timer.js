import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import colors from "../../config/colors";
import { playSound, timeFormatter } from "../../services/tools";
import { Image } from "react-native";
import { connect } from "react-redux";
import axios_config from "../../config/axios_config";
import Modal from "../../components/common-components/Modal";
const Timer = ({
  isPassed,
  isAssestment,
  height,
  setResultModal,
  game_number,
  width,
  points,
  playHandler,
  resultModal,
  setPoints,
  endGame,
  credentials,
  helpHandler,
}) => {
  const MAX = 30;
  const timeRef = useRef();
  const [countDown, setCountDown] = useState(MAX);
  const highscoreDoneRef = useRef(false);
  useEffect(() => {
    const interval = setInterval(() => {
      let temp_timer = countDown - 1;
      if (resultModal == null) {
        setCountDown(temp_timer);
        if (countDown == 1) {
          playSound(require("../../assets/audio/sfx/gameover_sfx.wav"));
          if (game_number > -1 && !isAssestment && temp_timer <= 0) {
            if (points > 0) {
              console.log("TALO PERO PASOK");
              highscoreHandler();
            }
          }
        }
      }
      if (isPassed && !highscoreDoneRef.current) {
        console.log("SABIHIN MO: ", isPassed);
        highscoreHandler();
        highscoreDoneRef.current = true;
      }
    }, 900);

    return () => {
      clearInterval(interval);
    };
  }, [countDown, resultModal]);
  const playAgainHandler = () => {
    setPoints(0);
    highscoreDoneRef.current = false;
    setCountDown(MAX);
    playHandler();
  };
  const highscoreHandler = async () => {
    const newData = {
      lrn: credentials?.id_number,
      game_title: game_number,
      name: `${credentials?.first_name} ${credentials?.last_name}`,
      points: points,
      grade: credentials?.grade,
      duration: countDown == 1 ? 0 : countDown,
    };
    console.log("pasok moto", newData);
    await axios_config
      .post("highscore/add", newData)
      .then((res) => {})
      .catch((e) => console.log(e?.message));
  };
  return (
    <>
      {resultModal && (
        <Modal>
          <View style={{ padding: 10, flexShrink: 0 }}>
            <Text
              style={{
                fontFamily: "semibold",
                textAlign: "center",
                paddingVertical: 10,
                fontSize: 0.03 * height,
              }}
            >
              {resultModal}
            </Text>
            <TouchableOpacity onPress={() => setResultModal(null)}>
              <Text
                style={{
                  padding: 10,
                  textAlign: "center",
                  backgroundColor: colors.yellow,
                  color: colors.white,
                  fontFamily: "semibold",
                  fontSize: 0.02 * height,
                  borderRadius: 30,
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      {(countDown <= 0 || isPassed) && (
        <Modal>
          <View style={{ padding: 10, flexShrink: 0 }}>
            <Text
              style={{
                fontFamily: "semibold",
                textAlign: "center",
                fontSize: 0.03 * height,
              }}
            >
              {isPassed ? "Excellent" : "Time's Up Player!"}
            </Text>
            <Text
              style={{
                fontFamily: "semibold",
                textAlign: "center",
                fontSize: 0.08 * height,
                color: colors.violet,
              }}
            >
              {points}
            </Text>
            {!isAssestment && (
              <Text style={{ fontFamily: "regular", fontSize: 15, padding: 4 }}>
                Highscore will be set when your online.
              </Text>
            )}
            <TouchableOpacity onPress={playAgainHandler}>
              <Text
                style={{
                  padding: 10,
                  textAlign: "center",
                  backgroundColor: colors.yellow,
                  color: colors.white,
                  fontFamily: "semibold",
                  fontSize: 0.02 * height,
                  borderRadius: 30,
                }}
              >
                {isAssestment ? "Next" : "Retry"}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <View
        style={{
          flex: 0.1,
          flexShrink: 0,
          padding: 10,
          alignItems: "flex-start",
          justifyContent: "center",
          width,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: colors.white,
            borderRadius: 10,
            borderWidth: 0.5,
            width: width - 20,
            padding: 10,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image
                source={require("../../assets/images/game-images/game-header-images/coin.gif")}
                style={{ width: 15, height: 15 }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "regular",
                }}
              >
                Score: {points}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image
                source={require("../../assets/images/game-images/game-header-images/clock.gif")}
                style={{
                  width: 15,
                  height: 15,
                  transform: [{ translateY: -2 }],
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "regular",
                }}
              >
                Timer: {timeFormatter(countDown)}
              </Text>
            </View>
          </View>
          {[1, 2, 3, 7, 4, 5].includes(game_number) && (
            <TouchableOpacity onPress={helpHandler}>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/game-images/game-header-images/help.png")}
                  style={{
                    width: 15,
                    height: 15,
                    transform: [{ translateY: -2 }],
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "regular",
                    textDecorationLine: "underline",
                  }}
                >
                  Help?
                </Text>
              </View>
            </TouchableOpacity>
          )}
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

export default connect(mapStateToProps, {})(Timer);

const styles = StyleSheet.create({});