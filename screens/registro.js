import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Path, Polygon } from "react-native-svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const CustomInput = ({
    placeholder,
    secureTextEntry,
    value,
    onChangeText,
    icon,
}) => (
    <View style={styles.inputContainer}>
        <Ionicons name={icon} size={18} color="#021533" />

        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#A0A0A0"
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);

export default function Index({ navigation }) {
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        if (!name || !identity || !email || !password) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await setDoc(doc(db, "Usuarios", user.uid), {
                nombre: name,
                identidad: identity,
                correo: email,
                uid: user.uid,
            });

            Alert.alert("Success!", "User registered successfully.");

            if (navigation) navigation.navigate("Login");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                Alert.alert("Email Exists", "This email is already registered.");
            } else if (error.code === "auth/invalid-email") {
                Alert.alert("Invalid Email", "The email entered is not valid.");
            } else if (error.code === "auth/weak-password") {
                Alert.alert("Weak Password", "Password must be at least 6 characters long.");
            } else {
                Alert.alert("Error", error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Image
                    source={require("../assets/KITELY.png")}
                    style={styles.logo}
                />
            </View>

            <View style={styles.whitePanel}>
                <View style={styles.content}>
                    <Text style={styles.title}>Create your account</Text>

                    <Text style={styles.subtitle}>
                        Send and receive support
                        {"\n"}
                        with purpose.
                    </Text>

                    <View style={styles.fieldContainer}>
                        <CustomInput
                            icon="person"
                            placeholder="Enter your complete name"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <CustomInput
                            icon="card"
                            placeholder="Enter your identity number"
                            value={identity}
                            onChangeText={setIdentity}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <CustomInput
                            icon="mail"
                            placeholder="Enter your email or username"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <CustomInput
                            icon="lock-closed"
                            placeholder="Enter password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.buttonText}>Sign up</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Already have an account?
                        </Text>

                        <TouchableOpacity onPress={() => navigation && navigation.navigate("Login")}>
                            <Text style={styles.logIn}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.decoration} pointerEvents="none">
                    <Svg
                        width="100%"
                        height="125"
                        viewBox="0 0 400 125"
                        style={styles.wave}
                    >
                        <Path
                            d="M0 72 C75 67 125 83 190 82 C275 80 325 50 400 10 L400 125 L0 125 Z"
                            fill="#D8D4FF"
                        />

                        <Path
                            d="M0 91 C75 86 125 101 190 100 C275 98 325 69 400 28 L400 125 L0 125 Z"
                            fill="#BDB7F5"
                        />
                    </Svg>

                    <Svg
                        width="95"
                        height="120"
                        viewBox="0 0 95 120"
                        style={styles.kite}
                    >
                        <Polygon
                            points="48,10 72,32 50,55 27,32"
                            fill="none"
                            stroke="#55A605"
                            strokeWidth="3"
                        />

                        <Path
                            d="M48 10 L50 55"
                            fill="none"
                            stroke="#55A605"
                            strokeWidth="3"
                        />

                        <Path
                            d="M50 55 C55 68 51 75 42 82 C32 89 23 86 16 94 C10 101 13 108 7 116"
                            fill="none"
                            stroke="#55A605"
                            strokeWidth="3"
                        />

                        <Polygon
                            points="17,89 27,97 23,108 13,101 14,92"
                            fill="none"
                            stroke="#55A605"
                            strokeWidth="2.5"
                        />
                    </Svg>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#021B42",
    },

    topSection: {
        height: "21%",
        backgroundColor: "#021B42",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
    },

    logo: {
        width: 165,
        height: 90,
        resizeMode: "contain",
    },

    whitePanel: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 38,
        borderTopRightRadius: 38,
        overflow: "hidden",
    },

    content: {
        paddingHorizontal: 35,
        paddingTop: 38,
        zIndex: 5,
    },

    title: {
        fontSize: 29,
        fontWeight: "700",
        color: "#021533",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        color: "#667085",
        lineHeight: 15,
        marginBottom: 20,
    },

    fieldContainer: {
        marginBottom: 20,
    },

    label: {
        fontSize: 16,
        color: "#021533",
        marginLeft: 18,
        marginBottom: 8,
        fontWeight: "500",
    },

    inputContainer: {
        height: 55,
        borderWidth: 1,
        borderColor: "#BDBDBD",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: "#FFFFFF",
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: "#021533",
        marginLeft: 8,
        paddingVertical: 0,
    },

    button: {
        height: 57,
        backgroundColor: "#55C900",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "500",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 13,
        zIndex: 10,
    },

    footerText: {
        color: "#8A8A8A",
        fontSize: 16,
    },

    logIn: {
        color: "#173C53",
        fontSize: 17,
        fontWeight: "600",
        marginLeft: 7,
    },

    decoration: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 135,
        zIndex: 1,
    },

    wave: {
        position: "absolute",
        bottom: 0,
        left: 0,
    },

    kite: {
        position: "absolute",
        bottom: -4,
        left: "15%",
    },
});