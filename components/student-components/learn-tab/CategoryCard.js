import {
  Animated,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { externalStyle } from "../../../styles/externalStyle";
import colors from "../../../config/colors";
import { Image } from "react-native";
import { connect } from "react-redux";
import { checkProfile } from "../../../services/tools";
const { width } = Dimensions.get("screen");
const CategoryCard = (props) => {
  const animation = useRef(new Animated.Value(0)).current;
  const { backgroundColor, title, icon, borderColor } = props.data;

  const [selected, setSelected] = useState(props?.credentials?.grade);

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
        <Text
          style={{
            color: colors.white,
            fontSize: 16,
            textAlign: "center",
            fontFamily: "regular",
          }}
        >
          Change category below.
        </Text>
        <View>
          <View
            style={{
              width: width - 40,
              backgroundColor: "white",
              borderColor,
              borderWidth: 3,
              paddingVertical: 10,
              // paddingTop: 14,
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
              {selected}
            </Text>
          </View>
        </View>
      </View>
      <Animated.View
        style={{
          width,
          flex: 0.75,
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: "hidden",
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 260],
              }),
            },
            {
              scaleX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.9],
              }),
            },
            {
              scaleY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.9],
              }),
            },
          ],
        }}
      >
        {props.data?.datas.filter((_) => _.category == selected).length == 0 ? (
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
            data={props.data?.datas.filter((_) => _.category == selected)}
            contentContainerStyle={{
              padding: 20,
            }}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              let pic = checkProfile(item, props?.credentials);

              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    props.navigation.navigate({
                      name: `${
                        props.data?.type == "video"
                          ? "view-video"
                          : props.data?.type == "quiz"
                          ? "view-quiz"
                          : "view-module"
                      }`,
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
                      {item.title}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={pic}
                        style={{
                          borderRadius: 20,
                          height: 20,
                          width: 20,
                          marginRight: 10,
                        }}
                      />
                      <Text style={{ fontFamily: "regular", fontSize: 16 }}>
                        {item.teacher_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          padding: 5,
                          fontSize: 14,
                          paddingHorizontal: 10,
                          borderRadius: 20,
                          color: "white",
                          backgroundColor: colors.black,

                          fontFamily: "regular",
                        }}
                      >
                        {item.category}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </Animated.View>
      {props.children}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

export default connect(mapStateToProps, {})(CategoryCard);

const styles = StyleSheet.create(externalStyle);
