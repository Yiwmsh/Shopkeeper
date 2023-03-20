import { identifiableObject } from './identifiableObject';

export interface ItemSet extends identifiableObject {
  description: string;
  itemIDs: string[];
}
