import React, { useState, useEffect } from "react"; // Agregue este nuevo Usestate y UseEffect
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import {doc, getDoc,collection, query, where, getDocs,orderBy,limit} from 'firebase/firestore';//Aca nuevo
import { db } from '../firebase/config'; // Ajuste la ruta según la ubicación de su archivo config.js

const { width } = Dimensions.get('window');

// iconos sgun nombre de categorias para que la cuadricula sepa que dibujar
const iconosPorCategoria = {
  Food: 'shopping-cart',
  Medicine: 'medical-services',
  Education: 'school',
  Entertainment: 'movie',
};

export default function HomeStoreScreen({ route }) {
 // agrego este que tiene que ir antes de la funcion

 const {usuarioId} = route.params;
 const [comercio, setComercio] = useState(null);
 const [saldo, setSaldo] = useState(0);
 const [categorias, setCategorias] = useState([]);
 const [actividadesRecientes, setActividadesRecientes] = useState([]);

 useEffect(() => {
   async function cargarDatos() {
     // Paso 1: encontrar el comercio de este usuaruo

     const refUsuario = doc(db, 'Usuarios', usuarioId);
     const qComercio = query(collection(db, 'comercios'), where('id_usuario', '==', refUsuario));
     const snapComercio = await getDocs(qComercio);
    if (snapComercio.empty) {
     console.log('No business was found for this user.');
      return;
      }

      const comercioEncontrado = {id: snapComercio.docs[0].id, ...snapComercio.docs[0].data()};
      setComercio(comercioEncontrado);
      const refComercio = doc(db, 'comercios', comercioEncontrado.id);

      // Paso 2: calcular el saldo sumando las remesas
      const qTransacciones = query(collection(db, 'transacciones'), where('id_comercio', '==', refComercio));
      const snapTransacciones = await getDocs(qTransacciones);
      let saldoTotal = 0;
      snapTransacciones.forEach((t) => {saldoTotal += t.data().monto_transaccion || 0;});
      setSaldo(saldoTotal);

      // Paso 3: obtener las categorías únicas de las transacciones para la cuadrícula
      const qProductos = query(collection(db, 'productos'), where('id_comercio', '==', refComercio));
      const snapProductos = await getDocs(qProductos);
      const nombresUnicos = [...new Set(snapProductos.docs.map((p) => p.data().categoriaNombre))];
      setCategorias(nombresUnicos);
      
      // al paso 4 traer las ultimas 4 transacciones

      const qActividad = query(collection(db, 'transacciones'), where('id_comercio', '==', refComercio), orderBy('fecha_transaccion', 'desc'), limit(4));
      const snapActividad = await getDocs(qActividad);
      setActividadesRecientes(snapActividad.docs.map((d) => ({id: d.id, ...d.data()})));

      }
      cargarDatos();
      }, [usuarioId]);
      const expirationDate = dayjs().add(30, 'day').format('DD MMM YYYY'); // 

// ACA YA EL RETURN CCON LOS CAMBIOS
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header con botón de menú a la izquierda */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu-outline" size={28} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>

          {/* CAMBIO: antes decía SUPER SELECTOS - ESCALON */}
          <Text style={styles.greeting}>{comercio?.nombre_comercial}</Text>
          <Text style={styles.subGreeting}>Authorized Branch • ID: #{comercio?.id}</Text>
          </View>
        </View>
            

        <View style={styles.balanceCard}>
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>Available Register Balance</Text>
            {/* antes estaba como $250.00 */}
            <Text style={styles.balanceAmount}>${saldo.toFixed(2)}</Text>
            <Text style={styles.expiryText}>Cut-off date: {expirationDate}</Text>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              //usa la ubicacion real del comercio si existe ,sino cae en las coordenadas del ejemplo

              latitude:comercio?.latitud || 13.7013,
              longitude:comercio?.longitude || -89.2244,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            toolbarEnabled={false}
            showsCompass={false}
          >
            <Marker 
              coordinate={{ latitude: comercio?.latitud || 13.7013, longitude: comercio?.longitude || -89.2244 }} 
              title= {comercio?.nombreComercial}
              pinColor="red" 
            />
          </MapView>
        </View>

        <Text style={styles.sectionTitle}>Authorized Categories</Text>
        <View style={styles.gridContainer}>
          {categorias.map((nombreCat) => (
            <TouchableOpacity style={styles.categoryCard} key={nombreCat}>
              <MaterialIcons
                name={iconosPorCategorias[nombreCat] || 'category'}
                size={28}
                color="#021B42"
              />
              <Text style={styles.categoryText}>{nombreCat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Branch Recent Activity</Text>

        
        {actividadesRecientes.map((item) => (
          <View key={item.id} style={styles.activityCard}>
            <View style={styles.activityLeft}>
              <View style={styles.cartIconBg}>
                <MaterialIcons name={iconosPorCategoria[item.categoriaNombre] || 'category'} size={24} color="#55C900" />
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle} numberOfLines={1}>Redirection -{item.categoriaNombre}</Text>
              <Text style={styles.activitySubtitle} numberOfLines={1}>Tiket #{item.id}</Text>
              <Text style = {styles.actividadStatus}>Completed</Text>
              </View>
            </View>
           

            <View style={styles.activityRight}>
              <Text style={styles.activityAmount}>+${item.monto_transaccion.toFixed(2)}</Text>
              <Text style={styles.activityTime} numberOfLines={1}>{item.time}</Text>
              <Text style={styles.activityStatus}>{item.fecha_transaccion?.toDate?.()?.toLocaleString() ?? ' '}</Text>
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021B42',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    padding: 8,
    borderRadius: 12,
    marginRight: 14,
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subGreeting: {
    color: '#a0aab8',
    fontSize: 14,
    marginTop: 2,
  },
  balanceCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  balanceInfo: {
    width: '100%',
  },
  balanceLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#021B42',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#021B42',
    marginVertical: 4,
  },
  expiryText: {
    fontSize: 12,
    color: '#6c757d',
  },
  mapContainer: {
    height: 150,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 15,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    width: (width - 70) / 4,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#021B42',
    marginTop: 6,
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  cartIconBg: {
    backgroundColor: '#EEFAD8',
    padding: 10,
    borderRadius: 12,
  },
  activityDetails: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#021B42',
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 3,
  },
  activityRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  activityAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#55C900',
  },
  activityTime: {
    fontSize: 11,
    color: '#6c757d',
    marginTop: 3,
  },
  activityStatus: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#55C900',
    marginTop: 2,
  },
});