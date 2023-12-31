import { View, Text } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios_config from "../../config/axios_config";
import { ScrollView } from "react-native";
import moment from "moment";
import { timeFormatter } from "../../services/tools";

const LeaderboardHistory = (props) => {
  const [data, setData] = useState([]);
  const final_item = props?.route?.params;
  console.log(final_item);
  const load = async () => {
    await axios_config
      .get("highscore/find/" + final_item?.game_title)
      .then((res) => {
        setData(res?.data?.data.filter((d) => d.lrn == final_item?.lrn));
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    load();
  }, []);
  const BOLD = (props) => {
    return <Text style={{ fontFamily: "semibold" }}>{props?.text}</Text>;
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        {data?.map(({ name, duration, points, createdAt }, id) => (
          <View
            key={id}
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 17, textTransform: "capitalize" }}>
                <BOLD text="Name" /> {name}
              </Text>
              <Text style={{ fontSize: 17 }}>
                <BOLD text="Points: " /> {points}
              </Text>
              <Text style={{ fontSize: 17 }}>
                <BOLD text="Duration: " /> {timeFormatter(duration)}
              </Text>
              <Text style={{ fontSize: 17, fontStyle: "italic" }}>
                <BOLD text="Date:" />{" "}
                {moment(createdAt).format("MMM DD YYYY HH:mm A")}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default LeaderboardHistory;