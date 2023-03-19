import { Coutry } from "./coutry";

export interface CoutryDetails extends Coutry {
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: { name: string }[];
  languages: { name: string }[];
  borders: string[];
}
