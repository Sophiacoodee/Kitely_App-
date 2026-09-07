import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from "expo-local-authentication";

export default function ConfirmacionFaceIdScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleFaceIdAuthentication = async () => {
    try {
      setIsAuthenticating(true);

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert(
          "Hardware Unavailable",
          "Face ID is not available on this device.",
          [{ text: "Use PIN", onPress: () => navigation.navigate("....") }]
        );
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert(
          "Required Configuration",
          "No biometric data is configured on this device.",
          [{ text: "Use PIN", onPress: () => navigation.navigate("....") }]
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Confirm your identity with Face ID",
        fallbackLabel: "Use PIN",
        cancelLabel: "Cancel",
      });

      if (result.success) {
        navigation.navigate("....");
      } else {
        Alert.alert("Authentication failed", "Please try again.");
      }
    } catch (error) {
      console.error("Error", error);
      Alert.alert(
        "Authentication Error",
        "An error occurred during authentication. Please try again."
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    handleFaceIdAuthentication();
  }, []);

  return (
    <LinearGradient colors={["#021B42", "#061F4A"]} style={styles.container}>
      <View style={[styles.mainWrapper, isTablet && styles.mainWrapperTablet]}>
        <View style={styles.content}>
          <Text style={styles.titulo}>FACE ID</Text>
          <Text style={styles.subtitulo}>
            Look at your phone to{"\n"}confirm your identity
          </Text>

          <TouchableOpacity
            style={styles.circuloContainer}
            onPress={handleFaceIdAuthentication}
            activeOpacity={0.8}
            disabled={isAuthenticating}
          >
            <View style={styles.circulo}>
              <MaterialCommunityIcons
                name="face-recognition"
                size={90}
                color="#FFFFFF"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.buscandoContainer}>
            <Text style={styles.buscandoTexto}>
              {isAuthenticating
                ? "Authenticating..."
                : "Tap circle to retry Face ID"}
            </Text>

            {isAuthenticating && (
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
                style={{ marginLeft: 8 }}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.botonPin}
            onPress={() => navigation.navigate("....")}
            activeOpacity={0.8}
          >
            <Text style={styles.botonPinTexto}>
              Or enter your security PIN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 50,
  },
  mainWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  mainWrapperTablet: {
    maxWidth: 520,
    alignSelf: "center",
  },
  content: {
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.75)",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 50,
  },
  circuloContainer: {
    marginBottom: 40,
  },
  circulo: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 2,
    borderColor: "rgba(255,255,255, 0.3)",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    width: "100%",
  },
  buscandoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buscandoTexto: {
    fontSize: 14,
    color: "rgba(255,255,255, 0.8)",
  },
  botonPin: {
    height: 57,
    backgroundColor: "#55C900",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  botonPinTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});