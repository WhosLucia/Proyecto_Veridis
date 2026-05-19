// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import type { ReactNode } from 'react';

export type HeroBanner = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  highlight: string;
};

export type HeroSlide = {
  id: string;
  component: ReactNode;
};

export type LatestPlant = {
  id: string;
  name: string;
  scientificName: string;
  location: string;
  imageUrl: string;
  status: 'healthy' | 'attention' | 'new';
};

export type TodayCareItem = {
  id: string;
  title: string;
  value: string;
  helper: string;
};
