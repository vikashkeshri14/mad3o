import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import React, { useState, useRef, useEffect, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import moment from "moment";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";

export default function AddSubscription(props) {
  const [subscription, setSubscription] = useState([]);
  const [activationDate, setActivationDate] = useState(null);
  const [activationDateEnd, setActivationDateEnd] = useState(null);
  const [loginUser, setLoginUser] = useState(null);
  const [creditCardInformation, setCreditCardInformation] = useState([]);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [newCreditCard, setnewCreditCard] = useState(true);
  const [cardNumber, setcardNumber] = useState("");
  const [cvv, setcvv] = useState("");
  const [cardholdername, setcardholdername] = useState("");
  const [expiryDate, setexpiryDate] = useState("");
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  useEffect(() => {
    getValueAuth();
    getSubscriptionById();
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      getCreditCardInformation(user.id);
      setLoginUser(user);
    }
  };
  const getCreditCardInformation = async (userId) => {
    let obj = {
      userId: userId,
    };
    let params = { url: apiList.getCreditCardById, body: obj };
    let response = await ApiService.postData(params);
    setCreditCardInformation(response.result);
  };
  const getSubscriptionById = async () => {
    let obj = {
      id: props.route.params.subId,
    };
    let params = { url: apiList.subscriptionById, body: obj };
    let response = await ApiService.postData(params);
    setSubscription(response.result);
    if (response.result.length > 0) {
      let presentDate = new Date();

      // console.log(response.result[0].period);
      let dateTime1 = moment(presentDate).format("YYYY-MM-DD");
      var futureYear = moment(presentDate)
        .add(response.result[0].period, "M")
        .format("YYYY-MM-DD");

      setActivationDateEnd(futureYear);
      setActivationDate(dateTime1);
    }
  };

  const radioSelected = async (id) => {
    setSelectedCredit(id);
    getCreditCardInformation(loginUser.id);
  };
  return (
    <View className="flex-1 flex-col bg-[#FAFAFA]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex justify-start flex-row ml-[20px] mr-[20px]">
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
              {i18n.t("subscribe-to-invite")}
            </Text>
          </View>
        </View>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
            }}
          >
            <View className="flex mt-[15px] ml-[20px] mr-[20px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[18px] text-[#040404]"
              >
                {i18n.t("current-package")}
              </Text>
            </View>
            <View
              style={{
                borderColor: "rgba(178,178,178,0.45)",
              }}
              className="w-[90%] ml-auto mr-auto bg-[#ffffff] mt-[20px]  rounded-[10px] h-[325px]"
            >
              <View className="mt-[30px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[18px] text-left ml-[20px] mr-[20px] text-[#262626]"
                >
                  {subscription.length > 0 && subscription[0].subscripton_ar}
                </Text>
              </View>
              <View className="mt-[20px] flex flex-row">
                <View className="flex">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[35px] text-left ml-[20px] mr-[10px] text-[#2B949A]"
                  >
                    {subscription.length > 0 && subscription[0].pricing}
                  </Text>
                </View>
                <View className="flex mt-[25px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#2B949A]"
                  >
                    {i18n.t("riyal")}
                  </Text>
                </View>
              </View>
              <View className="mt-[35px] flex flex-row ml-[20px]">
                <View className="mt-[8px]">
                  <Image
                    className="w-[14px] h-[11px]"
                    source={require("../../assets/icons/point-black.png")}
                  />
                </View>
                <View className="mt-[0px] ml-[10px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[#262626] text-[14px]"
                  >
                    {subscription.length > 0 && subscription[0].invitation}
                  </Text>
                </View>
                <View className="mt-[0px] ml-[10px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[#262626] text-[14px]"
                  >
                    ضيف لكل دعوة
                  </Text>
                </View>
              </View>
              <View className="mt-[25px] flex flex-row ml-[20px]">
                <View className="mt-[8px]">
                  <Image
                    className="w-[14px] h-[11px]"
                    source={require("../../assets/icons/point-black.png")}
                  />
                </View>
                <View className="mt-[0px] ml-[10px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[#262626] text-[14px]"
                  >
                    {subscription.length > 0 &&
                      subscription[0].invitation_description_ar}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderColor: "rgba(178,178,178,0.45)",
              }}
              className="w-[90%] ml-auto mr-auto bg-[#ffffff] mt-[20px]  rounded-[10px] "
            >
              <View className="flex p-[10px] justify-evenly flex-row">
                <View className="flex flex-row w-[45%]">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-left text-[20px] text-[#262626]"
                  >
                    {i18n.t("invoice")}
                  </Text>
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-left ml-[5px] text-[20px] text-[#262626]"
                  >
                    #2344
                  </Text>
                </View>
                <View className="flex justify-end w-[45%]  flex-row">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-right text-[#2B949A] text-[20px]"
                  >
                    {subscription.length > 0 && subscription[0].pricing}
                  </Text>
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-right mt-[4px] ml-[5px] text-[#2B949A] text-[14px]"
                  >
                    {i18n.t("riyal")}
                  </Text>
                </View>
              </View>
              <View className="border-b-[1px] border-[#E4E4E4] ml-auto mr-auto w-[90%] mt-[5px]"></View>

              <View className="mt-[20px] ml-[20px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[18px] text-left text-[#ADADAD]"
                >
                  {i18n.t("subscription-activation")}
                </Text>
              </View>
              <View className="mt-[10px] ml-[20px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[18px] text-left text-[#262626]"
                >
                  {activationDate}
                </Text>
              </View>
              <View className="mt-[20px] ml-[20px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[18px] text-left text-[#ADADAD]"
                >
                  {i18n.t("subscription-end")}
                </Text>
              </View>
              <View className="mt-[10px] ml-[20px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[18px] text-left text-[#262626]"
                >
                  {activationDateEnd}
                </Text>
              </View>
              <View className="border-b-[1px] border-[#E4E4E4] ml-auto mr-auto w-[90%] mt-[15px]"></View>
              <View className="mt-[10px] ml-[20px]">
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-[18px] text-left text-[#2B949A]"
                >
                  {i18n.t("credit-card")}
                </Text>
              </View>

              {creditCardInformation.length > 0 &&
                creditCardInformation.map((data, i) => {
                  return (
                    <View key={i} className="flex mt-[15px] ml-[20px] flex-row">
                      <View className="flex">
                        <TouchableOpacity
                          onPress={() => {
                            radioSelected(data.id);
                            //setSelectedCredit((selectedCredit) => );
                          }}
                        >
                          {selectedCredit == data.id ? (
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
                        </TouchableOpacity>
                      </View>
                      <View className="flex">
                        <Text
                          style={GlobalStyles.cairoSemiBold}
                          className="text-[18px] ml-[10px] text-[#262626]"
                        >
                          ************{data.card_number.slice(-3)}
                        </Text>
                      </View>
                    </View>
                  );
                })}

              <View className="flex mt-[15px] ml-[20px] flex-row">
                <View className="flex">
                  <TouchableOpacity
                    onPress={() => {
                      setnewCreditCard(true);
                    }}
                  >
                    {newCreditCard == true ? (
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
                  </TouchableOpacity>
                </View>
                <View className="flex">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[18px] ml-[10px] text-[#262626]"
                  >
                    {i18n.t("new-credit-card")}
                  </Text>
                </View>
              </View>
              <View
                style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                className="mt-[10px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
              >
                <TextInput
                  style={GlobalStyles.cairoRegular}
                  className="text-[14px] text-right h-[48px]"
                  onChangeText={setcardNumber}
                  value={cardNumber}
                  placeholder={i18n.t("card-number")}
                />
              </View>
              <View className="flex justify-around flex-row">
                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className="mt-[10px] w-[42%] h-[48px] rounded-[10px] pl-[10px] pr-[10px] ml-[20px] border-[#E4E4E4] border-[1px] "
                >
                  <TouchableOpacity onPress={handleOnPressStartDate}>
                    <TextInput
                      style={GlobalStyles.cairoRegular}
                      className="text-[14px] text-right h-[48px]"
                      onChangeText={setexpiryDate}
                      value={expiryDate}
                      placeholder={i18n.t("expiry-date")}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className="mt-[10px] flex justify-end w-[42%] h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px]  border-[#E4E4E4] border-[1px] "
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right h-[48px]"
                    onChangeText={setcvv}
                    value={cvv}
                    placeholder={i18n.t("cvv")}
                  />
                </View>
              </View>
              <View
                style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                className="mt-[10px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
              >
                <TextInput
                  style={GlobalStyles.cairoRegular}
                  className="text-[14px] text-right h-[48px]"
                  onChangeText={setcardholdername}
                  value={cardholdername}
                  placeholder={i18n.t("card-holder-name")}
                />
              </View>
              <TouchableOpacity className="mt-[30px] flex justify-center bg-[#2B949A] h-[50px] border-[#2B949A] border-[1px] rounded-[8px] mb-[20px] ml-[20px]  mr-[20px]">
                <Text
                  className="text-center text-[#ffffff] text-[16px]"
                  style={GlobalStyles.cairoBold}
                >
                  {i18n.t("subscription-now")}
                </Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={openStartDatePicker}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <DatePicker
                      mode="calendar"
                      minimumDate={startDate}
                      selected={startedDate}
                      onDateChanged={handleChangeStartDate}
                      onSelectedChange={(date) => setSelectedStartDate(date)}
                      options={{
                        backgroundColor: "#080516",
                        textHeaderColor: "#469ab6",
                        textDefaultColor: "#FFFFFF",
                        selectedTextColor: "#FFF",
                        mainColor: "#469ab6",
                        textSecondaryColor: "#FFFFFF",
                        borderColor: "rgba(122, 146, 165, 0.1)",
                      }}
                    />

                    <TouchableOpacity onPress={handleOnPressStartDate}>
                      <Text style={{ color: "white" }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <View className="mb-[30px]"></View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
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
