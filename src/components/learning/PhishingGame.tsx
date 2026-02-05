 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { PhishingExample } from "@/data/types";
 import { cn } from "@/lib/utils";
 import { Mail, MessageCircle, Phone, CheckCircle, XCircle, AlertTriangle, Eye } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 interface PhishingGameProps {
   examples: PhishingExample[];
   title?: string;
   onComplete?: (score: number) => void;
 }
 
 const typeConfig = {
   email: { icon: Mail, label: "דוא\"ל" },
   sms: { icon: Phone, label: "SMS" },
   whatsapp: { icon: MessageCircle, label: "WhatsApp" },
 };
 
 export function PhishingGame({ examples, title, onComplete }: PhishingGameProps) {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [answers, setAnswers] = useState<Record<string, boolean>>({});
   const [showResult, setShowResult] = useState(false);
   const [gameComplete, setGameComplete] = useState(false);
 
   const currentExample = examples[currentIndex];
   const hasAnswered = answers[currentExample?.id] !== undefined;
   const config = currentExample ? typeConfig[currentExample.type] : typeConfig.email;
   const IconComponent = config.icon;
 
   const handleAnswer = (isPhishing: boolean) => {
     setAnswers(prev => ({
       ...prev,
       [currentExample.id]: isPhishing === currentExample.isPhishing
     }));
     setShowResult(true);
   };
 
   const handleNext = () => {
     setShowResult(false);
     if (currentIndex < examples.length - 1) {
       setCurrentIndex(prev => prev + 1);
     } else {
       setGameComplete(true);
       const score = Object.values(answers).filter(Boolean).length;
       onComplete?.(score);
     }
   };
 
   const correctCount = Object.values(answers).filter(Boolean).length;
 
   if (gameComplete) {
     const percentage = Math.round((correctCount / examples.length) * 100);
     return (
       <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         className="text-center p-6 rounded-xl bg-card border border-border"
       >
         <div className={cn(
           "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center",
           percentage >= 80 ? "bg-success/10" : "bg-amber-500/10"
         )}>
           {percentage >= 80 ? (
             <CheckCircle className="w-8 h-8 text-success" />
           ) : (
             <AlertTriangle className="w-8 h-8 text-amber-500" />
           )}
         </div>
         <h3 className="text-xl font-bold text-foreground mb-2">
           {percentage >= 80 ? "מעולה!" : "יש מקום לשיפור"}
         </h3>
         <p className="text-muted-foreground mb-4">
           זיהית נכון {correctCount} מתוך {examples.length} הודעות ({percentage}%)
         </p>
         <Button onClick={() => {
           setCurrentIndex(0);
           setAnswers({});
           setShowResult(false);
           setGameComplete(false);
         }}>
           נסה/י שוב
         </Button>
       </motion.div>
     );
   }
 
   if (!currentExample) return null;
 
   return (
     <div className="w-full">
       {title && (
         <h3 className="font-bold text-foreground mb-4">{title}</h3>
       )}
 
       {/* Progress */}
       <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
         <span>הודעה {currentIndex + 1} מתוך {examples.length}</span>
         <span>{correctCount} תשובות נכונות</span>
       </div>
 
       {/* Message Card */}
       <motion.div
         key={currentExample.id}
         initial={{ opacity: 0, x: 20 }}
         animate={{ opacity: 1, x: 0 }}
         className="rounded-xl border-2 border-border bg-card overflow-hidden"
       >
         {/* Header */}
         <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border">
           <IconComponent className="w-4 h-4 text-muted-foreground" />
           <span className="text-sm text-muted-foreground">{config.label}</span>
         </div>
 
         {/* Content */}
         <div className="p-4">
           <div className="text-sm text-muted-foreground mb-1">מאת: {currentExample.sender}</div>
           {currentExample.subject && (
             <div className="font-bold text-foreground mb-2">נושא: {currentExample.subject}</div>
           )}
           <div className="bg-background rounded-lg p-3 text-sm text-foreground whitespace-pre-line">
             {currentExample.content}
           </div>
         </div>
 
         {/* Actions or Result */}
         <div className="p-4 border-t border-border">
           <AnimatePresence mode="wait">
             {!showResult ? (
               <motion.div
                 key="buttons"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="flex gap-3"
               >
                 <Button
                   variant="outline"
                   className="flex-1 border-success text-success hover:bg-success/10"
                   onClick={() => handleAnswer(false)}
                 >
                   <CheckCircle className="w-4 h-4 ml-2" />
                   לגיטימי
                 </Button>
                 <Button
                   variant="outline"
                   className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                   onClick={() => handleAnswer(true)}
                 >
                   <AlertTriangle className="w-4 h-4 ml-2" />
                   פישינג
                 </Button>
               </motion.div>
             ) : (
               <motion.div
                 key="result"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="space-y-3"
               >
                 <div className={cn(
                   "p-3 rounded-lg flex items-center gap-2",
                   answers[currentExample.id] ? "bg-success/10" : "bg-destructive/10"
                 )}>
                   {answers[currentExample.id] ? (
                     <>
                       <CheckCircle className="w-5 h-5 text-success" />
                       <span className="font-bold text-success">נכון!</span>
                     </>
                   ) : (
                     <>
                       <XCircle className="w-5 h-5 text-destructive" />
                       <span className="font-bold text-destructive">לא נכון</span>
                     </>
                   )}
                   <span className="text-sm text-muted-foreground mr-2">
                     זו הודעת {currentExample.isPhishing ? "פישינג" : "לגיטימית"}
                   </span>
                 </div>
 
                 {currentExample.isPhishing && currentExample.redFlags && (
                   <div className="bg-amber-500/10 p-3 rounded-lg">
                     <div className="flex items-center gap-2 mb-2">
                       <Eye className="w-4 h-4 text-amber-600" />
                       <span className="text-sm font-bold text-amber-600">דגלים אדומים:</span>
                     </div>
                     <ul className="text-sm text-muted-foreground space-y-1">
                       {currentExample.redFlags.map((flag, i) => (
                         <li key={i}>• {flag}</li>
                       ))}
                     </ul>
                   </div>
                 )}
 
                 <Button onClick={handleNext} className="w-full">
                   {currentIndex < examples.length - 1 ? "הבא" : "סיום"}
                 </Button>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
       </motion.div>
     </div>
   );
 }