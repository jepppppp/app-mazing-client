import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const ButtonCard = ({ _ }) => {
  return (
    <TouchableOpacity onPress={_?.handler} activeOpacity={0.7}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: _?.backgroundColor,
          padding: 15,
          width: width - 40,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            //   flex: 1,
            flexDirection: "column",
            flexShrink: 1,
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Image
            source={_?.icon}
            style={{
              width: 0.07 * height,
              height: 0.07 * height,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              fontSize: width * 0.06,
              color: "white",
              textAlign: "center",
              fontFamily: "semibold",
            }}
          >
            {_?.title}
          </Text>
          <Text
            style={{
              // fontSize: 17,
              color: "white",
              flexShrink: 1,
              textAlign: "center",
              fontFamily: "regular",
            }}
          >
            {_?.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonCard;

const styles = StyleSheet.create({});
