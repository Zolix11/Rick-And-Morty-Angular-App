import { Character } from "./interfaces";

export interface OnScreenEpisode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: Character[];
    url: string;
    created: string;
}
  
export interface OnScreenLocations {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: Character[];
    url: string;
    created: string;
  }
  