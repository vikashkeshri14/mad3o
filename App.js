import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, I18nManager } from "react-native";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./screens/Splash";
import Welcome from "./screens/Welcome";
import useFonts from "./hooks/UseFonts";
import Register from "./screens/account/Register";
import SignIn from "./screens/account/SignIn";
import ForgetPassword from "./screens/account/ForgetPassword";
import ResetPassword from "./screens/account/ResetPassword";
import IntroScreen from "./screens/tour/IntroScreen";
import BottomNavigation from "./screens/navigation/BottomNavigation";
import CardDesign from "./screens/design/CardDesign";
import AddRequest from "./screens/request/AddRequest";
import CustomerSupport from "./screens/customer/CustomerSupport";
import AddSupport from "./screens/customer/AddSupport";
import CustomerSupportChat from "./screens/customer/CustomerSupportChat";
//import AddRequest from "./screens/request/AddRequest";
import * as Updates from "expo-updates";
import Subscription from "./screens/subscription/Subscription";
import AddSubscription from "./screens/subscription/AddSubscription";
import Subscribe from "./screens/subscription/Subscribe";
import AccountEdit from "./screens/customer/AccountEdit";
import EventDetails from "./screens/customer/EventDetails";
import UpdateEvent from "./screens/customer/UpdateEvent";

const Stack = createNativeStackNavigator();
I18nManager.forceRTL(true);
export default function App() {
  console.disableYellowBox = true;

  const [IsReady, SetIsReady] = useState(false);
  const LoadFontsAndRestoreToken = async () => {
    await useFonts();
  };
  if (!I18nManager.isRTL) {
    Updates.reloadAsync();
  }
  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFontsAndRestoreToken}
        onFinish={() => {
          console.log("hello");
          SetIsReady(true);
        }}
        onError={() => {}}
      />
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />

        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="CardDesign" component={CardDesign} />
        <Stack.Screen name="AddRequest" component={AddRequest} />
        <Stack.Screen name="CustomerSupport" component={CustomerSupport} />
        <Stack.Screen name="AddSupport" component={AddSupport} />
        <Stack.Screen
          name="CustomerSupportChat"
          component={CustomerSupportChat}
        />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="Subscribe" component={Subscribe} />

        <Stack.Screen name="AddSubscription" component={AddSubscription} />
        <Stack.Screen name="AccountEdit" component={AccountEdit} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="UpdateEvent" component={UpdateEvent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
