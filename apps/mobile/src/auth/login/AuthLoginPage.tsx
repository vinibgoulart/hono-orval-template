import { Button, Text, YStack } from "tamagui";
import { AuthLayout } from "../../components/AuthLayout";
import { useTranslation } from "react-i18next";
import { Input } from "../../components/input/Input";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postAuthLoginBody } from "../../schema/default/default.zod";
import { z } from "zod";
import { postAuthLogin, usePostAuthLogin } from "../../schema/default/default";
import { INavigationPages } from "../../navigation/NavigationPages";
import Toast from "react-native-toast-message";

type Values = z.infer<typeof postAuthLoginBody>;

export const AuthLoginPage = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();

  const formConfig = useForm<Values>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(postAuthLoginBody),
    mode: "all",
  });

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = formConfig;

  const postAuthLoginMutation = usePostAuthLogin({
    mutation: {
      mutationFn: ({ data }: { data: Values }) =>
        postAuthLogin(data, {
          credentials: "include",
        }),
      onSuccess(response) {
        if ("error" in response.data) {
          Toast.show({
            type: "error",
            text1: t("Error"),
            text2: response.data.error,
          });
          return;
        }

        navigate("HomePage");
      },
      onError(error) {
        Toast.show({
          type: "error",
          text1: t("Error"),
          text2: error.error,
        });
      },
    },
  });

  const onSubmit = async (data: Values) => {
    postAuthLoginMutation.mutate({ data });
  };

  return (
    <AuthLayout gap={"$10"} justifyContent="space-evenly">
      <FormProvider {...formConfig}>
        <YStack f={1} gap={"$5"}>
          <Text ta={"center"} fontSize={"$4"} fontWeight={"$6"}>
            {t("It's great that you're back! Log in to your account")}!
          </Text>
          <YStack gap={"$3"}>
            <Input
              label={t("Email")}
              placeholder="email@email.com"
              name="email"
            />
            <Input
              label={t("Password")}
              placeholder="********"
              secureTextEntry
              name="password"
            />
          </YStack>
        </YStack>
        <YStack gap={"$3"}>
          <Button
            bg={"$primary"}
            color={"$white1"}
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            {t("Login")}
          </Button>
          <Button
            variant="outlined"
            color={"$primary"}
            bc={"$black05"}
            bw={"$0.5"}
            onPress={() => navigate("AuthRegisterPage")}
          >
            {t("I don't have an account")}
          </Button>
        </YStack>
      </FormProvider>
    </AuthLayout>
  );
};
