import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useFonts } from 'expo-font';


export default function HeaderTab(props) {
  const [loaded] = useFonts({
    InterBold: require('../Fonts/Inter-Bold.ttf'),
    InterRegular: require('../Fonts/Inter-Regular.ttf')
  });
  if (!loaded) {
    return null;
  }

  return (
    // View component contains the Position and Holdings Buttons
    <View style={styles.headerComponent}>
      {/* Holdings Button */}
      <HeaderButton
        text="Holdings"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        length={2}
      ></HeaderButton>
      {/* Positions Button */}
      <HeaderButton
        text="Positions"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        length={props.length}
      ></HeaderButton>
    </View>
  );
}

const HeaderButton = (props) => (
  // Touchable Opacity contains the Text and the border below the text. Actually the border below the text is property of This touchable opacity
  <TouchableOpacity
    style={{
      // If the button is active then the border color will be blue else it will be grey that is similar to the background
      borderBottomColor: props.activeTab === props.text ? "#345DAC" : "#ececee",
      borderBottomWidth: 2.5,
      paddingHorizontal: 16,
      paddingVertical: 6,
      marginHorizontal: 45,
      borderRadius: 2,
      paddingBottom: 20,
    }}
    onPress={() => props.setActiveTab(props.text)}
  >
    {/* Beginning of Text within Touchable Opacity*/}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Text Contains either Position or Holding Text */}
      <Text
        style={{
          // If the button is active then the color of text will be blue else it will be black
          color: props.activeTab === props.text ? "#345DAC" : "#3a3a3a",
          fontSize: 16,
          alignSelf: "center",
          fontFamily: 'InterBold'
        }}
      >
        {props.text}
      </Text>
      {/* This view contains the text within the circle that shows the number of either Holdings or Positions */}
      <View
        style={{
          width: 21,
          height: 21,
          backgroundColor:
            props.activeTab === props.text
              ? "rgba(0, 122, 255, 0.7)"
              : "rgba(58, 58, 58, 0.7)",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
          marginLeft: 5,
        }}
      >
        {/* Text contains the number of Holdings or Positions */}
        <Text
          style={{
            color: "white",
            fontSize: 10,
            fontFamily: 'InterRegular'
          }}
        >
          {props.length}
        </Text>
      </View>
    </View>
    {/* Ending of Text within Touchable Opacity*/}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  // Header Component Style that contains both the Positions and Holdings button
  headerComponent: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
