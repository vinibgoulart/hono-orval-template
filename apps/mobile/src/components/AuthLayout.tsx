import { Image, Text, XStack, YStack, YStackProps } from "tamagui";
import logoImg from "../../assets/logo.png";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { INavigationPages } from "../navigation/NavigationPages";
import { useCallback } from "react";
import { useGetUserMe } from "../schema/default/default";

type IAuthLayout = {
  children: React.ReactNode;
  hideBackButton?: boolean;
} & YStackProps;

export const AuthLayout = ({
  children,
  hideBackButton,
  ...props
}: IAuthLayout) => {
  const { goBack, navigate } =
    useNavigation<NavigationProp<INavigationPages>>();

  const { data } = useGetUserMe();

  useFocusEffect(
    useCallback(() => {
      if (data?.status === 200) {
        navigate("HomePage");
      }
    }, [data])
  );

  return (
    <YStack bg={"$secondary"} f={1}>
      {!hideBackButton && (
        <ArrowLeft color={"$primary"} size={"$3"} onPress={goBack} />
      )}
      <YStack f={1} py={"$8"} {...props}>
        {children}
      </YStack>
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
    </YStack>
  );
};
