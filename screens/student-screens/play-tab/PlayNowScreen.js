import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { externalStyle } from "../../../styles/externalStyle";
import colors from "../../../config/colors";
import { connect } from "react-redux";
import { setGradeCategory } from "../../../redux";
import { PLAY_NOW_DATA } from "../../../services/var.services";
import ButtonCard from "../../../components/common-components/ButtonCard"
const PlayNow = (props) => {
  const menuHandler = (link) => {
    props.setGradeCategory(link);
    props.navigation.navigate("game_menu");
  };
  const PLAY_DATA = PLAY_NOW_DATA.filter((pd) =>
    pd?.allowed.toLowerCase().includes(props.credentials?.grade.toLowerCase())
  );
  return (
    <View
      style={[
        {
          backgroundColor: colors.gray,
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <StatusBar />
      <Text
        style={{
          textAlign: "center",
          fontFamily: "semibold",
          color: colors.white,
          fontSize: 30,
        }}
      >
        App-Mazing Selection
      </Text>

      <View>
        {PLAY_DATA.map((_, i) => (
          <React.Fragment key={i}>
            <ButtonCard _={{ ..._, handler: () => menuHandler(_?.link) }} />
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

export default connect(mapStateToProps, {
  setGradeCategory,
})(PlayNow);

const styles = StyleSheet.create(externalStyle);
