import {
  View,
  Text,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
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
export default function AddContact(props) {
  const [loginUser, setLoginUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  useEffect(() => {
    getValueAuth();
    //console.log(props.route.params);
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
      // getDetailsEvent(user.id, props.route.params.UserCardID);
    }
  };
  const addRequest = async () => {
    setButtonClick(true);
    if (!name) {
      alert("Please enter the name");
      setButtonClick(false);
      return;
    }
    if (!email) {
      alert("Please enter the email");
      setButtonClick(false);
      return;
    }
    if (!phone) {
      alert("Please enter the phone number");
      setButtonClick(false);
      return;
    }
    const obj = {
      name: name,
      email: email,
      phone: phone,
      eventId: props.route.params.cardId,
      userId: loginUser.id,
    };
    let params = { url: apiList.addguestlist, body: obj };
    let response = await ApiService.postData(params);
    if (response) {
      if (response.success) {
        alert("Contact added successfully!");
        setButtonClick(false);
        setName("");
        setEmail("");
        setPhone("");
      } else {
        alert("User already exists!");
        setName("");
        setEmail("");
        setPhone("");
        setButtonClick(false);
      }
    }
    // console.log(obj);
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
              {i18n.t("add-contact")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("ManageGuestList", {
                cardId: props.route.params.cardId,
                eventDetails: props.route.params.eventDetails,
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
        <KeyboardAvoidingView
          keyboardVerticalOffset="50"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex"
        >
          <ScrollView>
            <View className="bg-[#FDFDFD]">
              <View
                style={{ borderColor: "rgba(178,178,178,0.45)" }}
                className="flex bg-[#FFFFFF]  border-[1px] m-[25px] rounded-[10px]"
              >
                <View className="mt-[25px] ml-[20px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("full-name")}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className="mt-[10px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right h-[48px]"
                    onChangeText={setName}
                    value={name}
                    placeholder={i18n.t("full-name")}
                  />
                </View>
                <View className="mt-[20px] ml-[20px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("email")}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className="mt-[10px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right h-[48px]"
                    onChangeText={setEmail}
                    value={email}
                    placeholder={i18n.t("email")}
                  />
                </View>
                <View className="mt-[20px] ml-[20px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("phone")}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className="mt-[10px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right h-[48px]"
                    onChangeText={setPhone}
                    value={phone}
                    placeholder={i18n.t("phone")}
                  />
                </View>
                <TouchableOpacity
                  disabled={buttonClick}
                  onPress={() => {
                    addRequest();
                  }}
                  className="mt-[40px] mb-[40px] flex justify-center h-[50px] bg-[#2B949A] rounded-[8px] ml-[20px]  mr-[20px]"
                >
                  <Text
                    className="text-center text-[#FFFFFF] text-[16px]"
                    style={GlobalStyles.cairoBold}
                  >
                    {i18n.t("addition")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
