import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../../../config/colors";
import { externalStyle } from "../../../styles/externalStyle";
import { LEARN_DATA } from "../../../services/var.services";
const { width } = Dimensions.get("screen");
const Learn = (props) => {
  return (
    <View
      style={[
        {
          backgroundColor: colors.yellow,
        },
        styles.play.wrapper,
      ]}
    >
      <View style={styles.learn.upperWrapper}>
        <View
          style={{
            flex: 1,
            flexShrink: 1,
          }}
        >
          <Text style={{ fontFamily: "semibold", fontSize: 30 }}>
            Learning{"\n"}everywhere
          </Text>
          <Text
            style={{
              fontFamily: "regular",
              fontSize: 17,
            }}
          >
            Learn with pleasure with us, whenever you are!
          </Text>
        </View>
        <Image
          source={require("../../../assets/images/learn-images/thinking_kid.png")}
          style={{ width: 120, height: 120, resizeMode: "contain" }}
        />
      </View>
      <View style={styles.learn.lowerWrapper}>
        <ScrollView
          style={{
            padding: 20,
          }}
        >
          {LEARN_DATA.map((_, i) => (
            <TouchableOpacity
              key={`links-${i}`}
              activeOpacity={0.7}
              onPress={() => props.navigation.navigate(_.name)}
            >
              <View
                style={[
                  {
                    backgroundColor: _.color,
                  },
                  styles.learn.card,
                ]}
              >
                <View style={{ alignItems: "center" }}>{_.image}</View>
                <View style={styles.learn.text}>
                  <Text
                    style={{ fontSize: width * 0.05, fontFamily: "semibold" }}
                  >
                    {_.label}
                  </Text>
                  {_?.description && (
                    <Text style={{ fontSize: 15, fontFamily: "regular" }}>
                      {_.description}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Learn;

const styles = StyleSheet.create(externalStyle);
