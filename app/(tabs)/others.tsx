import { Button, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";
export default function OthersScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="app.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Other Features</ThemedText>
      </ThemedView>
      <Button onPress={() => router.push("/location")} title="Goto Location" />

      <Button
        onPress={() => router.push("/file-picker")}
        title="Goto File Picker"
      />

      <Button onPress={() => router.push("/sms")} title="Goto SMS" />

      <Button
        onPress={() => router.push("/notifications")}
        title="Goto Notifications"
      />

      <Button
        onPress={() => router.push("/analytics")}
        title="Goto Analytics"
      />

      <Button
        onPress={() => router.push("/async-storage")}
        title="Goto Asnyc Storage"
      />
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
