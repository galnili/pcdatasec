 import { motion } from "framer-motion";
 import { cn } from "@/lib/utils";
 import { AlertTriangle, Lightbulb, Info, Quote, Shield } from "lucide-react";
 
 type HighlightType = 'warning' | 'tip' | 'info' | 'quote' | 'important';
 
 interface HighlightBoxProps {
   type: HighlightType;
   content: string;
   title?: string;
 }
 
 const config: Record<HighlightType, { icon: typeof AlertTriangle; className: string; defaultTitle: string }> = {
   warning: {
     icon: AlertTriangle,
     className: "bg-destructive/10 border-destructive/30 text-destructive",
     defaultTitle: "אזהרה"
   },
   tip: {
     icon: Lightbulb,
     className: "bg-amber-500/10 border-amber-500/30 text-amber-600",
     defaultTitle: "טיפ"
   },
   info: {
     icon: Info,
     className: "bg-blue-500/10 border-blue-500/30 text-blue-600",
     defaultTitle: "שימו לב"
   },
   quote: {
     icon: Quote,
     className: "bg-primary/10 border-primary/30 text-primary",
     defaultTitle: ""
   },
   important: {
     icon: Shield,
     className: "bg-primary/10 border-primary/30 text-primary",
     defaultTitle: "חשוב לזכור"
   }
 };
 
 export function HighlightBox({ type, content, title }: HighlightBoxProps) {
   const { icon: Icon, className, defaultTitle } = config[type];
   const displayTitle = title || defaultTitle;
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       className={cn(
         "rounded-xl border-2 p-4",
         className
       )}
     >
       <div className="flex items-start gap-3">
         <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
         <div className="flex-1">
           {displayTitle && (
             <h4 className="font-bold mb-1">{displayTitle}</h4>
           )}
           <p className={cn(
             "text-sm leading-relaxed",
             type === 'quote' ? "italic" : ""
           )}>
             {content}
           </p>
         </div>
       </div>
     </motion.div>
   );
 }