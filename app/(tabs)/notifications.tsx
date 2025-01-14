import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { usePushNotifications } from "@/hooks/useNotifications";
import { StyleSheet } from "react-native";

export default function NotificationsScreen() {
  const { expoPushToken, notification } = usePushNotifications();

  const data = JSON.stringify(notification, undefined, 2);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="bell.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <ThemedText> Expo push token: {expoPushToken?.data}</ThemedText>
        <ThemedText>Notification Details</ThemedText>
        <ThemedText>
          Title: {notification && notification.request.content.title}{" "}
        </ThemedText>
        <ThemedText>
          Body: {notification && notification.request.content.body}
        </ThemedText>
        <ThemedText>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </ThemedText>

        <ThemedText>data: {data || " "}</ThemedText>
      </ThemedView>
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
