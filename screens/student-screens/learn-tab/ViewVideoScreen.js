import {
  StyleSheet,
  Image,
  Text,
  View,
  Linking,
} from "react-native";
import React, { useEffect } from "react";
import { Thumbnail } from "react-native-thumbnail-video";
import { addAudit, checkProfile } from "../../../services/tools";
import { connect } from "react-redux";

const ViewVideo = (props) => {
  const data = props.route.params.item;
  useEffect(() => {
    addAudit(
      {
        full_name:
          props.credentials?.first_name + " " + props.credentials?.last_name,
        id_number: props.credentials?.id_number,
        grade: props.credentials?.grade?.replace("Grade", ""),
      },
      "watch",
      data.title || ""
    );
  }, []);
  return (
    <View style={styles.container}>
      {data && (
        <>
          <View style={styles.wrapper}>
            <Text style={styles.title}>{data?.title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={checkProfile(data, props?.credentials)}
                style={styles.profile}
              />
              <View>
                <Text style={{ fontFamily: "regular" }}>Posted By Teacher</Text>
                <Text style={styles.teacher_name}>{data?.teacher_name}</Text>
              </View>
            </View>
          </View>

          <Thumbnail
            url={data?.url}
            onPress={() => {
              Linking.openURL(data?.url.replace("https:", "vnd.youtube:"))
                .then()
                .catch((e) => console.log(e));
            }}
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

export default connect(mapStateToProps, {})(ViewVideo);

const styles = StyleSheet.create({
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
    backgroundColor: "white",
  },
});
