// jest.config.js
import type { InitialOptionsTsJest } from "ts-jest";
import { defaults as tsjPreset } from "ts-jest/presets";

const config: InitialOptionsTsJest = {
  transform: {
    ...tsjPreset.transform,
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/mocks/fileMock.js",
  },
};

export default config;
