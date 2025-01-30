import axios from 'axios';
import { CreateSuperheroDTO, Superhero } from './../../../backend/types/index';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  getSuperheroes: async (): Promise<Superhero[]> => {
    const response = await axios.get(`${API_URL}/superheroes`);
    return response.data;
  },

  createSuperhero: async (hero: CreateSuperheroDTO): Promise<Superhero> => {
    const response = await axios.post(`${API_URL}/superheroes`, hero);
    return response.data;
  }
};