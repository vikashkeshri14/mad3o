import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import GlobalStyles from "../../hooks/GlobalStyles";

export default function CardDesign() {
  return (
    <View className="flex-1 flex-col bg-[#FAFAFA]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <WebView
            source={{ uri: "https://mad3o.com/userprofile/mobile.php?DID=226" }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
