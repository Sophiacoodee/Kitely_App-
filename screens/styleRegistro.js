import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#021B42",
    },
    topSection: {
        height: "22%",
        backgroundColor: "#021B42",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
    },
    logo: {
        width: 170,
        height: 85,
        resizeMode: "contain",
    },
    whitePanel: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: "hidden",
    },
    content: {
        paddingHorizontal: 30,
        paddingTop: 35,
        zIndex: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#021533",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        color: "#667085",
        lineHeight: 20,
        marginBottom: 24,
    },
    fieldContainer: {
        marginBottom: 16,
    },
    inputContainer: {
        height: 56,
        borderWidth: 1,
        borderColor: "#C4C4C4",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: "#021533",
        marginLeft: 12,
        paddingVertical: 0,
    },
    button: {
        height: 56,
        backgroundColor: "#55C900",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        zIndex: 10,
    },
    footerText: {
        color: "#8A8A8A",
        fontSize: 15,
    },
    signUp: {
        color: "#021533",
        fontSize: 15,
        fontWeight: "700",
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
        bottom: -10,
        left: "18%",
    },
});

export default styles;