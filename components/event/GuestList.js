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
export default function GuestList(props) {
  const [listInvitations, setlistInvitations] = useState([1, 2, 3, 4, 5]);
  const [loginUser, setLoginUser] = useState(null);
  const [selectedInvited, setselectedInvited] = useState([]);

  useEffect(() => {
    getValueAuth();
  }, []);
  const checkedItem = async (id) => {
    let checked = selectedInvited;
    checked.push(id);
    setselectedInvited((selectedInvited) => checked);
    getGuest(loginUser.id);
  };
  const uncheckedItem = async (id) => {
    let checked = selectedInvited;
    let val = checked.filter((data, i) => data != id);
    setselectedInvited((selectedInvited) => val);
    getGuest(loginUser.id);
  };
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
      getGuest(user.id);
    }
  };
  const getGuest = async (userId) => {
    const obj = {
      userId: userId,
    };
    let params = { url: apiList.guestlist, body: obj };
    let response = await ApiService.postData(params);
    if (response.result.length > 0) {
      setlistInvitations(response.result);
    }
  };

  const listItem = ({ item }) => {
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
              {item.name}
            </Text>
          </View>
        </View>
        <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]  p-[5px] flex-row">
          <View className="flex flex-row w-[100%]  ml-[0px] mt-[-5px]">
            <Text
              style={GlobalStyles.cairoSemiBold}
              className="text-[14px] text-left text-[#747474]"
            >
              {i18n.t("email")} :{" "}
            </Text>
            <Text
              style={GlobalStyles.cairoMedium}
              className="text-[14px] text-left text-[#747474]"
            >
              {item.Email}
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
              {item.phoneNumber}
            </Text>
          </View>
        </View>
        <View className="flex  mt-[5px] ml-[15px] mr-[15px]  p-[5px] flex-row">
          <View className="flex w-[50%] flex-row ml-[0px] mt-[-5px]">
            <TouchableOpacity
              onPress={() => {
                if (selectedInvited.includes(item.ID)) {
                  uncheckedItem(item.ID);
                } else {
                  checkedItem(item.ID);
                }
              }}
              className="flex flex-row"
            >
              <View className="flex mr-[5px] mt-[2px]">
                {selectedInvited.includes(item.ID) ? (
                  <Image
                    className="w-[24px] h-[24px]"
                    source={require("../../assets/icons/tick.png")}
                  />
                ) : (
                  <Image
                    className="w-[24px] h-[24px]"
                    source={require("../../assets/icons/unchecked.png")}
                  />
                )}
              </View>
              <View>
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-[14px] text-left text-[#3497F9]"
                >
                  Invite
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex w-[50%] self-start justify-end ml-[0px] mt-[-5px]">
            <Image
              className="w-[20px] self-end h-[24px]"
              source={require("../../assets/icons/trash.png")}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View className="flex">
      <View className="flex justify-evenly mt-[5px] ml-[15px] mr-[15px]  p-[10px] flex-row">
        <View className="flex w-[70%]  ml-[0px] mt-[-5px]">
          <Text
            style={GlobalStyles.cairoBold}
            className="text-[16px] text-left text-[#040404]"
          >
            {i18n.t("add-contact")}
          </Text>
        </View>
        <View className="flex w-[30%] self-center">
          <TouchableOpacity
            onPress={() => {
              props.data.navigation.navigate("AddRequest");
            }}
          >
            <Image
              source={require("../../assets/icons/add-request.png")}
              className="w-[15px] self-end h-[15px]"
            />
          </TouchableOpacity>
        </View>
      </View>
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
    </View>
  );
}
