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
import React, { useState, useRef, useEffect, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import ActivityIndicators from "../../components/activityindicator/ActivityIndicators";
import * as SecureStore from "expo-secure-store";

export default function All(props) {
  useEffect(() => {
    getValueAuth();
    console.log("all");
    console.log(props.navigate.route.params.UserCardID);
    console.log("all");
  }, [props]);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
      getGuest(user.id);
    }
  };
  return (
    <View>
      <Text>All</Text>
    </View>
  );
}
