import { Button, Image, Text, YStack } from "tamagui";
import { AuthLayout } from "../components/AuthLayout";
import { useTranslation } from "react-i18next";

import timerGif from "./assets/timer.gif";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";

export const AuthWelcomePage = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();

  return (
    <AuthLayout gap={"$10"} justifyContent="space-evenly" hideBackButton>
      <YStack f={1}>
        <YStack gap={"$2"}>
          <Text
            ta={"center"}
            fontSize={"$4"}
            fontWeight={"$6"}
            color={"$primary"}
          >
            {t("Nice to see you here")}!
          </Text>
          <Text ta={"center"} fontSize={"$5"} fontWeight={"$6"}>
            {t(
              "Start now to follow your favorite crypto and receive alerts when they change"
            )}
          </Text>
        </YStack>
        <Image
          source={{
            uri: timerGif,
            cache: "force-cache",
            height: 350,
          }}
        />
      </YStack>
      <YStack gap={"$3"}>
        <Button
          bg={"$primary"}
          color={"$white1"}
          onPress={() => navigate("AuthRegisterPage")}
        >
          {t("Start now")}
        </Button>
        <Button
          variant="outlined"
          color={"$white1"}
          bc={"$white1"}
          onPress={() => navigate("AuthLoginPage")}
        >
          {t("Already have an account")}
        </Button>
      </YStack>
    </AuthLayout>
  );
};
