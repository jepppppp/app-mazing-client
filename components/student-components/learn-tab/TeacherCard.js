import {
  Animated,
  Easing,
  LayoutAnimation,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { externalStyle } from "../../../styles/externalStyle";
import colors from "../../../config/colors";
import toggleAnimation from "../faqs-tab/toggleAnimations";

const TeacherItem = ({ item }) => {
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
      activeOpacity={0.7}
    >
      <View
        style={{
          borderWidth: 0.7,
          borderColor: colors.lightgray,
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.profile_picture }}
            style={{
              borderRadius: 20,
              height: 80,
              resizeMode: "contain",
              width: 80,
              marginBottom: 5,
            }}
          />
          <Text style={{ fontFamily: "semibold", fontSize: 18 }}>
            {item.first_name} {item.last_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <Animated.Text
            style={{
              borderRadius: 20,
              maxHeight: showContent ? 1000 : 50,
              fontFamily: "regular",
            }}
            // numberOfLines={!showContent ? 100 : 3}
          >
            {item.description}
          </Animated.Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default TeacherItem;

const styles = StyleSheet.create(externalStyle);
