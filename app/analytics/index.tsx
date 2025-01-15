import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Button, StyleSheet } from "react-native";
import analytics from "@react-native-firebase/analytics";

export default function AnalyticsScreen() {
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
      <ThemedText type="title">Test Analytics</ThemedText>
      <Button
        title="Add To Basket"
        onPress={async () => {
          try {
            console.log("adding to basket");
            const res = await analytics().logEvent("basket", {
              id: 3745092,
              item: "mens grey t-shirt",
              description: ["round neck", "long sleeved"],
              size: "L",
            });
            console.log("Added to basket", res);
          } catch (error) {
            console.log("error", error);
          }
        }}
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
