import { StyleSheet, Image, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { ResizeMode, Video } from "expo-av";
import { addAudit } from "../../services/tools";
import { connect } from "react-redux";

const ViewELearningVideo = (props) => {
  const data = props.route.params.item;
  const videoRef = useRef();
  useEffect(() => {
    addAudit(
      {
        full_name:
          props.credentials?.first_name + " " + props.credentials?.last_name,
        id_number: props.credentials?.id_number,
        grade: props.credentials?.grade?.replace("Grade", ""),
      },
      "watch",
      data?.title || ""
    );
  }, []);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      {data && (
        <>
          <View style={styles.wrapper}>
            <Text style={styles.title}>{data?.title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}></View>
          </View>
          <Video
            ref={videoRef}
            style={styles.video}
            source={data?.source}
            shouldPlay
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            // isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <Text style={styles.description}>{data?.description}</Text>
        </>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

export default connect(mapStateToProps, {})(ViewELearningVideo);

const styles = StyleSheet.create({
  video: {
    aspectRatio: 16 / 9,
  },
  wrapper: {
    padding: 20,
  },
  profile: {
    height: 40,
    width: 40,
    marginRight: 5,
    borderRadius: 50,
  },
  teacher_name: {
    fontFamily: "semibold",
    fontSize: 19,
    textTransform: "capitalize",
  },
  title: {
    // textAlign: "center",
    textAlign: "left",
    fontFamily: "semibold",
    textTransform: "capitalize",
    fontSize: 30,
    paddingBottom: 5,
  },
  description: {
    fontSize: 16,
    fontFamily: "regular",
    textAlign: "justify",
    padding: 18,
  },
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "white",
    // padding: 20,
  },
});
