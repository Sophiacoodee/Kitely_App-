import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import {MaterialCommunityIcons, Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";

export default function ConfirmacionFaceIdScreen ({navigation}){
    return (
        <LinearGradient colors={["#021B42", "#061F4A"]} style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.titulo}>FACE ID</Text>
                <Text style={styles.subtitulo}>
                    Look at your phone to{"\n"}confirm your identify
                </Text>

                <View style={styles.circuloContainer}>
                    <View style={styles.circulo}>
                        <MaterialCommunityIcons
                        name="face-recognition"
                        size={90}
                        color="#FFFFFF"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.buscandoContainer}>
                <Text style={styles.buscandoTexto}>Searching for Face ID...</Text>
                <ActivityIndicator size="small" color="#FFFFFF" style={{marginLeft: 8}}/>
                </View>
                

                <TouchableOpacity style={styles.botonPin}>
                    <Text style={styles.botonPinTexto}>And enter your security PIN</Text>
                </TouchableOpacity>
                 </LinearGradient>
    );
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"space-between",
        paddingHorizontal:30,
        paddingTop: 80,
        paddingBottom: 50,
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
    buscandoContainer: {
        flexDirection: "row",
        alignItems:"center",
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
    },
    botonPinTexto: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },
});