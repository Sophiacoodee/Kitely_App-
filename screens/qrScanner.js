import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function QRScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState(false);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Permiso de Cámara</Text>
        <Text style={styles.permissionText}>
          Necesitamos acceso a la cámara para escanear el código QR.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Conceder Permiso</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = ({ data }) => {
    if (scanned) return;
    setScanned(true);
    Alert.alert("QR Detectado", data, [
      {
        text: "Escanear de nuevo",
        onPress: () => setScanned(false),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 1. LA CÁMARA OCUPA ABSOLUTAMENTE TODO EL FONDO */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        enableTorch={flash}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      {/* 2. CAPAS OSCURAS SEMITRANSPARENTES PARA CREAR EL EFECTO WHATSAPP */}
      <View style={styles.overlayTop} />
      
      <View style={styles.middleRow}>
        <View style={styles.overlaySide} />
        
        {/* EL RECUADRO CENTRAL (TRANSPARENTE PARA VER LA CÁMARA) */}
        <View style={styles.scannerFrame}>
          {/* Bordes esquineros sutiles estilo WhatsApp */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>

        <View style={styles.overlaySide} />
      </View>

      <View style={styles.overlayBottom} />

      {/* 3. INTERFAZ DE TEXTOS Y BOTONES FLOTANTES */}
      <SafeAreaView style={styles.uiContainer}>
        {/* Header Superior */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation?.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan QR code</Text>
          
          {/* Botón de flash arriba a la derecha para mayor comodidad */}
          <TouchableOpacity 
            style={styles.flashButton} 
            onPress={() => setFlash(!flash)}
          >
            <Ionicons name={flash ? "flash" : "flash-off"} size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Texto descriptivo idéntico al estilo WhatsApp */}
        <Text style={styles.instructionText}>
          Open web.whatsapp.com, desktop{"\n"}app, or other devices.
        </Text>

        {/* Pie de página inferior */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Link with phone number instead</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  // Bloques oscuros semitransparentes alrededor del visor
  overlayTop: {
    width: "100%",
    height: "22%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  middleRow: {
    flexDirection: "row",
    height: 280, // Tamaño exacto del cuadro de escaneo
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  scannerFrame: {
    width: 280,
    height: 280,
    backgroundColor: "transparent",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  // Esquinas del marco estilo visor moderno
  corner: {
    position: "absolute",
    width: 24,
    height: 24,
    borderColor: "#FFFFFF",
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 16,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 16,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 16,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 16,
  },
  uiContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    pointerEvents: "box-none",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  flashButton: {
    padding: 5,
  },
  instructionText: {
    color: "#CCCCCC",
    fontSize: 15,
    textAlign: "center",
    marginTop: 15,
    lineHeight: 22,
  },
  footer: {
    marginBottom: 30,
    alignItems: "center",
  },
  linkButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  linkButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#0A1931",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  permissionText: {
    color: "#D9E4F5",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  permissionButton: {
    backgroundColor: "#25D366",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});