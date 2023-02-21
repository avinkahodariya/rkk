import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Spacer from "../components/Spacer";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import SwipeButton from "rn-swipe-button";
import { RadioButton } from "react-native-paper";
import { useFonts } from "expo-font";

const CheckOutScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState("Regular");
  const [productTab, setProductTab] = useState("Intraday");
  const [typeTab, setTypeTab] = useState("Market");
  const [iconWidth, setIconWidth] = useState(300)

  // Loading Fonts
  const [loaded] = useFonts({
    InterBold: require("../Fonts/Inter-Bold.ttf"),
    InterRegular: require("../Fonts/Inter-Regular.ttf"),
    InterBlack: require("../Fonts/Inter-Black.ttf"),
    InterExtraBold: require("../Fonts/Inter-ExtraBold.ttf"),
    InterExtraLight: require("../Fonts/Inter-ExtraLight.ttf"),
    InterLight: require("../Fonts/Inter-Light.ttf"),
    InterMedium: require("../Fonts/Inter-Medium.ttf"),
    InterSemiBold: require("../Fonts/Inter-SemiBold.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const { shareM, color } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header section */}
      <Header share={shareM} navigation={navigation} color={color} />
      {/* Header Tab that includes 3 buttons (Regular, Cover, AMO) */}
      <HeaderTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        color={color}
      />
      {/* Tab section with shadow lies in this view */}
      <View
        style={{
          backgroundColor: "white",
          marginTop: 90,
          zIndex: 10,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Tab />
      </View>
      <View style={{ flex: 1, backgroundColor: "white", paddingTop: 90 }}>
        {/* Product Text */}
        <Text
          style={{
            fontWeight: "700",
            fontSize: 16,
            color: "#333",
            paddingHorizontal: 20,
          }}
        >
          Product
        </Text>
        {/* Product Tab */}
        <ProductTab
          activeTab={productTab}
          setActiveTab={setProductTab}
          color={color}
        />
        {/* View for some margin */}
        <View style={{ marginTop: 10 }}></View>
        {/* Spacer component for margin */}
        <Spacer />
        {/* Type Text */}
        <Text
          style={{
            fontWeight: "700",
            fontSize: 16,
            color: "#333",
            paddingHorizontal: 20,
            marginTop: 10,
          }}
        >
          Type
        </Text>
        {/* Type Tab */}
        <TypeTab activeTab={typeTab} setActiveTab={setTypeTab} color={color} />
        {/* View component for some margin */}
        <View style={{ marginTop: 10 }}></View>
        {/* Spacer component for margin */}
        <Spacer />
        {/* More Text + Icon */}
        <View
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#333" }}>More</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={34}
            color="#333"
            style={{ marginTop: 11 }}
          />
        </View>
        {/* Text above the Swipe Button */}
        <View
          style={{
            backgroundColor: "#f1f1f1",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginTop: 30,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text>Approx. margin ₹ 0.00 (5x) </Text>
            <Ionicons name="reload-outline" size={20} color="black" />
          </View>
          <Text>Avail. ₹200.95</Text>
        </View>
        {/* View contains the swipe button */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <SwipeButton
            disableResetOnTap
            width={300}
            height={70}
            railBackgroundColor={color}
            thumbIconComponent={() => (
              <View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={40}
                  color={color}
                />
              </View>
            )}
            thumbIconBackgroundColor="#FFFFFF"
            title="Swipe to Buy"
            onSwipeSuccess={() =>
              {
                navigation.navigate("CompletedScreen", shareM)
                setIconWidth(75)
              }
            }
            thumbIconBorderColor="#ffffff"
            disabledRailBackgroundColor={color}
            titleColor="white"
            disabledThumbIconBorderColor="white"
            disabledThumbIconBackgroundColor="white"
            containerStyles={{
              backgroundColor: "white",
            }}
            railFillBackgroundColor={color}
            railFillBorderColor={color}
            railBorderColor={color}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const Header = ({ share, navigation, color }) => {
  const [checked, setChecked] = React.useState("first");
  return (
    <View
      style={{
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f1f1f1",
      }}
    >
      {/* Back Arrow + Header Text */}
      <View style={{ flexDirection: "row" }}>
        {/* Left arrow button */}
        <TouchableOpacity onPress={() => navigation.navigate("Portfolio")}>
          <Feather name="arrow-left" size={32} color="#333" />
        </TouchableOpacity>
        {/* Company Name + Radio Buttons */}
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 17, marginLeft: 11 }}>
            {share.stock.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RadioButton
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
              color={color}
            />
            <Text style={{ color: checked === "first" ? color : "#333" }}>
              NSE: ₹ 13.20
            </Text>
            <RadioButton
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked("second")}
              color={color}
            />
            <Text style={{ color: checked === "second" ? color : "#333" }}>
              BSE: ₹ 13.21
            </Text>
          </View>
        </View>
      </View>
      {/* Three dots icon */}
      <Entypo name="dots-three-vertical" size={24} color="#333" />
    </View>
  );
};

// Header Tab that includes 3 buttons
const HeaderTab = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        marginTop: 10,
      }}
    >
      {/* Regular button */}
      <HeaderButton
        text="Regular"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        color={props.color}
      ></HeaderButton>
      {/* Cover button */}
      <HeaderButton
        text="Cover"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        color={props.color}
      ></HeaderButton>
      {/* AMO button */}
      <HeaderButton
        text="AMO"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        color={props.color}
      ></HeaderButton>
    </View>
  );
};

// This component renders the buttons of header tab
const HeaderButton = (props) => (
  <TouchableOpacity
    style={{
      borderBottomColor:
        props.activeTab === props.text ? props.color : "#f1f1f1",
      borderBottomWidth: 2.5,
      borderRadius: 1,
      paddingBottom: 20,
      width: 100,
    }}
    onPress={() => props.setActiveTab(props.text)}
  >
    {/* Beginning of Text within Touchable Opacity*/}
    <View>
      <Text
        style={{
          color: props.activeTab === props.text ? props.color : "#3a3a3a",
          fontSize: 16,
          fontWeight: "500",
          alignSelf: "center",
        }}
      >
        {props.text}
      </Text>
    </View>
    {/* Ending of Text within Touchable Opacity*/}
  </TouchableOpacity>
);

// This component is the centre div that has shadow
const Tab = () => {
  const [PnL, setPnL] = useState(-0.15);
  return (
    <View
      style={{
        backgroundColor: "white",
        width: "88%",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        top: -65,
        height: 130,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.7,
        shadowRadius: 4.67,
        elevation: 6,
        flexDirection: "row",
        padding: 20,
      }}
    >
      {/* First coulmn for Quantity and its text input */}
      <View>
        {/* View contains the Text of first coulmn */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontWeight: "800", color: "#333" }}>Quantity</Text>
          <Text style={{ color: "#7e7e7e" }}>Lot: 1</Text>
        </View>
        {/* Text Input for Quantity */}
        <TextInput
          style={{
            borderWidth: 1,
            width: 150,
            borderColor: "#c1c1c1",
            height: 60,
            padding: 10,
            borderRadius: 2,
            fontSize: 18
          }}

        ></TextInput>
      </View>
      {/* Second coulmn for Price and its text input */}
      <View>
        {/* This view contains the text of Price */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontWeight: "800", color: "#333" }}>Price</Text>
          <Text style={{ color: "#7e7e7e" }}>Tick: 0.05</Text>
        </View>

        <TextInput
          style={{
            borderWidth: 1,
            width: 150,
            borderColor: "#c1c1c1",
            height: 60,
            padding: 10,
            borderRadius: 2,
            fontSize: 18
          }}
          editable={false}
          placeholder="0.00"
        ></TextInput>
      </View>
    </View>
  );
};

// Product tab
const ProductTab = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        paddingHorizontal: 20,
      }}
    >
      <ProductButton
        text="Intraday"
        subText="MIS"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        color={props.color}
      ></ProductButton>
      <ProductButton
        text="Longterm"
        subText="CNC"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        color={props.color}
      ></ProductButton>
    </View>
  );
};

// This component renders the Product buttons for product tab
const ProductButton = (props) => (
  <TouchableOpacity
    style={{
      borderColor: props.activeTab === props.text ? props.color : "#f1f1f1",
      borderWidth: 1,
      borderRadius: 1,
      paddingHorizontal: 36,
      paddingVertical: 12,
      justifyContent: "center",
      alignItems: "center",
    }}
    activeOpacity={1}
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
      <Text
        style={{
          color: props.activeTab === props.text ? props.color : "#3a3a3a",
          fontSize: 16,
          fontWeight: "500",
          alignSelf: "center",
          marginRight: 10,
        }}
      >
        {props.text}
      </Text>
      <Text
        style={{
          color: props.activeTab === props.text ? props.color : "#3a3a3a",
          fontSize: 13,
          fontWeight: "500",
          alignSelf: "center",
          fontWeight: "300",
        }}
      >
        {props.subText}
      </Text>
    </View>
    {/* Ending of Text within Touchable Opacity*/}
  </TouchableOpacity>
);

// Type Tab
const TypeTab = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        paddingHorizontal: 20,
      }}
    >
      <TypeButton
        text="Market"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        width={50}
        color={props.color}
      ></TypeButton>
      <TypeButton
        text="Limit"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        color={props.color}
      ></TypeButton>
      <TypeButton
        text="SL"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        color={props.color}
      ></TypeButton>
      <TypeButton
        text="SL-M"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        color={props.color}
      ></TypeButton>
    </View>
  );
};

// This component renders the buttons for Type Tab
const TypeButton = (props) => (
  <TouchableOpacity
    style={{
      borderColor: props.activeTab === props.text ? props.color : "#f1f1f1",
      borderWidth: 1,
      borderRadius: 1,
      paddingHorizontal: 20,
      paddingVertical: 12,
    }}
    activeOpacity={1}
    onPress={() => props.setActiveTab(props.text)}
  >
    {/* Beginning of Text within Touchable Opacity*/}
    <Text
      style={{
        color: props.activeTab === props.text ? props.color : "#3a3a3a",
        fontSize: 16,
        fontWeight: "500",
      }}
    >
      {props.text}
    </Text>
    {/* Ending of Text within Touchable Opacity*/}
  </TouchableOpacity>
);

export default CheckOutScreen;