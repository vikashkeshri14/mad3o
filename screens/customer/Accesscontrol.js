import {
  View,
  Text,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import moment from "moment";
import ActivityIndicators from "../../components/activityindicator/ActivityIndicators";
import AddedAccessController from "../../components/event/AddedAccessController";
import AccessController from "../../components/event/AccessController";

export default function Accesscontrol(props) {
  const [loginUser, setLoginUser] = useState(null);
  const [buttonClick, setButtonClick] = useState(null);
  const [accesslist, setAccesslist] = useState(true);
  const [eventAccessGuest, seteventAccessGuest] = useState(false);

  useEffect(() => {
    getValueAuth();
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
        {buttonClick && <ActivityIndicators />}
        <View className="flex justify-start flex-row ">
          <View className="absolute  w-full self-center ">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-center text-[#262626] text-[16px] "
            >
              {i18n.t("manage-power-of-organizer")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(
                "EventDetails",
                props.route.params.eventDetails
              );
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

        <View className="flex mt-[20px]">
          <View className="flex flex-row justify-around">
            <TouchableOpacity
              onPress={() => {
                seteventAccessGuest(false);
                setAccesslist(true);
              }}
              className="flex w-[50%]"
            >
              <View
                style={
                  accesslist
                    ? {
                        backgroundColor: "rgba(43,148,154,0.17)",
                        borderColor: "rgba(43,148,154,0.17)",
                      }
                    : { backgroundColor: "#fff" }
                }
                className={
                  accesslist
                    ? "mt-[10px] flex justify-center  mr-[10px] border-[1px] rounded-[10px] h-[47px] "
                    : "mt-[10px] flex justify-center mr-[10px] border-[1px] rounded-[10px] h-[47px] border-[#b1b1b5]"
                }
              >
                <Text
                  style={
                    accesslist
                      ? GlobalStyles.cairoBold
                      : GlobalStyles.cairoSemiBold
                  }
                  className={
                    accesslist
                      ? "text-center text-[#2B949A] text-[14px]"
                      : "text-center text-[#747474] text-[14px]"
                  }
                >
                  {i18n.t("all")}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                seteventAccessGuest(true);
                setAccesslist(false);
              }}
              className="flex w-[50%]"
            >
              <View
                style={
                  eventAccessGuest
                    ? {
                        backgroundColor: "rgba(43,148,154,0.17)",
                        borderColor: "rgba(43,148,154,0.17)",
                      }
                    : { backgroundColor: "#fff" }
                }
                className={
                  eventAccessGuest
                    ? "mt-[10px] flex justify-center  mr-[10px] border-[1px] rounded-[10px] h-[47px]"
                    : "mt-[10px] flex justify-center mr-[10px] border-[1px] rounded-[10px] h-[47px] border-[#b1b1b5]"
                }
              >
                <Text
                  style={
                    eventAccessGuest
                      ? GlobalStyles.cairoBold
                      : GlobalStyles.cairoSemiBold
                  }
                  className={
                    eventAccessGuest
                      ? "text-center text-[#2B949A] text-[14px]"
                      : "text-center text-[#747474] text-[14px]"
                  }
                >
                  {i18n.t("no-answer")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex mt-[5px]">
          {accesslist && <AccessController data={props} />}
          {eventAccessGuest && <AddedAccessController data={props} />}
        </View>
      </SafeAreaView>
    </View>
  );
}
