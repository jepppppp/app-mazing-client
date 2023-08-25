import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoryCard from "../../../components/student-components/learn-tab/CategoryCard";
import colors from "../../../config/colors";
import { ModuleSvg } from "../../../components/svg-components";
import { useState } from "react";
import { useEffect } from "react";
import axios_config from "../../../config/axios_config";

const Modules = (props) => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    const load = async () => {
      await axios_config
        .get("module")
        .then((res) => {
          let response = res?.data?.data;
          setDatas(response);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    load();
  }, []);
  return (
    <CategoryCard
      {...props}
      data={{
        datas,
        backgroundColor: colors.violet,
        borderColor: colors.darkviolet,
        icon: <ModuleSvg scale={1} />,
        title: "Learn with E-Modules",
        type: "module",
      }}
    />
  );
};

export default Modules;
