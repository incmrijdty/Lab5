import React from 'react';
import { AdventurePath, CharacterClass } from './contexts/CharacterContext';
import StoryLayout from './components/StoryLayout';
import { useGameTranslation } from './hooks/useGameTranslation';
import { StoryCopy } from './components/screenCopy';

interface GameScreenProps {
  onNewGame: () => void;
}

export default function GameScreen({ onNewGame }: GameScreenProps) {
  const translate = useGameTranslation();
  const classes: Record<CharacterClass, string> = {
    warrior: translate('game.classes.warrior'),
    mage: translate('game.classes.mage'),
    ranger: translate('game.classes.ranger'),
  };
  const results: Record<AdventurePath, string> = {
    ruins: translate('game.results.ruins'),
    river: translate('game.results.river'),
  };
  const copy: StoryCopy = {
    title: translate('game.title'),
    intro: translate('game.intro'),
    greeting: (playerName, hp) => translate('game.greeting', { playerName, hp }),
    classLabel: translate('game.classLabel'),
    classes,
    hpLabel: translate('game.hpLabel'),
    inventoryLabel: translate('game.inventoryLabel'),
    items: {
      healthPotion: translate('game.items.healthPotion'),
      ironSword: translate('game.items.ironSword'),
      woodenShield: translate('game.items.woodenShield'),
      woodenStaff: translate('game.items.woodenStaff'),
      spellbook: translate('game.items.spellbook'),
      manaPotion: translate('game.items.manaPotion'),
      shortBow: translate('game.items.shortBow'),
      arrows: translate('game.items.arrows'),
      fieldKit: translate('game.items.fieldKit'),
      silverKey: translate('game.items.silverKey'),
      riverHerb: translate('game.items.riverHerb'),
    },
    ruinsChoice: translate('game.ruinsChoice'),
    riverChoice: translate('game.riverChoice'),
    results,
    newGameButton: translate('game.newGameButton'),
  };

  return <StoryLayout copy={copy} onNewGame={onNewGame} />;
}
