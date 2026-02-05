 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { DominoItem } from "@/data/types";
 import { cn } from "@/lib/utils";
 import { User, Building2, UserCog, ChevronLeft } from "lucide-react";
 
 interface DominoEffectProps {
   items: DominoItem[];
   title?: string;
 }
 
 const impactConfig = {
   customer: { icon: User, label: "השלכות על הלקוח", color: "text-blue-500 bg-blue-500/10 border-blue-500/30" },
   organization: { icon: Building2, label: "השלכות על הארגון", color: "text-amber-500 bg-amber-500/10 border-amber-500/30" },
   employee: { icon: UserCog, label: "השלכות על הנציג/ה", color: "text-rose-500 bg-rose-500/10 border-rose-500/30" },
 };
 
 export function DominoEffect({ items, title }: DominoEffectProps) {
   const [expandedItem, setExpandedItem] = useState<string | null>(null);
   const [fallenDominos, setFallenDominos] = useState<Set<number>>(new Set());
 
   const triggerDominoEffect = () => {
     setFallenDominos(new Set());
     items.forEach((_, index) => {
       setTimeout(() => {
         setFallenDominos(prev => new Set([...prev, index]));
       }, index * 300);
     });
   };
 
   // Group items by impact type
   const groupedItems = items.reduce((acc, item) => {
     if (!acc[item.impact]) acc[item.impact] = [];
     acc[item.impact].push(item);
     return acc;
   }, {} as Record<string, DominoItem[]>);
 
   return (
     <div className="w-full">
       {title && (
         <h3 className="font-bold text-foreground mb-4 text-center">{title}</h3>
       )}
       
       <div className="space-y-6">
         {(Object.keys(impactConfig) as Array<keyof typeof impactConfig>).map((impact) => {
           const config = impactConfig[impact];
           const IconComponent = config.icon;
           const impactItems = groupedItems[impact] || [];
 
           if (impactItems.length === 0) return null;
 
           return (
             <motion.div
               key={impact}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-2"
             >
               <div className="flex items-center gap-2 mb-3">
                 <IconComponent className={cn("w-5 h-5", config.color.split(" ")[0])} />
                 <h4 className="font-bold text-foreground">{config.label}</h4>
               </div>
 
               <div className="space-y-2">
                 {impactItems.map((item, index) => {
                   const isExpanded = expandedItem === item.id;
 
                   return (
                     <motion.div
                       key={item.id}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: index * 0.1 }}
                       onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                       className={cn(
                         "cursor-pointer rounded-lg p-3 border-2 transition-all",
                         config.color,
                         isExpanded && "shadow-md"
                       )}
                     >
                       <div className="flex items-center justify-between">
                         <span className="font-medium text-foreground">{item.title}</span>
                         <ChevronLeft className={cn(
                           "w-4 h-4 transition-transform",
                           isExpanded && "-rotate-90"
                         )} />
                       </div>
 
                       <AnimatePresence>
                         {isExpanded && (
                           <motion.p
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: "auto", opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             className="text-sm text-muted-foreground mt-2 overflow-hidden"
                           >
                             {item.description}
                           </motion.p>
                         )}
                       </AnimatePresence>
                     </motion.div>
                   );
                 })}
               </div>
             </motion.div>
           );
         })}
       </div>
     </div>
   );
 }