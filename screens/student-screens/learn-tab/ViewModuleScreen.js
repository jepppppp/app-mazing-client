import { StyleSheet, Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addAudit, checkProfile } from "../../../services/tools";

const ViewModule = (props) => {
  const data = props.route.params.item;
  useEffect(() => {
    addAudit(
      {
        full_name:
          props.credentials?.first_name + " " + props.credentials?.last_name,
        id_number: props.credentials?.id_number,
        grade: props.credentials?.grade?.replace("Grade", ""),
      },
      "read",
      data.title
    );
  }, []);
  return (
    <View style={styles.container}>
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
      <Text style={styles.text}>{data?.text}</Text>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

export default connect(mapStateToProps, {})(ViewModule);

const styles = StyleSheet.create({
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
  text: {
    fontSize: 16,
    fontFamily: "regular",
    paddingVertical: 18,
    lineHeight: 25,
    textAlign: "justify",
  },
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
});
