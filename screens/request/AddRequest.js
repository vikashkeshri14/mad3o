import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import ActivityIndicators from "../../components/activityindicator/ActivityIndicators";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import * as ApiService from "../../config/config";
export default function AddRequest({ navigation }) {
  const [username, setUsername] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState("");

  useEffect(() => {
    getValueAuth();
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
      setPhone(user.mobile);
      setEmail(user.email);
      setUsername(user.name);
    }
  };

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //saveProfile(result.assets[0].uri);
      // setSelectPhoto(false);
    }
  };

  const addRequest = async () => {
    setButtonClick(true);
    let base64 = "";
    if (image) {
      base64 = await FileSystem.readAsStringAsync(image, {
        encoding: "base64",
      });
    }
    if (!description) {
      alert("Please fill what design you need");
      setButtonClick(false);
      return false;
    }

    const obj = {
      userId: loginUser.id,
      name: loginUser.name,
      email: loginUser.email,
      phone: loginUser.mobile,
      message: description,
    };
    let params = { url: apiList.addRequest, body: obj };
    let response = await ApiService.postData(params);
    console.log(response);
    if (response) {
      alert("Your request submitted successfully thankyou!");
      setDescription("");
      setImage("");
      setButtonClick(false);
    }
  };
  return (
    <View className="flex-1 flex-col bg-[#FDFDFD]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        {buttonClick && <ActivityIndicators />}
        <View className="flex justify-start flex-row-reverse ml-[20px] mr-[20px]">
          <TouchableOpacity
            onPress={() => {
              // setShowToken(false);
              navigation.navigate("BottomNavigation", {
                screen: "RequestDesign",
              });
            }}
            className="flex mt-[0px] mb-[0px] justify-start pl-[0px]"
          >
            <View className="mt-[8px]">
              <Image
                className="w-[7px] h-[14px]"
                source={require("../../assets/icons/right-arrow-black.png")}
              />
            </View>
          </TouchableOpacity>
          <View className="flex  w-full self-center ">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-center text-[#262626] text-[16px] "
            >
              {i18n.t("design-request")}
            </Text>
          </View>
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset="50"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View className="bg-[#FDFDFD] mb-[40px]">
              <View
                style={{ borderColor: "rgba(178,178,178,0.45)" }}
                className="flex bg-[#FFFFFF]  border-[1px] m-[25px] rounded-[10px]"
              >
                <View className="mt-[10px] ml-[10px]">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="tex-[14px] mr-[20px] text-right text-[#262626]"
                  >
                    {i18n.t("design-information")}
                  </Text>
                </View>
                <View className="mt-[25px] ml-[20px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px]  mr-[20px] text-right text-[#747474]"
                  >
                    {i18n.t("username")}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className="mt-[10px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right h-[48px]"
                    onChangeText={setUsername}
                    value={username}
                    editable={false}
                    placeholder={i18n.t("username")}
                  />
                </View>
                <View className="mt-[20px] ml-[20px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px]  mr-[20px] text-right text-[#747474]"
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
                    editable={false}
                    value={email}
                    placeholder={i18n.t("email")}
                  />
                </View>
                <View className="mt-[20px] ml-[20px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px]  mr-[20px] text-right text-[#747474]"
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
                    editable={false}
                    value={phone}
                    placeholder={i18n.t("phone")}
                  />
                </View>
                <View className="mt-[20px] ml-[20px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px]  mr-[20px] text-right text-[#747474]"
                  >
                    {i18n.t("order-details")}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className="mt-[10px]  h-[150px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right h-[48px]"
                    onChangeText={setDescription}
                    value={description}
                    multiline={true}
                    placeholder={i18n.t("order-details")}
                  />
                </View>
                <View className="mt-[20px] ml-[20px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px]  mr-[20px] text-right text-[#747474]"
                  >
                    {i18n.t("upload-sample")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    pickImage();
                  }}
                  className="flex mt-[10px]  mr-[20px] mb-[0px] justify-start pl-[10px] flex-row-reverse"
                >
                  <View className="mt-[8px] ml-[10px]">
                    <Image
                      className="w-[13.28px] h-[12.85px]"
                      source={require("../../assets/icons/upload.png")}
                    />
                  </View>
                  <View className="ml-[10px]">
                    {image ? (
                      <Image
                        className="w-[50px] h-[50px] "
                        source={{ uri: image }}
                      />
                    ) : (
                      <Text
                        style={GlobalStyles.cairoBold}
                        className="text-[#2B949A] text-[16px]"
                      >
                        {i18n.t("attachment")}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={buttonClick}
                  onPress={() => {
                    addRequest();
                  }}
                  className="mt-[20px] flex justify-center h-[50px] bg-[#2B949A] rounded-[8px] mb-[20px] ml-[20px]  mr-[20px]"
                >
                  <Text
                    className="text-center text-[#FFFFFF] text-[16px]"
                    style={GlobalStyles.cairoBold}
                  >
                    {i18n.t("submit-design-request")}
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
