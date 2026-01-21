export interface AppEnvironment {
  production: boolean;
  companyName: string;
  companyName2: string;
  companySlogan: string;
  apiKey: string;
  giphyUrl: string;
}

export const environment: AppEnvironment = {
  production: false,
  companyName: 'Gif',
  companyName2: 'App',
  companySlogan: 'Busca y explora los mejores gifs',
  // APIKEY
  apiKey: 'Xyam6sUydECzyK3fwE6uCQQIWwOiyuka',
  giphyUrl: 'https://api.giphy.com/v1',
};
