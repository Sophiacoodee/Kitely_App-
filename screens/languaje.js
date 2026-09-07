import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

const LANGUAGES = [
  {
    id: 'es',
    name: 'Spanish',
    subtext: 'Spanish (El Salvador)',
    flag: 'https://flagcdn.com/w160/sv.png',
  },
  {
    id: 'en',
    name: 'English',
    subtext: 'English (United States)',
    flag: 'https://flagcdn.com/w160/us.png',
  },
];

export default function LanguageSelectionScreen({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleSelect = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Language</Text>
          <Text style={styles.subtitle}>
            The language you choose{'\n'}will be used throughout the app
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
                  <Text style={styles.languageTitle}>{lang.name}</Text>
                  <Text style={styles.languageSubtitle}>{lang.subtext}</Text>
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
          <Text style={styles.selectButtonText}>Select</Text>
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