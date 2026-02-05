 import { useState, useEffect } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { Check, X, Shuffle, RotateCcw } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { cn } from "@/lib/utils";
 
 interface MatchPair {
   id: string;
   term: string;
   definition: string;
 }
 
 interface MatchingGameProps {
   pairs: MatchPair[];
   title?: string;
   onComplete?: () => void;
 }
 
 export function MatchingGame({ pairs, title, onComplete }: MatchingGameProps) {
   const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
   const [matches, setMatches] = useState<Record<string, string>>({});
   const [wrongMatch, setWrongMatch] = useState<string | null>(null);
   const [shuffledDefinitions, setShuffledDefinitions] = useState<MatchPair[]>([]);
   const [isComplete, setIsComplete] = useState(false);
 
   useEffect(() => {
     shuffleDefinitions();
   }, [pairs]);
 
   useEffect(() => {
     if (Object.keys(matches).length === pairs.length && pairs.length > 0) {
       setIsComplete(true);
       onComplete?.();
     }
   }, [matches, pairs.length, onComplete]);
 
   const shuffleDefinitions = () => {
     const shuffled = [...pairs].sort(() => Math.random() - 0.5);
     setShuffledDefinitions(shuffled);
   };
 
   const handleTermClick = (termId: string) => {
     if (matches[termId]) return;
     setSelectedTerm(termId);
     setWrongMatch(null);
   };
 
   const handleDefinitionClick = (defId: string) => {
     if (!selectedTerm) return;
     if (Object.values(matches).includes(defId)) return;
 
     if (selectedTerm === defId) {
       setMatches(prev => ({ ...prev, [selectedTerm]: defId }));
       setSelectedTerm(null);
     } else {
       setWrongMatch(defId);
       setTimeout(() => {
         setWrongMatch(null);
         setSelectedTerm(null);
       }, 800);
     }
   };
 
   const resetGame = () => {
     setMatches({});
     setSelectedTerm(null);
     setWrongMatch(null);
     setIsComplete(false);
     shuffleDefinitions();
   };
 
   const isTermMatched = (termId: string) => !!matches[termId];
   const isDefMatched = (defId: string) => Object.values(matches).includes(defId);
 
   return (
     <div className="w-full space-y-4">
       {title && (
         <div className="flex items-center justify-between">
           <h3 className="font-bold text-foreground">{title}</h3>
           <div className="flex gap-2">
             <Button variant="outline" size="sm" onClick={shuffleDefinitions} className="gap-1">
               <Shuffle className="w-3 h-3" />
               <span className="hidden sm:inline">ערבב</span>
             </Button>
             <Button variant="outline" size="sm" onClick={resetGame} className="gap-1">
               <RotateCcw className="w-3 h-3" />
               <span className="hidden sm:inline">התחל מחדש</span>
             </Button>
           </div>
         </div>
       )}
 
       <div className="grid md:grid-cols-2 gap-4">
         {/* Terms Column */}
         <div className="space-y-2">
           <div className="text-sm font-medium text-muted-foreground mb-2">מושגים</div>
           {pairs.map((pair) => (
             <motion.button
               key={pair.id}
               onClick={() => handleTermClick(pair.id)}
               disabled={isTermMatched(pair.id)}
               whileHover={!isTermMatched(pair.id) ? { scale: 1.02 } : {}}
               whileTap={!isTermMatched(pair.id) ? { scale: 0.98 } : {}}
               className={cn(
                 "w-full p-3 rounded-lg border-2 text-right transition-all",
                 isTermMatched(pair.id) && "bg-success/10 border-success text-success",
                 selectedTerm === pair.id && "border-primary bg-primary/10 ring-2 ring-primary/30",
                 !isTermMatched(pair.id) && selectedTerm !== pair.id && "border-border hover:border-primary/50 bg-card"
               )}
             >
               <div className="flex items-center gap-2">
                 {isTermMatched(pair.id) && <Check className="w-4 h-4 flex-shrink-0" />}
                 <span className="font-medium">{pair.term}</span>
               </div>
             </motion.button>
           ))}
         </div>
 
         {/* Definitions Column */}
         <div className="space-y-2">
           <div className="text-sm font-medium text-muted-foreground mb-2">הגדרות</div>
           {shuffledDefinitions.map((pair) => (
             <motion.button
               key={`def-${pair.id}`}
               onClick={() => handleDefinitionClick(pair.id)}
               disabled={isDefMatched(pair.id) || !selectedTerm}
               whileHover={!isDefMatched(pair.id) && selectedTerm ? { scale: 1.02 } : {}}
               whileTap={!isDefMatched(pair.id) && selectedTerm ? { scale: 0.98 } : {}}
               animate={wrongMatch === pair.id ? { x: [0, -10, 10, -10, 10, 0] } : {}}
               className={cn(
                 "w-full p-3 rounded-lg border-2 text-right transition-all",
                 isDefMatched(pair.id) && "bg-success/10 border-success text-success",
                 wrongMatch === pair.id && "border-destructive bg-destructive/10",
                 !isDefMatched(pair.id) && wrongMatch !== pair.id && selectedTerm && "border-border hover:border-primary/50 bg-card cursor-pointer",
                 !isDefMatched(pair.id) && !selectedTerm && "border-border bg-muted/30 cursor-not-allowed opacity-60"
               )}
             >
               <div className="flex items-center gap-2">
                 {isDefMatched(pair.id) && <Check className="w-4 h-4 flex-shrink-0" />}
                 {wrongMatch === pair.id && <X className="w-4 h-4 flex-shrink-0 text-destructive" />}
                 <span className="text-sm">{pair.definition}</span>
               </div>
             </motion.button>
           ))}
         </div>
       </div>
 
       {/* Completion Message */}
       <AnimatePresence>
         {isComplete && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0 }}
             className="bg-success/10 border border-success/30 rounded-xl p-4 text-center"
           >
             <div className="flex items-center justify-center gap-2 text-success">
               <Check className="w-5 h-5" />
               <span className="font-bold">מצוין! התאמת את כל המושגים בהצלחה!</span>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
 
       {/* Instructions */}
       {!isComplete && !selectedTerm && (
         <p className="text-sm text-muted-foreground text-center">
           לחץ/י על מושג בצד ימין, ואז בחר/י את ההגדרה המתאימה בצד שמאל
         </p>
       )}
       {!isComplete && selectedTerm && (
         <p className="text-sm text-primary text-center font-medium">
           עכשיו בחר/י את ההגדרה המתאימה
         </p>
       )}
     </div>
   );
 }