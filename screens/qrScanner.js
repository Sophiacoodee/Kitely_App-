import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function QRScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState("");
  const [flash, setFlash] = useState(false);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
        <Text style={styles.title}>Permiso Requerido</Text>
        <Text style={[styles.subtitle, { textAlign: "center", marginBottom: 20 }]}>
          Necesitamos acceso a la cámara para escanear el código QR.
        </Text>
        <TouchableOpacity style={styles.iconButton} onPress={requestPermission}>
          <Ionicons name="camera-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setResult(data);

    console.log("Tipo: ", type);
    console.log("Codigo QR: ", data);

    Alert.alert("Código QR Escaneado", `Resultado: ${data}`, [
      {
        text: "Escanear nuevamente",
        onPress: () => {
          setScanned(false);
          setResult("");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation && navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.title}>Scan Your QR code</Text>
        <Text style={styles.subtitle}>Center the QR code inside the frame</Text>
      </View>

      <View style={styles.scannerFrame}>
        <View style={styles.qrContainer}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            enableTorch={flash}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />

          <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => setFlash(!flash)}
        >
          <Ionicons 
            name={flash ? "flash" : "flash-off"} 
            size={28} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => {
            setScanned(false);
            setResult("");
          }}
        >
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
    overflow: "hidden",
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