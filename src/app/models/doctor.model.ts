import { Patient } from './patient.model';

export interface Doctor extends Patient {
  practiceName: string;
  practiceNo?: string;
}
