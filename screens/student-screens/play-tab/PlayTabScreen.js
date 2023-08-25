import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React from "react";
import colors from "../../../config/colors";
import { RightArrowSvg } from "../../../components/svg-components";
import { externalStyle } from "../../../styles/externalStyle";
import { connect } from "react-redux";
const { width } = Dimensions.get("screen");

const PlayTabScreen = (props) => {
  const buttons = [
    {
      key: 1,
      name: "Number Recognition",
      navigationHandler: () => props.navigation.navigate("number_recognition"),
    },
    {
      key: 2,
      name: "Mastery",
      navigationHandler: () => props.navigation.navigate("play_now"),
    },
    {
      key: 3,
      name: "Basic Math Symbol",
      navigationHandler: () => props.navigation.navigate("math_symbol"),
    },
    {
      key: 4,
      name: "Assesstment",
      navigationHandler: () => props.navigation.navigate("assestment"),
    },
  ];
  return (
    <View
      style={[
        {
          backgroundColor: colors.gray,
        },
        styles.play.wrapper,
      ]}
    >
      <View style={styles.play.upperWrapper}>
        <View style={{ marginRight: 10 }}>
          <Text
            style={{ fontSize: 35, fontFamily: "semibold", color: "white" }}
          >
            App-Mazing
          </Text>
        </View>

        <Image
          source={require("../../../assets/images/login-images/logo.png")}
          style={{ width: 120, height: 120 }}
        />
      </View>
      <View style={[styles.play.middle_wrapper, { paddingHorizontal: 20 }]}>
        {["Kinder", "Grade 1", "Grade 2", "Grade 3"].includes(
          props?.credentials?.grade
        ) ? (
          <FlatList
            keyExtractor={(item) => item?.key}
            numColumns={2}
            data={buttons}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={item?.navigationHandler}
              >
                <Text
                  style={[
                    styles.play.play_btn,
                    {
                      minWidth: width / 2 - 30,
                      margin: 5,
                      padding: width * 0.03,
                      fontSize: width * 0.03,
                    },
                  ]}
                >
                  {item?.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.navigate("play_now")}
          >
            <Text
              style={[
                styles.play.play_btn,
                {
                  minWidth: width * 0.4,
                  marginHorizontal: 10,
                  fontSize: width * 0.04,
                },
              ]}
            >
              Play Now
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.play.lower_wrapper}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate("quiz")}
        >
          <View style={styles.play.quiz_btn}>
            <Image
              source={require("../../../assets/images/play-images/operators.png")}
              style={styles.play.operator_img}
            />
            <Text style={{ fontFamily: "regular", fontSize: 40 }}>Quiz</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontFamily: "regular", flexShrink: 1, fontSize: 17 }}
              >
                Math Quiz is a great way to check your math skills!
              </Text>
              <RightArrowSvg />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};
export default connect(mapStateToProps, {})(PlayTabScreen);

const styles = StyleSheet.create(externalStyle);
