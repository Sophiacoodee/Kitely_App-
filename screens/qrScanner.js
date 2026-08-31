import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function QRScannerScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Botón opcional para regresar si se abre desde otra pantalla */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation && navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.title}>Scan Your QR code</Text>
        <Text style={styles.subtitle}>Center the QR code inside the frame</Text>
      </View>

      {/* marco de escaneo y codigo QR simulado */}
      <View style={styles.scannerFrame}>
        <View style={styles.qrContainer}>
          <Ionicons name="qr-code-outline" size={140} color="#FFFFFF" />

          {/* esquinas decorativas del marco */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>

      {/* botones inferiores de la flash y camera */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="flash-off" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="camera-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1931",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#D9E4F5",
  },
  scannerFrame: {
    width: 280,
    height: 280,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
  qrContainer: {
    width: 220,
    height: 220,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 22,
    height: 22,
    borderColor: "#7DD3FC",
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
});