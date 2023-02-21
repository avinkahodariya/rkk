import { View, Text } from "react-native";
import React from "react";



const ModalDetails = ({average}) => {

  return (
    // Modal Details contain all the details of the share that is clicked by the user.
    <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 25, marginTop: 10 }}>
      <Text style={{ color: "#7e7e7e", marginRight: 10 }}>NSE</Text>
      <Text style={{ color: "red", marginRight: 10 }}>{average}</Text>
      <Text style={{ color: "#7e7e7e", marginRight: 4 }}>-0.25</Text>
      <Text style={{ color: "#7e7e7e", marginRight: 10 }}>(-1.85%)</Text>
      {/* View container containing MIS */}
      <View
        style={{
          backgroundColor: "#fff6ec",
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 3,
        }}
      >
        <Text style={{ color: "#f8a239", fontSize: 13 }}>MIS</Text>
      </View>
    </View>
  );
};

export default ModalDetails;
