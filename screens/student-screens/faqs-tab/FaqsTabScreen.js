import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { externalStyle } from "../../../styles/externalStyle";
import { StatusBar } from "react-native";
import { FAQS_DATA } from "../../../services/var.services";
import Item from "../../../components/student-components/faqs-tab/Item";

const FaQs = () => {
  return (
    <View style={styles.container}>
      <StatusBar />

      <FlatList
        keyboardShouldPersistTaps={"handled"}
        nestedScrollEnabled={true}
        numColumns={1}
        data={FAQS_DATA}
        ListHeaderComponent={() => {
          return (
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                fontFamily: "semibold",
              }}
            >
              FAQS
            </Text>
          );
        }}
        contentContainerStyle={{ padding: 20 }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
};

export default FaQs;

const styles = StyleSheet.create(externalStyle);
