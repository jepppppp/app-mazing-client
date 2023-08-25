import { StyleSheet, Dimensions, Image, Text, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import colors from "../../../config/colors";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import Modal from "../../../components/common-components/Modal";
import { addAudit, checkProfile } from "../../../services/tools";
const { height } = Dimensions.get("screen");
const ViewQuiz = (props) => {
  const data = props.route.params.item;
  const [points, setPoints] = useState(0);
  const [modal, setModal] = useState(false);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {}, []);
  const submitHandler = () => {
    let temp_points = 0;
    const key_to_correction = data.questions?.map((item) => item?.answer);
    for (let i in key_to_correction) {
      if (answers[i] == key_to_correction[i]) {
        temp_points += 1;
      }
    }
    setPoints(temp_points);
    setModal(true);
    addAudit(
      {
        full_name:
          props.credentials?.first_name + " " + props.credentials?.last_name,
        id_number: props.credentials?.id_number,
        grade: props.credentials?.grade?.replace("Grade", ""),
      },
      "take_quiz",
      data?.title || ""
    );
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
              {points}/{data.questions.length}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModal(false);
                setAnswers([]);
                setPoints(0);
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
                Retake
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
          {data && (
            <>
              <View style={styles.wrapper}>
                <View>
                  <Text style={styles.title}>{data?.title}</Text>
                  <Text style={styles.description}>{data?.text}</Text>
                  <View
                    style={{
                      // flexDirection: "c",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={checkProfile(data, props?.credentials)}
                      style={styles.profile}
                    />

                    <View>
                      <Text style={{ fontFamily: "regular" }}>
                        Posted By Teacher
                      </Text>
                      <Text style={styles.teacher_name}>
                        {data?.teacher_name}
                      </Text>
                    </View>
                  </View>
                  {data?.questions?.map((item, key) => (
                    <View key={key} style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 16, fontFamily: "semibold" }}>
                        Question #{key + 1}
                      </Text>
                      <Text style={{ fontFamily: "regular", fontSize: 20 }}>
                        {item.question}
                      </Text>
                      {props?.credentials?.role == 2 ? (
                        <>
                          {item?.type == "blank" ? (
                            <TextInput
                              placeholder="Answer"
                              value={answers[key]}
                              style={{
                                fontFamily: "regular",
                                borderRadius: 10,
                                padding: 10,
                                paddingVertical: 5,
                                borderWidth: 0.5,
                              }}
                              onChangeText={(e) => {
                                let temp_answer = answers;
                                temp_answer[key] = e;
                                setAnswers([...temp_answer]);
                              }}
                            />
                          ) : (
                            <>
                              {item.choices.map((_, keys) => (
                                <TouchableOpacity
                                  key={keys}
                                  onPress={() => {
                                    let temp_answer = answers;
                                    temp_answer[key] = _.value;
                                    setAnswers([...temp_answer]);
                                  }}
                                >
                                  <Text
                                    style={{
                                      backgroundColor:
                                        answers[key] == _.value
                                          ? colors.yellow
                                          : "white",
                                      fontFamily: "regular",
                                      padding: 10,
                                      marginVertical: 5,
                                      borderRadius: 10,
                                      borderWidth: 0.5,
                                    }}
                                  >
                                    {_.value}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                            </>
                          )}
                        </>
                      ) : (
                        <Text style={{ fontFamily: "regular", fontSize: 16 }}>
                          <Text style={{ fontWeight: 900 }}>Answer: </Text>
                          {item.answer}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
                {props?.credentials.role == 2 && (
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
                )}
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
    credentials: state.user?.credentials,
  };
};
export default connect(mapStateToProps, {})(ViewQuiz);

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    justifyContent: "space-between",
    flex: 1,
  },
  profile: {
    height: 25,
    width: 25,
    marginRight: 5,
    borderRadius: 50,
  },
  teacher_name: {
    fontFamily: "semibold",
    // fontSize: 1,
    textAlign: "center",
    textTransform: "capitalize",
  },
  title: {
    // textAlign: "center",
    textAlign: "center",
    fontFamily: "semibold",
    textTransform: "capitalize",
    fontSize: 30,
    paddingBottom: 5,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 5,
    fontFamily: "regular",
  },
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    // padding: 20,
  },
});
