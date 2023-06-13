import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useRef, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import ActivityIndicators from "../../components/activityindicator/ActivityIndicators";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import moment from "moment";

export default function CustomerSupport({ navigation }) {
  const [loginUser, setLoginUser] = useState(null);
  const snapPoints = useMemo(() => ["70%"], []);
  const [buttonClick, setButtonClick] = useState(false);
  const [addSupport, setAddSupport] = useState(false);
  const [ticketType, setTicketType] = useState("");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [topicError, setTopicError] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [ticketDetail, setTicketDetail] = useState([]);
  useEffect(() => {
    getValueAuth();
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
      getTicket(user.id);
    }
  };
  const getTicket = async (id) => {
    const obj = {
      userId: id,
    };
    //console.log(obj);
    let params = { url: apiList.getTicketByUserId, body: obj };
    let response = await ApiService.postData(params);
    setTicketDetail(response.result);
  };

  const addNewTicket = async () => {
    setButtonClick(true);
    if (!ticketType) {
      alert("select the ticket type");
      setButtonClick(false);
      return;
    }
    if (!topic) {
      setTopicError(true);
      setButtonClick(false);
      return;
    }
    setTopicError(false);
    if (!details) {
      setDetailsError(true);
      setButtonClick(false);
      return;
    }
    setDetailsError(false);

    const obj = {
      userId: loginUser.id,
      type: ticketType,
      subject: topic,
      message: details,
    };

    let params = { url: apiList.addTicket, body: obj };
    let response = await ApiService.postData(params);
    if (response) {
      setButtonClick(false);
      setAddSupport(false);
      alert("Your ticket added successfully!");
    }
  };
  return (
    <View
      className={
        addSupport
          ? "flex-1 flex-col  bg-[#707070]"
          : "flex-1 flex-col  bg-[#FDFDFD]"
      }
    >
      {buttonClick && <ActivityIndicators />}
      <SafeAreaView
        className={addSupport ? "opacity-[0.01px] " : ""}
        style={GlobalStyles.droidSafeArea}
      >
        <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]   p-[10px] flex-row">
          <TouchableOpacity
            onPress={() => {
              // setShowToken(false);
              navigation.navigate("BottomNavigation", {
                screen: "Menu",
              });
            }}
            className="flex mt-[0px]  pl-[10px] pr-[10px]  mb-[0px] justify-start "
          >
            <View className="mt-[8px]">
              <Image
                className="w-[7px] h-[14px]"
                source={require("../../assets/icons/right-arrow-black.png")}
              />
            </View>
          </TouchableOpacity>
          <View className="flex w-full   ml-[0px] mt-[-5px]">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-[22px] text-center text-[#040404]"
            >
              {i18n.t("customer-support")}
            </Text>
          </View>
          <View className="flex pl-[10px] pr-[10px]  self-center">
            <TouchableOpacity
              onPress={() => {
                setAddSupport(true);
              }}
            >
              <Image
                source={require("../../assets/icons/add-request.png")}
                className="w-[15px] self-end h-[15px]"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 mt-[10px] bg-[#FDFDFD]">
          <ScrollView>
            {ticketDetail.map((data, i) => {
              return (
                <View key={i} className="mb-[10px]">
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("CustomerSupportChat");
                    }}
                  >
                    <View
                      style={{ borderColor: "rgba(178,178,178,0.45)" }}
                      className=" flex bg-[#FFFFFF]  border-[1px] ml-[20px] mr-[20px] mt-[10px] rounded-[10px]"
                    >
                      <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]  p-[5px] flex-row">
                        <View className="flex flex-row w-[70%]  ml-[0px] mt-[-5px]">
                          <View className="flex flex-row self-center   ml-[0px] mt-[-5px]">
                            <View className="flex mr-[5px] mt-[10px]">
                              <Image
                                className="w-[12px] h-[12px]"
                                source={require("../../assets/icons/online.png")}
                              />
                            </View>
                            <View className="mt-[5px] ml-[5px]">
                              <Text
                                style={GlobalStyles.cairoBold}
                                className="text-[14px] text-left text-[#747474]"
                              >
                                {data.subject}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View className="flex w-[30%]  ml-[0px] mt-[-5px]">
                          <Text
                            style={GlobalStyles.cairoSemiBold}
                            className="text-[14px] text-right text-[#ADADAD]"
                          >
                            #{data.id}
                          </Text>
                        </View>
                      </View>
                      <View className="flex  mt-[10px] ml-[15px] mr-[15px]  p-[5px] flex-row">
                        <View className="flex    ml-[0px] mt-[-5px]">
                          <Text
                            style={GlobalStyles.cairoSemiBold}
                            className="text-[14px] text-left text-[#ADADAD]"
                          >
                            {moment(data.created_at).format("YYYY-MM-DD")}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
      {addSupport && (
        <BottomSheet
          indicatorStyle={{
            backgroundColor: "#FAFAFA",
            color: "#FAFAFA",
            height: 4,
            opacity: 0.5,
          }}
          wrapperStyle={{ backgroundColor: "#ADADAD", color: "#ffffff" }}
          handleIndicatorStyle={{
            backgroundColor: "#ADADAD",
            width: 30,
            height: 2.5,
          }}
          backgroundStyle={{ borderTopEndRadius: 32, borderTopRightRadius: 32 }}
          className="flex-1 flex-col shadow rounded-tl-[80px] rounded-tr-[80px] bg-[#FAFAFA] "
          snapPoints={snapPoints}
        >
          <View className="flex-1">
            <View className="mb-[10px] flex justify-center  flex-row">
              <View className="">
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-center text-[19px] text-[#040404]"
                >
                  {i18n.t("add-ticket")}
                </Text>
              </View>
            </View>
            <View className="flex ml-[25px] mr-[25px]">
              <View className="flex">
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-[14px] text-left text-[#747474]"
                >
                  {i18n.t("ticket-type")}
                </Text>
              </View>
              <View className="flex mt-[15px] ml-[0px] flex-row">
                <TouchableOpacity
                  className="flex flex-row"
                  onPress={() => {
                    setTicketType("inquery");
                  }}
                >
                  <View className="flex">
                    {"inquery" == ticketType ? (
                      <Image
                        className="w-[20px] mt-[7px] h-[20px]"
                        source={require("../../assets/icons/radio-select.png")}
                      />
                    ) : (
                      <Image
                        className="w-[20px] mt-[7px] h-[20px]"
                        source={require("../../assets/icons/radio.png")}
                      />
                    )}
                  </View>
                  <View className="flex">
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className="text-[16px] ml-[10px] text-[#747474]"
                    >
                      {i18n.t("inquery")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View className="flex mt-[15px] ml-[0px] flex-row">
                <TouchableOpacity
                  className="flex flex-row"
                  onPress={() => {
                    setTicketType("tech support");
                  }}
                >
                  <View className="flex">
                    {"tech support" == ticketType ? (
                      <Image
                        className="w-[20px] mt-[7px] h-[20px]"
                        source={require("../../assets/icons/radio-select.png")}
                      />
                    ) : (
                      <Image
                        className="w-[20px] mt-[7px] h-[20px]"
                        source={require("../../assets/icons/radio.png")}
                      />
                    )}
                  </View>
                  <View className="flex">
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className="text-[16px] ml-[10px] text-[#747474]"
                    >
                      {i18n.t("technical-support")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View className="flex mt-[15px] ml-[0px] flex-row">
                <TouchableOpacity
                  className="flex flex-row"
                  onPress={() => {
                    setTicketType("suggesation");
                  }}
                >
                  <View className="flex">
                    {"suggesation" == ticketType ? (
                      <Image
                        className="w-[20px] mt-[7px] h-[20px]"
                        source={require("../../assets/icons/radio-select.png")}
                      />
                    ) : (
                      <Image
                        className="w-[20px] mt-[7px] h-[20px]"
                        source={require("../../assets/icons/radio.png")}
                      />
                    )}
                  </View>
                  <View className="flex">
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className="text-[16px] ml-[10px] text-[#747474]"
                    >
                      {i18n.t("suggesation")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-row mt-[25px]">
              <View className="flex w-[100%] ">
                <BottomSheetTextInput
                  placeholder={i18n.t("ticket-address")}
                  autoCorrect={false}
                  textAlignVertical="top"
                  onChangeText={(evt) => setTopic(evt)}
                  value={topic}
                  style={
                    topicError
                      ? [styles.textInputError, GlobalStyles.cairoSemiBold]
                      : [styles.textInput, GlobalStyles.cairoSemiBold]
                  }
                />
              </View>
            </View>
            <View className="flex mt-[10px]">
              <BottomSheetTextInput
                placeholder={i18n.t("details")}
                autoCorrect={false}
                multiline={true}
                textAlignVertical="top"
                onChangeText={(evt) => setDetails(evt)}
                value={details}
                style={
                  detailsError
                    ? [styles.textmultiInputError, GlobalStyles.cairoSemiBold]
                    : [styles.textmultiInput, GlobalStyles.cairoSemiBold]
                }
              />
            </View>
            <View className="mt-[25px] justify-between flex flex-row w-full pl-[30px] pr-[30px]">
              <TouchableOpacity
                // disabled={loading}
                onPress={() => {
                  addNewTicket();
                }}
                className="flex w-[50%]"
              >
                <View className="justify-center h-[48px] rounded-[14px] bg-[#2B949A] ">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-center leading-[26px] text-[14px] text-[#ffffff]"
                  >
                    {i18n.t("create-the-ticket")}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                // disabled={loading}
                onPress={() => {
                  setAddSupport(false);
                }}
                className="flex w-[48%]"
              >
                <View className="justify-center h-[48px] rounded-[14px] bg-[#CE3535] ">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-center leading-[26px] text-[16px] text-[#ffffff]"
                  >
                    {i18n.t("cancel")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    color: "#a8b5eb",
    backgroundColor: "#FAFAFA",
  },
  textInputError: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginBottom: 12,
    height: 48,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(228, 228, 228, 0.29)",
    color: "#959494",
    textAlign: "right",
    borderWidth: 1,
    borderColor: "#EF1414",
  },
  textInput: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginBottom: 12,
    height: 48,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(228, 228, 228, 0.29)",
    color: "#959494",
    textAlign: "right",
    borderWidth: 1,
    borderColor: "#E4E4E4",
  },
  textmultiInputError: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginBottom: 12,
    height: 110,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(228, 228, 228, 0.29)",
    color: "#959494",
    textAlign: "right",
    borderWidth: 1,
    borderColor: "#EF1414",
  },
  textmultiInput: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginBottom: 12,
    height: 110,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(228, 228, 228, 0.29)",
    color: "#959494",
    textAlign: "right",
    borderWidth: 1,
    borderColor: "#E4E4E4",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  submitBtn: {
    backgroundColor: "#342342",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
