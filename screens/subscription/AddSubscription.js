import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Slider from "@react-native-community/slider";
import React, { useState, useRef, useEffect, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";

export default function AddSubscription(props) {
  const [subscription, setSubscription] = useState([]);
  useEffect(() => {
    //console.log(props);
    getSubscriptionById();
  });
  const getSubscriptionById = async () => {
    let obj = {
      id: props.route.params.subId,
    };
    let params = { url: apiList.subscriptionById, body: obj };
    let response = await ApiService.postData(params);
    setSubscription(response.result);
  };
  return (
    <View className="flex-1 flex-col bg-[#FAFAFA]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}></SafeAreaView>
    </View>
  );
}
