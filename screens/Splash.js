import { View, Text, ImageBackground, Image } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
export default function Splash({ navigation }) {
  const [loginUser, setLoginUser] = useState(null);
  const animation = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      getValueAuth();
    }, 2000);
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    //  console.log(result);
    if (result) {
      let user = JSON.parse(result);
      //console.log(user);
      navigation.navigate("BottomNavigation", {
        screen: "Home",
      });
      //navigation.navigate("IntroScreen");
    } else {
      navigation.navigate("IntroScreen");
      //console.log("No values stored under that key.");
    }
  };
  return (
    <ImageBackground
      source={require("../assets/background/splash.png")}
      style={{ flex: 1, width: null, height: null }}
    >
      <View className="flex-1 items-center self-center justify-center">
        <Image
          className="self-center w-[131px] h-[131px] "
          source={require("../assets/icons/logo.png")}
        />
      </View>
    </ImageBackground>
  );
}
