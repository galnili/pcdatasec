 import { useLearning } from "@/contexts/LearningContext";
 import { WelcomeScreen } from "./WelcomeScreen";
 import { ChapterScreen } from "./ChapterScreen";
 import { QuestionScreen } from "./QuestionScreen";
 import { CompletionScreen } from "./CompletionScreen";
 import { Header } from "./Header";
 
 export function LearningModule() {
   const { currentScreen } = useLearning();
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       
       {currentScreen === 'welcome' && <WelcomeScreen />}
       {currentScreen === 'chapter' && <ChapterScreen />}
       {currentScreen === 'question' && <QuestionScreen />}
       {currentScreen === 'completion' && <CompletionScreen />}
     </div>
   );
 }