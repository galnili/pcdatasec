 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { ChevronDown, Lock, Shield, Clock, FileCheck, Check, AlertTriangle, Eye, Search, MessageSquare } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 interface AccordionItem {
   id: string;
   title: string;
   content: string;
   icon?: string;
   badge?: string;
   badgeColor?: 'success' | 'warning' | 'destructive' | 'default';
 }
 
 interface AccordionListProps {
   items: AccordionItem[];
   title?: string;
   allowMultiple?: boolean;
 }
 
 const iconMap: Record<string, React.FC<{ className?: string }>> = {
   lock: Lock,
   shield: Shield,
   clock: Clock,
   fileCheck: FileCheck,
   check: Check,
   alert: AlertTriangle,
   eye: Eye,
   search: Search,
   message: MessageSquare,
 };
 
 const badgeColors = {
   success: "bg-success/10 text-success border-success/30",
   warning: "bg-amber-100 text-amber-700 border-amber-300",
   destructive: "bg-destructive/10 text-destructive border-destructive/30",
   default: "bg-primary/10 text-primary border-primary/30"
 };
 
 export function AccordionList({ items, title, allowMultiple = false }: AccordionListProps) {
   const [openItems, setOpenItems] = useState<Set<string>>(new Set());
 
   const toggleItem = (id: string) => {
     setOpenItems(prev => {
       const newSet = new Set(prev);
       if (newSet.has(id)) {
         newSet.delete(id);
       } else {
         if (!allowMultiple) {
           newSet.clear();
         }
         newSet.add(id);
       }
       return newSet;
     });
   };
 
   const expandAll = () => {
     setOpenItems(new Set(items.map(item => item.id)));
   };
 
   const collapseAll = () => {
     setOpenItems(new Set());
   };
 
   return (
     <div className="w-full space-y-3">
       {title && (
         <div className="flex items-center justify-between mb-4">
           <h3 className="font-bold text-foreground">{title}</h3>
           <div className="flex gap-2 text-xs">
             <button onClick={expandAll} className="text-primary hover:underline">
               פתח הכל
             </button>
             <span className="text-muted-foreground">|</span>
             <button onClick={collapseAll} className="text-primary hover:underline">
               סגור הכל
             </button>
           </div>
         </div>
       )}
 
       <div className="space-y-2">
         {items.map((item, index) => {
           const isOpen = openItems.has(item.id);
           const IconComponent = item.icon ? iconMap[item.icon] || Shield : Shield;
 
           return (
             <motion.div
               key={item.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.05 }}
               className="border border-border rounded-xl overflow-hidden bg-card"
             >
               <button
                 onClick={() => toggleItem(item.id)}
                 className={cn(
                   "w-full flex items-center gap-3 p-4 text-right transition-colors",
                   isOpen ? "bg-primary/5" : "hover:bg-muted/50"
                 )}
               >
                 <motion.div
                   initial={false}
                   animate={{ rotate: isOpen ? 180 : 0 }}
                   transition={{ duration: 0.2 }}
                 >
                   <ChevronDown className="w-5 h-5 text-muted-foreground" />
                 </motion.div>
                 
                 <div className={cn(
                   "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                   isOpen ? "bg-primary/20" : "bg-muted"
                 )}>
                   <IconComponent className={cn(
                     "w-5 h-5",
                     isOpen ? "text-primary" : "text-muted-foreground"
                   )} />
                 </div>
 
                 <div className="flex-1 flex items-center gap-2">
                   <span className={cn(
                     "font-medium",
                     isOpen && "text-primary"
                   )}>
                     {item.title}
                   </span>
                   {item.badge && (
                     <span className={cn(
                       "text-xs px-2 py-0.5 rounded-full border",
                       badgeColors[item.badgeColor || 'default']
                     )}>
                       {item.badge}
                     </span>
                   )}
                 </div>
               </button>
 
               <AnimatePresence initial={false}>
                 {isOpen && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: "auto", opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     transition={{ duration: 0.2 }}
                   >
                     <div className="px-4 pb-4 pt-0 mr-16">
                       <p className="text-muted-foreground text-sm leading-relaxed">
                         {item.content}
                       </p>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </motion.div>
           );
         })}
       </div>
     </div>
   );
 }