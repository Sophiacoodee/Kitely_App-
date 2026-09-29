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
  Alert,
} from 'react-native';
import {
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

export default function PerfilScreen({ navigation }) {
  const { t } = useTranslation();
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');

  const formatName = (name) => {
    if (!name || name.trim() === '') return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[1]}`;
    }
    return parts[0];
  };

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const savedImage = await AsyncStorage.getItem(
          `@user_profile_image_${currentUser.uid}`
        );
        if (savedImage) {
          setProfileImage(savedImage);
        } else {
          setProfileImage(null);
        }

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

  const saveProfileImage = async (imageUri) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await AsyncStorage.setItem(
          `@user_profile_image_${currentUser.uid}`,
          imageUri
        );
        setProfileImage(imageUri);
      }
    } catch (error) {
      console.error('Error al guardar la imagen de perfil:', error);
      Alert.alert('Error', 'No se pudo guardar la imagen de perfil.');
    }
  };

  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso denegado',
        'Se necesita acceso a la cámara para tomar fotos.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      await saveProfileImage(result.assets[0].uri);
    }
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso denegado',
        'Se necesita acceso a la galería para elegir una foto.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      await saveProfileImage(result.assets[0].uri);
    }
  };

  const handleSelectImageSource = () => {
    Alert.alert(
      'Foto de Perfil',
      '¿De dónde deseas seleccionar la foto?',
      [
        {
          text: 'Tomar Foto',
          onPress: takePhotoWithCamera,
        },
        {
          text: 'Seleccionar de Galería',
          onPress: pickImageFromGallery,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
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
          <View style={styles.avatarContainer}>
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

            <TouchableOpacity
              style={styles.cameraBadge}
              activeOpacity={0.8}
              onPress={handleSelectImageSource}
            >
              <Ionicons name="camera" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.profileTitle}>
              {fullName !== '' ? fullName : t('perfil.defaultName')}
            </Text>
            <Text style={styles.profileSubtitle}>{t('perfil.subtitle')}</Text>
          </View>
        </View>

        <View style={styles.whitePanel}>
          <TouchableOpacity
            style={styles.menuOption}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PersonalInformation')}
          >
            <FontAwesome5 name="user-alt" size={20} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>{t('perfil.personalInfoTitle')}</Text>
              <Text style={styles.optionSubtitle}>{t('perfil.personalInfoSubtitle')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#021B42" />
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.menuOption}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MetodosPagos')}
          >
            <Ionicons name="card" size={22} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>{t('perfil.paymentMethodsTitle')}</Text>
              <Text style={styles.optionSubtitle}>{t('perfil.paymentMethodsSubtitle')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#021B42" />
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.menuOption}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('HelpCenter')}
          >
            <Ionicons name="help-circle" size={24} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>{t('perfil.helpTitle')}</Text>
              <Text style={styles.optionSubtitle}>{t('perfil.helpsSubtitle')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#021B42" />
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.menuOption}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AboutUs')}
          >
            <Ionicons name="information-circle" size={24} color="#021B42" style={styles.icon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>{t('perfil.aboutTitle')}</Text>
              <Text style={styles.optionSubtitle}>{t('perfil.aboutSubtitle')}</Text>
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
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarPlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#D1E7DD',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#14452F',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#52D017',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#021B42',
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