export const sourcesValues = ['ElPais', 'ElMundo', 'Custom'] as const

// Convert Sources to Type
export type Sources = typeof sourcesValues[number]

export interface IFeed {
  title: string;
  subTitle: string;
  url: string;
  author: string;
  source: Sources;
  publishedAt: Date;
}
