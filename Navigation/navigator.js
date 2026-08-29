import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistroScreen from "../screens/registro";
import LoginScreen from "../screens/login";
import ForgotPasswordScreen from "../screens/forgotPassword";
import HomeStoreScreen from "../screens/homeStore";
import TransmitterHome from "../screens/transmitterHome";
import SelectrolScreen from "../screens/selectrol";
import InicioReceptor from "../screens/inicioReceptor";
import FamilyTransmitter from "../screens/familyTransmitter";
import CategoryTransmitter from "../screens/categoryTransmitter";

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
        <Stack.Screen name="Selectrol" component={SelectrolScreen} />
        <Stack.Screen name="HomeStore" component={HomeStoreScreen} />
        <Stack.Screen name="InicioReceptor" component={InicioReceptor} />
        <Stack.Screen name="TransmitterHome" component={TransmitterHome} />
        <Stack.Screen name="FamilyTransmitter" component={FamilyTransmitter} />
        <Stack.Screen name="CategoryTransmitter" component={CategoryTransmitter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}