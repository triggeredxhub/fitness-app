// types/fitnessData.ts
export type FitnessData = {
  gender?: "male" | "female";
  workoutsPerWeek?: number;
  height?: number;
  weight?: number;
  dob?: string; // or Date
  goal?: "lose" | "maintain" | "gain";
  desiredWeight?: number;
};
