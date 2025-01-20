export interface Participation {
  id: string;
  username: string;
  competitionCode: string;
  numberOfHunts: number;
  score: number;
}
export interface ParticipationResultDTO {
  competitionCode: string;
  speciesType: string;
  score: number;
}

export interface ParticipationRequest {
  competitionId: string;
}
