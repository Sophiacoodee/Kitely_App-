import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistroScreen from "../screens/registro";
import LoginScreen from "../screens/login";
import ForgotPasswordScreen from "../screens/forgotPassword";
import HomeStoreScreen from "../screens/homeStore";
import TransmitterHome from "../screens/transmitterHome";
import SelectrolScreen from '../screens/selectrol';
import InicioReceptor from "../screens/inicioReceptor";
import PerfilScreen from "../screens/perfil";
import MetodoPagoScreen from "../screens/metodosPagos";
import AboutUScreen from "../screens/aboutus";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="login" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="HomeStore" component={HomeStoreScreen} />
        <Stack.Screen name="TransmitterHome" component={TransmitterHome} />
        <Stack.Screen name="Selectrol" component={SelectrolScreen} />
        <Stack.Screen name="HomeStoreScreen" component={HomeStoreScreen} />
        <Stack.Screen name="InicioReceptor" component={InicioReceptor} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="MetodosPagos" component={MetodoPagoScreen} />
        <Stack.Screen name="AboutUs" component={AboutUScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}