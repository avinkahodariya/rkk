import { View, Text } from "react-native";
import React from "react";

const Spacer = () => {
  // Spacer component is used to give some margin above and below the two components
  return (
    <View
      style={{
        borderWidth: 0.6,
        opacity: 0.2,
        borderColor: "#7e7e7e",
        marginHorizontal: 7,
        borderRadius: 5,
        marginVertical: 15
      }}
    ></View>
  );
};

export default Spacer;