 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { cn } from "@/lib/utils";
 import { AlertTriangle, CheckCircle, Flag, Eye } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 interface RedFlag {
   text: string;
   isRedFlag: boolean;
   explanation: string;
 }
 
 interface RedFlagGameProps {
   scenario: string;
   flags: RedFlag[];
   title?: string;
   onComplete?: (score: number) => void;
 }
 
 export function RedFlagGame({ scenario, flags, title, onComplete }: RedFlagGameProps) {
   const [selectedFlags, setSelectedFlags] = useState<Set<number>>(new Set());
   const [showResults, setShowResults] = useState(false);
 
   const toggleFlag = (index: number) => {
     if (showResults) return;
     setSelectedFlags(prev => {
       const newSet = new Set(prev);
       if (newSet.has(index)) {
         newSet.delete(index);
       } else {
         newSet.add(index);
       }
       return newSet;
     });
   };
 
   const checkAnswers = () => {
     setShowResults(true);
     const correctSelections = flags.filter((flag, index) => {
       const isSelected = selectedFlags.has(index);
       return (flag.isRedFlag && isSelected) || (!flag.isRedFlag && !isSelected);
     }).length;
     onComplete?.(correctSelections);
   };
 
   const resetGame = () => {
     setSelectedFlags(new Set());
     setShowResults(false);
   };
 
   const correctCount = showResults
     ? flags.filter((flag, index) => {
         const isSelected = selectedFlags.has(index);
         return (flag.isRedFlag && isSelected) || (!flag.isRedFlag && !isSelected);
       }).length
     : 0;
 
   const actualRedFlags = flags.filter(f => f.isRedFlag).length;
 
   return (
     <div className="w-full">
       {title && (
         <h3 className="font-bold text-foreground mb-4">{title}</h3>
       )}
 
       {/* Instructions */}
       <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4">
         <div className="flex items-center gap-2 text-amber-600">
           <Eye className="w-4 h-4" />
           <span className="text-sm font-medium">לחץ/י על כל המשפטים שמהווים "דגל אדום"</span>
         </div>
       </div>
 
       {/* Scenario */}
       <div className="bg-card border border-border rounded-xl p-4 mb-4">
         <p className="text-foreground whitespace-pre-line leading-relaxed">
           {scenario}
         </p>
       </div>
 
       {/* Flags */}
       <div className="space-y-2 mb-4">
         {flags.map((flag, index) => {
           const isSelected = selectedFlags.has(index);
           const isCorrectSelection = showResults && flag.isRedFlag && isSelected;
           const isWrongSelection = showResults && !flag.isRedFlag && isSelected;
           const isMissedFlag = showResults && flag.isRedFlag && !isSelected;
 
           return (
             <motion.div
               key={index}
               initial={{ opacity: 0, x: 10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: index * 0.05 }}
             >
               <button
                 onClick={() => toggleFlag(index)}
                 disabled={showResults}
                 className={cn(
                   "w-full text-right p-3 rounded-lg border-2 transition-all flex items-start gap-3",
                   !showResults && !isSelected && "border-border bg-background hover:border-primary/50",
                   !showResults && isSelected && "border-primary bg-primary/10",
                   isCorrectSelection && "border-success bg-success/10",
                   isWrongSelection && "border-destructive bg-destructive/10",
                   isMissedFlag && "border-amber-500 bg-amber-500/10",
                   showResults && !flag.isRedFlag && !isSelected && "border-border bg-background opacity-60"
                 )}
               >
                 <div className={cn(
                   "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                   !showResults && !isSelected && "bg-muted",
                   !showResults && isSelected && "bg-primary text-primary-foreground",
                   isCorrectSelection && "bg-success text-success-foreground",
                   isWrongSelection && "bg-destructive text-destructive-foreground",
                   isMissedFlag && "bg-amber-500 text-white"
                 )}>
                   {showResults ? (
                     isCorrectSelection ? <CheckCircle className="w-4 h-4" /> :
                     isWrongSelection ? <AlertTriangle className="w-4 h-4" /> :
                     isMissedFlag ? <Flag className="w-4 h-4" /> :
                     null
                   ) : (
                     isSelected && <Flag className="w-3 h-3" />
                   )}
                 </div>
                 <div className="flex-1">
                   <span className="text-foreground text-sm">{flag.text}</span>
                   
                   <AnimatePresence>
                     {showResults && (isCorrectSelection || isMissedFlag || isWrongSelection) && (
                       <motion.p
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: "auto" }}
                         className="text-xs text-muted-foreground mt-1"
                       >
                         {flag.explanation}
                       </motion.p>
                     )}
                   </AnimatePresence>
                 </div>
               </button>
             </motion.div>
           );
         })}
       </div>
 
       {/* Actions */}
       {!showResults ? (
         <Button onClick={checkAnswers} className="w-full">
           בדוק/י תשובות
         </Button>
       ) : (
         <div className="space-y-3">
           <div className={cn(
             "p-3 rounded-lg text-center",
             correctCount === flags.length ? "bg-success/10" : "bg-amber-500/10"
           )}>
             <span className={cn(
               "font-bold",
               correctCount === flags.length ? "text-success" : "text-amber-600"
             )}>
               זיהית {selectedFlags.size} דגלים, {actualRedFlags} מתוכם נכונים
             </span>
           </div>
           <Button onClick={resetGame} variant="outline" className="w-full">
             נסה/י שוב
           </Button>
         </div>
       )}
     </div>
   );
 }