import { Button, Text } from "tamagui";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";
import {
  postAuthLogout,
  useGetUserMe,
  usePostAuthLogout,
} from "../schema/default/default";

export const HomePage = () => {
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();
  const { data: user } = useGetUserMe();

  const { t } = useTranslation();

  const postAuthLogoutMutation = usePostAuthLogout({
    mutation: {
      mutationFn: () => postAuthLogout(),
      onSuccess() {
        navigate("AuthWelcomePage");
      },
    },
  });

  const onLogout = async () => {
    postAuthLogoutMutation.mutate();
  };

  return (
    <Layout gap={"$10"} justifyContent="space-evenly" hideBackButton>
      <Text>Hi {user?.data.name}</Text>
      <Button bg={"$primary"} color={"$white1"} onPress={onLogout}>
        {t("Logout")}
      </Button>
    </Layout>
  );
};
