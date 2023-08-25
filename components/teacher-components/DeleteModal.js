import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "../Modal";
import { TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { setDeleteModal } from "../../redux";

const DeleteModal = (props) => {
  const { title, setModal } = props;
  return (
    <Modal>
      <Text style={styles.text}>
        Are you sere you want to delete "{title}"?
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity onPress={() => setModal(false)}>
          <Text style={styles.button}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props?.setDeleteModal(false)}>
          <Text
            style={[
              styles.button,
              { backgroundColor: colors.blue, borderWidth: 0, color: "white" },
            ]}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default connect(null, { setDeleteModal })(DeleteModal);

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 15,
    padding: 5,
    fontFamily: "semibold",
  },
  button: {
    padding: 15,
    paddingVertical: 10,
    // color: colors.white,
    fontFamily: "semibold",
    borderRadius: 10,
    marginTop: 5,
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: colors.extralightgray,
  },
});
