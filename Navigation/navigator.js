import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistroScreen from "../screens/registro";
import LoginScreen from "../screens/login";
import ForgotPasswordScreen from "../screens/forgotPassword";
import HomeStoreScreen from "../screens/homeStore";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="HomeStore" component={HomeStoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}