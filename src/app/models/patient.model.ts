export interface Patient {
  entityNo?: number;
  firstName: string;
  lastName: string;
}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  coords?: {
    lat: number;
    lng: number;
  };
}
