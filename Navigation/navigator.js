import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/login";
import RegistroScreen from "../screens/registro";
import ForgotPasswordScreen from "../screens/forgotPassword";
import SelectrolScreen from "../screens/selectrol";
import HomeStoreScreen from "../screens/homeStore";
import TransmitterHome from "../screens/transmitterHome";
import InicioReceptor from "../screens/inicioReceptor";
import FamilyTransmitter from "../screens/familyTransmitter";
import CategoryTransmitter from "../screens/categoryTransmitter";
import PerfilScreen from "../screens/perfil";
import MetodoPagoScreen from "../screens/metodosPagos";
import AboutUScreen from "../screens/aboutus";

// Nombramientos de las pantallas nuevas
import FaceIdScreen from "../screens/faceId";
import QRScannerScreen from "../screens/qrScanner";
import BalanceDiarioScreen from "../screens/balanceDiario";
import SettingsScreen from "../screens/settings";
import StatusScreen from "../screens/Status";
import TransactionRealizedScreen from "../screens/transactionRealized";

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
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="MetodosPagos" component={MetodoPagoScreen} />
        <Stack.Screen name="AboutUs" component={AboutUScreen} />

        {/* Pantallas nuevas añadidas */}
        <Stack.Screen name="FaceId" component={FaceIdScreen} />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} />
        <Stack.Screen name="BalanceDiario" component={BalanceDiarioScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Status" component={StatusScreen} />
        <Stack.Screen name="TransactionRealized" component={TransactionRealizedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}