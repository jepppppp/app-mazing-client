import { StyleSheet } from "react-native";
import React from "react";
import { VideoSvg } from "../../../components/svg-components";
import { SYMBOL_VIDEO_DATA } from "../../../services/var.services";
import { connect } from "react-redux";
import colors from "../../../config/colors";
import VideoLayout from "../../../components/student-components/play-tab/VideoLayout";

const MathSymbol = (props) => {
  const PLAY_DATA = SYMBOL_VIDEO_DATA.filter((pd) =>
    pd?.allowed.toLowerCase().includes(props.credentials?.grade.toLowerCase())
  );

  return (
    <VideoLayout
      {...props}
      data={{
        datas: PLAY_DATA,
        backgroundColor: colors.red,
        borderColor: colors.darkred,
        icon: <VideoSvg scale={1} />,
        title: "E-Learning Videos",
      }}
    ></VideoLayout>
  );
};
const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

export default connect(mapStateToProps, {})(MathSymbol);

const styles = StyleSheet.create({});
