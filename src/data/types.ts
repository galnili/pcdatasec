 // Learning Module Types
 
 export interface FlipCard {
   front: string;
   back: string;
   icon?: string;
   color?: string;
 }
 
 export interface TableRow {
   [key: string]: string;
 }
 
 export interface TableData {
   headers: string[];
   rows: TableRow[];
   expandableRows?: boolean;
 }
 
 export interface FlowchartStep {
   id: string;
   title: string;
   description: string;
   icon?: string;
 }
 
 export interface WarningItem {
   title: string;
   description: string;
   icon?: string;
 }
 
 export interface ComparisonItem {
   category: string;
   allowed?: string;
   forbidden?: string;
   special?: string;
 }
 
 export interface DominoItem {
   id: string;
   title: string;
   description: string;
   impact: 'customer' | 'organization' | 'employee';
 }
 
 export interface ScenarioScript {
   situation: string;
   response: string;
 }
 
 export interface PhishingExample {
   id: string;
   type: 'email' | 'sms' | 'whatsapp';
   sender: string;
   subject?: string;
   content: string;
   isPhishing: boolean;
   redFlags?: string[];
 }
 
 export interface RedFlagScenario {
   id: string;
   scenario: string;
   flags: {
     text: string;
     isRedFlag: boolean;
     explanation: string;
   }[];
 }
 
 export interface ContentSection {
   type: 'text' | 'table' | 'cards' | 'flowchart' | 'comparison' | 'warning' | 'tip' | 'scenario' | 'domino' | 'redflags' | 'phishing' | 'scripts' | 'highlight';
   title?: string;
   content: string | FlipCard[] | TableData | FlowchartStep[] | WarningItem[] | ComparisonItem[] | DominoItem[] | ScenarioScript[] | PhishingExample[] | RedFlagScenario;
 }
 
 export interface Question {
   id: string;
   scenario: string;
   customerName: string;
   question: string;
   options: {
     id: string;
     text: string;
     isCorrect: boolean;
   }[];
   explanation?: string;
 }
 
 export interface Chapter {
   id: number;
   title: string;
   subtitle?: string;
   sections: ContentSection[];
   keyTakeaway?: string;
   interactionType: 'flipCards' | 'matching' | 'infographic' | 'dragDrop' | 'table' | 'flowchart' | 'checklist' | 'findFlags' | 'domino' | 'phishing' | 'scripts';
   question?: Question;
 }
 
 export interface Badge {
   id: string;
   name: string;
   icon: string;
   description: string;
   chapter: number | null;
 }