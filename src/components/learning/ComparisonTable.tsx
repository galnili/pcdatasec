 import { motion } from "framer-motion";
 import { ComparisonItem } from "@/data/types";
 import { cn } from "@/lib/utils";
 import { Check, X, AlertCircle } from "lucide-react";
 
 interface ComparisonTableProps {
   items: ComparisonItem[];
   title?: string;
 }
 
 export function ComparisonTable({ items, title }: ComparisonTableProps) {
   const hasSpecial = items.some(item => item.special);
 
   return (
     <div className="w-full">
       {title && (
         <h3 className="font-bold text-foreground mb-3">{title}</h3>
       )}
       
       <div className="rounded-xl border border-border overflow-hidden">
         {/* Header */}
         <div className={cn(
           "grid bg-muted/50 border-b border-border",
           hasSpecial ? "grid-cols-4" : "grid-cols-3"
         )}>
           <div className="px-4 py-3 font-bold text-foreground text-sm">קטגוריה</div>
           <div className="px-4 py-3 font-bold text-success text-sm flex items-center gap-1">
             <Check className="w-4 h-4" /> מותר
           </div>
           <div className="px-4 py-3 font-bold text-destructive text-sm flex items-center gap-1">
             <X className="w-4 h-4" /> אסור
           </div>
           {hasSpecial && (
             <div className="px-4 py-3 font-bold text-amber-600 text-sm flex items-center gap-1">
               <AlertCircle className="w-4 h-4" /> נדרש תהליך
             </div>
           )}
         </div>
 
         {/* Rows */}
         {items.map((item, index) => (
           <motion.div
             key={index}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: index * 0.05 }}
             className={cn(
               "grid border-b border-border last:border-0",
               hasSpecial ? "grid-cols-4" : "grid-cols-3"
             )}
           >
             <div className="px-4 py-3 text-sm font-medium text-foreground bg-muted/20">
               {item.category}
             </div>
             <div className="px-4 py-3 text-sm text-foreground">
               {item.allowed || "-"}
             </div>
             <div className="px-4 py-3 text-sm text-foreground">
               {item.forbidden || "-"}
             </div>
             {hasSpecial && (
               <div className="px-4 py-3 text-sm text-foreground">
                 {item.special || "-"}
               </div>
             )}
           </motion.div>
         ))}
       </div>
     </div>
   );
 }