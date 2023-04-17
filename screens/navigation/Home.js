import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import AllInvitation from "../../components/invitation/AllInvitation";
import Effective from "../../components/invitation/Effective";
import Pending from "../../components/invitation/Pending";
import Ended from "../../components/invitation/Ended";

export default function Home() {
  const scrollRef = useRef();
  const scrollToEnd = () => scrollRef.current.scrollToEnd({ animated: false });

  const [everyone, setEveryOne] = useState(true);
  const [pending, setPending] = useState(false);
  const [effective, setEffective] = useState(false);
  const [ended, setEnded] = useState(false);

  return (
    <View className="flex-1 flex-col pl-[25px] pr-[25px] bg-[#FDFDFD]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex flex-col">
          <View className="flex mt-[20px]">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-left text-[#040404] text-[20px]"
            >
              {i18n.t("invitation")}
            </Text>
          </View>

          <ScrollView
            className="flex"
            horizontal={true}
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex flex-row">
              <TouchableOpacity
                onPress={() => {
                  setEveryOne(true);
                  setPending(false);
                  setEnded(false);
                  setEffective(false);
                }}
              >
                <View
                  style={
                    everyone
                      ? {
                          backgroundColor: "rgba(43,148,154,0.17)",
                          borderColor: "rgba(43,148,154,0.17)",
                        }
                      : { backgroundColor: "#fff" }
                  }
                  className={
                    everyone
                      ? "mt-[10px] flex justify-center  mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[93px] "
                      : "mt-[10px] flex justify-center mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[93px] border-[#b1b1b5]"
                  }
                >
                  <Text
                    style={
                      everyone
                        ? GlobalStyles.cairoBold
                        : GlobalStyles.cairoSemiBold
                    }
                    className={
                      everyone
                        ? "text-center text-[#2B949A] text-[14px]"
                        : "text-center text-[#747474] text-[14px]"
                    }
                  >
                    {i18n.t("everyone")}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEveryOne(false);
                  setPending(false);
                  setEnded(false);
                  setEffective(true);
                }}
              >
                <View
                  style={
                    effective
                      ? {
                          backgroundColor: "rgba(43,148,154,0.17)",
                          borderColor: "rgba(43,148,154,0.17)",
                        }
                      : { backgroundColor: "#fff" }
                  }
                  className={
                    effective
                      ? "mt-[10px] flex justify-center  mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[93px] "
                      : "mt-[10px] flex justify-center mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[93px] border-[#b1b1b5]"
                  }
                >
                  <Text
                    style={
                      effective
                        ? GlobalStyles.cairoBold
                        : GlobalStyles.cairoSemiBold
                    }
                    className={
                      effective
                        ? "text-center text-[#2B949A] text-[14px]"
                        : "text-center text-[#747474] text-[14px]"
                    }
                  >
                    {i18n.t("efective")}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEveryOne(false);
                  setPending(true);
                  setEnded(false);
                  setEffective(false);
                }}
              >
                <View
                  style={
                    pending
                      ? {
                          backgroundColor: "rgba(43,148,154,0.17)",
                          borderColor: "rgba(43,148,154,0.17)",
                        }
                      : { backgroundColor: "#fff" }
                  }
                  className={
                    pending
                      ? "mt-[10px] flex justify-center  mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[93px] "
                      : "mt-[10px] flex justify-center mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[93px] border-[#b1b1b5]"
                  }
                >
                  <Text
                    style={
                      pending
                        ? GlobalStyles.cairoBold
                        : GlobalStyles.cairoSemiBold
                    }
                    className={
                      pending
                        ? "text-center text-[#2B949A] text-[14px]"
                        : "text-center text-[#747474] text-[14px]"
                    }
                  >
                    {i18n.t("archive")}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEveryOne(false);
                  setPending(false);
                  setEnded(true);
                  setEffective(false);
                }}
              >
                <View
                  style={
                    ended
                      ? {
                          backgroundColor: "rgba(43,148,154,0.17)",
                          borderColor: "rgba(43,148,154,0.17)",
                        }
                      : { backgroundColor: "#fff" }
                  }
                  className={
                    ended
                      ? "mt-[10px] flex justify-center  mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[93px] "
                      : "mt-[10px] flex justify-center mr-[10px] border-[1px] rounded-[10px] h-[47px] w-[93px] border-[#b1b1b5]"
                  }
                >
                  <Text
                    style={
                      ended
                        ? GlobalStyles.cairoBold
                        : GlobalStyles.cairoSemiBold
                    }
                    className={
                      ended
                        ? "text-center text-[#2B949A] text-[14px]"
                        : "text-center text-[#747474] text-[14px]"
                    }
                  >
                    {i18n.t("ended")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View className="mt-[15px] flex  ">
            {everyone && <AllInvitation />}
            {effective && <Effective />}
            {pending && <Pending />}
            {ended && <Ended />}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
