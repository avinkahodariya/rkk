import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import IconSection from "./IconSection";
import Spacer from "./Spacer";
import ShareSection from "./ShareSection";


const PortflioBodySection = ({navigation, shares}) => {

  return (
    <View>
      {/* Icon Section containing top 3 icons */}
      <IconSection />
      {/* Spacer Component to create space */}
      <Spacer />
      {/* Share Section */}
      <ShareSection shares={shares} navigation={navigation}/>
    </View>
  );
};

export default PortflioBodySection;
