export interface Competition {
  id: string;
  code: string;
  location: string;
  date: string;
  speciesType: string;
  minParticipants: number;
  maxParticipants: number;
  openRegistration: boolean;
  numberOfParticipants?: number;
}

export interface CreateCompetitionVM {
  location: string;
  date: string;
  minParticipants: number;
  maxParticipants: number;
  speciesType: 'BIRD' | 'BIG_GAME' | 'SEA';
}
