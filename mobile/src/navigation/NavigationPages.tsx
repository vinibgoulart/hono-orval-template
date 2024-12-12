import { ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthWelcomePage } from "../auth/AuthWelcomePage";
import { AuthLoginPage } from "../auth/login/AuthLoginPage";
import { AuthRegisterPage } from "../auth/register/AuthRegisterPage";
import { HomePage } from "../home/HomePage";

export type INavigationPages = {
  AuthWelcomePage: undefined;
  AuthLoginPage: undefined;
  AuthRegisterPage: undefined;
  HomePage: undefined;
};

const Stack = createNativeStackNavigator<INavigationPages>();

export const NavigationPages = (): ReactNode => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AuthWelcomePage" component={AuthWelcomePage} />
        <Stack.Screen name="AuthLoginPage" component={AuthLoginPage} />
        <Stack.Screen name="AuthRegisterPage" component={AuthRegisterPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
