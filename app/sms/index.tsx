import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import * as SMS from "expo-sms";
import { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";

export default function Sms() {
  const [isSmsAvailable, setIsSmsAvailable] = useState(false);
  const handleSms = async () => {
    console.log("Sending SMS");
    const { result } = await SMS.sendSMSAsync(["9860243992"], ".", {});
    console.log("SMS RESULT", result);
  };

  useEffect(() => {
    (async () => {
      const isAvailable = await SMS.isAvailableAsync();
      console.log("SMS is available", isAvailable);
      setIsSmsAvailable(isAvailable);
    })();
  }, []);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="location.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedText type="title">SMS</ThemedText>
      <ThemedText>Is SMS available: {isSmsAvailable ? "Yes" : "No"}</ThemedText>

      <Button onPress={handleSms} title="Send SMS"></Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
