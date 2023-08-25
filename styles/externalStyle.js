import { StyleSheet, Dimensions } from "react-native";
import colors from "../config/colors";

const { width, height } = Dimensions.get("screen");

export const externalStyle = {
  width,
  height,
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  carousel: {
    indicatorContainer: {
      flexDirection: "column",
      alignItems: "center",
      position: "absolute",
      bottom: 20,
    },
    indicatorItem: {
      height: 10,
      borderWidth: 1,
      borderColor: colors.black,
      width: 10,
      borderRadius: 5,
      margin: 10,
    },
    mainContainer: {
      width: width,
      alignItems: "center",
      justifyContent: "center",
    },
    waveContainer: {
      position: "absolute",
      bottom: -1,
      maxWidth: width + 10,
      overflow: "hidden",
    },
    upperView: {
      flex: 0.65,
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "column",
      width,
      justifyContent: "center",
      backgroundColor: colors.gray,
    },
    title: {
      paddingVertical: 10,
      fontSize: 30,
      textAlign: "center",
      fontFamily: "semibold",
    },
    description: {
      padding: 20,
      fontFamily: "regular",
      textAlign: "center",
      fontSize: 14,
    },
    image: {
      width: width / 1.5,
      height: width / 1.5,
      resizeMode: "contain",
    },
    skip_btn: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      width: 150,
      color: "white",
      fontSize: 25,
      fontFamily: "semibold",
      textAlign: "center",
      backgroundColor: colors.gray,
      borderRadius: 50,
    },
  },
  login: {
    upperView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "column",
      width,
      justifyContent: "center",
      backgroundColor: colors.gray,
    },
    title: {
      fontSize: 27,
      fontFamily: "semibold",
      color: "white",
    },
    header: {
      fontSize: 30,
      marginTop: 10,
      fontFamily: "semibold",
      color: "white",
    },
    input: {
      padding: 10,
      paddingHorizontal: 20,
      borderRadius: 50,
      borderColor: "white",
      fontSize: 18,
      fontFamily: "regular",
      color: "white",
      marginVertical: 10,
      borderWidth: 1,
      backgroundColor: colors.gray,
      width: width - 100,
    },
    image: {
      height: 100,
      width: width,
      marginBottom: 20,
      resizeMode: "contain",
    },
    login_btn: {
      padding: 10,
      paddingHorizontal: 20,
      width: width - 100,
      fontSize: 18,
      color: "white",
      marginVertical: 10,
      fontFamily: "regular",
      textAlign: "center",
      backgroundColor: colors.lightgray,
      borderRadius: 50,
    },
  },
  home: {
    indicatorContainer: {
      width: width / 4,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    indicatorImage: {
      height: 25,
      width: 25,
    },
    indicatorLabel: {
      fontSize: 13,
      textAlign: "center",
      marginTop: 3,
      fontFamily: "semibold",
    },
    header: {
      position: "absolute",
      top: 0,
      zIndex: 10,
      flexDirection: "row",
      width,
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
    },
    account: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    user: {
      fontSize: 17,
      fontFamily: "semibold",
      marginLeft: 10,
      color: "white",
    },
    faQs: {
      fontSize: 17,
      fontFamily: "semibold",
      marginLeft: 10,
      color: "white",
      padding: 10,
    },
  },
  play: {
    wrapper: {
      flex: 1,
      paddingTop: 50,
      justifyContent: "space-between",
      width,
    },
    upperWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
    },
    middle_wrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },
    play_btn: {
      padding: 20,
      paddingVertical: 15,
      borderRadius: 50,
      backgroundColor: colors.lightgray,
      borderWidth: 2,
      fontSize: 20,
      fontFamily: "semibold",
      textAlign: "center",
      borderColor: "white",
      // color: colors.gray,
    },
    lower_wrapper: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: "white",
      padding: 40,
      paddingTop: 60,
    },
    quiz_btn: {
      backgroundColor: colors.yellow,
      borderRadius: 25,
      borderBottomWidth: 10,
      borderColor: colors.darkyellow,
      padding: 20,
      justifyContent: "space-between",
      height: 200,
    },
    operator_img: {
      height: 100,
      width: 100,
      position: "absolute",
      top: -25,
      right: 20,
    },
  },
  learn: {
    upperWrapper: {
      flex: 0.25,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
    },
    lowerWrapper: {
      flex: 0.75,
      backgroundColor: "white",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: "hidden",
    },
    text: {
      position: "absolute",
      bottom: 0,
      padding: 20,
      borderColor: colors.lightgray,
      backgroundColor: "white",
      flex: 1,
    },
    card: {
      borderWidth: 0.5,
      borderColor: colors.extralightgray,
      padding: 20,
      minHeight: 220,
      borderRadius: 20,
      marginBottom: 20,
      overflow: "hidden",
    },
  },
};