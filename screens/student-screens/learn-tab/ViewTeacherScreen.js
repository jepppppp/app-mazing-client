import {
  Animated,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { externalStyle } from "../../../styles/externalStyle";
import colors from "../../../config/colors";
import { TeacherSvg } from "../../../components/svg-components";
import TeacherItem from "./../../../components/student-components/learn-tab/TeacherCard";
import { useState } from "react";
import { useEffect } from "react";
import axios_config from "../../../config/axios_config";
const { width } = Dimensions.get("screen");
const CategoryCard = (props) => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    const load = async () => {
      await axios_config
        .get("user/teachers")
        .then((res) => {
          let response = res?.data?.data;
          setDatas(response.filter((r) => r["description"]));
        })
        .catch((e) => {
          console.log(e);
        });
    };
    load();
  }, []);
  
  return (
    <View
      style={[
        styles.container,
        ,
        {
          backgroundColor: colors.green,
        },
      ]}
    >
      <StatusBar />
      <View
        style={{
          flex: 0.15,
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          paddingVertical: 10,
          paddingBottom: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TeacherSvg scale={1} />
          <Text
            style={{
              fontFamily: "semibold",
              color: colors.white,
              fontSize: 25,
            }}
          >
            Learn with Teachers
          </Text>
        </View>
      </View>
      <Animated.View
        style={{
          width,
          flex: 0.85,
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: "hidden",
        }}
      >
        {datas?.length > 0 ? (
          <FlatList
            keyboardShouldPersistTaps={"handled"}
            nestedScrollEnabled={true}
            numColumns={1}
            data={datas}
            contentContainerStyle={{
              padding: 20,
            }}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <TeacherItem item={item} />}
          />
        ) : (
          <Text
            style={{
              textAlign: "center",
              padding: 25,
              fontSize: 18,
              color: colors.gray,
              fontFamily: "semibold",
            }}
          >
            Nothing to see here.
          </Text>
        )}
      </Animated.View>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create(externalStyle);
