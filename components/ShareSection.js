import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Spacer from "./Spacer";
import ModalDetails from "./ModalDetails";
import ModalButton from "./ModalButton";
import { Feather } from "@expo/vector-icons";

const ShareSection = ({ shares, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [shareM, setShareM] = useState({});
  // Modal Content

  const modalContent = () => {
    return (
      <>
        {/* This view contains  the black overlay that wraps the whole screen*/}
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "flex-end",
          }}
        >
          {/* This view contains the bottom Modal Component that is the main concern */}
          <View
            style={{
              backgroundColor: "white",
              borderTopEndRadius: 20,
              height: 370,
              borderTopLeftRadius: 20,
            }}
          >
            {/* Company Name */}
            <CompanyName stock={shareM.stock} />
            {/* Modal Details Component*/}
            <ModalDetails average={shareM.avg} />
            <Spacer />
            {/* ADD and EXIT Buttons */}
            <View
              style={{
                paddingHorizontal: 40,
                alignItems: "center",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              {/* Modal Button Component for ADD*/}
              <ModalButton
                text="ADD"
                color="#345DAC"
                marginR={20}
                navigation={navigation}
                callback={() => setModalVisible(false)}
                shareM={shareM}
              />
              {/* Modal Button Compoent for EXIT */}
              <ModalButton
                text="EXIT"
                color="rgba(234, 34, 17, 0.75)"
                marginR={0}
                navigation={navigation}
                callback={() => setModalVisible(false)}
                shareM={shareM}
              />
            </View>
            {/* View Chart */}
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              {/* Icon for Chart */}
              <Feather
                name="bar-chart-2"
                size={24}
                color="#345DAC"
                style={{ marginRight: 15 }}
              />
              {/* Text "View Chart" */}
              <Text style={{ color: "#345DAC", marginRight: 15 }}>
                View chart
              </Text>
              {/* Icon for Arrow Right */}
              <Feather name="arrow-right" size={24} color="#345DAC" />
            </TouchableOpacity>
            <Spacer />
            {/* Create Alert */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              {/* Alert Icon */}
              <Feather
                name="bell"
                size={24}
                color="#345DAC"
                style={{ marginRight: 15 }}
              />
              {/* Text "Create Alert" */}
              <Text style={{ color: "#345DAC", fontSize: 16 }}>
                Create Alert
              </Text>
            </TouchableOpacity>
            {/* Market Depth */}
            <Text
              style={{
                paddingHorizontal: 20,
                fontSize: 16,
                fontWeight: "500",
                marginTop: 20,
              }}
            >
              Market Depth
            </Text>
          </View>
        </View>
      </>
    );
  };


  return (
    <>
      {/* Modal Component to be showed only when it is set to be true */}
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {modalContent()}
      </Modal>
      {/* Shares.map function maps all the shares on the screen*/}
      {shares.map((share) => (
        <View key={share.id}>
          {/* Touchable Opacity wraps all the share information */}
          <TouchableOpacity
            style={{ marginHorizontal: 15 }}
            onPress={() => {
              setModalVisible(true);
              setShareM(share);
            }}
          >
            {/* First Row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#7e7e7e",
                  fontSize: 12,
                }}
              >
                {share.qty} Qty.
              </Text>
              <View
                style={{
                  backgroundColor: "#fff6ec",
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderRadius: 3,
                }}
              >
                <Text
                  style={{
                    color: "#f8a239",
                    fontSize: 12,
                  }}
                >
                  {share.type}
                </Text>
              </View>
            </View>
            {/* Second Row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text >
                {share.stock.name}
              </Text>
              <Text
                style={{
                  color: !(share.position > 0) ? "red" : "green",
                }}
              >
                {share.position}
              </Text>
            </View>
            {/* Third Row */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "#7e7e7e",
                    fontSize: 12,
                  }}
                >
                  NSE Avg.{" "}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  {share.avg}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "#7e7e7e",
                    marginRight: 5,
                    fontSize: 12,
                  }}
                >
                  LTP
                </Text>
                <Text style={{ fontSize: 12 }}>
                  {share.closing_price}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* Spacer Component for Spacing */}
          <Spacer />
        </View>
      ))}
    </>
  );
};

const CompanyName = ({ stock }) => (
  <Text
    style={{
      fontSize: 20,
      fontWeight: "400",
      letterSpacing: 1,
      paddingTop: 25,
      paddingLeft: 25,
    }}
  >
    {stock.name}
  </Text>
);

export default ShareSection;
