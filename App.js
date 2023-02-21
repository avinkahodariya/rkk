import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// Importing Icons

// Importing Screens
import CheckOutScreen from "./screens/CheckOutScreen";
import PortflioFlow from "./screens/PortflolioFlow";
import CompletedScreen from "./screens/CompletedScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0
              },
            }} 
        >

          <Stack.Screen
              name="Portfolio"
              component={PortflioFlow}
              options={{
                // Header Left
                headerLeft: () => {
                  return (
                    <Text
                      style={{
                        fontSize: 23,
                        fontWeight: "500",
                        letterSpacing: 0.8,
                        marginLeft: 20,
                        color: "#fff",
                      }}
                    >
                      Portfolio
                    </Text>
                  );
                },
                // Header Right
                headerRight: () => {
                  return (
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={40}
                      color="#fff"
                      style={{ marginRight: 20 }}
                    />
                  );
                },
                headerTitle: "",
                headerStyle: { 
                  // backgroundColor: "#16202A",
                  backgroundColor: '#1c2939',
                  elevation: 0,
                  shadowOpacity: 0
                },

              }}

              style={styles.titleText}

             

          />

          <Stack.Screen
            name="CompletedScreen"
            component={CompletedScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CheckOutScreen"
            component={CheckOutScreen}
            options={{
              headerShown: false,
            }}
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color:'red',
    borderWidth: 5,
    borderColor: 'red',
    borderStyle: 'solid'
  }
})


