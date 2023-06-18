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

export default function UpdateEvent(props) {
  const [loginUser, setLoginUser] = useState(null);
  const [eventName, setEventName] = useState(null);

  const [eventNameError, seteventNameError] = useState(null);

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
    const obj = {
      userId: userId,
      eventId: eventId,
    };

    let params = { url: apiList.eventInfoById, body: obj };
    let response = await ApiService.postData(params);
    console.log(response);
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
              {i18n.t("update-event")}
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
          <ScrollView>
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
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("name-of-the-occasion")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    eventNameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setEventName}
                    value={eventName}
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>
              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("hostname")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    eventNameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setEventName}
                    value={eventName}
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>
              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("phone")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    eventNameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setEventName}
                    value={eventName}
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>
              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("email")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    eventNameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setEventName}
                    value={eventName}
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>
              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("start-date")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    eventNameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setEventName}
                    value={eventName}
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>
              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("the-begining-of-occasion")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    eventNameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setEventName}
                    value={eventName}
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>

              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("expiry-date")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    eventNameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setEventName}
                    value={eventName}
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>

              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("event-end-date")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    eventNameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setEventName}
                    value={eventName}
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>
              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("website-name")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    eventNameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setEventName}
                    value={eventName}
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
