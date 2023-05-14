import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApiResponse,
  Location,
  Info,
  Character,
  Episode,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

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
  

  getEpisodes(page?: number, name? : string): Promise<ApiResponse<Info<Episode[]>>> {
    let url = `${this.baseUrl}/episode`;
  
    if (page) {
      url += `?page=${page}`;
    }

    if (name) {
      const encodedName = encodeURIComponent(name);
      url += page ? `&name=${encodedName}` : `?name=${encodedName}`;
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
  

  getLocation(id: number): Promise<ApiResponse<Info<Location>>> {
    const url = `${this.baseUrl}/location/${id}`;

    return this.http
      .get<ApiResponse<Info<Location>>>(url)
      .toPromise()
      .then(
        (response) =>
          response ||
          ({
            status: 200,
            statusMessage: '',
            data: {
              info: { count: 0, pages: 0, next: null, prev: null },
              results: {},
            },
          } as ApiResponse<Info<Location>>)
      );
  }
}
