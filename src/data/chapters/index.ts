 // Central export for all chapter data
 import { chapters1to5 } from './chapter1-5';
 import { chapters6to10 } from './chapter6-10';
 import { chapters11to14 } from './chapter11-14';
 import { additionalQuestions } from './additionalQuestions';
 import { badges } from './badges';
 
 // Combine all chapters
 export const chapters = [
   ...chapters1to5,
   ...chapters6to10,
   ...chapters11to14
 ];
 
 export { additionalQuestions, badges };
 
 // Re-export types
 export * from '../types';