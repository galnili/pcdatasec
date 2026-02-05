 import { useState, useEffect } from "react";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent } from "@/components/ui/card";
 import { useLearning } from "@/contexts/LearningContext";
 import { additionalQuestions } from "@/data/learningModuleData";
 import { ArrowLeft, CheckCircle, XCircle, MessageCircle, User } from "lucide-react";
 import { motion, AnimatePresence } from "framer-motion";
 import { cn } from "@/lib/utils";
 
 export function QuestionScreen() {
   const { 
     getCurrentChapter, 
     currentQuestionIndex,
     answerQuestion, 
     nextChapter,
     hasSecondQuestion,
     goToSecondQuestion,
     answeredQuestions
   } = useLearning();
 
   const [selectedOption, setSelectedOption] = useState<string | null>(null);
   const [showFeedback, setShowFeedback] = useState(false);
 
   const chapter = getCurrentChapter();
   
   // Get current question based on index
   const question = currentQuestionIndex === 0 
     ? chapter?.question 
     : chapter ? additionalQuestions[chapter.id] : undefined;
 
   // Reset state when question changes
   useEffect(() => {
     setSelectedOption(null);
     setShowFeedback(false);
   }, [currentQuestionIndex, chapter?.id]);
 
   if (!question || !chapter) return null;
 
   const alreadyAnswered = answeredQuestions.has(question.id);
   const selectedAnswer = question.options.find(o => o.id === selectedOption);
   const isCorrect = selectedAnswer?.isCorrect ?? false;
 
   const handleSelect = (optionId: string) => {
     if (showFeedback || alreadyAnswered) return;
     setSelectedOption(optionId);
   };
 
   const handleSubmit = () => {
     if (!selectedOption || showFeedback) return;
     setShowFeedback(true);
     answerQuestion(question.id, isCorrect);
   };
 
   const handleContinue = () => {
     // Check if there's a second question for this chapter
     if (currentQuestionIndex === 0 && hasSecondQuestion()) {
       goToSecondQuestion();
     } else {
       nextChapter();
     }
   };
 
   return (
     <div className="min-h-screen pt-24 pb-8 px-4">
       <div className="max-w-3xl mx-auto space-y-6">
         {/* Scenario Card */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
         >
           <Card className="bg-card border-0 shadow-lg overflow-hidden">
             {/* Customer header */}
             <div className="bg-primary/10 px-6 py-4 flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                 <User className="w-5 h-5 text-primary" />
               </div>
               <div>
                 <div className="font-bold text-foreground">{question.customerName}</div>
                 <div className="text-xs text-muted-foreground">סימולציה</div>
               </div>
             </div>
 
             <CardContent className="p-6">
               {/* Scenario text */}
               <div className="bg-background rounded-2xl rounded-tr-sm p-4 mb-6 relative">
                 <MessageCircle className="w-4 h-4 text-muted-foreground absolute -top-2 -right-1" />
                 <p className="text-foreground whitespace-pre-line leading-relaxed">
                   {question.scenario}
                 </p>
               </div>
 
               {/* Question */}
               <h3 className="text-lg font-bold text-foreground mb-4">
                 {question.question}
               </h3>
 
               {/* Options */}
               <div className="space-y-3">
                 {question.options.map((option, index) => {
                   const isSelected = selectedOption === option.id;
                   const showCorrect = showFeedback && option.isCorrect;
                   const showWrong = showFeedback && isSelected && !option.isCorrect;
 
                   return (
                     <motion.button
                       key={option.id}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: index * 0.1 }}
                       onClick={() => handleSelect(option.id)}
                       disabled={showFeedback || alreadyAnswered}
                       className={cn(
                         "w-full text-right p-4 rounded-xl border-2 transition-all",
                         "hover:border-primary/50 hover:bg-primary/5",
                         isSelected && !showFeedback && "border-primary bg-primary/10",
                         !isSelected && !showFeedback && "border-border bg-background",
                         showCorrect && "border-success bg-success/10",
                         showWrong && "border-destructive bg-destructive/10",
                         (showFeedback || alreadyAnswered) && "cursor-not-allowed"
                       )}
                     >
                       <div className="flex items-center gap-3">
                         <span className={cn(
                           "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                           isSelected && !showFeedback && "bg-primary text-primary-foreground",
                           !isSelected && !showFeedback && "bg-muted text-muted-foreground",
                           showCorrect && "bg-success text-success-foreground",
                           showWrong && "bg-destructive text-destructive-foreground"
                         )}>
                           {showCorrect ? (
                             <CheckCircle className="w-4 h-4" />
                           ) : showWrong ? (
                             <XCircle className="w-4 h-4" />
                           ) : (
                             String.fromCharCode(1488 + index) // Hebrew letters
                           )}
                         </span>
                         <span className={cn(
                           "text-foreground",
                           showCorrect && "font-bold text-success",
                           showWrong && "text-destructive"
                         )}>
                           {option.text}
                         </span>
                       </div>
                     </motion.button>
                   );
                 })}
               </div>
             </CardContent>
           </Card>
         </motion.div>
 
         {/* Feedback & Actions */}
         <AnimatePresence mode="wait">
           {showFeedback && (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-4"
             >
               <Card className={cn(
                 "border-2",
                 isCorrect ? "border-success bg-success/5" : "border-destructive bg-destructive/5"
               )}>
                 <CardContent className="p-4 flex items-center gap-3">
                   {isCorrect ? (
                     <>
                       <CheckCircle className="w-6 h-6 text-success" />
                       <div>
                         <div className="font-bold text-success">מעולה! תשובה נכונה</div>
                         <div className="text-sm text-muted-foreground">
                           קיבלת +10 נקודות XP
                         </div>
                       </div>
                     </>
                   ) : (
                     <>
                       <XCircle className="w-6 h-6 text-destructive" />
                       <div>
                         <div className="font-bold text-destructive">לא מדויק</div>
                         <div className="text-sm text-muted-foreground">
                           התשובה הנכונה מסומנת בירוק
                         </div>
                       </div>
                     </>
                   )}
                 </CardContent>
               </Card>
 
               <Button
                 onClick={handleContinue}
                 className="w-full gap-2"
                 size="lg"
               >
                 <span>המשך</span>
                 <ArrowLeft className="w-4 h-4" />
               </Button>
             </motion.div>
           )}
         </AnimatePresence>
 
         {!showFeedback && !alreadyAnswered && (
           <Button
             onClick={handleSubmit}
             disabled={!selectedOption}
             className="w-full"
             size="lg"
           >
             בדוק/י תשובה
           </Button>
         )}
       </div>
     </div>
   );
 }