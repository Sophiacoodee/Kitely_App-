import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-gifted-charts";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function BalanceDiario({ navigation }) {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  const chartWidth = Math.min(width - 80, 500);

  const [transacciones, setTransacciones] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [datosGrafica, setDatosGrafica] = useState([
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
  ]);

  // Cargar transacciones reales cada vez que la pantalla recibe el foco
  useFocusEffect(
    useCallback(() => {
      loadRealTransactions();
    }, [])
  );

  const loadRealTransactions = async () => {
    try {
      const savedActivities = await AsyncStorage.getItem('@store_recent_activities');
      if (savedActivities !== null) {
        const parsedList = JSON.parse(savedActivities);
        
        // Mapear transacciones reales para obtener número de ticket y monto
        const formattedTransactions = parsedList.map((item, index) => {
          // Extraer número de ticket o asignar uno consecutivo
          const ticketMatch = item.subtitle ? item.subtitle.match(/Ticket\s*#(\d+)/i) : null;
          const ticketNumber = ticketMatch ? `Ticket #${ticketMatch[1]}` : `Ticket #${1042 - index}`;
          
          // Extraer monto numérico limpio
          const numericAmount = parseFloat(
            item.amount ? item.amount.replace(/[^0-9.]/g, '') : '0'
          );

          return {
            id: item.id || index.toString(),
            ticket: ticketNumber,
            monto: isNaN(numericAmount) ? 0 : numericAmount,
          };
        });

        setTransacciones(formattedTransactions);

        // Sumar todos los ingresos recibidos
        const total = formattedTransactions.reduce((acc, curr) => acc + curr.monto, 0);
        setTotalBalance(total);

        // Generar puntos de la gráfica basados en las últimas transacciones
        if (formattedTransactions.length > 0) {
          const chartValues = formattedTransactions
            .slice(0, 7)
            .reverse()
            .map((tItem) => ({ value: tItem.monto }));
          setDatosGrafica(chartValues);
        }
      } else {
        // Datos base iniciales si aún no hay transacciones guardadas
        const initialTransactions = [
          { id: "1", ticket: "Ticket #1042", monto: 25.0 },
          { id: "2", ticket: "Ticket #1041", monto: 12.5 },
          { id: "3", ticket: "Ticket #1040", monto: 45.0 },
          { id: "4", ticket: "Ticket #1039", monto: 18.0 },
        ];
        setTransacciones(initialTransactions);
        const initialTotal = initialTransactions.reduce((acc, curr) => acc + curr.monto, 0);
        setTotalBalance(initialTotal);
        setDatosGrafica(initialTransactions.map((item) => ({ value: item.monto })));
      }
    } catch (error) {
      console.error('Error al cargar balance dinámico:', error);
    }
  };

  const diasSemana = [
    t('balanceDiario.days.mon', { defaultValue: 'MON' }),
    t('balanceDiario.days.tue', { defaultValue: 'TUE' }),
    t('balanceDiario.days.wed', { defaultValue: 'WED' }),
    t('balanceDiario.days.thu', { defaultValue: 'THU' }),
    t('balanceDiario.days.fri', { defaultValue: 'FRI' }),
    t('balanceDiario.days.sat', { defaultValue: 'SAT' }),
    t('balanceDiario.days.sun', { defaultValue: 'SUN' }),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitulo}>
        {t('balanceDiario.headerTitulo', { defaultValue: 'Daily Balance' })}
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.tarjeta}>
          <Text style={styles.tarjetaTitulo}>
            {t('balanceDiario.tarjetaTitulo', { defaultValue: 'Balance' })}
          </Text>
          <Text style={styles.tarjetaSubtitulo}>
            {t('balanceDiario.tarjetaSubtitulo', { defaultValue: "Today's running total" })}
          </Text>
          <Text style={styles.tarjetaMonto}>$ {totalBalance.toFixed(2)}</Text>

          <View style={styles.chartContainer}>
            <LineChart
              data={datosGrafica.length > 0 ? datosGrafica : [{ value: 0 }]}
              width={chartWidth}
              height={120}
              color="#55C900"
              thickness={3}
              initialSpacing={15}
              endSpacing={15}
              spacing={
                datosGrafica.length > 1
                  ? (chartWidth - 30) / (datosGrafica.length - 1)
                  : chartWidth - 30
              }
              hideDataPoints={false}
              dataPointsColor="#55C900"
              dataPointsRadius={4}
              hideRules
              hideYAxisText
              yAxisThickness={0}
              xAxisThickness={1}
              xAxisColor="#E5E7EB"
              xAxisLabelTextStyle={{
                color: "#9AA5AD",
                fontSize: 11,
                fontWeight: "500",
              }}
              xAxisLabelTexts={diasSemana}
            />
          </View>

          <Text style={styles.seccionTitulo}>
            {t('balanceDiario.transactionsCompleted', {
              count: transacciones.length,
              defaultValue: `${transacciones.length} transactions completed`,
            })}
          </Text>

          {transacciones.map((tItem) => (
            <View style={styles.filaTransaccion} key={tItem.id}>
              <Text style={styles.nombreTransaccion}>{tItem.ticket}</Text>
              <Text style={styles.montoTransaccion}>
                {`$${tItem.monto.toFixed(2)}`}
              </Text>
            </View>
          ))}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation?.navigate("AllTransactions")}
          >
            <Text style={styles.verTodas}>
              {t('balanceDiario.verTodas', { defaultValue: 'View all transactions' })}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021B42",
  },
  headerTitulo: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  tarjeta: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tarjetaTitulo: {
    color: "#021B42",
    fontSize: 20,
    fontWeight: "bold",
  },
  tarjetaSubtitulo: {
    color: "#667085",
    fontSize: 13,
    marginTop: 2,
  },
  tarjetaMonto: {
    color: "#021B42",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 15,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    width: "100%",
  },
  seccionTitulo: {
    color: "#021B42",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  filaTransaccion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },
  nombreTransaccion: {
    color: "#021B42",
    fontSize: 15,
    fontWeight: "500",
  },
  montoTransaccion: {
    color: "#021B42",
    fontSize: 15,
    fontWeight: "700",
  },
  verTodas: {
    color: "#55C900",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    paddingVertical: 5,
  },
});