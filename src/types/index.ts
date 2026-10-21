export type CropCategory = 'field_grains' | 'legumes' | 'forage' | 'oil_fiber' | 'sugar';

export interface GrowthStage {
  stageName: string;
  durationDays: string;
  description: string;
  irrigationNeeds: string;
  fertilizationNeeds: string;
}

export interface Crop {
  id: string;
  nameAr: string;
  nameEn: string;
  scientificName: string;
  category: CropCategory;
  categoryAr: string;
  summary: string;
  economicImportance: string;
  varieties: string[];
  suitableGovernorates: string[];
  plantingDates: {
    region: string;
    dateRange: string;
  }[];
  soilAndClimate: {
    preferredSoil: string;
    phRange: string;
    salinityTolerance: string;
    optimalTemp: string;
  };
  landPreparation: string[];
  seedingRate: {
    method: string;
    rateKgPerFeddan: string;
  }[];
  growthStages: GrowthStage[];
  irrigationGuide: {
    firstIrrigationMohayah: string;
    totalIrrigationsDelta: string;
    totalIrrigationsUpperEgypt: string;
    criticalStages: string[];
    waterRequirementsM3: string;
  };
  fertilizerGuide: {
    nitrogenUnits: number;
    phosphorusUnits: number;
    potassiumUnits: number;
    scheduleNotes: string[];
  };
  commonProblems: {
    diseases: string[];
    pests: string[];
    weeds: string[];
  };
  harvesting: {
    signs: string[];
    expectedYieldPerFeddan: string;
    postHarvest: string;
  };
  commonMistakes: string[];
  references: {
    source: string;
    organization: string;
    year: string;
  }[];
  reviewDate: string;
  image?: string;
}

export type ProblemType =
  | 'fungal'
  | 'bacterial'
  | 'viral'
  | 'soil_root'
  | 'pest_sucking'
  | 'pest_chewing'
  | 'pest_caterpillar'
  | 'pest_mite'
  | 'nematode'
  | 'weed_grassy'
  | 'weed_broadleaf'
  | 'weed_parasitic';

export interface PesticideRegistration {
  id: string;
  tradeName: string;
  activeIngredient: string;
  concentration: string;
  manufacturer: string;
  targetProblem: string;
  cropsRegistered: string[];
  approvedDose: string;
  applicationMethod: string;
  phiDays: number; // Pre-harvest interval
  reiHours: number; // Re-entry interval
  warnings: string;
  registrationNumber: string;
  registrationSource: string;
  verified: boolean;
  status: 'active' | 'under_review' | 'suspended';
}

export interface PestOrDisease {
  id: string;
  nameAr: string;
  scientificName: string;
  type: ProblemType;
  typeAr: string;
  targetCrops: string[];
  symptoms: string[];
  favorableConditions: string;
  differentialDiagnosis: string;
  economicThreshold: string;
  ipmSteps: {
    prevention: string;
    monitoring: string;
    mechanical: string;
    biological: string;
    chemical: string;
  };
  approvedPesticides: PesticideRegistration[];
  references: string;
}

export interface CommercialFertilizer {
  id: string;
  nameAr: string;
  nitrogenPercent: number;
  phosphorusPercent: number; // P2O5
  potassiumPercent: number; // K2O
  sackWeightKg: number;
  commonInEgypt: boolean;
  notes: string;
}

export interface Governorate {
  id: string;
  nameAr: string;
  region: 'delta' | 'middle_egypt' | 'upper_egypt' | 'desert_reclaimed';
  regionAr: string;
  lat: number;
  lon: number;
  dominantSoil: string;
}

export interface WeatherData {
  governorateName: string;
  currentTemp: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  rainProbability: number;
  et0: number; // Reference evapotranspiration in mm/day
  conditionText: string;
  weatherCode: number;
  lastUpdated: string;
  alerts: string[];
  forecast: {
    day: string;
    tempMax: number;
    tempMin: number;
    condition: string;
  }[];
}

export interface BerseemCut {
  id: string;
  plotId: string;
  varietyType: 'egyptian_mesqawi' | 'egyptian_fahl' | 'alfalfa_hijazi';
  cutNumber: number;
  cutDate: string;
  regrowthDays: number;
  yieldGreenTons: number;
  yieldHayTons?: number;
  irrigationAfterDays: number;
  fertilizerAdded: string;
  notes: string;
}

export interface FarmPlot {
  id: string;
  name: string;
  cropId: string;
  cropName: string;
  variety: string;
  governorate: string;
  areaFeddans: number;
  soilType: string;
  irrigationMethod: 'flood' | 'drip' | 'sprinkler';
  plantingDate: string;
  notes?: string;
}

export interface FarmOperation {
  id: string;
  plotId: string;
  date: string;
  type: 'irrigation' | 'fertilization' | 'pesticide' | 'weeding' | 'harvest' | 'soil_work' | 'other';
  title: string;
  description: string;
  costEgp?: number;
  operator?: string;
}

export interface ReferenceDocument {
  id: string;
  title: string;
  organization: string;
  bulletinNumber?: string;
  year: string;
  category: string;
  cropsCovered: string[];
  summary: string;
  verificationStatus: 'verified' | 'in_review' | 'updated';
  lastReviewed: string;
  url?: string;
}
