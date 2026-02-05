 import { useLearning } from "@/contexts/LearningContext";
 import { Progress } from "@/components/ui/progress";
 import { Shield, Star } from "lucide-react";
 import { chapters } from "@/data/learningModuleData";
 
 export function Header() {
   const { currentScreen, currentChapterId, xp, getProgressPercentage, completedChapters } = useLearning();
 
   if (currentScreen === 'welcome') return null;
 
   const progress = getProgressPercentage();
   const currentChapter = chapters.find(c => c.id === currentChapterId);
 
   return (
     <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b z-50">
       <div className="max-w-4xl mx-auto px-4 py-3">
         <div className="flex items-center justify-between mb-2">
           {/* Logo */}
           <div className="flex items-center gap-2">
             <Shield className="w-6 h-6 text-primary" />
             <span className="font-semibold text-foreground">אבטחת מידע</span>
           </div>
 
           {/* XP Display */}
           <div className="flex items-center gap-2 bg-card rounded-full px-4 py-1.5">
             <Star className="w-4 h-4 text-primary fill-primary" />
             <span className="font-bold text-primary font-montserrat">{xp}</span>
             <span className="text-sm text-muted-foreground font-montserrat">XP</span>
           </div>
         </div>
 
         {/* Progress bar */}
         <div className="space-y-1">
           <div className="flex justify-between text-xs text-muted-foreground">
             <span>
               {currentScreen === 'completion' 
                 ? 'הושלם!' 
                 : currentChapter 
                   ? `פרק ${currentChapterId}: ${currentChapter.title}`
                   : ''
               }
             </span>
             <span className="font-montserrat">{completedChapters.size}/{chapters.length}</span>
           </div>
           <Progress value={progress} className="h-2" />
         </div>
       </div>
     </header>
   );
 }