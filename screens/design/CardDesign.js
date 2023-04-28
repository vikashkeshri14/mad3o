import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
export default function CardDesign() {
  return (
    <WebView
      source={{ uri: "https://mad3o.com/userprofile/mobile.php?DID=226" }}
    />
  );
}
