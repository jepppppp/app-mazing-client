import { StyleSheet } from "react-native";
import React from "react";
import { connect } from "react-redux";
import colors from "../../../config/colors";
import VideoLayout from "../../../components/student-components/play-tab/VideoLayout";
import { VideoSvg } from "../../../components/svg-components";
import { NUMBER_VIDEO_DATA } from "../../../services/var.services";

const NumberRecognition = (props) => {
  const PLAY_DATA = NUMBER_VIDEO_DATA.filter((pd) =>
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

export default connect(mapStateToProps, {})(NumberRecognition);

const styles = StyleSheet.create({});
