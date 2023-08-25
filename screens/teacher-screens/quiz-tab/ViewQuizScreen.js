import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ListTemplate from "../../../components/teacher-components/ListTemplate";
import axios_config from "../../../config/axios_config";
import colors from "../../../config/colors";
import { ModuleSvg } from "../../../components/svg-components";
import { connect } from "react-redux";
import { setQuizzes } from "../../../redux";
const TeacherQuizPage = (props) => {
  const [datas, setDatas] = useState([]);
  const { width } = Dimensions.get("screen");
  const load = async () => {
    await axios_config
      .get("quiz")
      .then((res) => {
        let response = res?.data?.data;
        setDatas(response);
        props.setQuizzes(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    load();
  }, []);
  return (
    <ListTemplate
      {...props}
      data={{
        datas: props.quizzes,
        backgroundColor: colors.yellow,
        borderColor: colors.darkyellow,
        addColor: colors.darkyellow,
        title: "Quizzes",
        icon: <ModuleSvg scale={1} />,
        width,
        type: "quiz",
        load,
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    quizzes: state.user.quizzes,
  };
};

export default connect(mapStateToProps, { setQuizzes })(TeacherQuizPage);

const styles = StyleSheet.create({});
