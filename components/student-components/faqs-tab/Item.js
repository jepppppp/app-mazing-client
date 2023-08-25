import {
  Animated,
  Dimensions,
  Easing,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { externalStyle } from "../../../styles/externalStyle";
import colors from "../../../config/colors";
import { DownArrowSvg } from "../../../components/svg-components";
import { toggleAnimation } from "./toggleAnimations";
const { width, height } = Dimensions.get("screen");

const Item = ({ item }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: showContent ? 0 : 1,
      duration: 150,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent(!showContent);
  };
  const arrowTransform = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["-90deg", "0deg"],
  });
  const [showContent, setShowContent] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        startAnimation();
      }}
    >
      <View
        style={[
          {
            width: width - 40,
            borderBottomColor: colors.gray,
            overflow: "hidden",
            paddingVertical: 10,
            borderColor: colors.gray,
            borderWidth: 1.5,
            borderBottomWidth: 6,
            paddingHorizontal: 15,
            marginVertical: 10,
            borderRadius: 25,
          },
        ]}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 20, fontFamily: "semibold", marginRight: 10 }}
          >
            {item.title}
          </Text>
          <Animated.View style={{ transform: [{ rotateZ: arrowTransform }] }}>
            <DownArrowSvg />
          </Animated.View>
        </Animated.View>
        {showContent && (
          <Text
            style={{
              fontSize: 17,
              fontFamily: "regular",
            }}
          >
            {item.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default Item;

const styles = StyleSheet.create(externalStyle);
