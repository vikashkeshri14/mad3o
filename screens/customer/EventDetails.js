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
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import moment from "moment";
import All from "../../components/event/All";
import NoAnswer from "../../components/event/NoAnswer";
import ListOfApplogy from "../../components/event/ListOfApplogy";
import AttendanceList from "../../components/event/AttendanceList";
import NotSent from "../../components/event/NotSent";

export default function EventDetails(props) {
  const [loginUser, setLoginUser] = useState(null);
  const [eventinfo, seteventinfo] = useState(null);
  const [accesscontrolevent, setaccesscontrolevent] = useState(null);
  const [accesscontroleventsend, setaccesscontroleventsend] = useState(null);
  const [aceptedCounter, setaceptedCounter] = useState(null);
  const [allCounter, setallCounter] = useState(null);
  const [invitedguest, setinvitedguest] = useState(null);
  const [noReplayCounter, setnoReplayCounter] = useState(null);
  const [rejectedCounte, setrejectedCounte] = useState(null);
  const [usercards, setusercards] = useState(null);
  const [all, setAll] = useState(true);
  const [attendanceList, setattendanceList] = useState(false);
  const [listOfApplogy, setlistOfApplogy] = useState(false);
  const [noAnswer, setnoAnswer] = useState(false);
  const [notSent, setnotSent] = useState(false);
  useEffect(() => {
    getValueAuth();
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
      getDetailsEvent(user.id, props.route.params.UserCardID);
    }
  };

  const getDetailsEvent = async (userId, eventId) => {
    const obj = {
      userId: userId,
      eventId: eventId,
    };

    let params = { url: apiList.eventDetailById, body: obj };
    let response = await ApiService.postData(params);
    if (response) {
      if (response.accesscontrolevent.length > 0) {
        setaccesscontrolevent(response.accesscontrolevent);
      }
      if (response.accesscontroleventsend.length > 0) {
        setaccesscontroleventsend(response.accesscontroleventsend);
      }
      if (response.aceptedCounter.length > 0) {
        setaceptedCounter(response.aceptedCounter);
      }
      if (response.allCounter.length > 0) {
        setallCounter(response.allCounter);
      }
      if (response.eventinfo.length > 0) {
        seteventinfo(response.eventinfo);
      }
      if (response.invitedguest.length > 0) {
        setinvitedguest(response.invitedguest);
      }
      if (response.noReplayCounter.length > 0) {
        setnoReplayCounter(response.noReplayCounter);
      }
      if (response.rejectedCounte.length > 0) {
        setrejectedCounte(response.rejectedCounte);
      }
      if (response.usercards.length > 0) {
        setusercards(response.usercards);
      }
    }
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
              {i18n.t("event-detail")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              // setShowToken(false);
              props.navigation.navigate("BottomNavigation", {
                screen: "Home",
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
        <ScrollView>
          <View className="flex">
            <View className="flex">
              <Image
                style={{
                  borderColor: "rgba(178,178,178,0.45)",
                }}
                className="h-[450px] ml-[10px] mr-[10px] mt-[10px] border-[0.5px] rounded-[10px]"
                source={{
                  uri:
                    config.imgUri +
                    "/database/" +
                    props.route.params.usercards[0].CardSrc,
                }}
              />
            </View>
            <View className="flex ml-[15px] mr-[15px]">
              <View className="flex mt-[10px] flex-row">
                <View className="flex w-[10%] mt-[10px]">
                  <Image
                    className="w-[14.97px] h-[11.24px]"
                    source={require("../../assets/icons/dot.png")}
                  />
                </View>
                <View className="flex w-[90%]">
                  <Text
                    className="text-[16px] text-left"
                    style={GlobalStyles.cairoSemiBold}
                  >
                    {props.route.params.EventTitle}
                  </Text>
                </View>
              </View>
              <View className="flex mt-[10px] flex-row">
                <View className="flex w-[10%] mt-[10px]">
                  <Image
                    className="w-[14.97px] h-[11.24px]"
                    source={require("../../assets/icons/dot.png")}
                  />
                </View>
                <View className="flex flex-row w-[90%]">
                  <Text
                    className="text-[16px] text-left"
                    style={GlobalStyles.cairoSemiBold}
                  >
                    {" "}
                    {" : "}{" "}
                    {moment(props.route.params.Date1).format("DD/MM/YYYY")}
                  </Text>
                  <Text
                    className="text-[16px] text-left"
                    style={GlobalStyles.cairoSemiBold}
                  >
                    {moment(props.route.params.EndDate1).format("DD/MM/YYYY")}
                  </Text>
                </View>
              </View>
              <View className="flex mt-[10px] flex-row">
                <View className="flex w-[10%] mt-[10px]">
                  <Image
                    className="w-[14.97px] h-[11.24px]"
                    source={require("../../assets/icons/dot.png")}
                  />
                </View>
                <View className="flex flex-row w-[90%]">
                  <Text
                    className="text-[16px] text-left"
                    style={GlobalStyles.cairoSemiBold}
                  >
                    {i18n.t("invitation-added")} {" : "}{" "}
                  </Text>
                  <Text
                    className="text-[16px] text-left"
                    style={GlobalStyles.cairoSemiBold}
                  >
                    {invitedguest != null ? invitedguest.length : 0}
                  </Text>
                </View>
              </View>
              <View className="flex mt-[10px] flex-row">
                <View className="flex w-[10%] mt-[10px]">
                  <Image
                    className="w-[14.97px] h-[11.24px]"
                    source={require("../../assets/icons/dot.png")}
                  />
                </View>
                <View className="flex flex-row w-[80%]">
                  <Text
                    className="text-[16px] text-left"
                    style={GlobalStyles.cairoSemiBold}
                  >
                    {i18n.t("edit-event")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("UpdateEvent", {
                      cardId: props.route.params.UserCardID,
                      eventDetails: props.route.params,
                    });
                  }}
                >
                  <View className="w-[32px] h-[32px]">
                    <Image
                      className="w-[20px] h-[20px]"
                      source={require("../../assets/icons/editing.png")}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View className="flex mt-[10px] flex-row">
                <View className="flex w-[10%] mt-[10px]">
                  <Image
                    className="w-[14.97px] h-[11.24px]"
                    source={require("../../assets/icons/dot.png")}
                  />
                </View>
                <View className="flex flex-row w-[80%]">
                  <Text
                    className="text-[16px] text-left"
                    style={GlobalStyles.cairoSemiBold}
                  >
                    {i18n.t("manage-guest-option")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("UpdateInvitation", {
                      cardId: props.route.params.UserCardID,
                      eventDetails: props.route.params,
                    });
                  }}
                >
                  <View className="w-[32px] h-[32px]">
                    <Image
                      className="w-[20px] h-[20px]"
                      source={require("../../assets/icons/editing.png")}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View className="flex mt-[10px] flex-row">
                <View className="flex w-[10%] mt-[10px]">
                  <Image
                    className="w-[14.97px] h-[11.24px]"
                    source={require("../../assets/icons/dot.png")}
                  />
                </View>
                <View className="flex flex-row w-[80%]">
                  <Text
                    className="text-[16px] text-left"
                    style={GlobalStyles.cairoSemiBold}
                  >
                    {i18n.t("manage-guest-list")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("ManageGuestList", {
                      cardId: props.route.params.UserCardID,
                      eventDetails: props.route.params,
                    });
                  }}
                >
                  <View className="w-[32px] h-[32px]">
                    <Image
                      className="w-[20px] h-[20px]"
                      source={require("../../assets/icons/editing.png")}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View className="flex mt-[10px] flex-row">
                <View className="flex w-[10%] mt-[10px]">
                  <Image
                    className="w-[14.97px] h-[11.24px]"
                    source={require("../../assets/icons/dot.png")}
                  />
                </View>
                <View className="flex flex-row w-[80%]">
                  <Text
                    className="text-[16px] text-left"
                    style={GlobalStyles.cairoSemiBold}
                  >
                    {i18n.t("manage-power-of-organizer")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("Accesscontrol", {
                      cardId: props.route.params.UserCardID,
                      eventDetails: props.route.params,
                    });
                  }}
                >
                  <View className="w-[32px] h-[32px]">
                    <Image
                      className="w-[20px] h-[20px]"
                      source={require("../../assets/icons/editing.png")}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row">
                <View className="flex w-[80%] flex-row"></View>
                <View className=""></View>
              </View>
            </View>
          </View>

          <View className="flex">
            <ScrollView horizontal={true}>
              <View className="flex flex-row justify-around">
                <TouchableOpacity
                  onPress={() => {
                    setAll(true);
                    setnoAnswer(false);
                    setlistOfApplogy(false);
                    setattendanceList(false);
                    setnotSent(false);
                  }}
                >
                  <View
                    style={
                      all
                        ? {
                            backgroundColor: "rgba(43,148,154,0.17)",
                            borderColor: "rgba(43,148,154,0.17)",
                          }
                        : { backgroundColor: "#fff" }
                    }
                    className={
                      all
                        ? "mt-[10px] flex justify-center  mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[120px] "
                        : "mt-[10px] flex justify-center mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[120px] border-[#b1b1b5]"
                    }
                  >
                    <Text
                      style={
                        all
                          ? GlobalStyles.cairoBold
                          : GlobalStyles.cairoSemiBold
                      }
                      className={
                        all
                          ? "text-center text-[#2B949A] text-[14px]"
                          : "text-center text-[#747474] text-[14px]"
                      }
                    >
                      {i18n.t("all")}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAll(false);
                    setnoAnswer(true);
                    setlistOfApplogy(false);
                    setattendanceList(false);
                    setnotSent(false);
                  }}
                >
                  <View
                    style={
                      noAnswer
                        ? {
                            backgroundColor: "rgba(43,148,154,0.17)",
                            borderColor: "rgba(43,148,154,0.17)",
                          }
                        : { backgroundColor: "#fff" }
                    }
                    className={
                      noAnswer
                        ? "mt-[10px] flex justify-center  mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[120px] "
                        : "mt-[10px] flex justify-center mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[120px] border-[#b1b1b5]"
                    }
                  >
                    <Text
                      style={
                        noAnswer
                          ? GlobalStyles.cairoBold
                          : GlobalStyles.cairoSemiBold
                      }
                      className={
                        noAnswer
                          ? "text-center text-[#2B949A] text-[14px]"
                          : "text-center text-[#747474] text-[14px]"
                      }
                    >
                      {i18n.t("no-answer")}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAll(false);
                    setnoAnswer(false);
                    setlistOfApplogy(true);
                    setattendanceList(false);
                    setnotSent(false);
                  }}
                >
                  <View
                    style={
                      listOfApplogy
                        ? {
                            backgroundColor: "rgba(43,148,154,0.17)",
                            borderColor: "rgba(43,148,154,0.17)",
                          }
                        : { backgroundColor: "#fff" }
                    }
                    className={
                      listOfApplogy
                        ? "mt-[10px] flex justify-center  mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[120px] "
                        : "mt-[10px] flex justify-center mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[120px] border-[#b1b1b5]"
                    }
                  >
                    <Text
                      style={
                        listOfApplogy
                          ? GlobalStyles.cairoBold
                          : GlobalStyles.cairoSemiBold
                      }
                      className={
                        listOfApplogy
                          ? "text-center text-[#2B949A] text-[14px]"
                          : "text-center text-[#747474] text-[14px]"
                      }
                    >
                      {i18n.t("list-of-applogy")}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setAll(false);
                    setnoAnswer(false);
                    setlistOfApplogy(false);
                    setattendanceList(true);
                    setnotSent(false);
                  }}
                >
                  <View
                    style={
                      attendanceList
                        ? {
                            backgroundColor: "rgba(43,148,154,0.17)",
                            borderColor: "rgba(43,148,154,0.17)",
                          }
                        : { backgroundColor: "#fff" }
                    }
                    className={
                      attendanceList
                        ? "mt-[10px] flex justify-center  mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[120px] "
                        : "mt-[10px] flex justify-center mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[120px] border-[#b1b1b5]"
                    }
                  >
                    <Text
                      style={
                        attendanceList
                          ? GlobalStyles.cairoBold
                          : GlobalStyles.cairoSemiBold
                      }
                      className={
                        attendanceList
                          ? "text-center text-[#2B949A] text-[14px]"
                          : "text-center text-[#747474] text-[14px]"
                      }
                    >
                      {i18n.t("attendance-list")}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAll(false);
                    setnoAnswer(false);
                    setlistOfApplogy(false);
                    setattendanceList(false);
                    setnotSent(true);
                  }}
                >
                  <View
                    style={
                      notSent
                        ? {
                            backgroundColor: "rgba(43,148,154,0.17)",
                            borderColor: "rgba(43,148,154,0.17)",
                          }
                        : { backgroundColor: "#fff" }
                    }
                    className={
                      notSent
                        ? "mt-[10px] flex justify-center  mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[120px] "
                        : "mt-[10px] flex justify-center mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[120px] border-[#b1b1b5]"
                    }
                  >
                    <Text
                      style={
                        notSent
                          ? GlobalStyles.cairoBold
                          : GlobalStyles.cairoSemiBold
                      }
                      className={
                        notSent
                          ? "text-center text-[#2B949A] text-[14px]"
                          : "text-center text-[#747474] text-[14px]"
                      }
                    >
                      {i18n.t("not-sent")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          <View className="mt-[25px] mb-[30px] flex">
            {all && <All navigate={props} />}
            {noAnswer && <NoAnswer navigate={props} />}
            {listOfApplogy && <ListOfApplogy navigate={props} />}
            {attendanceList && <AttendanceList navigate={props} />}
            {notSent && <NotSent navigate={props} />}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
