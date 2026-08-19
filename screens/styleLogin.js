import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#021B42",
    },
    topSection: {
        height: "25%",
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
        marginBottom: 25,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: "#667085",
        fontSize: 14,
        fontWeight: "500",
    },
    label: {
        fontSize: 18,
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
        marginTop: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        zIndex: 10,
    },
    footerText: {
        color: "#8A8A8A",
        fontSize: 16,
    },
    signUp: {
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

export default styles;