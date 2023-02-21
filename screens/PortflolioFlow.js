import PortflioScreen from './PortflioScreen';
import OrderScreen from './OrderScreen';
import ProfileScreen from './ProfileScreen';
import ToolsScreen from './ToolsScreen';
import WatchlistScreen from './WatchlistScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importing Icons
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { Text,Image } from 'react-native';




const Tab = createBottomTabNavigator();

function PortflioFlow({ route }) {

  const isFocused = useIsFocused();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 65,
          backgroundColor: "#16202A",
          paddingBottom: 5,
          elevation: 0,
          shadowOpacity: 0,          
          borderWidth: 0,
          borderTopWidth: 0,

          // borderColor: 'red',
          // borderStyle: 'solid',
          // paddingTop:10,
        },
      }}
      initialRouteName="PortflioScreen"
    >
      <Tab.Screen
        name="WatchlistScreen"
        component={WatchlistScreen}
        options={{

          // tabBarLabel: "Watchlist",
          
          tabBarLabel: ({ focused }) => (
            <Text style={{color: focused ? "#345DAC" : "white" }}>Watchlist</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="bookmark-o"
              size={24}
              color={focused ? "#345DAC" : "white"}
            />
          ),
          tabBarLabelStyle: {
            paddingBottom: 4,
            fontSize: 12,
            color: "white"
          },
        }}
      />

      {/*             
 */}
      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          headerShown: false,
          // tabBarLabel: "Orders",
          tabBarLabel: ({ focused }) => (
            <Text style={{color: focused ? "#345DAC" : "white" }}>Orders</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name="book" size={24} color={focused ? "#345DAC" : "white"} />
          ),
          tabBarLabelStyle: {
            paddingBottom: 4,
            color: "white",
            fontSize: 12
          },
        }}
      />
      <Tab.Screen
        name="PortflioScreen"
        component={PortflioScreen}
        options={{
          // Portfolio
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text style={{color: focused ? "#345DAC" : "white" }}>Portfolio</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name="briefcase" size={24} color={focused ? "#345DAC" : "white"} />
          ),
          tabBarLabelStyle: {
            paddingBottom: 4,
            fontSize: 12,
            // color: ({focused})=> focused ? "#345DAC" : "white" 
            // color:isFocused  ? "#345DAC" : "white"
          },
        }}
      />
      <Tab.Screen
        name="ToolScreen"
        component={ToolsScreen}
        options={{
          headerShown: false,
          // tabBarLabel: "Tools",
          
          tabBarLabel: ({ focused }) => (
            <Text style={{color: focused ? "#345DAC" : "white" }}>Tools</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name="tool" size={24} color={focused ? "#345DAC" : "white"} />
          ),
          tabBarLabelStyle: {
            paddingBottom: 4,
            fontSize: 12,
            color: "white"
          },
        }}
      />
      {/*             <Ionicons name="person-outline" size={24} color={focused ? "#345DAC" : "white"} />
 */}
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          // tabBarLabel: "KF4563",
          
          tabBarLabel: ({ focused }) => (
            <Text style={{color: focused ? "#345DAC" : "white" }}>KF4563</Text>
          ),
          tabBarIcon: ({ focused }) => (
            focused?
            <Image
              source={require("../assets/blue-user.png")}
              style={{ width: 20, height: 20, resizeMode: "contain",
            }}
            />
            :
            <Image
              source={require("../assets/white-user.png")}
              style={{ width: 20, height: 20, resizeMode: "contain",
            }}
            />
          ),
          tabBarLabelStyle: {
            paddingBottom: 4,
            color: 'white',
            fontSize: 12
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default PortflioFlow;