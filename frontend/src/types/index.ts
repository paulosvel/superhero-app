export interface Superhero {
    id: string;
    name: string;
    superpower: string;
    humilityScore: number;
  }
  
  export interface CreateSuperheroDTO {
    name: string;
    superpower: string;
    humilityScore: number;
  }