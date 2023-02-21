import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";


const ProfitNLossTab = () => {

  const [PnL, setPnL] = useState(-0.15);
  // Profit and Loss tab
  return (
    // View contaier is the main thing, that contains the background shadow plus the text within it
    <View
      style={{
        backgroundColor: "white",
        width: "88%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -30,
        height: 80,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.7,
        shadowRadius: 4.67,
        elevation: 6,
      }}
    >
      {/* View contains the inner text */}
      <View style={{ alignItems: "center" }}>
        {/* Total P&L text */}
        <Text
          style={{
            fontSize: 16,
            color: "#7e7e7e",
            marginBottom: 3,
          }}
        >
          Total P&L
        </Text>
        {/* P&L text value */}
        <Text style={{ color: "red", fontSize: 18 }}>
          {PnL}
        </Text>
      </View>
    </View>
  );
};

export default ProfitNLossTab;
