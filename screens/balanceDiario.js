import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LineChart} from "react-native-gifted-charts";

export default function BalanceDiario(){
    const datosGrafica = [
        {value: 120},
        {value: 60},
        {value: 150},
        {value: 90},
        {value: 180},
        {value: 130},
        {value: 170},

    ];

    const transaccionesEjemplo = [
        {id: "1", nombre: "Juan Armando", monto: 25.0},
         {id: "2", nombre: "Pablo Ramírez", monto: 55.0},
          {id: "3", nombre: "Joaquín Hernandez", monto: 15.0},
           {id: "4", nombre: "Pablo Escobar", monto: 20.0},
            {id: "5", nombre: "Leonardo de León", monto: 125.0},
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitulo}>Daily Balance</Text>

            <ScrollView showsVerticalScrollIndicator= {false}>
                <View style={styles.tarjeta}>
                    <Text style={styles.tarjetaTitulo}>Balance</Text>
                    <Text style={styles.tarjetaSubtitulo}>Today´s running total</Text>
                    <Text style={styles.tarjetaMonto}>$ 240.50</Text>

                    <LineChart 
                    data= {datosGrafica}
                    height={100}
                    color="#55C900"
                    thickness={2}
                    hideDataPoints
                    hideRules
                    hideYAxisText
                    xAxisLabelTextStyle={{color: "#9AA5AD", fontSize: 10}}
                    xAxisLabelTexts={["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]}
                    />

                    <Text style={styles.seccionTitulo}>{transaccionesEjemplo.length} transactions completed</Text>

                    {transaccionesEjemplo.map((t) => (
                        <View style={styles.filaTransaccion} key={t.id}>
                            <Text style={styles.nombreTransaccion}>{t.nombre}: </Text>
                            <Text style={styles.montoTransaccion}>${t.monto.toFixed(2)}</Text>
                            </View>
                ))}

                <TouchableOpacity>
                    <Text style={styles.verTodas}>View all transactions</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#021B42",
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    headerTitulo: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    tarjeta: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
    },
    tarjetaTitulo: {
        color: "#021B42",
        fontSize: 20,
        padding: 20,
    },
    tarjetaSubtitulo: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 13,
        marginTop: 4,
    },
    tarjetaMonto: {
        color: "#021B42",
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 4,
        marginBottom: 15,
    },
    seccionTitulo: {
        color: "#021B42",
        fontSize: 15,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 10,
    },
    filaTransaccion: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.08)",
    },
    nombreTransaccion: {
        color: "#021B42",
        fontSize: 14,
    },
    montoTransaccion: {
        color: "#021B42",
        fontSize: 14,
        fontWeight: "600",
    },
    verTodas: {
        color: "#55C900",
        fontSize: 14,
        fontWeight: "600",
        textAlign:"center",
        marginTop: 15,
        },

});