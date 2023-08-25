import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import colors from "../../../config/colors";
import { useEffect } from "react";
import axios_config from "../../../config/axios_config";
import CategoryCard from "../../../components/student-components/learn-tab/CategoryCard";

const Quiz = (props) => {
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
  const [datas, setDatas] = useState([]);
  return (
    <CategoryCard
      {...props}
      data={{
        datas,
        backgroundColor: colors.yellow,
        borderColor: colors.darkyellow,
        icon: (
          <Image
            source={require("../../../assets/images/play-images/operators.png")}
            style={{ width: 50, height: 50 }}
          />
        ),
        title: "Let's get Quiz",
        type: "quiz",
      }}
    />
  );
};

export default Quiz;

const styles = StyleSheet.create({});
