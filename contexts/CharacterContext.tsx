import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type CharacterClass = 'warrior' | 'mage' | 'ranger';
export type AdventurePath = 'ruins' | 'river';

interface StartingLoadout {
  hp: number;
  inventory: readonly string[];
}

const startingLoadouts: Record<CharacterClass, StartingLoadout> = {
  warrior: {
    hp: 30,
    inventory: ['ironSword', 'woodenShield', 'healthPotion'],
  },
  mage: {
    hp: 18,
    inventory: ['woodenStaff', 'spellbook', 'manaPotion'],
  },
  ranger: {
    hp: 24,
    inventory: ['shortBow', 'arrows', 'fieldKit'],
  },
};

interface CharacterContextValue {
  draftName: string;
  setDraftName: (name: string) => void;
  draftClass: CharacterClass;
  setDraftClass: (characterClass: CharacterClass) => void;
  playerName: string;
  characterClass: CharacterClass;
  hp: number;
  inventory: string[];
  startCharacter: (name: string, characterClass: CharacterClass) => void;
  choosePath: (path: AdventurePath) => void;
}

const CharacterContext = createContext<CharacterContextValue | undefined>(undefined);

export function CharacterProvider({ children }: PropsWithChildren) {
  const [draftName, setDraftName] = useState('');
  const [draftClass, setDraftClass] = useState<CharacterClass>('warrior');
  const [playerName, setPlayerName] = useState('');
  const [characterClass, setCharacterClass] = useState<CharacterClass>('warrior');
  const [hp, setHp] = useState(20);
  const [inventory, setInventory] = useState<string[]>([]);

  const startCharacter = useCallback((name: string, nextClass: CharacterClass) => {
    const loadout = startingLoadouts[nextClass];
    setPlayerName(name.trim());
    setCharacterClass(nextClass);
    setHp(loadout.hp);
    setInventory([...loadout.inventory]);
  }, []);

  const choosePath = useCallback((path: AdventurePath) => {
    if (path === 'ruins') {
      setInventory((items) => (items.includes('silverKey') ? items : [...items, 'silverKey']));
      return;
    }

    setHp((currentHp) => Math.max(0, currentHp - 3));
    setInventory((items) => (items.includes('riverHerb') ? items : [...items, 'riverHerb']));
  }, []);

  const value = useMemo(
    () => ({
      draftName,
      setDraftName,
      draftClass,
      setDraftClass,
      playerName,
      characterClass,
      hp,
      inventory,
      startCharacter,
      choosePath,
    }),
    [
      draftName,
      draftClass,
      playerName,
      characterClass,
      hp,
      inventory,
      startCharacter,
      choosePath,
    ],
  );

  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
}
