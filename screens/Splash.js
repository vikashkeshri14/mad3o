import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";

export default function Splash() {
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
