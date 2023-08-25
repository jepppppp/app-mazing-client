import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { setPreAssestmentScore } from "../../../../redux";
import React, { useState } from "react";
import { numeric_data } from "../../../../services/var.services";
import Modal from "../../../common-components/Modal";
import colors from "../../../../config/colors";
import { connect } from "react-redux";
const { height } = Dimensions.get("screen");
const Numeracy = (props) => {
  const [data, setData] = useState(numeric_data);
  const [points, setPoints] = useState(0);
  const [modal, setModal] = useState(false);
  const [answers, setAnswers] = useState([]);

  const submitHandler = () => {
    let temp_points = 0;
    const key_to_correction = data?.map((item) => eval(item.equation));
    for (let i in key_to_correction) {
      if (answers[i] == key_to_correction[i]) {
        temp_points += 1;
      }
    }
    setPoints(temp_points);
    setModal(true);
  };

  return (
    <>
      {modal && (
        <Modal>
          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontFamily: "semibold",
                textAlign: "center",
                fontSize: 0.03 * height,
              }}
            >
              Quiz Score
            </Text>
            <Text
              style={{
                fontFamily: "semibold",
                textAlign: "center",
                fontSize: 0.08 * height,
                color: colors.violet,
              }}
            >
              {points}/{data?.length}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props?.setPreAssestmentScore(
                  props?.preassestment_score + points
                );
                props?.nextHandler();
              }}
            >
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
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ backgroundColor: "white" }}
        >
          <Text style={styles.title}>
            Please answer the following questions.
          </Text>
          {data && (
            <>
              <View style={styles.wrapper}>
                <View>
                  {data?.map((item, key) => (
                    <View key={key} style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 16, fontFamily: "semibold" }}>
                        Question #{key + 1}
                      </Text>
                      <Text style={{ fontFamily: "regular", fontSize: 20 }}>
                        {item.equation}
                      </Text>
                      {item.choices.map((_, keys) => (
                        <TouchableOpacity
                          key={keys}
                          onPress={() => {
                            let temp_answer = answers;
                            temp_answer[key] = _;
                            setAnswers([...temp_answer]);
                          }}
                        >
                          <View style={{ flex: 1, flexDirection: "row" }}>
                            <Text
                              style={{
                                backgroundColor:
                                  answers[key] == _ ? colors.yellow : "white",
                                fontFamily: "regular",
                                padding: 10,
                                // flex: 0,
                                // flexDirection: "column",
                                marginVertical: 5,
                                borderRadius: 10,
                                borderWidth: 0.5,
                              }}
                            >
                              {keys == 0
                                ? "A."
                                : keys == 1
                                ? "B."
                                : keys == 2
                                ? "C."
                                : "D."}{" "}
                              {_}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </View>
                <TouchableOpacity onPress={submitHandler}>
                  <Text
                    style={{
                      padding: 10,
                      textAlign: "center",
                      backgroundColor: colors.blue,
                      color: "white",
                      fontFamily: "semibold",
                      borderRadius: 50,
                      marginTop: 10,
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    preassestment_score: state.playMenu.preassestment_score,
  };
};
export default connect(mapStateToProps, { setPreAssestmentScore })(Numeracy);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "semibold",
    fontSize: 20,
  },
});
