import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AdventurePath, useCharacter } from '../contexts/CharacterContext';
import { useTheme } from '../contexts/ThemeContext';
import { StoryCopy } from './screenCopy';

interface StoryLayoutProps {
  copy: StoryCopy;
  onNewGame: () => void;
}

export default function StoryLayout({ copy, onNewGame }: StoryLayoutProps) {
  const { colors, theme } = useTheme();
  const { playerName, characterClass, hp, inventory, choosePath } = useCharacter();
  const [selectedPath, setSelectedPath] = useState<AdventurePath | null>(null);

  const makeChoice = (path: AdventurePath) => {
    choosePath(path);
    setSelectedPath(path);
  };

  const renderButton = (label: string, onPress: () => void, primary = false) => (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: primary ? colors.primary : colors.surface,
          borderColor: colors.primary,
        },
      ]}
    >
      <Text style={[styles.buttonText, { color: primary ? colors.onPrimary : colors.primary }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={styles.icon}>🗺️</Text>
          <Text style={[styles.title, { color: colors.text }]}>{copy.title}</Text>
          <Text style={[styles.greeting, { color: colors.primary }]}>
            {copy.greeting(playerName, hp)}
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>{copy.intro}</Text>

          <View style={[styles.stats, { borderColor: colors.border }]}>
            <Text style={[styles.stat, { color: colors.text }]}>
              {copy.classLabel}: {copy.classes[characterClass]}
            </Text>
            <Text style={[styles.stat, { color: colors.text }]}>
              {copy.hpLabel}: {hp}
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>{copy.inventoryLabel}</Text>
          {inventory.map((item) => (
            <Text key={item} style={[styles.inventoryItem, { color: colors.muted }]}>
              {'• '}{copy.items[item] ?? item}
            </Text>
          ))}

          {selectedPath ? (
            <>
              <Text style={[styles.paragraph, styles.result, { color: colors.text }]}>
                {copy.results[selectedPath]}
              </Text>
              {renderButton(copy.newGameButton, onNewGame, true)}
            </>
          ) : (
            <View style={styles.choices}>
              {renderButton(copy.ruinsChoice, () => makeChoice('ruins'))}
              {renderButton(copy.riverChoice, () => makeChoice('river'))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    borderRadius: 28,
    padding: 26,
    shadowColor: '#182033',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 5,
  },
  icon: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 14,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
  stats: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 12,
    marginBottom: 18,
    gap: 6,
  },
  stat: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  inventoryItem: {
    fontSize: 14,
    lineHeight: 22,
  },
  choices: {
    gap: 10,
    marginTop: 24,
  },
  result: {
    marginTop: 20,
  },
  button: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
