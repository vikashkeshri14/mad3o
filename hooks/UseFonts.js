import * as Font from "expo-font";

const useFonts = async () => {
  await Font.loadAsync({
    cairoLight: require("../assets/fonts/Cairo-Light.ttf"),
    cairoBold: require("../assets/fonts/Cairo-Bold.ttf"),
    cairoRegular: require("../assets/fonts/Cairo-Regular.ttf"),
    cairoMedium: require("../assets/fonts/Cairo-Medium.ttf"),
    cairoSemiBold: require("../assets/fonts/Cairo-SemiBold.ttf"),
  });
};

export default useFonts;
