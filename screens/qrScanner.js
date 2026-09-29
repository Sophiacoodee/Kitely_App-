import React, { useEffect, useRef, useState } from "react";
import {
  AppState,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

const { width, height } = Dimensions.get("window");
const MARCO = 280;
const LADO = (width - MARCO) / 2;
const ARRIBA = (height - MARCO) / 2;

export default function QRScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState(false);
  const [camara, setCamara] = useState("back");
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  // Libera el candado si la app vuelve de segundo plano
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (siguiente) => {
      if (appState.current.match(/inactive|background/) && siguiente === "active") {
        qrLock.current = false;
      }
      appState.current = siguiente;
    });
    return () => subscription.remove();
  }, []);

  // Libera el candado cada vez que se vuelve a esta pantalla (ej. después de cancelar)
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      qrLock.current = false;
    });
    return unsubscribe;
  }, [navigation]);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permisoContainer}>
        <Text style={styles.permisoTitulo}>Camera access</Text>
        <Text style={styles.permisoTexto}>
          We need access to your camera to scan the QR code.
        </Text>
        <TouchableOpacity style={styles.permisoBoton} onPress={requestPermission}>
          <Text style={styles.permisoBotonTexto}>Allow camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function manejarCodigo({ data }) {
    if (!data || qrLock.current) return;
    qrLock.current = true;

    // "data" es lo que trae el QR. Para Kitely debe ser el id de la transacción.
    // Cambia "ConfirmacionFaceId" por el nombre con el que registraste esa pantalla en navigator.js
    navigation.navigate("faceld", { transaccionId: data.trim() });
  }

  return (
    <View style={styles.container}>
      {/* Cámara a pantalla completa */}
      <CameraView
        style={StyleSheet.absoluteFill}
        facing={camara}
        enableTorch={flash}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={manejarCodigo}
      />

      {/* Oscurecido alrededor del recuadro */}
      <View style={styles.overlay} pointerEvents="none">
        <View style={[styles.sombra, { height: ARRIBA }]} />
        <View style={{ flexDirection: "row", height: MARCO }}>
          <View style={[styles.sombra, { width: LADO }]} />
          <View style={styles.marco}>
            <View style={[styles.esquina, styles.arribaIzq]} />
            <View style={[styles.esquina, styles.arribaDer]} />
            <View style={[styles.esquina, styles.abajoIzq]} />
            <View style={[styles.esquina, styles.abajoDer]} />
          </View>
          <View style={[styles.sombra, { width: LADO }]} />
        </View>
        <View style={[styles.sombra, { flex: 1 }]} />
      </View>

      {/* Textos y botones */}
      <View style={styles.ui} pointerEvents="box-none">
        <View style={styles.encabezado}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botonIcono}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.textos}>
          <Text style={styles.titulo}>Scan your QR code</Text>
          <Text style={styles.subtitulo}>Center the QR code inside the frame</Text>
        </View>

        <View style={styles.pie}>
          <TouchableOpacity onPress={() => setFlash(!flash)} style={styles.botonIcono}>
            <Ionicons name={flash ? "flash" : "flash-off"} size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCamara(camara === "back" ? "front" : "back")}
            style={styles.botonIcono}
          >
            <Ionicons name="camera-reverse-outline" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  sombra: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },
  marco: {
    width: MARCO,
    height: MARCO,
  },
  esquina: {
    position: "absolute",
    width: 34,
    height: 34,
    borderColor: "#FFFFFF",
    borderWidth: 4,
  },
  arribaIzq: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 18,
  },
  arribaDer: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 18,
  },
  abajoIzq: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 18,
  },
  abajoDer: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 18,
  },
  ui: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    paddingTop: 55,
    paddingBottom: 45,
    paddingHorizontal: 24,
  },
  encabezado: {
    flexDirection: "row",
  },
  botonIcono: {
    padding: 6,
  },
  textos: {
    alignItems: "center",
    position: "absolute",
    top: 110,
    left: 0,
    right: 0,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitulo: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    textAlign: "center",
  },
  pie: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  permisoContainer: {
    flex: 1,
    backgroundColor: "#021B42",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  permisoTitulo: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  permisoTexto: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 24,
  },
  permisoBoton: {
    backgroundColor: "#55C900",
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 26,
  },
  permisoBotonTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});