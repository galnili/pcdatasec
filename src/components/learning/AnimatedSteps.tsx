 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { ChevronLeft, ChevronRight, Check, Circle, Lock, Shield, Clock, FileCheck, Search, AlertTriangle, MessageSquare } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { cn } from "@/lib/utils";
 
 interface Step {
   id: string;
   title: string;
   description: string;
   icon?: string;
 }
 
 interface AnimatedStepsProps {
   steps: Step[];
   title?: string;
   autoPlay?: boolean;
 }
 
 const iconMap: Record<string, React.FC<{ className?: string }>> = {
   lock: Lock,
   shield: Shield,
   clock: Clock,
   fileCheck: FileCheck,
   search: Search,
   alert: AlertTriangle,
   message: MessageSquare,
   check: Check,
 };
 
 export function AnimatedSteps({ steps, title, autoPlay = false }: AnimatedStepsProps) {
   const [currentStep, setCurrentStep] = useState(0);
   const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
 
   const goToNext = () => {
     if (currentStep < steps.length - 1) {
       setCompletedSteps(prev => new Set([...prev, currentStep]));
       setCurrentStep(prev => prev + 1);
     } else {
       setCompletedSteps(prev => new Set([...prev, currentStep]));
     }
   };
 
   const goToPrev = () => {
     if (currentStep > 0) {
       setCurrentStep(prev => prev - 1);
     }
   };
 
   const goToStep = (index: number) => {
     if (index <= Math.max(...completedSteps, 0) + 1) {
       setCurrentStep(index);
     }
   };
 
   const step = steps[currentStep];
   const IconComponent = step.icon ? iconMap[step.icon] || Circle : Circle;
   const isAllComplete = completedSteps.size === steps.length;
 
   return (
     <div className="w-full space-y-6">
       {title && (
         <h3 className="font-bold text-foreground text-center">{title}</h3>
       )}
 
       {/* Progress Dots */}
       <div className="flex items-center justify-center gap-2">
         {steps.map((s, index) => {
           const StepIcon = s.icon ? iconMap[s.icon] || Circle : Circle;
           const isCompleted = completedSteps.has(index);
           const isCurrent = index === currentStep;
           const isAccessible = index <= Math.max(...completedSteps, 0) + 1;
 
           return (
             <button
               key={s.id}
               onClick={() => goToStep(index)}
               disabled={!isAccessible}
               className={cn(
                 "relative transition-all duration-300",
                 isAccessible ? "cursor-pointer" : "cursor-not-allowed opacity-50"
               )}
             >
               <motion.div
                 animate={{
                   scale: isCurrent ? 1.2 : 1,
                   backgroundColor: isCompleted 
                     ? "hsl(var(--success))" 
                     : isCurrent 
                       ? "hsl(var(--primary))" 
                       : "hsl(var(--muted))"
                 }}
                 className="w-10 h-10 rounded-full flex items-center justify-center"
               >
                 {isCompleted ? (
                   <Check className="w-5 h-5 text-white" />
                 ) : (
                   <StepIcon className={cn(
                     "w-5 h-5",
                     isCurrent ? "text-white" : "text-muted-foreground"
                   )} />
                 )}
               </motion.div>
               <span className={cn(
                 "absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap",
                 isCurrent ? "text-primary font-medium" : "text-muted-foreground"
               )}>
                 {index + 1}
               </span>
             </button>
           );
         })}
       </div>
 
       {/* Current Step Content */}
       <AnimatePresence mode="wait">
         <motion.div
           key={currentStep}
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -50 }}
           transition={{ duration: 0.3 }}
           className="bg-card border border-border rounded-xl p-6 min-h-[150px]"
         >
           <div className="flex flex-col items-center text-center space-y-4">
             <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 0.2, type: "spring" }}
               className={cn(
                 "w-16 h-16 rounded-full flex items-center justify-center",
                 completedSteps.has(currentStep) ? "bg-success/20" : "bg-primary/20"
               )}
             >
               <IconComponent className={cn(
                 "w-8 h-8",
                 completedSteps.has(currentStep) ? "text-success" : "text-primary"
               )} />
             </motion.div>
             
             <div>
               <h4 className="text-lg font-bold text-foreground mb-2">
                 שלב {currentStep + 1}: {step.title}
               </h4>
               <p className="text-muted-foreground">{step.description}</p>
             </div>
           </div>
         </motion.div>
       </AnimatePresence>
 
       {/* Navigation */}
       <div className="flex items-center justify-between">
         <Button
           variant="outline"
           onClick={goToPrev}
           disabled={currentStep === 0}
           className="gap-2"
         >
           <ChevronRight className="w-4 h-4" />
           <span>הקודם</span>
         </Button>
 
         <span className="text-sm text-muted-foreground">
           {currentStep + 1} / {steps.length}
         </span>
 
         {currentStep < steps.length - 1 ? (
           <Button
             onClick={goToNext}
             className="gap-2"
           >
             <span>הבא</span>
             <ChevronLeft className="w-4 h-4" />
           </Button>
         ) : (
           <Button
             onClick={goToNext}
             disabled={isAllComplete}
             variant={isAllComplete ? "outline" : "default"}
             className="gap-2"
           >
             {isAllComplete ? (
               <>
                 <Check className="w-4 h-4" />
                 <span>הושלם!</span>
               </>
             ) : (
               <>
                 <span>סיום</span>
                 <Check className="w-4 h-4" />
               </>
             )}
           </Button>
         )}
       </div>
     </div>
   );
 }