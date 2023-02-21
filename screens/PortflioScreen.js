import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";

const PortflioScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Positions");
  const [positions, setPositions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  let closedPositions = []
  let openPositions = []

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  // Fetch data API
  const fetchData = async () => {
    const configurationObject = {
      method: "get",
      url: "http://kite-zerodha.com/get-positions",
    };
    const response = await axios(configurationObject);
    setPositions(response.data.positions);
    // arrangePositions(positions);
    // console.log("Closed Positions ->", closedPositions.length);
    // console.log("-----------------------------")
    // console.log("Open Positions ->", openPositions.length);
    // setPositions(openPositions.concat(closedPositions))
    // console.log(positions)
  };

  // Every time component mounts on screen fetchData API will be called
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      () => {
        fetchData();
      };

    });
  }, [navigation]);

  setTimeout(() => {
    fetchData();
  }, 1000);

  // Arranging data according to closed Positions and Open Positions
  function arrangePositions(positions) {
    openPositions = []
    closedPositions = []
    positions.forEach((position) => {
      if (position.closing_price === null) {
        openPositions.push(position);
      }
      else if (position.closing_price !== null) {
        closedPositions.push(position);
      }
    })
  }

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

  return (
    <SafeAreaView
      style={{ backgroundColor: "#16202A", flex: 1, alignItems: "center",backgroundColor: '#1c2939' }}
    >
      {/* View Container containing Header tab */}
      <View style={{ width: "100%", marginTop: 7,backgroundColor: '#1c2939' }}>
        <HeaderTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          length={positions.length}
        ></HeaderTab>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ width: "100%",
        backgroundColor: '#1c2939'
      }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#345DAC"]}
            progressViewOffset={20}
          />
        }
      >
        {/* View container containing Proft n Loss Tab */}
        <View
          style={{
            backgroundColor: "white",
            marginTop: 55,
            zIndex: 10,
            width: "100%",
            alignItems: "center",
          }}
        >
          <ProfitNLossTab positions={positions} />
        </View>
        {/* View containing body Section*/}
        <View style={{ flex: 1, backgroundColor: "#16202A", width: "100%",
      backgroundColor: '#1c2939'
      }}>
          {/* Portflio body Section Component */}
          <PortflioBodySection
            navigation={navigation}
            shares={positions}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const HeaderTab = (props) => {
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
};

const HeaderButton = (props) => (
  // Touchable Opacity contains the Text and the border below the text. Actually the border below the text is property of This touchable opacity
  <TouchableOpacity
    style={{
      // If the button is active then the border color will be blue else it will be grey that is similar to the background
      borderBottomColor: props.activeTab === props.text ? "#345DAC" : "#16202A",
      borderBottomWidth: 2,
      paddingHorizontal: 12,
      paddingVertical: 0,
      marginHorizontal: 45,
      borderRadius: 2,
      paddingBottom: 15,

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
          color: props.activeTab === props.text ? "#345DAC" : "#cacccf",
          fontSize: 14,
          alignSelf: "center",
          fontFamily: "InterBold",
        }}
      >
        {props.text}
      </Text>
      {/* This view contains the text within the circle that shows the number of either Holdings or Positions */}
      <View
        style={{
          width: 23,
          height: 23,
          backgroundColor:
            props.activeTab === props.text
              ? "rgba(0, 122, 255, 0.7)"
              : "#666D7F",
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
            fontWeight: "bold",
            fontFamily: "InterRegular",
          }}
        >
          {props.length}
        </Text>
      </View>
    </View>
    {/* Ending of Text within Touchable Opacity*/}
  </TouchableOpacity>
);

const ProfitNLossTab = ({ positions }) => {
  const [PnL, setPnL] = useState(-0.15);
  // Profit and Loss tab
  return (
    // View contaier is the main thing, that contains the background shadow plus the text within it
    <View
      style={{
        backgroundColor: "#2F4052",
        width: "92%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -35,
        height: 120,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      {/* View contains the inner text */}
      <View style={{ alignItems: "center" }}>
        {/* Total P&L text */}
        <Text
          style={{
            fontSize: 18,
            color: "#7e7e7e",
            marginBottom: 3,
            fontFamily: "InterRegular",
          }}
        >
          Total P&L
        </Text>
        {/* P&L text value */}
        <Text
          style={{
            color: !(calculateTotalChangeCapital(positions) > 0)
              ? "#e25f5b"
              : "#5b9a5d",
            fontSize: 24,
            fontFamily: "InterRegular",
          }}
        >
          {numberWithCommas(calculateTotalChangeCapital(positions))}
        </Text>
      </View>
    </View>
  );
};

const PortflioBodySection = ({ navigation, shares }) => {
  return (
    <View style={{paddingTop: 30,
                marginTop: 20, 
                backgroundColor: "#16202a", 
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                height: '100%'
        }}>
      {/* Icon Section containing top 3 icons */}
      <IconSection />
      {/* Spacer Component to create space */}
      <Spacer />
      {/* Share Section */}
      <ShareSection shares={shares} navigation={navigation} />
    </View>
  );
};

const IconSection = () => {
  return (
    // View Section that contains 3 icons and their text
    <View style={{ paddingTop: 50, paddingHorizontal: 15 }}>
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
              size={20}
              color="#345DAC"
              style={{ marginRight: 0 }}
            />
            {/* <Text
              style={{
                color: "#345DAC",
                fontSize: 13,
                fontFamily: "InterRegular",
              }}
            >
              Search
            </Text> */}
          </TouchableOpacity>
          {/* Containing Filter Icon */}
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Feather
              name="sliders"
              size={20}
              color="#345DAC"
              style={{ marginRight: 7 }}
            />
            {/* <Text
              style={{
                color: "#345DAC",
                fontSize: 13,
                fontFamily: "InterRegular",
              }}
            >
              Filter
            </Text> */}
          </TouchableOpacity>
        </View>
        {/* Analyze & Analytics */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{
              borderRadius: 50,
              padding:4,
              backgroundColor: '#ccc',
            }}>

            
            <Image
              source={require("../assets/1655207596626.png")}
              style={{ width: 18, height: 18, resizeMode: "contain",
            }}
            />
            </View>
            <Text
              style={{
                color: "#345DAC",
                fontSize: 13,
                fontFamily: "InterRegular",
                marginLeft: 7,
                marginRight: 18,
              }}
            >
              Analyze
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SvgComponent width={17} height={17} resizeMode="contain" />
            <Text
              style={{
                color: "#345DAC",
                fontSize: 13,
                fontFamily: "InterRegular",
                marginLeft: 7,
              }}
            >
              Analytics
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const SvgComponent = (props) => (
  <Svg
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    {...props}
  >
    <Path
      d="M50 97a47 47 0 1 1 47-47c-.21 25.88-21.12 47-47 47Zm0-71.64a24.75 24.75 0 1 0 24.64 24.85A24.74 24.74 0 0 0 50 25.36Z"
      style={{
        fill: "#2cb9ff",
      }}
    />
    <Path
      d="M87.06 78.78A46.3 46.3 0 0 1 50 97a47 47 0 1 1 37.06-75.78l-17.6 13.46a24.75 24.75 0 1 0 0 30.43Z"
      style={{
        fill: "#0054c6",
      }}
    />
  </Svg>
);

const Spacer = () => {
  // Spacer component is used to give some margin above and below the two components
  return (
    <View
      style={{
        borderWidth: 0.4,
        opacity: 0.2,
        borderColor: "#7e7e7e",
        marginHorizontal: 7,
        borderRadius: 5,
        marginVertical: 15,
      }}
    ></View>
  );
};

const ShareSection = ({ shares, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [shareM, setShareM] = useState({});
  const [Opacity1, setOpacity1] = useState(1);
  let myArray = [];
  let name = "";

  function closingPrice(share) {
    if (share.closing_price) {
      return null;
    }
    else {
      return 1;
    }
  }

  function closingPrice1(share) {
    if (share.closing_price) {
      return true;
    }
    else {
      return false;
    }
  };

  function compare(a, b) {
    if (calculateChangeCapitalForCompare(a) < calculateChangeCapitalForCompare(b)) {
      return -1;
    }
    if (calculateChangeCapitalForCompare(a) > calculateChangeCapitalForCompare(b)) {
      return 1;
    }
    return 0;
  }

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
              <Text
                style={{
                  color: "#345DAC",
                  marginRight: 15,
                  fontFamily: "InterRegular",
                }}
              >
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
              <Text
                style={{
                  color: "#345DAC",
                  fontSize: 16,
                  fontFamily: "InterRegular",
                }}
              >
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
                fontFamily: "InterSemiBold",
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {shares.filter(closingPrice).sort((a, b) => calculateChangeCapitalForCompare(b) - calculateChangeCapitalForCompare(a)).map((share) => (
          
          <View key={share.id}>
            
            {/* Touchable Opacity wraps all the share information */}
            <TouchableOpacity
              style={{
                marginHorizontal: 15,
                opacity: share.closing_price === null ? 1 : 0.5,
              }}
              onPress={() => {
                setModalVisible(true);
                setShareM(share);
              }}
              activeOpacity={1}
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
                {/* Qty */}

                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      // color: "#7e7e7e",
                      color: share.closing_price !== null ? "#cacccf" : "#345DAC",
                      fontSize: 12,
                      fontFamily: "InterRegular",
                    }}
                  >
                    {share.closing_price !== null ? 0 : share.qty}
                  </Text>
                  <Text> </Text>
                  <Text
                    style={{
                      fontFamily: "InterRegular",
                      fontSize: 12,
                      color: "#7e7e7e",
                    }}
                  >
                    Qty.
                  </Text>

                </View>


                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#7e7e7e",
                      fontSize: 12,
                      fontFamily: "InterRegular",
                    }}
                  >
                    {share.market_type.name} Avg.{"  "}
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: "InterRegular" }}>
                    {share.closing_price !== null ? "0.00" : share.avg}
                  </Text>
                </View>
                {/* MIS */}
                <View
                  style={{
                    backgroundColor: "#28201e",
                    paddingHorizontal: 15,
                    paddingVertical: 3,
                    borderRadius: 3,
                  }}
                >
                  <Text
                    style={{
                      color: "#f8a239",
                      fontSize: 12,
                      fontFamily: "InterRegular",
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
                {/* Name */}
                {share.stock.is_weekly ? (
                  getNameOfWeekly(share.stock.name)
                ) : (
                  <Text style={{ fontFamily: "InterRegular", fontSize: 13, color: "#cacccf", }}>
                    {share.stock.name}
                  </Text>
                )}
                {/* P&L */}
                <Text
                  style={{
                    color: !(calculateChangeCapital(share) > 0)
                      ? "#e25f5b"
                      : "#5b9a5d",
                    fontFamily: "InterRegular",
                    fontSize: 13,
                  }}
                >
                  {numberWithCommas(calculateChangeCapital(share))}
                </Text>
              </View>
              {/* Third Row */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#7e7e7e",
                      fontSize: 12,
                      fontFamily: "InterRegular",
                    }}
                  >
                    {share.market_type.name} Avg.{" "}
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: "InterRegular" }}>
                    {share.closing_price !== null ? "0.00" : share.avg.toFixed(2)}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#7e7e7e",
                      marginRight: 5,
                      fontSize: 12,
                      fontFamily: "InterRegular",
                    }}
                  >
                    LTP
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: "InterRegular" }}>
                    {share.stock.current.toFixed(2)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* Spacer Component for Spacing */}

            <View
              style={{
                borderWidth: 0.4,
                opacity: 0.2,
                borderColor: "#7e7e7e",
                marginHorizontal: 7,
                borderRadius: 5,
                marginBottom: 15,
                marginTop: 15,
              }}
            ></View>
          </View>
        ))}
        {shares.filter(closingPrice1).sort((a, b) => calculateChangeCapitalForCompare(b) - calculateChangeCapitalForCompare(a)).map((share) => (
          <View key={share.id}>
            {/* Touchable Opacity wraps all the share information */}
            <TouchableOpacity
              style={{
                marginHorizontal: 15,
                opacity: share.closing_price === null ? 1 : 0.5,
              }}
              onPress={() => {
                setModalVisible(true);
                setShareM(share);
              }}
              activeOpacity={1}
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
                {/* Qty */}
                {/* {console.log(shares)} */}
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontFamily: "InterRegular",
                      fontSize: 12,
                      color: "#7e7e7e",
                    }}
                  >
                    Qty.
                  </Text>
                  <Text> </Text>
                  <Text
                    style={{
                      color: "#fff",
                      color: share.closing_price !== null ? "#cacccf" : "#345DAC",
                      fontSize: 12,
                      fontFamily: "InterRegular",
                    }}
                  >
                    {share.closing_price !== null ? 0 : share.qty}
                  </Text>
                  <Text> </Text>

                  <Text
                    style={{
                      color: "#7e7e7e",
                      fontSize: 12,
                      fontFamily: "InterRegular",
                    }}
                  >
                    Avg.{" "}
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: "InterRegular", color: "#cacccf", }}>
                    {share.closing_price !== null ? "0.00" : share.avg}
                  </Text>
                </View>
                {/* MIS */}
                <View
                  style={{
                    backgroundColor: "#28201e",
                    paddingHorizontal: 15,
                    paddingVertical: 3,
                    borderRadius: 3,
                  }}
                >
                  <Text
                    style={{
                      color: "#f8a239",
                      fontSize: 12,
                      fontFamily: "InterRegular",
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
                {/* Name */}
                {share.stock.is_weekly ? (
                  getNameOfWeekly(share.stock.name)
                ) : (
                  <Text style={{ fontFamily: "InterRegular", fontSize: 13, color: "#cacccf" }}>
                    {share.stock.name}
                  </Text>
                )}
                {/* P&L */}
                <Text
                  style={{
                    color: !(calculateChangeCapital(share) > 0)
                      ? "#e25f5b"
                      : "#5b9a5d",
                    fontFamily: "InterRegular",
                    fontSize: 13,
                  }}
                >
                  {numberWithCommas(calculateChangeCapital(share))}
                </Text>
              </View>
              {/* Third Row */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#7e7e7e",
                      fontSize: 12,
                      fontFamily: "InterRegular",
                    }}
                  >
                    {share.market_type.name} {" "}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#7e7e7e",
                      marginRight: 5,
                      fontSize: 12,
                      fontFamily: "InterRegular",
                    }}
                  >
                    LTP
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: "InterRegular", color: "#7e7e7e", }}>
                    {share.stock.current.toFixed(2)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* Spacer Component for Spacing */}
            <View
              style={{
                borderWidth: 0.4,
                opacity: 0.2,
                borderColor: "#7e7e7e",
                marginHorizontal: 7,
                borderRadius: 5,
                marginBottom: 15,
                marginTop: 15,
              }}
            ></View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const CompanyName = ({ stock }) => (
  <Text
    style={{
      fontSize: 20,
      fontWeight: "400",
      paddingTop: 25,
      paddingLeft: 25,
      fontFamily: "InterRegular",
    }}
  >
    {stock.name}
  </Text>
);

const ModalDetails = ({ average }) => {
  return (
    // Modal Details contain all the details of the share that is clicked by the user.
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 25,
        marginTop: 10,
      }}
    >
      <Text
        style={{
          color: "#7e7e7e",
          marginRight: 10,
          fontFamily: "InterRegular",
        }}
      >
        NSE
      </Text>
      <Text
        style={{ color: "red", marginRight: 10, fontFamily: "InterRegular" }}
      >
        {average}
      </Text>
      <Text
        style={{ color: "#7e7e7e", marginRight: 4, fontFamily: "InterRegular" }}
      >
        -0.25
      </Text>
      <Text
        style={{
          color: "#7e7e7e",
          marginRight: 10,
          fontFamily: "InterRegular",
        }}
      >
        (-1.85%)
      </Text>
      {/* View container containing MIS */}
      <View
        style={{
          backgroundColor: "#28201e",
          paddingHorizontal: 15,
          paddingVertical: 3,
          borderRadius: 3,
        }}
      >
        <Text
          style={{
            color: "#f8a239",
            fontSize: 13,
            fontFamily: "InterSemiBold",
          }}
        >
          MIS
        </Text>
      </View>
    </View>
  );
};

const ModalButton = ({
  text,
  color,
  marginR,
  navigation,
  callback,
  shareM,
}) => {
  // This function will be called when the user will press on either Add or Sell
  function onPressed() {
    callback();
    navigation.navigate("CheckOutScreen", { shareM, color });
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
      onPress={() => onPressed()}
    >
      {/* Text contains either Add or Sell Text that is being passed from Modal Component */}
      <Text
        style={{
          fontSize: 16,
          color: "white",
          fontWeight: "600",
          fontFamily: "InterSemiBold",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Header Component Style that contains both the Positions and Holdings button
  headerComponent: {
    flexDirection: "row",
    alignSelf: "center",
  },
  whiteText:{
    color: '#f9f9f9'
  }
});

function calculateChangeCapital(position) {
  let current = position.closing_price || position.stock.current;
  let primaryCapital = position.qty * position.avg;
  let newCapital = position.qty * current;
  let changeCapital = (newCapital - primaryCapital).toFixed(2);
  if (changeCapital > 0.0) {
    return `+${changeCapital}`;
  }
  // console.log(changeCapital)
  return changeCapital;
}

function calculateChangeCapitalForCompare(position) {
  let current = position.closing_price || position.stock.current;
  let primaryCapital = position.qty * position.avg;
  let newCapital = position.qty * current;
  let changeCapital = (newCapital - primaryCapital);
  return changeCapital;
}

function calculateChange(position) {
  let current = position.closing_price || position.stock.current;
  let primaryCapital = position.qty * position.avg;
  let newCapital = position.qty * current;
  let changeCapital = newCapital - primaryCapital;
  return changeCapital;
}

function calculateTotalChangeCapital(positions) {
  let totalChangeCapital = 0;
  positions.forEach((position) => {
    totalChangeCapital += calculateChange(position);
  });
  totalChangeCapital = totalChangeCapital.toFixed(2);
  return totalChangeCapital;
}

function numberWithCommas(x) {
  let check = true;
  if (x < 0) {
    check = false;
  }
  x = x.toString();
  if (x.length === 7) {
    return x;
  }
  var afterPoint = "";
  if (x.indexOf(".") > 0) afterPoint = x.substring(x.indexOf("."), x.length);
  x = Math.floor(x);
  x = x.toString();
  // console.log(x)
  var lastThree = x.substring(x.length - 3);
  var otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers != "") lastThree = "," + lastThree;
  var res =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
  if (check) {
    res = "+" + res;
  }
  return res;
}

function getLTP(x) {
  x = x.toFixed(2);
  return x;
}

function getNameOfWeekly(name) {
  if (name.includes("w")) {
    let nameA = name.split("w");
    let nameB = [];
    function getUpperText() {
      if (nameA[0].includes("nd")) {
        nameB = nameA[0].split("nd");
        return (
          <View style={{ flexDirection: "row" }}>
            <Text style={{color: '#f9f9f9', fontSize: 13, fontFamily: "InterRegular" }}>
              {nameB[0]}
            </Text>
            <Text style={{color: '#f9f9f9', fontSize: 10, fontFamily: "InterRegular" }}>
              nd{" "}
            </Text>
          </View>
        );
      }
      if (nameA[0].includes("rd")) {
        nameB = nameA[0].split("rd");
        return (
          <View style={{ flexDirection: "row" }}>
            <Text style={{color: '#f9f9f9', fontSize: 13, fontFamily: "InterRegular" }}>
              {nameB[0]}
            </Text>
            <Text style={{color: '#f9f9f9', fontSize: 10, fontFamily: "InterRegular" }}>
              rd{" "}
            </Text>
          </View>
        );
      }
      if (nameA[0].includes("th")) {
        nameB = nameA[0].split("th");
        return (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: '#f9f9f9', fontSize: 13, fontFamily: "InterRegular" }}>
              {nameB[0]}
            </Text>
            <Text style={{ fontSize: 10, fontFamily: "InterRegular" }}>
              th{" "}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: '#f9f9f9', fontSize: 13, fontFamily: "InterRegular" }}>
              {nameA[0]}
            </Text>
          </View>
        );
      }
    }
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row",color: '#ccc' }}>{getUpperText()}</View>
        {/* <View>
          <Text style={{color: '#fff'}}> 
            Here we
          </Text>
        </View> */}
        <View
          style={{
            backgroundColor: "rgba(73, 135, 238, 0.7)",
            top: -2,
            borderRadius: 10,
            width: 15,
            height: 15,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 10, fontFamily: "InterRegular", color: "white" }}
          >
            w
          </Text>
        </View>
        <Text style={{color: '#f9f9f9', fontFamily: "InterRegular", fontSize: 13 }}>
          {nameA[1]}
        </Text>
      </View>
    );
  } else {
    return (
      <Text style={{ color: '#f9f9f9', fontSize: 13, fontFamily: "InterRegular" }}>{name}</Text>
    );
  }
}

export default PortflioScreen;
 