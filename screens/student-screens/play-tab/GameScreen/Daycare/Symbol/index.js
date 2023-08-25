import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect } from "react";
import colors from "../../../../../../config/colors";
import Timer from "../../../../../../components/common-components/Timer";
import {
  addAudit,
  playAudio,
  playSound,
  random,
} from "../../../../../../services/tools";
import { useState } from "react";
import {
  PASSING_SCORE,
  grade_symbol_data,
  kinder_symbol_data,
} from "../../../../../../services/var.services";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("screen");
const Symbol = (props) => {
  const [help, setHelp] = useState(true);
  const [points, setPoints] = useState(0);
  const [cards, setCards] = useState([]);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [isPassed, setIsPassed] = useState(false);
  const [resultModal, setResultModal] = useState(null);
  const card_data =
    props.credentials?.grade.toLowerCase() == "kinder"
      ? [...kinder_symbol_data, ...kinder_symbol_data]
      : [...grade_symbol_data, ...grade_symbol_data]?.sort(
          () => Math.random() - 0.5
        );

  useEffect(() => {
    if (choice1 && choice2) {
      if (choice1["0"] == choice2["0"]) {
        let newPoints = points + 2;
        setPoints(newPoints);
        setIsPassed(PASSING_SCORE.GRADE13 <= newPoints);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card["0"] == choice1["0"]) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setResultModal("You are correct!");
        playSound(require("../../../../../../assets/audio/sfx/coins_sfx.wav"));
        resetHandler();
      } else {
        setResultModal("You are wrong!");
        playSound(require("../../../../../../assets/audio/sfx/wrong_sfx.wav"));
        setTimeout(() => {
          resetHandler();
        }, 500);
      }
    }
    if (
      !cards?.length ||
      cards.filter((cd) => cd?.matched == true)?.length == cards?.length
    ) {
      if (!cards?.length) {
        addAudit(
          {
            full_name:
              props.credentials?.first_name +
              " " +
              props.credentials?.last_name,
            id_number: props.credentials?.id_number,
            grade: props.credentials?.grade?.replace("Grade", ""),
          },
          "play",
          "Math Symbol"
        );
      }
      setTimeout(() => {
        resetHandler();
        shuffleHandler();
      }, 1000);
      shuffleHandler();
    }
  }, [choice1, choice2]);

  const shuffleHandler = () => {
    const shuffledCards = card_data
      .sort(() => Math.random() - 0.5)
      .map((card, key) => ({ ...card, id: key, matched: false }));
    setCards(shuffledCards);
  };

  const choiceHandler = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  const resetHandler = () => {
    setChoice1(null);
    setChoice2(null);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        {/* Face Side */}
        {item === choice1 || item === choice2 || item?.matched ? (
          <View style={styles.card_wrapper}>
            <Text style={styles.card}>{item["0"]}</Text>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={!item?.disabled ? 0.7 : 1}
            onPress={() => choiceHandler(item)}
          >
            <View style={styles.card_wrapper}>
              <Image
                source={require("../../../../../../assets/images/game-images/game-assestment-icons/symbol.png")}
                style={{
                  resizeMode: "cover",
                  width: width / 4 - 20,
                  height: width / 4 - 20,
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.darkred,
      }}
    >
      <Timer
        isPassed={isPassed}
        helpHandler={() => {
          if (help) {
            setHelp(false);
            playAudio(
              require("../../../../../../assets/audio/tutorial/symbol.m4a"),
              setHelp
            );
          }
        }}
        game_number={3}
        setPoints={setPoints}
        height={height}
        width={width}
        points={points}
        playHandler={() => {
          resetHandler();
          shuffleHandler();
          setIsPassed(false);
        }}
        setResultModal={setResultModal}
        resultModal={resultModal}
      />
      <View style={{ flex: 0.9 }}>
        <Text
          style={{
            margin: 10,
            fontFamily: "semibold",
            textAlign: "center",
            fontSize: 0.06 * width,
            color: colors.white,
          }}
        >
          Match the symbols.
        </Text>
        <FlatList
          contentContainerStyle={{ margin: 5 }}
          numColumns={4}
          data={cards}
          renderItem={renderItem}
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
export default connect(mapStateToProps, {})(Symbol);

const styles = StyleSheet.create({
  card_wrapper: {
    width: width / 4 - 12.5,
    minHeight: width / 4 - 12.5,
    borderWidth: 0.5,
    alignItems: "center",
    margin: 5,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  card: {
    fontFamily: "regular",
    padding: 10,
    fontSize: 0.08 * width,
  },
});
