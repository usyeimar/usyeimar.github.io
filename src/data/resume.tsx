import { DATA_ES } from "@/data/resume-es";
import { DATA_EN } from "@/data/resume-en";

export const getDictionary = async (lang: string) => {
  if (lang === "en") {
    return DATA_EN;
  }
  return DATA_ES;
};

// Keep for backward compatibility until refactor is complete
export const DATA = DATA_ES;
