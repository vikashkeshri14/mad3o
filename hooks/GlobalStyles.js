import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 45 : 0,
  },
  droidSafeAreaFlex1: {
    paddingTop: Platform.OS === "android" ? 45 : 0,
  },
  cairoLight: {
    fontFamily: "cairoLight",
  },
  cairoBold: {
    fontFamily: "cairoBold",
  },
  cairoRegular: {
    fontFamily: "cairoRegular",
  },
  cairoMedium: {
    fontFamily: "cairoMedium",
  },
  cairoSemiBold: {
    fontFamily: "cairoSemiBold",
  },
  shadowAll: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.62,
    elevation: 7,
  },
  shadowcardios: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 6,
  },
  shadowcardandroid: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.08,
    shadowRadius: 7,
    elevation: 0.19,
  },
  shadowcardIos: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.19,
    shadowRadius: 1,
    elevation: 1,
  },
  shadowcardAndroid: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.19,
    shadowRadius: 7,
    elevation: 0.79,
  },
});

export const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid
) => {
  if (Platform.OS === "ios") {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === "android") {
    styles.boxShadow = {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};
