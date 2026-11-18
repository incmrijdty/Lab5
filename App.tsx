import React, { useState } from 'react';
import './i18n';
import GameScreen from './gameScreen';
import WelcomeScreen from './screen';
import { CharacterProvider, useCharacter } from './contexts/CharacterContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

function GameFlow() {
  const [page, setPage] = useState<'welcome' | 'story'>('welcome');
  const { draftName, draftClass, startCharacter } = useCharacter();

  const startAdventure = () => {
    startCharacter(draftName, draftClass);
    setPage('story');
  };
  const returnToWelcome = () => setPage('welcome');

  return page === 'welcome' ? (
    <WelcomeScreen onStart={startAdventure} />
  ) : (
    <GameScreen onNewGame={returnToWelcome} />
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CharacterProvider>
          <GameFlow />
        </CharacterProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
