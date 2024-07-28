import { en } from "./en";
import { pt } from "./pt";

const language = "en";

export const getConstants = () => {
  return {
    en: en,
    pt: pt,
  }[language];
};
