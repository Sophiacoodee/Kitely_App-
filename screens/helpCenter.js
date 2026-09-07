import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

const FAQ_DATA = [
  {
    category: 'Sending a Remittance',
    question: 'How do I send a remittance?',
    answer:
      'Choose "Send", select the category you want to support, choose a beneficiary, enter the amount, and confirm the transaction.',
  },
  {
    question: 'What categories can I choose from?',
    answer:
      'You can choose from categories such as Food, Education, Health, and Home & Essentials.',
  },
  {
    question: 'Can I choose who receives the remittance?',
    answer:
      'Yes. After selecting a category, you can choose one of your registered beneficiaries.',
  },
  {
    question: 'How do I choose the amount?',
    answer:
      'After selecting the category and beneficiary, enter the amount you want to send and review the transaction before confirming it.',
  },
  {
    question: 'Can I change the category after sending?',
    answer:
      'Once a transaction is confirmed and completed, the category cannot be changed. Please review all details before confirming.',
  },
];

export default function HelpScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/help.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>How can we{'\n'}help?</Text>
      </View>

      <View style={styles.cardContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {FAQ_DATA.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              {item.category && (
                <Text style={styles.categoryTitle}>{item.category}</Text>
              )}
              <Text style={styles.questionText}>{item.question}</Text>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
          ))}
        </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 25,
  },
  headerImage: {
    width: 140,
    height: 110,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    marginLeft: 12,
    lineHeight: 30,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },
  faqItem: {
    marginBottom: 22,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 6,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  answerText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});