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
import React, { useState, useRef, useEffect, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import ActivityIndicators from "../../components/activityindicator/ActivityIndicators";
import * as SecureStore from "expo-secure-store";

export default function AddedAccessController(props) {
  const [loginUser, setLoginUser] = useState(null);
  const [listInvitations, setlistInvitations] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);
  useEffect(() => {
    getValueAuth();
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
      getGuest();
    }
  };
  const getGuest = async () => {
    setButtonClick(true);
    const obj = {
      eventId: props.data.route.params.cardId,
    };
    let params = { url: apiList.invitedtoaccess, body: obj };
    let response = await ApiService.postData(params);
    // console.log(response);
    if (response.result.length > 0) {
      setlistInvitations(response.result);
      setButtonClick(false);
    } else {
      setlistInvitations([]);
      setButtonClick(false);
    }
  };
  const deleteGuest = async (guestId, eventId, name, phone) => {
    const obj = {
      guestId: guestId,
      userId: loginUser.id,
      eventId: eventId,
      name: name,
      phone: phone,
    };
    //console.log(obj);
    let params = { url: apiList.removeaccesscontroller, body: obj };
    let response = await ApiService.postData(params);
    if (response) {
      console.log(response);
      getGuest();
    }
  };
  const listItem = ({ item }) => {
    //console.log(item);
    return (
      <View
        style={{ borderColor: "rgba(178,178,178,0.45)" }}
        className=" flex bg-[#FFFFFF]  border-[1px] ml-[20px] mr-[20px] mt-[10px] rounded-[10px]"
      >
        <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]  p-[5px] flex-row">
          <View className="flex flex-row w-[100%]  ml-[0px] mt-[-5px]">
            <Text
              style={GlobalStyles.cairoSemiBold}
              className="text-[14px] text-left text-[#747474]"
            >
              {i18n.t("full-name")} :{" "}
            </Text>
            <Text
              style={GlobalStyles.cairoMedium}
              className="text-[14px] text-left text-[#747474]"
            >
              {item.Name}
            </Text>
          </View>
        </View>

        <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]  p-[5px] flex-row">
          <View className="flex flex-row w-[100%]  ml-[0px] mt-[-5px]">
            <Text
              style={GlobalStyles.cairoSemiBold}
              className="text-[14px] text-left text-[#747474]"
            >
              {i18n.t("phone")} :{" "}
            </Text>
            <Text
              style={GlobalStyles.cairoMedium}
              className="text-[14px] text-left text-[#747474]"
            >
              {item.phoneNumbber}
            </Text>
          </View>
        </View>
        <View className="flex  mt-[5px] ml-[15px] mr-[15px]  p-[5px] flex-row">
          <View className="flex w-[50%] flex-row ml-[0px] mt-[-5px]">
            <TouchableOpacity onPress={() => {}} className="flex flex-row">
              <View className="flex mr-[5px] mt-[2px]">
                <Image
                  className="w-[28px] self-end h-[28px]"
                  source={require("../../assets/icons/whatsapp.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex w-[50%] self-start justify-end ml-[0px] mt-[-5px]">
            <TouchableOpacity
              onPress={() => {
                deleteGuest(
                  item.SID,
                  item.eventID,
                  item.Name,
                  item.phoneNumbber
                );
              }}
            >
              <Image
                className="w-[20px] self-end h-[24px]"
                source={require("../../assets/icons/trash.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex">
      {buttonClick && <ActivityIndicators />}
      <View className="flex  mt-[5px] ml-[0px] mr-[0px]  p-[10px] flex-row">
        <View className="flex  ml-[0px] mt-[-5px]">
          <Text
            style={GlobalStyles.cairoBold}
            className="text-[16px] text-left text-[#040404]"
          >
            {i18n.t("access-controller")}
          </Text>
        </View>
      </View>
      {listInvitations.length > 0 ? (
        <FlatList
          data={listInvitations}
          numColumns={1}
          renderItem={listItem}
          contentContainerStyle={
            Platform.OS == "android"
              ? { paddingBottom: 250 }
              : { paddingBottom: 280 }
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View className="flex  mt-[15px]">
          <Text
            className="text-[#2B949A] text-left text-[14px]"
            style={GlobalStyles.cairoMedium}
          >
            {i18n.t("you-not-add-accesscontrol")}
          </Text>
        </View>
      )}
    </View>
  );
}
