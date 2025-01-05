export interface Participation {
  id: string;
  username: string;
  competitionCode: string;
  numberOfHunts: number;
  score: number;
}

export interface ParticipationRequest {
  competitionId: string;
}
