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
import moment from "moment";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import ActivityIndicators from "../../components/activityindicator/ActivityIndicators";

export default function CustomerSupportChat(props) {
  const [loginUser, setLoginUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chatData, setchatData] = useState([]);
  const [addMessage, setaddMessage] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);
  useEffect(() => {
    getValueAuth();
    //console.log(props);
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
      getChat(user.id);
    }
  };
  const getChat = async (id) => {
    const obj = {
      userId: id,
      ticket_id: props.route.params.id,
    };

    let params = { url: apiList.chatMessage, body: obj };
    let response = await ApiService.postData(params);
    if (response.result.length > 0) {
      setchatData(response.result);
    }
    // console.log(response);
  };
  const sendMessage = async () => {
    setButtonClick(true);
    if (!message) {
      setButtonClick(false);
      return;
    }
    const obj = {
      userId: loginUser.id,
      message_chat: message,
      ticket_id: props.route.params.id,
    };
    let params = { url: apiList.addChat, body: obj };
    let response = await ApiService.postData(params);
    let val = addMessage;
    if (response) {
      setMessage("");
      getChat(loginUser.id);
      setButtonClick(false);
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
              {props.route.params.subject.substr(0, 30)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              // setShowToken(false);
              props.navigation.navigate("CustomerSupport");
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
                className="mt-[20px]"
                onContentSizeChange={() => scrollView.current.scrollToEnd()}
              >
                <View className="py-1 px-2 bg-[#E4E4E4] flex self-start rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] h-min-[69px] m-1 ml-[30px] mb-[20px] w-[70%] relative">
                  <Text
                    style={GlobalStyles.cairoRegular}
                    className="text-[#747474]  text-left text-[14px] pl-[10px] pr-[10px] mb-1"
                  >
                    {props.route.params.subject}
                  </Text>
                  <View className="flex-row justify-end pr-[0px]">
                    <View className="pr-[10px] ">
                      <Text
                        style={GlobalStyles.cairoSemiBold}
                        className="text-[10px] leading-[20px] text-[#747474] text-right"
                      >
                        {moment(props.route.params.created_at).format(
                          "YYYY-MM-DD"
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
                {chatData.length > 0 &&
                  chatData.map((data, i) => {
                    {
                      return data.user == "2" ? (
                        <View
                          key={i}
                          className="py-1 px-2 bg-[#E4E4E4] flex self-start rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] h-min-[69px] m-1 ml-[30px] mb-[20px] w-[70%] relative"
                        >
                          <Text
                            style={GlobalStyles.cairoRegular}
                            className="text-[#747474]  text-left text-[14px] pl-[10px] pr-[10px] mb-1"
                          >
                            {data.message}
                          </Text>
                          <View className="flex-row justify-end pr-[0px]">
                            <View className="pr-[10px] ">
                              <Text
                                style={GlobalStyles.cairoSemiBold}
                                className="text-[10px] leading-[20px] text-[#747474] text-right"
                              >
                                {moment(data.created_at).format("YYYY-MM-DD")}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ) : (
                        <View
                          key={i}
                          className="py-1 px-2 bg-[#EFEFEF] flex self-end rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] h-min-[39px] m-1 mr-[30px] mb-[20px] w-[70%] relative"
                        >
                          <Text
                            style={GlobalStyles.cairoRegular}
                            className="text-[#747474]  text-left text-[14px] pl-[10px] pr-[10px] mb-1"
                          >
                            {data.message}
                          </Text>
                          <View className="flex-row justify-end pr-[0px]">
                            <View className="pr-[0px] ">
                              <Text
                                style={GlobalStyles.cairoSemiBold}
                                className="text-[10px] pr-[10px]  text-[#747474] text-right"
                              >
                                {moment(data.created_at).format("YYYY-MM-DD")}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    }
                  })}
              </ScrollView>

              <View
                style={{ borderColor: "rgba(178,178,178,0.45)" }}
                className="flex-row  justify-between items-center border-t-[0.5px]  rounded w-[100%] px-4 py-2 "
              >
                <View className="w-[41px] h-[41px] justify-center bg-white rounded-full">
                  <TouchableOpacity
                    disabled={buttonClick}
                    onPress={() => sendMessage()}
                  >
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
