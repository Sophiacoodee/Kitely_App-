import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next'; 

const LANGUAGE_KEY = '@app_language';

const LANGUAGES = [
  {
    id: 'es',
    nameKey: 'spanishName',
    subtextKey: 'spanishSub',
    flag: 'https://flagcdn.com/w160/sv.png',
  },
  {
    id: 'en',
    nameKey: 'englishName',
    subtextKey: 'englishSub',
    flag: 'https://flagcdn.com/w160/us.png',
  },
];

export default function LanguageSelectionScreen({ navigation }) {
  const { i18n, t } = useTranslation(); 
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');

  const handleSelect = async () => {
    await i18n.changeLanguage(selectedLanguage);
    await AsyncStorage.setItem(LANGUAGE_KEY, selectedLanguage);

    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{t('language.title')}</Text>
          <Text style={styles.subtitle}>
            {t('language.subtitle')}
          </Text>
        </View>

        <View style={styles.card}>
          {LANGUAGES.map((lang, index) => {
            const isSelected = selectedLanguage === lang.id;
            const isLast = index === LANGUAGES.length - 1;

            return (
              <TouchableOpacity
                key={lang.id}
                activeOpacity={0.7}
                style={[
                  styles.optionRow,
                  isSelected && styles.selectedOptionRow,
                  !isLast && styles.separator,
                ]}
                onPress={() => setSelectedLanguage(lang.id)}
              >
                <Image
                  source={{ uri: lang.flag }}
                  style={styles.flagImage}
                  resizeMode="cover"
                />
                <View style={styles.languageTextContainer}>
                  <Text style={styles.languageTitle}>
                    {t(`language.${lang.nameKey}`)}
                  </Text>
                  <Text style={styles.languageSubtitle}>
                    {t(`language.${lang.subtextKey}`)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.selectButton}
          activeOpacity={0.8}
          onPress={handleSelect}
        >
          <Text style={styles.selectButtonText}>
            {t('language.apply', { defaultValue: 'Apply' })}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021B42',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5E1',
    lineHeight: 22,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  selectedOptionRow: {
    backgroundColor: '#F1F5F9',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  flagImage: {
    width: 48,
    height: 32,
    borderRadius: 6,
    marginRight: 16,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  languageSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  selectButton: {
    backgroundColor: '#55C900',
    borderRadius: 24,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});