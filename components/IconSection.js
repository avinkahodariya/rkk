import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";



const IconSection = () => {

  return (
    // View Section that contains 3 icons and their text
    <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Containing Search and Filter Icon*/}
        <View style={{ flexDirection: "row" }}>
          {/* Containing Search Icon */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginRight: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather
              name="search"
              size={18}
              color="#345DAC"
              style={{ marginRight: 7 }}
            />
            <Text style={{ color: "#345DAC", fontSize: 13 }}>Search</Text>
          </TouchableOpacity>
          {/* Containing Filter Icon */}
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Feather
              name="sliders"
              size={18}
              color="#345DAC"
              style={{ marginRight: 7 }}
            />
            <Text style={{ color: "#345DAC", fontSize: 13, }}>Filter</Text>
          </TouchableOpacity>
        </View>
        {/* Analytics */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="md-pie-chart-sharp"
            size={18}
            color="#345DAC"
            style={{ marginRight: 7 }}
          />
          <Text style={{ color: "#345DAC", fontSize: 13 }}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default IconSection;