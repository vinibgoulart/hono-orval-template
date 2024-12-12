import { NavigationPages } from "./src/navigation/NavigationPages";
import {
  TamaguiProvider,
  Theme,
  createTamagui,
  createTokens,
} from "@tamagui/core";
import { config } from "@tamagui/config/v3";
import { SafeAreaView } from "react-native";
import { PortalProvider, YStack } from "tamagui";
import { useFonts } from "expo-font";
import { PoppinsFonts } from "./src/fonts/PoppinsFonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "./src/language/i18n.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

const tokens = createTokens({
  ...config.tokens,
  color: {
    ...config.tokens.color,
    primary: "#0BAFE5",
    secondary: "#0b192e",
    secondaryDark: "#121d2e",
  },
});

const tamaguiConfig = createTamagui({
  ...config,
  fonts: {
    body: PoppinsFonts,
    heading: PoppinsFonts,
  },
  tokens,
  themes: {
    ...config.themes,
    dark: {
      ...config.themes.dark,
      primary: tokens.color.primary,
    },
    light: {
      ...config.themes.light,
      primary: tokens.color.primary,
    },
  },
  defaultProps: {
    Button: {
      disabledStyle: {
        bg: "$gray6",
      },
      fontWeight: "$6",
    },
  },
});

type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const [loaded, error] = useFonts({
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    unset: require("./assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <PortalProvider>
        <QueryClientProvider client={queryClient}>
          <Theme name="dark">
            <SafeAreaView style={{ flex: 1, backgroundColor: "#0b192e" }}>
              <YStack f={1} px={"$4"}>
                <NavigationPages />
              </YStack>
            </SafeAreaView>
            <Toast />
          </Theme>
        </QueryClientProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
}
