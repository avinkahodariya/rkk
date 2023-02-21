import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const CompletedScreen = ({ navigation, route }) => {
  const share = route.params;
  console.log(share);
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View style={{ alignItems: "center", marginTop: 100 }}>
        <Ionicons name="checkmark-circle-sharp" size={150} color="green" />
        <Text>{share.stock.name}</Text>
      </View>
      <TouchableOpacity
        style={{
          width: "80%",
          backgroundColor: "rgba(0, 122, 255, 0.1)",
          marginTop: 400,
          paddingVertical: 20,
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#345DAC",
          borderRadius: 6,
        }}
        onPress={() => navigation.navigate('Portfolio')}
      >
        <Text style={{ color: "#345DAC" }}>Close</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CompletedScreen;


