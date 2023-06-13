import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
} from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
export default function CustomerSupportChat({ navigation }) {
  const [loginUser, setLoginUser] = useState(null);
  const [message, setMessage] = useState("");
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
  const scrollView = useRef();
  const lastmessage = useRef();
  return (
    <View className="flex-1 flex-col bg-[#FDFDFD]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex justify-start flex-row ml-[15px] mr-[15px]">
          <View className="absolute  w-full self-center ">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-center text-[#262626] text-[16px] "
            >
              {i18n.t("customer-support")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              // setShowToken(false);
              navigation.navigate("BottomNavigation", {
                screen: "Menu",
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
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ref={scrollView}
                vertical
                onContentSizeChange={() => scrollView.current.scrollToEnd()}
              >
                <View className="py-1 px-2 bg-[#ffffff] flex self-start rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] h-min-[69px] m-1 ml-[30px] mb-2 w-[70%] relative">
                  <Text className="text-[#484848]  text-left text-[14px] pl-[10px] pr-[10px] mb-1">
                    this is test
                  </Text>
                  <View className="flex-row justify-end pr-[0px]">
                    <View className="pr-[10px] ">
                      <Text
                        style={GlobalStyles.cairoSemiBold}
                        className="text-[10px] leading-[20px] text-[#959494] text-right"
                      >
                        23/22
                      </Text>
                    </View>
                    <View>
                      {/* <Image
                        className="h-[7px] w-[10px] mt-[8px]"
                        source={require("../../assets/icons/unread.png")}
                      /> */}
                    </View>
                  </View>
                </View>
                <View className="py-0 px-2 bg-[#ffffff] flex self-end rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] h-min-[39px] m-1 mr-[30px] mb-2 w-[70%] relative">
                  <Text
                    style={GlobalStyles.cairoMedium}
                    className="text-[#484848]  text-left text-[14px] pl-[10px] pr-[10px] mb-1"
                  >
                    test
                  </Text>
                  <View className="flex-row justify-end pr-[0px]">
                    <View className="pr-[0px] ">
                      <Text
                        style={GlobalStyles.cairoRegular}
                        className="text-[10px] pr-[10px]  text-[#959494] text-right"
                      >
                        21/23
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View
                style={{ borderColor: "rgba(178,178,178,0.45)" }}
                className="flex-row  justify-between items-center border-t-[0.5px]  rounded w-[100%] px-4 py-2 "
              >
                <View className="w-[41px] h-[41px] justify-center bg-white rounded-full">
                  <TouchableOpacity onPress={() => sendMessage()}>
                    <Image
                      className="h-[41px] self-center w-[41px]"
                      source={require("../../assets/icons/send.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View className="w-[83%] justify-center h-[52px]  flex-row bg-white rounded-[10px]">
                  <TextInput
                    placeholder="type message"
                    className={
                      Platform.OS == "android"
                        ? "bottom-0 self-center text-right flex-1 mr-2 border-transparent  border p-2 rounded-[10px]"
                        : "bottom-0 self-center text-right flex-1 mr-2 border-transparent  border p-2 rounded-[10px]"
                    }
                    style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                    textAlignVertical="top"
                    multiline={true}
                    value={message}
                    ref={lastmessage}
                    onChangeText={(text) => setMessage(text)}
                  />
                </View>
              </View>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
