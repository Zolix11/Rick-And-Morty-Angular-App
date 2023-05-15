import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApiResponse,
  Location,
  Info,
  Character,
  Episode,
} from '../interfaces/interfaces';

/**
 * Service for interacting with the Rick and Morty API.
 */
@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of locations from the API.
   * @param page The page number to retrieve (optional).
   * @returns A Promise resolving to an ApiResponse containing location information.
   */
  getLocations(page?: number): Promise<ApiResponse<Info<Location[]>>> {
    let url = `${this.baseUrl}/location`;

    if (page) {
      url += `?page=${page}`;
    }

    return this.http
      .get<Info<Location[]>>(url)
      .toPromise()
      .then((response: Info<Location[]> | undefined) => {
        if (!response) {
          throw new Error('Invalid response');
        }
        const apiResponse: ApiResponse<Info<Location[]>> = {
          status: 200,
          statusMessage: 'OK',
          data: response,
        };

        return apiResponse;
      })
      .catch((error: any) => {
        // Handle error
        throw new Error('Failed to fetch locations');
      });
  }

  /**
   * Retrieves a list of characters from the API.
   * @param page The page number to retrieve (optional).
   * @param name The name of the character to filter by (optional).
   * @returns A Promise resolving to an ApiResponse containing character information.
   */
  getCharacters(
    page?: number,
    name?: string
  ): Promise<ApiResponse<Info<Character[]>>> {
    let url = `${this.baseUrl}/character`;

    if (page) {
      url += `?page=${page}`;
    }

    if (name) {
      const encodedName = encodeURIComponent(name);
      url += page ? `&name=${encodedName}` : `?name=${encodedName}`;
    }
    return this.http
      .get<Info<Character[]>>(url)
      .toPromise()
      .then((response: Info<Character[]> | undefined) => {
        if (!response) {
          throw new Error('Invalid response');
        }
        const apiResponse: ApiResponse<Info<Character[]>> = {
          status: 200,
          statusMessage: 'OK',
          data: response,
        };

        return apiResponse;
      })
      .catch((error: any) => {
        throw new Error('Failed to fetch characters');
      });
  }

  /**
   * Retrieves information about a specific character from the API.
   * @param id The ID of the character.
   * @returns A Promise resolving to an ApiResponse containing character information.
   */
  getCharacter(id: number): Promise<ApiResponse<Character>> {
    const url = `${this.baseUrl}/character/${id}`;
    return this.http
      .get<Character>(url)
      .toPromise()
      .then((character) => {
        if (character === undefined) {
          throw new Error('Character not found');
        }
        const response: ApiResponse<Character> = {
          status: 200,
          statusMessage: 'Success',
          data: character,
        };
        return response;
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
        throw error;
      });
  }

  /**
   * Retrieves information about a specific characters from the API.
   * @param ids The IDs of the characters.
   * @returns A Promise resolving to an ApiResponse containing characters information.
   */
  getMultipleCharacters(ids: number[]): Promise<ApiResponse<Character[]>> {
    const url = `${this.baseUrl}/character/${ids.join(',')}`;
    return this.http
      .get<Character[]>(url)
      .toPromise()
      .then((characters) => {
        const response: ApiResponse<Character[]> = {
          status: 200,
          statusMessage: 'Success',
          data: characters || [],
        };
        return response;
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
        throw error;
      });
  }

  /**
 * Retrieves a list of episodes from the API.
 * @param page The page number to retrieve (optional).
 * @param name The name of the episode to filter by (optional).
 * @returns A Promise resolving to an ApiResponse containing episode information.
 */
getEpisodes(
  page?: number,
  name?: string
): Promise<ApiResponse<Info<Episode[]>>> {
  let url = `${this.baseUrl}/episode/`;

  if (page) {
    url += `?page=${page}`;
  }

  if (name) {
    const encodedName = encodeURIComponent(name);
    url += page ? `&episode=${encodedName}` : `?episode=${encodedName}`;
  }

  return this.http
    .get<Info<Episode[]>>(url)
    .toPromise()
    .then((response: Info<Episode[]> | undefined) => {
      if (!response) {
        throw new Error('Invalid response');
      }
      const apiResponse: ApiResponse<Info<Episode[]>> = {
        status: 200,
        statusMessage: 'OK',
        data: response,
      };

      return apiResponse;
    })
    .catch((error: any) => {
      // Handle error
      throw new Error('Failed to fetch episodes');
    });
}

}
