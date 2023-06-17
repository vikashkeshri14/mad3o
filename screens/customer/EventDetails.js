import {
  View,
  Text,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import moment from "moment";

export default function EventDetails(props) {
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    getValueAuth();
    console.log(props);
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
    }
  };
  return (
    <View className="flex-1 flex-col pl-[15px] pr-[15px] bg-[#FDFDFD]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex justify-start flex-row ">
          <View className="absolute  w-full self-center ">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-center text-[#262626] text-[16px] "
            >
              {i18n.t("event-detail")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              // setShowToken(false);
              props.navigation.navigate("BottomNavigation", {
                screen: "Home",
              });
            }}
            className="flex mt-[0px] mb-[0px] justify-start pl-[0px]"
          >
            <View className="mt-[0px] flex justify-center  w-[28px] h-[28px]">
              <Image
                className="w-[7px] self-center h-[14px]"
                source={require("../../assets/icons/right-arrow-black.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View className="flex">
            <View className="flex">
              <Image
                style={{
                  borderColor: "rgba(178,178,178,0.45)",
                }}
                className="h-[450px] ml-[10px] mr-[10px] mt-[10px] border-[0.5px] rounded-[10px]"
                source={{
                  uri:
                    config.imgUri +
                    "/database/" +
                    props.route.params.usercards[0].CardSrc,
                }}
              />
            </View>
            <View className="flex ml-[15px] mr-[15px]">
              <View className="flex mt-[10px] flex-row">
                <View className="flex w-[10%] mt-[10px]">
                  <Image
                    className="w-[14.97px] h-[11.24px]"
                    source={require("../../assets/icons/dot.png")}
                  />
                </View>
                <View className="flex w-[90%]">
                  <Text
                    className="text-[16px] text-left"
                    style={GlobalStyles.cairoSemiBold}
                  >
                    {props.route.params.EventTitle}
                  </Text>
                </View>
              </View>
              <View className="flex mt-[10px] flex-row">
                <View className="flex w-[10%] mt-[10px]">
                  <Image
                    className="w-[14.97px] h-[11.24px]"
                    source={require("../../assets/icons/dot.png")}
                  />
                </View>
                <View className="flex flex-row w-[90%]">
                  <Text
                    className="text-[16px] text-left"
                    style={GlobalStyles.cairoSemiBold}
                  >
                    {" : "}{" "}
                    {moment(props.route.params.Date1).format("DD/MM/YYYY")}
                  </Text>
                  <Text
                    className="text-[16px] text-left"
                    style={GlobalStyles.cairoSemiBold}
                  >
                    {moment(props.route.params.EndDate1).format("DD/MM/YYYY")}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row">
                <View className="flex w-[80%] flex-row"></View>
                <View className=""></View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
