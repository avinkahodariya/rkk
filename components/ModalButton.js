import { View, Text, TouchableOpacity } from "react-native";
import React from "react";


const ModalButton = ({ text, color, marginR, navigation, callback, shareM }) => {

  // This function will be called when the user will press on either Add or Sell
  function onPressed (){
    callback();
    navigation.navigate('CheckOutScreen', {shareM, color})
  }
  return (
    // Button containing either Add or Sell Text
    <TouchableOpacity
      style={{
        height: 60,
        borderRadius: 6,
        backgroundColor: color,
        width: 150,
        marginRight: marginR,
        alignItems: "center",
        justifyContent: "center",
      }}
      // Whenever the user press the button, onPressed function will be called that is declared in the start of the component.
      onPress= {()=>onPressed()}
    >
      {/* Text contains either Add or Sell Text that is being passed from Modal Component */}
      <Text
        style={{
          fontSize: 16,
          color: "white",
          fontWeight: "600",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ModalButton;
