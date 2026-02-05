 import React, { createContext, useContext, useState, ReactNode } from 'react';
 import { chapters, badges, additionalQuestions } from '@/data/learningModuleData';
 
 interface Badge {
   id: string;
   name: string;
   icon: string;
   description: string;
   earned: boolean;
 }
 
 interface LearningState {
   currentScreen: 'welcome' | 'chapter' | 'question' | 'completion';
   currentChapterId: number;
   currentQuestionIndex: number; // 0 = first question of chapter, 1 = second (if exists)
   xp: number;
   correctAnswers: number;
   totalAnswers: number;
   answeredQuestions: Set<string>;
   earnedBadges: Set<string>;
   completedChapters: Set<number>;
 }
 
 interface LearningContextType extends LearningState {
   startLearning: () => void;
   goToChapter: (chapterId: number) => void;
   goToQuestion: () => void;
   answerQuestion: (questionId: string, isCorrect: boolean) => void;
   nextChapter: () => void;
   previousChapter: () => void;
   completeModule: () => void;
   restartModule: () => void;
   getTotalQuestions: () => number;
   getProgressPercentage: () => number;
   getBadges: () => Badge[];
   getCurrentChapter: () => typeof chapters[0] | undefined;
   hasSecondQuestion: () => boolean;
   goToSecondQuestion: () => void;
 }
 
 const LearningContext = createContext<LearningContextType | undefined>(undefined);
 
 export function LearningProvider({ children }: { children: ReactNode }) {
   const [state, setState] = useState<LearningState>({
     currentScreen: 'welcome',
     currentChapterId: 1,
     currentQuestionIndex: 0,
     xp: 0,
     correctAnswers: 0,
     totalAnswers: 0,
     answeredQuestions: new Set(),
     earnedBadges: new Set(),
     completedChapters: new Set(),
   });
 
   const startLearning = () => {
     setState(prev => ({ ...prev, currentScreen: 'chapter', currentChapterId: 1 }));
   };
 
   const goToChapter = (chapterId: number) => {
     setState(prev => ({ 
       ...prev, 
       currentScreen: 'chapter', 
       currentChapterId: chapterId,
       currentQuestionIndex: 0 
     }));
   };
 
   const goToQuestion = () => {
     setState(prev => ({ ...prev, currentScreen: 'question', currentQuestionIndex: 0 }));
   };
 
   const hasSecondQuestion = () => {
     return additionalQuestions[state.currentChapterId] !== undefined;
   };
 
   const goToSecondQuestion = () => {
     setState(prev => ({ ...prev, currentQuestionIndex: 1 }));
   };
 
   const answerQuestion = (questionId: string, isCorrect: boolean) => {
     setState(prev => {
       const newAnsweredQuestions = new Set(prev.answeredQuestions);
       newAnsweredQuestions.add(questionId);
 
       const newEarnedBadges = new Set(prev.earnedBadges);
 
       // Check for badge unlocks
       if (prev.currentChapterId === 1 && isCorrect) {
         newEarnedBadges.add('secrets');
       }
       if (prev.currentChapterId === 4 && isCorrect) {
         newEarnedBadges.add('threats');
       }
       if (prev.currentChapterId === 10 && isCorrect) {
         newEarnedBadges.add('responder');
       }
 
       return {
         ...prev,
         xp: isCorrect ? prev.xp + 10 : prev.xp,
         correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
         totalAnswers: prev.totalAnswers + 1,
         answeredQuestions: newAnsweredQuestions,
         earnedBadges: newEarnedBadges,
       };
     });
   };
 
   const nextChapter = () => {
     setState(prev => {
       const newCompletedChapters = new Set(prev.completedChapters);
       newCompletedChapters.add(prev.currentChapterId);
 
       if (prev.currentChapterId >= chapters.length) {
         // Check for expert badge (90%+)
         const newEarnedBadges = new Set(prev.earnedBadges);
         const percentage = (prev.correctAnswers / Math.max(prev.totalAnswers, 1)) * 100;
         if (percentage >= 90) {
           newEarnedBadges.add('expert');
         }
 
         return { 
           ...prev, 
           currentScreen: 'completion',
           completedChapters: newCompletedChapters,
           earnedBadges: newEarnedBadges
         };
       }
 
       return {
         ...prev,
         currentChapterId: prev.currentChapterId + 1,
         currentScreen: 'chapter',
         currentQuestionIndex: 0,
         completedChapters: newCompletedChapters,
       };
     });
   };
 
   const previousChapter = () => {
     setState(prev => ({
       ...prev,
       currentChapterId: Math.max(1, prev.currentChapterId - 1),
       currentScreen: 'chapter',
       currentQuestionIndex: 0,
     }));
   };
 
   const completeModule = () => {
     setState(prev => {
       const newEarnedBadges = new Set(prev.earnedBadges);
       const percentage = (prev.correctAnswers / Math.max(prev.totalAnswers, 1)) * 100;
       if (percentage >= 90) {
         newEarnedBadges.add('expert');
       }
       return { ...prev, currentScreen: 'completion', earnedBadges: newEarnedBadges };
     });
   };
 
   const restartModule = () => {
     setState({
       currentScreen: 'welcome',
       currentChapterId: 1,
       currentQuestionIndex: 0,
       xp: 0,
       correctAnswers: 0,
       totalAnswers: 0,
       answeredQuestions: new Set(),
       earnedBadges: new Set(),
       completedChapters: new Set(),
     });
   };
 
   const getTotalQuestions = () => {
     let count = 0;
     chapters.forEach(chapter => {
       if (chapter.question) count++;
       if (additionalQuestions[chapter.id]) count++;
     });
     return count;
   };
 
   const getProgressPercentage = () => {
     return (state.completedChapters.size / chapters.length) * 100;
   };
 
   const getBadges = (): Badge[] => {
     return badges.map(badge => ({
       ...badge,
       earned: state.earnedBadges.has(badge.id)
     }));
   };
 
   const getCurrentChapter = () => {
     return chapters.find(c => c.id === state.currentChapterId);
   };
 
   return (
     <LearningContext.Provider
       value={{
         ...state,
         startLearning,
         goToChapter,
         goToQuestion,
         answerQuestion,
         nextChapter,
         previousChapter,
         completeModule,
         restartModule,
         getTotalQuestions,
         getProgressPercentage,
         getBadges,
         getCurrentChapter,
         hasSecondQuestion,
         goToSecondQuestion,
       }}
     >
       {children}
     </LearningContext.Provider>
   );
 }
 
 export function useLearning() {
   const context = useContext(LearningContext);
   if (!context) {
     throw new Error('useLearning must be used within a LearningProvider');
   }
   return context;
 }