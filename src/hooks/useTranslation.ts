import { useAtom } from "jotai";

import { localeAtom } from "@/atoms";
import L from "@/i18n/i18n-node";

export const useTranslation = () => {
  return L[useAtom(localeAtom)[0]];
};
