import { v4 as uuidv4 } from 'uuid';
import { identifiableObject } from './identifiableObject';
export interface Item extends identifiableObject {
  source?: string;
  value: number;
  weight: number;
  description: string;
  magic: boolean;
  rarity: string;
  tags?: string[];
  consumable: boolean;
  stockRange: {
    low: number;
    high: number;
  };
}
export interface MagicItem extends Item {
  rarity: string;
  requiresAttunement: boolean;
}
export interface Armor extends Item {
  AC: number;
  stealthDisadvantage: boolean;
  minStrength?: number;
}
export interface Weapon extends Item {
  damage: {
    dice: string;
    average: number;
  };
}

const names = [
  'A mummified goblin hand',
  'A piece of crystal that faintly glows in the moonlight',
  'A gold coin minted in an unknown land',
  "A diary written in a language you don't know",
  'A brass ring that never tarnishes',
  'An old chess piece made from glass',
  'A pair of knucklebone dice, each with a skull symbol on the side that would normally show six pips',
  'A small idol depicting a nightmarish creature that gives you unsettling dreams when you sleep near it',
  'A rope necklace from which dangles four mummified elf fingers',
  'The deed for a parcel of land in a realm unknown to you',
  'A 1-ounce block made from an unknown material',
  'A small cloth doll skewered with needles',
  'A tooth from an unknown beast',
  'An enormous scale, perhaps from a dragon',
  'A bright green feather',
  'An old divination card bearing your likeness',
  'A glass orb filled with moving smoke',
  'A 1-pound egg with a bright red shell',
  'A pipe that blows bubbles',
  'A glass jar containing a weird bit of flesh floating in pickling fluid',
];

export const rarities: string[] = [
  'Common',
  'Uncommon',
  'Rare',
  'Very Rare',
  'Legendary',
  'Artifact',
  'Unique',
];

export const makeRandomItem = (): Item => {
  return {
    uid: uuidv4(),
    name: names[Math.floor(Math.random() * names.length)],
    value: Math.random() * 100,
    weight: Math.random() * 10,
    description: '',
    rarity: rarities[Math.floor(Math.random() * rarities.length)],
    magic: Math.random() > 0.5 ? true : false,
    tags: [],
    consumable: false,
    stockRange: {
      low: Math.random() * 10,
      high: Math.random() * 50,
    },
  };
};
