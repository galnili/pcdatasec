 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { ScenarioScript } from "@/data/types";
 import { cn } from "@/lib/utils";
 import { MessageSquare, CheckCircle, ChevronLeft } from "lucide-react";
 
 interface ScenarioCardsProps {
   scripts: ScenarioScript[];
   title?: string;
 }
 
 export function ScenarioCards({ scripts, title }: ScenarioCardsProps) {
   const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
   const [practicedScripts, setPracticedScripts] = useState<Set<number>>(new Set());
 
   const markAsPracticed = (index: number, e: React.MouseEvent) => {
     e.stopPropagation();
     setPracticedScripts(prev => new Set([...prev, index]));
   };
 
   return (
     <div className="w-full">
       {title && (
         <h3 className="font-bold text-foreground mb-4">{title}</h3>
       )}
 
       <div className="space-y-3">
         {scripts.map((script, index) => {
           const isExpanded = expandedIndex === index;
           const isPracticed = practicedScripts.has(index);
 
           return (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               onClick={() => setExpandedIndex(isExpanded ? null : index)}
               className={cn(
                 "cursor-pointer rounded-xl border-2 overflow-hidden transition-all",
                 "bg-card hover:border-primary/50",
                 isExpanded ? "border-primary" : "border-border",
                 isPracticed && "bg-success/5 border-success/30"
               )}
             >
               {/* Situation */}
               <div className="p-4">
                 <div className="flex items-start gap-3">
                   <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                     <MessageSquare className="w-4 h-4 text-destructive" />
                   </div>
                   <div className="flex-1">
                     <p className="text-sm font-medium text-foreground">
                       "{script.situation}"
                     </p>
                   </div>
                   <ChevronLeft className={cn(
                     "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0",
                     isExpanded && "-rotate-90"
                   )} />
                 </div>
               </div>
 
               {/* Response */}
               <AnimatePresence>
                 {isExpanded && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: "auto", opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="overflow-hidden"
                   >
                     <div className="px-4 pb-4 pt-0">
                       <div className="border-t border-border pt-3">
                         <div className="flex items-start gap-3">
                           <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                             <CheckCircle className="w-4 h-4 text-success" />
                           </div>
                           <div className="flex-1">
                             <p className="text-sm text-muted-foreground mb-1">תגובה מומלצת:</p>
                             <p className="text-sm font-medium text-foreground">
                               "{script.response}"
                             </p>
                           </div>
                         </div>
 
                         {!isPracticed && (
                           <button
                             onClick={(e) => markAsPracticed(index, e)}
                             className="mt-3 text-xs text-primary hover:underline"
                           >
                             ✓ תרגלתי את התסריט הזה
                           </button>
                         )}
                       </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </motion.div>
           );
         })}
       </div>
 
       {practicedScripts.size === scripts.length && scripts.length > 0 && (
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="mt-4 p-3 rounded-lg bg-success/10 border border-success/30 text-center"
         >
           <CheckCircle className="w-5 h-5 text-success mx-auto mb-1" />
           <p className="text-sm font-medium text-success">מעולה! תרגלת את כל התסריטים</p>
         </motion.div>
       )}
     </div>
   );
 }