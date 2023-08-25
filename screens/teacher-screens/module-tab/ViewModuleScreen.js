import { Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ListTemplate from "../../../components/teacher-components/ListTemplate";
import axios_config from "../../../config/axios_config";
import colors from "../../../config/colors";
import { ModuleSvg } from "../../../components/svg-components";
import { connect } from "react-redux";
import { setModules } from "../../../redux";
const TeacherModulePage = (props) => {
  const [datas, setDatas] = useState([]);
  const { width } = Dimensions.get("screen");
  const load = async () => {
    await axios_config
      .get("module")
      .then((res) => {
        let response = res?.data?.data;
        setDatas(response);
        props.setModules(response);
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
        datas: props.modules,
        backgroundColor: colors.violet,
        title: "Modules",
        addColor: colors.darkviolet,
        icon: <ModuleSvg scale={1} />,
        type: "module",
        width,
        load,
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    modules: state.user.modules,
  };
};

export default connect(mapStateToProps, { setModules })(TeacherModulePage);

const styles = StyleSheet.create({});
