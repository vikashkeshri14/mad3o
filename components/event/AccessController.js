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

export default function AccessController(props) {
  const [listInvitations, setlistInvitations] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
  const [selectedInvited, setselectedInvited] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);
  useEffect(() => {
    getValueAuth();
    console.log(props);
  }, [props]);
  const checkedItem = async (guestId, eventId, name, phone) => {
    let checked = selectedInvited;
    checked.push(guestId);
    setselectedInvited((selectedInvited) => checked);
    const obj = {
      guestId: guestId,
      eventId: eventId,
      userId: loginUser.id,
      name: name,
      phone: phone,
    };
    let params = { url: apiList.addnewaccesscontroller, body: obj };
    let response = await ApiService.postData(params);
    if (response) {
      getGuest(loginUser.id);
    }
  };
  const uncheckedItem = async (guestId, eventId, name, phone) => {
    let checked = selectedInvited;
    let val = checked.filter((data, i) => data != guestId);

    setselectedInvited((selectedInvited) => val);

    const obj = {
      guestId: guestId,
      userId: loginUser.id,
      eventId: eventId,
      name: name,
      phone: phone,
    };
    let params = { url: apiList.removeaccesscontrollerm, body: obj };
    let response = await ApiService.postData(params);
    if (response) {
      getGuest(loginUser.id);
    }
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
    setButtonClick(true);
    const obj = {
      userId: userId,
      eventId: props.data.route.params.cardId,
    };
    let params = { url: apiList.accesscontrolList, body: obj };
    let response = await ApiService.postData(params);
    if (response.result.length > 0) {
      setlistInvitations(response.result);
      setButtonClick(false);
    }
  };

  const deleteGuest = async (id) => {
    const obj = {
      guestId: id,
    };
    let params = { url: apiList.removeGuestlist, body: obj };
    let response = await ApiService.postData(params);
    if (response) {
      //console.log(response);
      getGuest(loginUser.id);
    }
  };
  const listItem = ({ item }) => {
    // console.log(item);
    return (
      <View
        style={{ borderColor: "rgba(178,178,178,0.45)" }}
        className=" flex bg-[#FFFFFF]  border-[1px] ml-[20px] mr-[20px] mt-[10px] rounded-[10px]"
      >
        <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]  p-[5px] flex-row-reverse">
          <View className="flex flex-row-reverse w-[100%]  ml-[0px] mt-[-5px]">
            <Text
              style={GlobalStyles.cairoSemiBold}
              className="text-[14px] text-right text-[#747474]"
            >
              {i18n.t("full-name")} :{" "}
            </Text>
            <Text
              style={GlobalStyles.cairoMedium}
              className="text-[14px] text-right text-[#747474]"
            >
              {item.Name}
            </Text>
          </View>
        </View>

        <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]  p-[5px] flex-row-reverse">
          <View className="flex flex-row-reverse w-[100%]  ml-[0px] mt-[-5px]">
            <Text
              style={GlobalStyles.cairoSemiBold}
              className="text-[14px] text-right text-[#747474]"
            >
              {i18n.t("phone")} :{" "}
            </Text>
            <Text
              style={GlobalStyles.cairoMedium}
              className="text-[14px] text-right text-[#747474]"
            >
              {item.phoneNumber}
            </Text>
          </View>
        </View>
        <View className="flex  mt-[5px] ml-[15px] mr-[15px]  p-[5px] flex-row-reverse">
          <View className="flex w-[50%] flex-row-reverse ml-[0px] mt-[-5px]">
            <TouchableOpacity
              onPress={() => {
                if (
                  selectedInvited.includes(item.ID) ||
                  item.eventguest.length > 0
                ) {
                  uncheckedItem(
                    item.ID,
                    props.data.route.params.cardId,
                    item.Name,
                    item.phoneNumber,
                    false
                  );
                } else {
                  checkedItem(
                    item.ID,
                    props.data.route.params.cardId,
                    item.Name,
                    item.phoneNumber,
                    true
                  );
                }
              }}
              className="flex flex-row-reverse"
            >
              <View className="flex mr-[5px] mt-[2px]">
                {selectedInvited.includes(item.ID) ||
                item.eventguest.length > 0 ? (
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
                  className="text-[14px] text-right text-[#3497F9]"
                >
                  {selectedInvited.includes(item.ID) ? "Invited" : "Invite"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex w-[50%] self-start justify-end ml-[0px] mt-[-5px]">
            <TouchableOpacity
              onPress={() => {
                deleteGuest(item.ID);
              }}
            >
              <Image
                className="w-[20px] self-start h-[24px]"
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
      <View className="flex  mt-[5px] ml-[15px] mr-[15px]  p-[10px] flex-row-reverse">
        <View className="flex ml-[5px] self-center">
          <TouchableOpacity
            onPress={() => {
              props.data.navigation.navigate("AddAccessControl", {
                cardId: props.data.route.params.cardId,
                eventDetails: props.data.route.params.eventDetails,
              });
            }}
          >
            <Image
              source={require("../../assets/icons/add-request.png")}
              className="w-[15px] self-end h-[15px]"
            />
          </TouchableOpacity>
        </View>
        <View className="flex   ml-[0px] mt-[-5px]">
          <Text
            style={GlobalStyles.cairoBold}
            className="text-[16px] text-right text-[#040404]"
          >
            {i18n.t("add-access-controller")}
          </Text>
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
