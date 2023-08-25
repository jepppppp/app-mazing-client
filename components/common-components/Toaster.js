import { View, Text } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
const Toaster = () => {
  return <Toast ref={(ref) => Toast.setRef(ref)} />;
};

export default Toaster;
