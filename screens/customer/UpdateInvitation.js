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

export default function UpdateInvitation(props) {
  const [loginUser, setLoginUser] = useState(null);
  const [otherCondition, setOtherCondition] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const [alertMessageEnd, setAlertMessageEnd] = useState("");
  const [invitationMessage, setInvitationMessage] = useState("");
  const [otherConditionError, setOtherConditionError] = useState("false");
  const [noOfInvitation, setNoOfInvitation] = useState("0");
  const [buttonClick, setButtonClick] = useState(false);
  const [phoneNotAllowed, setPhoneNotAllowed] = useState("0");
  const [requireToAccept, setRequireToAccept] = useState("0");
  const [childrenNotAllowed, setChildrenNotAllowed] = useState("0");
  const [greetingId, setGreetingId] = useState("");

  useEffect(() => {
    getValueAuth();
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
      getDetailsEvent(user.id, props.route.params.cardId);
    }
  };
  const getDetailsEvent = async (userId, eventId) => {
    setButtonClick(true);
    const obj = {
      userId: userId,
      eventId: eventId,
    };

    let params = { url: apiList.eventInfoById, body: obj };
    let response = await ApiService.postData(params);
    if (response) {
      if (response.guestoptions.length > 0) {
        let guest = response.guestoptions;
        setPhoneNotAllowed(guest[0].PhoneNotAllowed);
        setChildrenNotAllowed(guest[0].KidNotAllowed);
        setRequireToAccept(guest[0].RSVPNeeded);
        setOtherCondition(guest[0].OthersRules);
        setInvitationMessage(guest[0].GreetingMessage);
        setNoOfInvitation(guest[0].NumberOfGuestPerCard);
        setGreetingId(guest[0].ID);
      }
      if (response.welcomeMessage.length > 0) {
        if (response.welcomeMessage[0].Message) {
          setAlertMessage(response.welcomeMessage[0].Message);
        }
      }
      if (response.goodbyMessage.length > 0) {
        if (response.goodbyMessage[0].Message) {
          setAlertMessageEnd(response.goodbyMessage[0].Message);
        }
      }

      setButtonClick(false);
    }
  };

  const updateGuestOption = async () => {
    setButtonClick(true);

    const obj = {
      phoneNotAllowed: phoneNotAllowed,
      childrenNotAllowed: childrenNotAllowed,
      requireToAccept: requireToAccept,
      noOfInvitation: noOfInvitation,
      otherCondition: otherCondition,
      invitationMessage: invitationMessage,
      greentingId: greetingId,
    };
    let params = { url: apiList.updateGuestOption, body: obj };
    let response = await ApiService.postData(params);
    if (response) {
      alert("Guest option updated successfully");
      setButtonClick(false);
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
              {i18n.t("manage-guest-option")}
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
        <KeyboardAvoidingView
          keyboardVerticalOffset="50"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex"
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                borderColor: "rgba(178,178,178,0.45)",
              }}
              className="w-[100%] pb-[30px] border-[0.5px] ml-auto mr-auto bg-[#ffffff] mt-[20px]  rounded-[10px]"
            >
              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[16px] text-left text-[#747474]"
                  >
                    {i18n.t("invitation-term")}
                  </Text>
                </View>

                <View className="mt-[5px] pl-[10px] pr-[10px] mr-[20px]  flex flex-row ml-[20px]">
                  <TouchableOpacity
                    className="flex flex-row"
                    onPress={() => {
                      if (requireToAccept == "0") {
                        setRequireToAccept((requireToAccept) => 1);
                      } else {
                        setRequireToAccept((requireToAccept) => 0);
                      }
                    }}
                  >
                    <View className="flex">
                      {requireToAccept == 0 ? (
                        <Image
                          className="w-[24px] self-center h-[24px]"
                          source={require("../../assets/icons/unchecked.png")}
                        />
                      ) : (
                        <Image
                          className="w-[24px] self-center h-[24px]"
                          source={require("../../assets/icons/tick.png")}
                        />
                      )}
                    </View>
                    <View className="flex pl-[10px]">
                      <Text
                        style={GlobalStyles.cairoSemiBold}
                        className="text-[14px] text-[#747474]"
                      >
                        {i18n.t("require-to-accept")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View className="mt-[5px] pl-[10px] pr-[10px] mr-[20px]  flex flex-row ml-[20px]">
                  <TouchableOpacity
                    className="flex flex-row"
                    onPress={() => {
                      if (phoneNotAllowed == "0") {
                        setPhoneNotAllowed((phoneNotAllowed) => 1);
                      } else {
                        setPhoneNotAllowed((phoneNotAllowed) => 0);
                      }
                    }}
                  >
                    <View className="flex">
                      {phoneNotAllowed == 0 ? (
                        <Image
                          className="w-[24px] self-center h-[24px]"
                          source={require("../../assets/icons/unchecked.png")}
                        />
                      ) : (
                        <Image
                          className="w-[24px] self-center h-[24px]"
                          source={require("../../assets/icons/tick.png")}
                        />
                      )}
                    </View>
                    <View className="flex pl-[10px]">
                      <Text
                        style={GlobalStyles.cairoSemiBold}
                        className="text-[14px] text-[#747474]"
                      >
                        {i18n.t("mobile-phone-not-allowed")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View className="mt-[5px] pl-[10px] pr-[10px] mr-[20px]  flex flex-row ml-[20px]">
                  <TouchableOpacity
                    className="flex flex-row"
                    onPress={() => {
                      if (childrenNotAllowed == "0") {
                        setChildrenNotAllowed((childrenNotAllowed) => 1);
                      } else {
                        setChildrenNotAllowed((childrenNotAllowed) => 0);
                      }
                    }}
                  >
                    <View className="flex">
                      {childrenNotAllowed == 0 ? (
                        <Image
                          className="w-[24px] self-center h-[24px]"
                          source={require("../../assets/icons/unchecked.png")}
                        />
                      ) : (
                        <Image
                          className="w-[24px] self-center h-[24px]"
                          source={require("../../assets/icons/tick.png")}
                        />
                      )}
                    </View>
                    <View className="flex pl-[10px]">
                      <Text
                        style={GlobalStyles.cairoSemiBold}
                        className="text-[14px] text-[#747474]"
                      >
                        {i18n.t("children-not-allowed")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[16px] text-left text-[#747474]"
                  >
                    {i18n.t("other-condition")}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className="mt-[5px]  h-[120px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[120px]"
                    onChangeText={setOtherCondition}
                    value={otherCondition}
                    multiline={true}
                    returnKeyType="done"
                    textAlignVertical="top"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("other-condition")}
                  />
                </View>
              </View>
              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[16px] text-left text-[#747474]"
                  >
                    {i18n.t("alert-option")}
                  </Text>
                </View>
                <View className="mt-[5px] pl-[10px] pr-[10px] mr-[20px]  flex flex-row ml-[20px]">
                  <View className="flex">
                    <Image
                      className="w-[24px] self-center h-[24px]"
                      source={require("../../assets/icons/unchecked.png")}
                    />
                  </View>
                  <View className="flex pl-[10px]">
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className="text-[14px] text-[#747474]"
                    >
                      {i18n.t("send-welcome-message-when-the-event-start")}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[16px] text-left text-[#747474]"
                  >
                    {i18n.t("write-your-message-here")}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className="mt-[5px]  h-[120px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[120px]"
                    onChangeText={setAlertMessage}
                    value={alertMessage}
                    multiline={true}
                    returnKeyType="done"
                    textAlignVertical="top"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("write-your-message-here")}
                  />
                </View>
              </View>
              <View className="mt-[25px]">
                <View className="mt-[5px] pl-[10px] pr-[10px] mr-[20px]  flex flex-row ml-[20px]">
                  <View className="flex">
                    <Image
                      className="w-[24px] self-center h-[24px]"
                      source={require("../../assets/icons/unchecked.png")}
                    />
                  </View>
                  <View className="flex pl-[10px]">
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className="text-[14px] text-[#747474]"
                    >
                      {i18n.t("send-farewell-message-when-event-end")}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[16px] text-left text-[#747474]"
                  >
                    {i18n.t("write-your-message-here")}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className="mt-[5px]  h-[120px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[120px]"
                    onChangeText={setAlertMessageEnd}
                    value={alertMessageEnd}
                    multiline={true}
                    returnKeyType="done"
                    textAlignVertical="top"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("write-your-message-here")}
                  />
                </View>
              </View>

              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[16px] text-left text-[#747474]"
                  >
                    {i18n.t("welcome-message")}
                  </Text>
                </View>
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("this-message-will-include-when-invitation-send")}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className="mt-[5px]  h-[120px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[120px]"
                    onChangeText={setInvitationMessage}
                    value={invitationMessage}
                    multiline={true}
                    returnKeyType="done"
                    textAlignVertical="top"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("write-your-message-here")}
                  />
                </View>
              </View>
              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("number-of-people-allow-in-per-invitation")}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className="mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404]  h-[48px]"
                    onChangeText={setNoOfInvitation}
                    value={noOfInvitation}
                    maxLength={10}
                    returnKeyType="done"
                    keyboardType="number-pad"
                    placeholderTextColor="#040404"
                  />
                </View>
              </View>
              <TouchableOpacity
                disabled={buttonClick}
                onPress={() => {
                  updateGuestOption();
                }}
                className="mt-[30px] flex justify-center h-[50px] bg-[#2B949A] rounded-[8px] mb-[20px] ml-[30px]  mr-[30px]"
              >
                <Text
                  className="text-center text-[#FFFFFF] text-[16px]"
                  style={GlobalStyles.cairoBold}
                >
                  {i18n.t("update")}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
