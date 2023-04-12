import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
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
const Stack = createNativeStackNavigator();
export default function App() {
  console.disableYellowBox = true;

  const [IsReady, SetIsReady] = useState(false);
  const LoadFontsAndRestoreToken = async () => {
    await useFonts();
  };
  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFontsAndRestoreToken}
        onFinish={() => {
          //  console.log("hello");
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
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
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
