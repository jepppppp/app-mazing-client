import {
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import { addAudit, playSound, random } from "../../../../../../services/tools";
import colors from "../../../../../../config/colors";
import {
  PASSING_SCORE,
  cheat_sheet_treasure,
  treasure_game_images,
} from "../../../../../../services/var.services";
import Timer from "../../../../../../components/common-components/Timer";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("screen");
const Treasure = (props) => {
  //x y
  const [resultModal, setResultModal] = useState(null);
  const [isPassed, setIsPassed] = useState(false);
  const [keys, setKeys] = useState(Array.from({ length: 5 }, (_, i) => i));
  const [target, setTarget] = useState();
  const [mainData, setMainData] = useState(JSON.parse(cheat_sheet_treasure));
  const [toggle, setToggle] = useState(false);
  const [score, setScore] = useState(0);
  const [axis, setAxis] = useState(null);
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const locateHandler = (pt) => {
    const temp_main = JSON.parse(cheat_sheet_treasure);

    for (let i = 0; i < pt.length; i++) {
      for (let j = 0; j < mainData.length; j++) {
        if (mainData[j].x == pt[i].x && mainData[j].y == pt[i].y) {
          temp_main[j] = {
            x: pt[i].x,
            y: pt[i].y,
            image: treasure_game_images[i],
          };
        }
      }
    }
    setMainData([...temp_main]);
  };
  const submitHandler = () => {
    const newData = { x, y };
    if (newData.x == target.x && newData.y == target.y) {
      let newPoints = score + 2;
      setScore(newPoints);
      setIsPassed(PASSING_SCORE.GRADE46 <= newPoints);

      playSound(require("../../../../../../assets/audio/sfx/coins_sfx.wav"));
      setX(null);
      setY(null);
      setAxis("x");
      generateHandler();
    } else {
      playSound(require("../../../../../../assets/audio/sfx/wrong_sfx.wav"));
    }
  };
  // const the_points = cheat_sheet_treasure;
  const generateHandler = () => {
    let temp_points = [];
    while (temp_points.length < 10) {
      let multiplier_x = random(2) == 1 ? -1 : 1;
      let random_point_x = random(4) * multiplier_x;

      let multiplier_y = random(2) == 1 ? -1 : 1;
      let random_point_y = random(3) * multiplier_y;

      let new_points = { x: random_point_x, y: random_point_y, value: "" };
      if (
        temp_points.filter((i) => i.x === new_points.x && i.y === new_points.y)
          .length == 0
      ) {
        temp_points = [...temp_points, new_points];
      }
    }
    const target_index = random(10) - 1;
    const temp_target = temp_points[target_index];
    setTarget({
      ...temp_target,
      image: treasure_game_images[target_index],
    });
    locateHandler(temp_points);
  };
  useEffect(() => {
    generateHandler();
    addAudit(
      {
        full_name:
          props.credentials?.first_name + " " + props.credentials?.last_name,
        id_number: props.credentials?.id_number,
        grade: props.credentials?.grade?.replace("Grade", ""),
      },
      "play",
      "Charting Treasure"
    );
  }, []);

  const answerHandler = (ans) => {
    if (axis != null) {
      if (axis == "x") {
        if (ans == "-") {
          setX(x * -1);
          return;
        }

        setX(ans);
      }
      if (axis == "y") {
        if (ans == "-") {
          setY(y * -1);
          return;
        }

        setY(ans);
      }
    }
  };
  const renderItem = ({ item, index }) => (
    <View
      key={index}
      style={{
        borderStyle: "dotted",
        borderWidth: 1,
        borderTopWidth: index + 1 <= 10 ? 0 : 1,
        borderBottomWidth: index + 1 >= 70 ? 0 : 1,
        width: width / 10,
        height: width / 10,
        textAlign: "center",
      }}
    >
      {item?.image && (
        <Image
          source={item?.image}
          style={{
            transform: [{ translateX: -15 }, { translateY: -15 }],
            width: 30,
            height: 30,
          }}
        />
      )}
      <Text
        style={{
          fontFamily: "semibold",
          fontSize: 15,
          color: colors.white,
          transform: [{ translateX: 5 }, { translateY: -10 }],
        }}
      >
        {item?.value}
      </Text>
    </View>
  );
  // 8rows 10columns
  return (
    <View
      style={{
        backgroundColor: "#6ea9f9",
        flex: 1,
        alignItems: "center",
        position: "relative",
        justifyContent: "center",
      }}
    >
      <Timer
        game_number={11}
        setPoints={setScore}
        height={height}
        width={width}
        points={score}
        playHandler={() => {
          generateHandler();
          setIsPassed(false);
        }}
        isPassed={isPassed}
        setResultModal={setResultModal}
        resultModal={resultModal}
      />
      <View style={{ flex: 0.9 }}>
        {/* Upper  */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 0.3,
            paddingHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "semibold", fontSize: 18 }}>
            Locate the following {"\n"} image in the maps.
            {/* {target?.x} {target?.y} */}
          </Text>
          <Image source={target?.image} style={{ width: 100, height: 100 }} />
        </View>
        {/* FLATLIST TO */}
        {/* Middle  */}
        <View
          style={{
            position: "relative",
            overflow: "hidden",
            height: width,
            maxHeight: (width / 10) * 8,
          }}
        >
          <View>
            <FlatList data={mainData} numColumns={10} renderItem={renderItem} />
            <Image
              style={[
                {
                  position: "absolute",
                  zIndex: -10,
                  width,
                  height: width,
                  maxHeight: (width / 10) * 8,
                  resizeMode: "contain",
                },
              ]}
              source={require("../../../../../../assets/images/game-images/treasure-images/map.jpg")}
            />
          </View>
        </View>
        {/* y  */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "semibold",
                  fontSize: 17,
                }}
              >
                X:
              </Text>
              <TouchableOpacity onPress={() => setAxis("x")}>
                <Text
                  style={[
                    styles.answer,
                    {
                      borderColor: axis == "x" ? colors.green : colors.white,
                      borderWidth: 2,
                    },
                  ]}
                >
                  {x}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "semibold",
                  fontSize: 17,
                }}
              >
                Y:
              </Text>
              <TouchableOpacity onPress={() => setAxis("y")}>
                <Text
                  style={[
                    styles.answer,
                    {
                      borderColor: axis == "y" ? colors.green : colors.white,
                      borderWidth: 2,
                    },
                  ]}
                >
                  {y}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => submitHandler()}>
              <Text
                style={{
                  padding: 10,
                  backgroundColor: colors.blue,
                  color: colors.white,
                  paddingHorizontal: 15,
                  fontFamily: "semibold",
                  borderRadius: 100,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          ></View>
        </View>
        <View
          style={{
            flexDirection: "row",
            // flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {keys.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => answerHandler(_)}>
              <Text style={styles.keys}>{_}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity>
            <Text style={styles.keys} onPress={() => answerHandler("-")}>
              {"- +"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};
export default connect(mapStateToProps, {})(Treasure);
const styles = StyleSheet.create({
  keys: {
    width: width / 6 - 20,
    fontSize: (width / 6 - 10) * 0.25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: width / 8 - 10,
    margin: 5,
    textAlign: "center",
    padding: 10,
    fontFamily: "semibold",
    backgroundColor: "white",
  },
  answer: {
    padding: 10,
    width: width / 6 - 20,
    height: width / 6 - 20,
    fontFamily: "semibold",
    alignItems: "center",
    justifyContent: "center",
    fontSize: (width / 6 - 10) * 0.3,
    backgroundColor: "white",
    borderRadius: 10,
    textAlign: "center",
  },
});
