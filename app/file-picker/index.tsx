import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Button, StyleSheet } from "react-native";

export default function FilePicker() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [files, setFiles] = useState([]);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow any file type
        copyToCacheDirectory: true,
        multiple: true, // Set true to allow multiple selections
      });

      console.log("result", result);

      if (!result.canceled) {
        console.log("Files", result.assets);
        setFiles(result.assets);
      } else {
        console.log("Document picking was cancelled.");
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="folder.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedText type="title">File Picker:</ThemedText>
      <Button onPress={handlePickDocument} title="Pick Files" />

      <ThemedView>
        {files.map((file, index) => (
          <ThemedText key={index}>
            {++index}. {file.name}
          </ThemedText>
        ))}
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
