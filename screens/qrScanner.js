import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Linking, Animated, Easing } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { useTranslation } from "react-i18next";

export default function PhotoQRScreen() {
  const { t } = useTranslation();
  const [imageUri, setImageUri] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [statusText, setStatusText] = useState("");
  const [isScanningAnim, setIsScanningAnim] = useState(false);

  const laserAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setStatusText(t("qrScanner.scanningImage", "Escaneando imagen..."));
  }, [t]);

  useEffect(() => {
    let animationLoop;
    if (isScanningAnim) {
      laserAnim.setValue(0);
      animationLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(laserAnim, {
            toValue: 200,
            duration: 1200,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(laserAnim, {
            toValue: 0,
            duration: 1200,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      );
      animationLoop.start();
    } else {
      laserAnim.stopAnimation();
    }
    return () => animationLoop && animationLoop.stop();
  }, [isScanningAnim]);

  const takePhotoAndScan = async () => {
    setScannedData(null);
    setStatusText(t("qrScanner.openingCamera", "Abriendo cámara..."));

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert(t("qrScanner.cameraRequired", "Se requiere permiso para acceder a la cámara"));
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await decodeQR(uri);
    }
  };

  const decodeQR = async (uri) => {
    setIsScanningAnim(true);
    setStatusText(t("qrScanner.processingPixels", "Procesando código..."));

    try {
      const results = await Camera.scanFromURLAsync(uri, ["qr"]);

      if (results && results.length > 0) {
        setScannedData(results[0].data);
        setStatusText(t("qrScanner.detected", "Código QR detectado"));
      } else {
        setStatusText(t("qrScanner.failed", "No se encontró ningún código QR"));
      }
    } catch (e) {
      console.error("Error analizando el QR:", e);
      setStatusText(t("qrScanner.failed", "No se pudo leer la imagen"));
    } finally {
      setIsScanningAnim(false);
    }
  };

  const laserTranslateY = laserAnim.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.container}>
      {imageUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />

          <View style={styles.scanFrame}>
            {isScanningAnim && (
              <Animated.View
                style={[
                  styles.laserLine,
                  { transform: [{ translateY: laserTranslateY }] },
                ]}
              />
            )}
          </View>

          <View style={styles.overlayBox}>
            <Text style={styles.statusMsg}>{statusText}</Text>
            {scannedData ? (
              <>
                <Text style={styles.subtext} selectable>{scannedData}</Text>
                {scannedData.startsWith("http") && (
                  <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL(scannedData)}>
                    <Text style={styles.buttonText}>{t("qrScanner.openLink", "Abrir enlace")}</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={takePhotoAndScan}>
              <Text style={styles.buttonText}>{t("qrScanner.takeAnother", "Escanear otro")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.promptText}>{t("qrScanner.prompt", "Escanea un código QR para continuar")}</Text>
          <TouchableOpacity style={styles.button} onPress={takePhotoAndScan}>
            <Text style={styles.buttonText}>{t("qrScanner.openCameraBtn", "Abrir cámara")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  promptText: { color: "#fff", fontSize: 16, marginBottom: 20 },
  previewContainer: { flex: 1, position: "relative", alignItems: "center", justifyContent: "center" },
  imagePreview: { width: "100%", height: "100%", resizeMode: "contain", position: "absolute" },
  scanFrame: {
    width: 220,
    height: 220,
    borderWidth: 2,
    borderColor: "rgba(0, 122, 255, 0.8)",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  laserLine: {
    width: "100%",
    height: 3,
    backgroundColor: "#007AFF",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  overlayBox: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.85)",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  statusMsg: {
    color: "#4CD964",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtext: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  linkButton: {
    backgroundColor: "#34C759",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});