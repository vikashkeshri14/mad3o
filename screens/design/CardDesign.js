import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
export default function CardDesign(props) {
  const [loginUser, setLoginUser] = useState(null);
  const [url, setUrl] = useState(null);
  useEffect(() => {
    // console.log(props);
    getValueAuth();
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      console.log(user);
      setLoginUser(user);
      let url =
        "https://mad3o.com/userprofile/mobile.php?DID=" +
        props.route.params.cardId +
        "&userId=" +
        user.id;
      console.log(url);
      setUrl(url);
    }
  };
  return (
    <View className="flex-1 flex-col bg-[#FAFAFA]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex ">
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("BottomNavigation", {
                  screen: "Explore",
                });
              }}
              className="flex mt-[0px] mb-[0px] justify-start pl-[20px] flex-row"
            >
              <View className="mt-[8px] ml-[10px]">
                <Image
                  className="w-[7px] h-[14px]"
                  source={require("../../assets/images/right-arrrow.png")}
                />
              </View>
              <View className="ml-[10px]">
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-[#2B949A] text-[16px]"
                >
                  {i18n.t("back")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <WebView
            source={
              url != null && {
                uri: url,
              }
            }
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
