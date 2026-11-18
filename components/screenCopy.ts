import { AdventurePath, CharacterClass } from '../contexts/CharacterContext';

export interface WelcomeCopy {
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  classLabel: string;
  classes: Record<CharacterClass, string>;
  languageLabel: string;
  themeLabel: string;
  lightTheme: string;
  darkTheme: string;
  startButton: string;
  nameRequired: string;
  languageError: string;
}

export interface StoryCopy {
  title: string;
  intro: string;
  greeting: (playerName: string, hp: number) => string;
  classLabel: string;
  classes: Record<CharacterClass, string>;
  hpLabel: string;
  inventoryLabel: string;
  items: Record<string, string>;
  ruinsChoice: string;
  riverChoice: string;
  results: Record<AdventurePath, string>;
  newGameButton: string;
}
