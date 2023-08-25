import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios_config from "../../../config/axios_config";
import ListTemplate from "../../../components/teacher-components/ListTemplate";
import { VideoSvg } from "../../../components/svg-components";
import colors from "../../../config/colors";
import { connect } from "react-redux";
import { setVideos } from "../../../redux";

const TeacherVideoPage = (props) => {
  const { width } = Dimensions.get("screen");

  const load = async () => {
    await axios_config
      .get("video/")
      .then((res) => {
        let response = res?.data?.data.filter(
          (rd) => rd?.category == props?.credentials.grade
        );
        props.setVideos(response);
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
        datas: props.videos,
        backgroundColor: colors.red,
        borderColor: colors.darkred,
        addColor: colors.darkred,
        title: "Videos",
        icon: <VideoSvg scale={1} />,
        width,
        type: "video",
        load,
      }}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    videos: state.user.videos,
    credentials: state?.user?.credentials,
  };
};

export default connect(mapStateToProps, {
  setVideos,
})(TeacherVideoPage);

const styles = StyleSheet.create({});