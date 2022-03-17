export interface RestCountriesResponse {
  name: {
    common: string;
    official: string;
    nativeName: string;
  };
  capital: String[];
  area: number;
  languages: {
    [key: string]: string;
  };
  flags: {
    svg: string;
    png: string;
  };
}
