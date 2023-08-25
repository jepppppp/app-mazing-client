import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios_config from "../../../config/axios_config";
import { connect } from "react-redux";
import colors from "../../../config/colors";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setQuizzes } from "../../../redux";
import { checkField, toastHandler } from "../../../services/tools";
import { ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

const { width, height } = Dimensions.get("screen");
const EditQuiz = (props) => {
  const data = props.route.params.item;
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(data?.title);
  const [description, setDescription] = useState(data?.text);
  const [category, setCategory] = useState(data?.category);

  const [categoryModal, setCategoryModal] = useState(false);
  const [questions, setQuestions] = useState(data?.questions);

  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");
  const [answerType, setAnswerType] = useState("blank");
  const [otherChoice, setOtherChoice] = useState("");

  const headerHeight = useHeaderHeight();

  const submitHandler = async () => {
    const credentials = props.credentials;
    const newData = {
      title,
      teacher_name: credentials.first_name + " " + credentials.last_name,
      teacher_id: credentials._id,
      text: description,
      category,
    };

    if (checkField(Object.values(newData)) > 0 || questions.length == 0) {
      return toastHandler({
        type: "error",
        text1: "Please fill up the fields!",
      });
    }
    if (credentials?.profile_picture) {
      newData.profile_picture = credentials?.profile_picture;
    }
    setIsLoading(true);
    newData.questions = questions;

    await axios_config
      .put("quiz/update/" + data._id, newData)
      .then(async () => {
        toastHandler({ type: "success", text1: "Updated Successfuly!" });
        await axios_config.get("quiz").then((res) => {
          props.setQuizzes(res?.data?.data);
        });
      })
      .catch((e) => {
        console.log(e);
        toastHandler({ type: "error", text1: "Something went wrong!" });
      });
    setIsLoading(false);
  };
  const scrambleHandler = (new_item, arr) => {
    let array = [...arr, new_item].map((i) => i?.value);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.map((value, id) => ({ id, value }));
  };
  const addHandler = () => {
    if (
      checkField([question, answer, answerType]) > 0 ||
      (choices.length == 0 && answerType == "choices")
    ) {
      toastHandler({ type: "error", text1: "Please fill up the fields!" });
      return;
    }
    // add right answer to choices
    let new_choices = scrambleHandler(
      { id: choices.length + 1, value: answer },
      choices
    );
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question,
        type: answerType,
        answer,
        choices: new_choices,
      },
    ]);
    setQuestion("");
    setChoices([]);
    setAnswer("");
    setAnswerType("blank");
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      contentContainerStyle={{ minHeight: height - headerHeight - 50 }}
    >
      <View style={[styles.container]}>
        <TextInput
          style={styles.fields}
          value={title}
          placeholder="Title"
          editable={!isLoading}
          onChangeText={(e) => setTitle(e)}
        />
        <TextInput
          style={styles.fields}
          value={description}
          placeholder="Description"
          editable={!isLoading}
          onChangeText={(e) => setDescription(e)}
        />
        {questions.map((_, key) => (
          <View key={key} style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 15,
                textAlign: "center",
                paddingVertical: 5,
              }}
            >
              Question {key + 1}
            </Text>
            <TextInput
              style={styles.fields}
              placeholder={"Question " + (key + 1)}
              editable={false}
              value={_.question}
            />
            <View style={{ flex: 1, gap: 10, flexDirection: "row" }}>
              <Text
                style={[
                  styles.submit_button,
                  {
                    borderWidth: 0.5,
                    color: _.type == "blank" ? colors.white : colors.black,
                    backgroundColor:
                      _.type == "blank" ? colors.gray : colors.white,
                    width: width / 2 - 20,
                  },
                ]}
              >
                Fill in the blank
              </Text>
              <Text
                style={[
                  styles.submit_button,
                  {
                    borderWidth: 0.5,
                    color: _.type == "choices" ? colors.white : colors.black,
                    backgroundColor:
                      _.type == "choices" ? colors.gray : colors.white,
                    width: width / 2 - 30,
                  },
                ]}
              >
                Multiple choices
              </Text>
            </View>
            <TextInput
              editable={false}
              style={styles.fields}
              value={_.answer}
              placeholder={"Answer " + (key + 1)}
            />

            {!isLoading && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  let new_q = questions.filter((i) => i.id != key + 1);
                  setQuestions(new_q);
                }}
              >
                <Text
                  style={[
                    styles.submit_button,
                    { backgroundColor: colors.darkred },
                  ]}
                >
                  Remove this question
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {!isLoading ? (
          <>
            <Text
              style={{
                fontFamily: "semibold",
                fontSize: 15,
                textAlign: "center",
                paddingVertical: 5,
              }}
            >
              Create new question
            </Text>
            <View>
              <TextInput
                style={styles.fields}
                value={question}
                onChangeText={(e) => setQuestion(e)}
                placeholder={"Question " + (questions.length + 1)}
              />
              <View style={{ flex: 1, gap: 10, flexDirection: "row" }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setAnswerType("blank");
                  }}
                >
                  <Text
                    style={[
                      styles.submit_button,
                      {
                        borderWidth: 0.5,
                        color:
                          answerType == "blank" ? colors.white : colors.black,
                        backgroundColor:
                          answerType == "blank" ? colors.gray : colors.white,
                        width: width / 2 - 20,
                      },
                    ]}
                  >
                    Fill in the blank
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setAnswerType("choices");
                  }}
                >
                  <Text
                    style={[
                      styles.submit_button,
                      {
                        borderWidth: 0.5,
                        color:
                          answerType == "choices" ? colors.white : colors.black,
                        backgroundColor:
                          answerType == "choices" ? colors.gray : colors.white,
                        width: width / 2 - 30,
                      },
                    ]}
                  >
                    Multiple choices
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={[styles.fields, { borderColor: colors.green }]}
                value={answer}
                onChangeText={(e) => setAnswer(e)}
                placeholder={"Answer " + (questions.length + 1)}
              />
              {answerType != "blank" && (
                <View>
                  {choices?.map((_, key) => (
                    <View
                      key={key}
                      style={[
                        styles.fields,
                        {
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          color: colors.white,
                          borderWidth: 0,
                          backgroundColor: colors.darkred,
                        },
                      ]}
                    >
                      <TextInput
                        style={{ fontFamily: "regular", color: colors.white }}
                        key={key}
                        editable={false}
                        value={_?.value}
                      />
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          let new_c = choices.filter((i) => i.id != key + 1);
                          setChoices(new_c);
                        }}
                      >
                        <Text
                          style={{ fontFamily: "regular", color: colors.white }}
                        >
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                  <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
                    <TextInput
                      style={[styles.fields, { flex: 1 }]}
                      value={otherChoice}
                      onChangeText={(e) => setOtherChoice(e)}
                      placeholder={"Other Choice "}
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setChoices([
                          ...choices,
                          { id: choices.length + 1, value: otherChoice },
                        ]);
                        setOtherChoice("");
                      }}
                    >
                      <Text
                        style={[
                          styles.submit_button,
                          { backgroundColor: colors.extralightgray },
                        ]}
                      >
                        Add Choices
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={addHandler}>
              <Text
                style={[
                  styles.submit_button,
                  { backgroundColor: colors.lightgray },
                ]}
              >
                Add New Question
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={submitHandler}>
              <Text style={styles.submit_button}>Submit</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.submit_button}>Submitting...</Text>
        )}
        <Toast />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
    quizzes: state.user.quizzes,
  };
};

export default connect(mapStateToProps, {
  setQuizzes,
})(EditQuiz);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  submit_button: {
    padding: 10,
    color: colors.white,
    fontFamily: "semibold",
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 15,
    textAlign: "center",
    backgroundColor: colors.gray,
  },
  fields: {
    padding: 10,
    fontFamily: "semibold",
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.extralightgray,
  },
});
