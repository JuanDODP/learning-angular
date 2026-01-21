export interface AppEnvironment {
  production: boolean;
  companyName: string;
  companyName2: string;
  companySlogan: string;
}

export const environment: AppEnvironment = {
  production: false,
  companyName: 'Gif',
  companyName2: 'App',
  companySlogan: 'Busca y explora los mejores gifs',
};
