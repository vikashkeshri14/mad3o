import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  I18nManager,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
// I18nManager.forceRTL(true);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  titleStyle: {
    padding: 10,
    textAlign: "left",
    fontSize: 18,
  },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 20,
    color: "#484848",
    textAlign: "center",
    paddingVertical: 30,
    lineHeight: 35,
  },
  introTitleStyle: {
    fontSize: 17,
    color: "#484848",
    textAlign: "right",
    marginBottom: 16,
    marginRight: 33,
  },
  introText1: {
    fontSize: 27,
    lineHeight: 35,
    color: "#484848",
    textAlign: "center",
    paddingVertical: 15,
  },
  introText2: {
    fontSize: 27,
    color: "#484848",
    lineHeight: 45,
    textAlign: "center",
    paddingVertical: 30,
  },
});

const slides = [
  {
    key: "1",
    head: i18n.t("design-customize"),
    text: i18n.t("customize-description"),
    backgroundColor: require("../../assets/background/slide1.png"),
  },
  {
    key: "2",
    head: i18n.t("follow-up-on-invitees"),
    text: i18n.t(
      "you-can-follow-up-on-the-invitees-and-know-who-has-confirmed-their-attendance-excused-or-not-answered-the-invitation-and-other-attendance-statuses"
    ),
    backgroundColor: require("../../assets/background/slide2.png"),
  },
  {
    key: "3",
    head: i18n.t("special-design-request"),
    text: i18n.t(
      "with-the-help-of-invited-designers-you-can-stand-out-by-requesting-only-your-own-design"
    ),
    backgroundColor: require("../../assets/background/slide3.png"),
  },
];
export default function IntroScreen({ navigation }) {
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };

  const onSkip = () => {
    setShowRealApp(true);
  };
  const _renderDoneButton = () => {
    return (
      <View style={{ position: "absolute", left: 10, top: 0 }}>
        <Text></Text>
      </View>
    );
  };
  const _renderNextButton = () => {
    return (
      <View style={{ position: "absolute", left: 10, top: 0 }}>
        <Text></Text>
      </View>
    );
  };
  const RenderItem = ({ item }) => {
    return (
      <ImageBackground
        source={item.backgroundColor}
        style={{ flex: 1, width: null, height: null }}
      >
        <View
          style={{
            flex: 1,
            paddingBottom: 100,
          }}
        >
          <View
            className={
              item.key == 1
                ? "items-center w-[96%] absolute  bottom-[80px]"
                : item.key == "2"
                ? "items-center w-[96%] absolute  bottom-[70px]"
                : "items-center w-[96%] absolute  bottom-[70px]"
            }
          >
            <View className="">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[#040404] text-[24px]"
              >
                {item.head}
              </Text>
            </View>
            <View className="w-[80%]">
              <Text style={styles.introText1}>{item.text}</Text>
            </View>
            {item.key == "3" && (
              <View className=" w-[100%] flex mt-[0px] mb-[0px]">
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Welcome");
                  }}
                  className="  w-[80%] self-center flex  justify-center h-[50px] rounded-[8px] bg-[#2B949A]"
                >
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[16px] text-center text-[#ffffff]"
                  >
                    {i18n.t("start-to-invite")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    );
  };
  return (
    <AppIntroSlider
      data={slides}
      renderItem={RenderItem}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      activeDotStyle={{ backgroundColor: "#484848", width: 23, height: 7 }}
      dotStyle={{ backgroundColor: "#707070", width: 7, height: 7 }}
    />
  );
}
