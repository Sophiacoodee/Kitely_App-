import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import {
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default function PerfilScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');

  // Formatea el nombre completo para conservar solo un nombre y un apellido
  const formatName = (name) => {
    if (!name || name.trim() === '') return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[1]}`;
    }
    return parts[0];
  };

  // Se ejecuta cada vez que el usuario regresa a esta pantalla
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // 1. Cargar imagen de perfil guardada con el UID único
        const savedImage = await AsyncStorage.getItem(
          `@user_profile_image_${currentUser.uid}`
        );
        if (savedImage) {
          setProfileImage(savedImage);
        } else {
          setProfileImage(null);
        }

        // 2. Cargar nombre del usuario desde Firestore y formatear
        const docRef = doc(db, 'Usuarios', currentUser.uid);
        const docSnap = await getDoc(docRef);

        let rawName = '';
        if (docSnap.exists()) {
          rawName = docSnap.data().nombre || currentUser.displayName || '';
        } else if (currentUser.displayName) {
          rawName = currentUser.displayName;
        }

        setFullName(formatName(rawName));
      }
    } catch (error) {
      console.error('Error al cargar datos del perfil:', error);
    }
  };

  const getInitials = (name) => {
    if (!name || name.trim() === '') return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topHeader}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{getInitials(fullName)}</Text>
            </View>
          )}

          <View style={styles.headerTextContainer}>
            <Text style={styles.profileTitle}>
              {fullName !== '' ? fullName : 'Profile'}
            </Text>
            <Text style={styles.profileSubtitle}>Manage your account</Text>
          </View>
        </View>

        <View style={styles.whitePanel}>
          {/* PERSONAL INFORMATION */}
          <TouchableOpacity
            style={styles.menuOption}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PersonalInformation')}
          >
            <FontAwesome5 name="user-alt" size={20} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Personal information</Text>
              <Text style={styles.optionSubtitle}>View your information</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#021B42" />
          </TouchableOpacity>
          <View style={styles.separator} />

          {/* PAYMENT METHODS */}
          <TouchableOpacity
            style={styles.menuOption}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MetodosPagos')}
          >
            <Ionicons name="card" size={22} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Payment methods</Text>
              <Text style={styles.optionSubtitle}>Manage your cards and accounts</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#021B42" />
          </TouchableOpacity>
          <View style={styles.separator} />

          {/* HELP CENTER */}
          <TouchableOpacity
            style={styles.menuOption}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('HelpCenter')}
          >
            <Ionicons name="help-circle" size={24} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Help</Text>
              <Text style={styles.optionSubtitle}>Go to support</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#021B42" />
          </TouchableOpacity>
          <View style={styles.separator} />

          {/* ABOUT KITELY */}
          <TouchableOpacity
            style={styles.menuOption}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AboutUs')}
          >
            <Ionicons name="information-circle" size={24} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>About Kitely</Text>
              <Text style={styles.optionSubtitle}>App version 1.00</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#021B42" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021B42',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topHeader: {
    backgroundColor: '#021B42',
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 16,
  },
  avatarPlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#D1E7DD',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#14452F',
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  whitePanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 30,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  icon: {
    width: 32,
    textAlign: 'center',
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#021B42',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#8A94A6',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 2,
  },
});