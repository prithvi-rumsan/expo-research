import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getLocales, getCalendars } from "expo-localization";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BrazilFlag from "../../assets/images/flags/brazil.png";
import UsaFlag from "../../assets/images/flags/usa.png";
import { useEffect } from "react";

export default function HomeScreen() {
  console.log(
    "google client id web:",
    process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB
  );
  console.log(
    "google client id android:",
    process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID
  );

  console.log(getLocales(), getCalendars());

  const { i18n, t } = useTranslation();

  const flags = [
    { component: BrazilFlag, lang: "pt-BR", name: "Brasil" },
    { component: UsaFlag, lang: "en-US", name: "USA" },
  ];

  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t("home.welcome")}</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        <ThemedText>{t("language")}</ThemedText>
        <ScrollView>
          <ThemedView style={styles.flagsContainer}>
            {flags.map((flag, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => changeLanguage(flag.lang)}
                style={styles.flag}
              >
                <Image
                  source={flag.component}
                  style={[
                    styles.flagIcon,

                    currentLanguage === flag.lang
                      ? styles.activeFlag
                      : styles.inactiveFlag,
                  ]}
                />
                <ThemedText
                  style={[
                    styles.text,
                    currentLanguage === flag.lang
                      ? styles.activeFlag
                      : styles.inactiveFlag,
                  ]}
                >
                  {flag.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ScrollView>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        {/* <ThemedText type="subtitle">Step 1: Try it</ThemedText> */}
        <ThemedText>{t("home.description")}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  container: {
    justifyContent: "center",
  },
  flagsContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  flag: {
    paddingHorizontal: 10,
  },
  activeFlag: {
    transform: [{ scale: 1.2 }],
  },
  inactiveFlag: {
    opacity: 0.5,
  },
  text: {
    fontSize: 22,
    lineHeight: 32,
    marginTop: -6,
  },
  flagIcon: {
    width: 40,
    height: 30,
    resizeMode: "contain",
  },
});
