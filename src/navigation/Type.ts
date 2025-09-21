import { FitnessData } from "./FitnessData";

export type RootStackParamList = {
  Welcome: undefined;
  Gender: {fitnessData: FitnessData};
  Workout: { fitnessData: FitnessData };
  HeightWeight: { fitnessData: FitnessData };
  DOB: { fitnessData: FitnessData };
  Goal: { fitnessData: FitnessData };
  DesiredWeight: { fitnessData: FitnessData };
};
