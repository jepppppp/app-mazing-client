import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import colors from "../../../config/colors";
import { connect } from "react-redux";
import { externalStyle } from "../../../styles/externalStyle";
const { width } = Dimensions.get("screen");
const VideoLayout = (props) => {
  const animation = useRef(new Animated.Value(0)).current;
  const { backgroundColor, title, icon, borderColor } = props.data;

  return (
    <View
      style={[
        styles.container,
        ,
        {
          backgroundColor,
        },
      ]}
    >
      <StatusBar />
      <View
        style={{
          flex: 0.25,
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          paddingVertical: 10,
          paddingBottom: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          {icon}
          <Text
            style={{
              fontFamily: "semibold",
              color: colors.white,
              fontSize: 25,
            }}
          >
            {title}
          </Text>
        </View>

        <View>
          <View
            style={{
              width: width - 40,
              backgroundColor: "white",
              borderColor,
              borderWidth: 3,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: "regular",
                fontSize: 17,
              }}
            >
              {props?.credentials?.grade}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width,
          flex: 0.75,
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: "hidden",
        }}
      >
        {props.data?.datas.length == 0 ? (
          <Text
            style={{
              textAlign: "center",
              padding: 25,
              fontSize: 18,
              color: colors.gray,
              fontFamily: "semibold",
            }}
          >
            Nothing to see here.
          </Text>
        ) : (
          <FlatList
            keyboardShouldPersistTaps={"handled"}
            nestedScrollEnabled={true}
            numColumns={1}
            data={props.data?.datas}
            contentContainerStyle={{
              padding: 20,
            }}
            keyExtractor={(_, key) => key}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  props.navigation.navigate({
                    name: "view-elearning-video",
                    params: { item },
                    merge: true,
                  })
                }
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
                  <Text
                    style={{
                      fontFamily: "semibold",
                      fontSize: 26,
                    }}
                  >
                    {item?.title}
                  </Text>
                  <Text numberOfLines={2} style={{ fontFamily: "regular" }}>
                    {item?.description}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      {props.children}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

export default connect(mapStateToProps, {})(VideoLayout);

const styles = StyleSheet.create(externalStyle);
