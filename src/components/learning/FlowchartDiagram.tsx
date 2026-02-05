 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { FlowchartStep } from "@/data/types";
 import { cn } from "@/lib/utils";
 import { ArrowDown, CheckCircle, MessageSquare, Search, Shield, AlertTriangle } from "lucide-react";
 
 interface FlowchartDiagramProps {
   steps: FlowchartStep[];
   title?: string;
 }
 
 const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
   check: CheckCircle,
   message: MessageSquare,
   search: Search,
   shield: Shield,
   alert: AlertTriangle,
 };
 
 export function FlowchartDiagram({ steps, title }: FlowchartDiagramProps) {
   const [expandedStep, setExpandedStep] = useState<string | null>(null);
 
   return (
     <div className="w-full">
       {title && (
         <h3 className="font-bold text-foreground mb-4 text-center">{title}</h3>
       )}
       <div className="flex flex-col items-center gap-2">
         {steps.map((step, index) => {
           const IconComponent = step.icon ? iconMap[step.icon] : CheckCircle;
           const isExpanded = expandedStep === step.id;
 
           return (
             <motion.div
               key={step.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.15 }}
               className="w-full max-w-md"
             >
               {/* Step Box */}
               <div
                 onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                 className={cn(
                   "cursor-pointer rounded-xl p-4 border-2 transition-all",
                   "bg-card hover:border-primary/50",
                   isExpanded ? "border-primary shadow-lg" : "border-border"
                 )}
               >
                 <div className="flex items-center gap-3">
                   <div className={cn(
                     "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                     "bg-primary/10 text-primary"
                   )}>
                     <span className="font-bold">{index + 1}</span>
                   </div>
                   <div className="flex-1">
                     <h4 className="font-bold text-foreground">{step.title}</h4>
                   </div>
                   {IconComponent && <IconComponent className="w-5 h-5 text-primary" />}
                 </div>
 
                 <AnimatePresence>
                   {isExpanded && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       className="overflow-hidden"
                     >
                       <p className="mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
                         {step.description}
                       </p>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
 
               {/* Arrow between steps */}
               {index < steps.length - 1 && (
                 <div className="flex justify-center py-1">
                   <ArrowDown className="w-5 h-5 text-primary/50" />
                 </div>
               )}
             </motion.div>
           );
         })}
       </div>
     </div>
   );
 }