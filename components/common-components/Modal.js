import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import colors from "../../config/colors";
import { useHeaderHeight } from "@react-navigation/elements";

const { width, height } = Dimensions.get("screen");
const Modal = ({ children }) => {
  const headerHeight = useHeaderHeight();
  return (
    <View
      style={[
        {
          height: height - headerHeight,
        },
        styles.wrapper,
      ]}
    >
      <View style={styles.card}>{children}</View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.5)",
    width,
    zIndex: 99,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: colors.white,
  },
});
