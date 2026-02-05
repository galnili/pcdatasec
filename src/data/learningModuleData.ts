 // Learning Module Data - Re-export from organized chapter files
 // This file maintains backward compatibility while using the new modular structure
 
 export { chapters, additionalQuestions, badges } from './chapters';
 export type { Chapter, Question, Badge, ContentSection, FlipCard, TableData, FlowchartStep, DominoItem, ComparisonItem, ScenarioScript, PhishingExample } from './types';