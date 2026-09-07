import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  useWindowDimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactUsScreen() {
  const { height } = useWindowDimensions();

  const handleCall = () => {
    Linking.openURL('tel:77863408');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:Kitely@gmail.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerContainer, { minHeight: height * 0.22 }]}>
        <Text style={styles.headerTitle}>Contact us</Text>
        <Image
          source={require('../assets/kitelyBR.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.contactItem}
            activeOpacity={0.7}
            onPress={handleCall}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="call" size={32} color="#01122C" />
            </View>
            <Text style={styles.contactText}>7786-3408</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactItem}
            activeOpacity={0.7}
            onPress={handleEmail}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="mail" size={32} color="#01122C" />
            </View>
            <Text style={styles.contactText}>Kitely@gmail.com</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021B42',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  logo: {
    width: 160,
    height: 50,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contactItem: {
    alignItems: 'center',
    marginBottom: 36,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  contactText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#01122C',
  },
});