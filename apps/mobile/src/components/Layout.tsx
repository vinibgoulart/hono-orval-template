import { Image, Text, XStack, YStack, YStackProps } from "tamagui";

type ILayout = {
  children: React.ReactNode;
  hideBackButton?: boolean;
} & YStackProps;

import logoImg from "../../assets/logo.png";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useGetUserMe } from "../schema/default/default";
import { useCallback } from "react";

export const Layout = ({ children, hideBackButton, ...props }: ILayout) => {
  const { goBack, navigate } =
    useNavigation<NavigationProp<INavigationPages>>();

  const { data } = useGetUserMe();

  useFocusEffect(
    useCallback(() => {
      if (data?.status !== 200) {
        navigate("AuthWelcomePage");
      }
    }, [data])
  );

  return (
    <YStack bg={"$secondary"} f={1}>
      {!hideBackButton && (
        <ArrowLeft color={"$primary"} size={"$3"} onPress={goBack} />
      )}
      <XStack jc={"center"} ai={"center"} gap={"$2"}>
        <Text color={"$primary"} fontWeight={"$5"} fontSize={"$3"}>
          Crypto Alert
        </Text>
        <Image
          source={{
            uri: logoImg,
            width: 35,
            height: 35,
          }}
        />
      </XStack>
      <YStack f={1} {...props}>
        {children}
      </YStack>
    </YStack>
  );
};
