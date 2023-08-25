import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setIsDone, setPreAssestmentScore } from "../../redux";
import ButtonCard from "../common-components/ButtonCard";
import colors from "../../config/colors";
import { Dimensions } from "react-native";
import { TrophySvg } from "../svg-components";
import { TouchableOpacity } from "react-native";

const { width } = Dimensions.get("screen");

const Assestment = (props) => {
  useEffect(() => {}, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
        backgroundColor: colors.blue,
        width,
      }}
    >
      <>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrophySvg />
            <Text
              style={{
                fontFamily: "semibold",
                color: colors.white,
                fontSize: 25,
              }}
            >
              Final Assesstment
            </Text>
          </View>
          <Text
            style={{
              color: colors.white,
              fontSize: 16,
              textAlign: "center",
              fontFamily: "regular",
            }}
          >
            This will test you if you are having hard time to solve math
            equations or anything related to math.
          </Text>
          {props?.isDone ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                marginTop: 10,
                backgroundColor: colors.white,
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  textAlign: "center",
                  fontFamily: "semibold",
                }}
              >
                {`${props.preassestment_score}\nTotal Score`}
              </Text>
              {(props?.credentials?.grade.toLowerCase() == "kinder" &&
                props?.preassestment_score >= 10) ||
              props?.preassestment_score >= 30 ? (
                <Text style={{ fontFamily: "regular", textAlign: "center" }}>
                  Wow! Keep it up, your doing great at this point. You passed
                  the test that's it for now. Thank you for taking assesstment
                </Text>
              ) : (
                <>
                  <Text style={{ fontFamily: "regular", textAlign: "center" }}>
                    Still not good enough. I believe you can do it, you may
                    explore our provided games too.
                  </Text>
                </>
              )}
              <TouchableOpacity
                onPress={() => {
                  props?.setIsDone(false);
                  props?.setPreAssestmentScore(0);
                }}
              >
                <Text
                  style={{
                    padding: 10,
                    paddingHorizontal: 20,
                    fontFamily: "semibold",
                    textAlign: "center",
                    color: colors.white,
                    borderRadius: 40,
                    backgroundColor: colors.violet,
                  }}
                >
                  Retake
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ButtonCard
              _={{
                icon: require("../../assets/images/game-images/game-assestment-icons/assestment.png"),
                title: `${
                  props?.credentials?.grade.toLowerCase() == "kinder"
                    ? "Object Number Recognition"
                    : "Plus Finger"
                }  ${
                  props?.credentials?.grade.toLowerCase() != "kinder"
                    ? "\nCounting Bottlecaps\nNumeracy Test\nDiagnostic Test"
                    : ""
                }`,
                backgroundColor: colors.violet,
                description:
                  "Complete the game's so we can help you getting better best of luck!",
                handler: () => props.navigation.navigate("pre-assestment"),
              }}
            />
          )}
        </View>
      </>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    credentials: state?.user?.credentials,
    preassestment_score: state.playMenu.preassestment_score,
    isDone: state.playMenu.isDone,
  };
};
export default connect(mapStateToProps, { setIsDone, setPreAssestmentScore })(
  Assestment
);

const styles = StyleSheet.create({});
