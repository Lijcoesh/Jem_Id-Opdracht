export enum StandingPlace {
  SUNNY = "SUNNY",
  HALF_SHADOW = "HALF_SHADOW",
  SHADOW = "SHADOW",
}

export enum WateringNeeds {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  height: number;
  diameter: number;
  standingPlace: StandingPlace;
  wateringNeeds: WateringNeeds;
  photoUrl: string;
}
