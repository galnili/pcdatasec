 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { Lock, Shield, Clock, FileCheck, Check, AlertTriangle, Eye, ChevronLeft, ChevronRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { cn } from "@/lib/utils";
 
 interface CardItem {
   id: string;
   title: string;
   subtitle?: string;
   content: string;
   icon?: string;
   color?: 'primary' | 'success' | 'warning' | 'destructive';
 }
 
 interface InteractiveCardsProps {
   cards: CardItem[];
   title?: string;
   layout?: 'carousel' | 'grid' | 'stack';
 }
 
 const iconMap: Record<string, React.FC<{ className?: string }>> = {
   lock: Lock,
   shield: Shield,
   clock: Clock,
   fileCheck: FileCheck,
   check: Check,
   alert: AlertTriangle,
   eye: Eye,
 };
 
 const colorClasses = {
   primary: "from-primary/20 to-primary/5 border-primary/30",
   success: "from-success/20 to-success/5 border-success/30",
   warning: "from-amber-200/50 to-amber-100/20 border-amber-300",
   destructive: "from-destructive/20 to-destructive/5 border-destructive/30"
 };
 
 export function InteractiveCards({ cards, title, layout = 'carousel' }: InteractiveCardsProps) {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [viewedCards, setViewedCards] = useState<Set<number>>(new Set([0]));
 
   const goToNext = () => {
     const next = (currentIndex + 1) % cards.length;
     setCurrentIndex(next);
     setViewedCards(prev => new Set([...prev, next]));
   };
 
   const goToPrev = () => {
     setCurrentIndex((currentIndex - 1 + cards.length) % cards.length);
   };
 
   const goToCard = (index: number) => {
     setCurrentIndex(index);
     setViewedCards(prev => new Set([...prev, index]));
   };
 
   if (layout === 'grid') {
     return (
       <div className="w-full space-y-4">
         {title && <h3 className="font-bold text-foreground">{title}</h3>}
         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {cards.map((card, index) => {
             const IconComponent = card.icon ? iconMap[card.icon] || Shield : Shield;
             return (
               <motion.div
                 key={card.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
                 className={cn(
                   "p-4 rounded-xl border bg-gradient-to-br",
                   colorClasses[card.color || 'primary']
                 )}
               >
                 <div className="flex items-start gap-3">
                   <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center flex-shrink-0">
                     <IconComponent className="w-5 h-5 text-foreground" />
                   </div>
                   <div className="space-y-1 flex-1">
                     <h4 className="font-bold text-foreground">{card.title}</h4>
                     {card.subtitle && (
                       <p className="text-sm text-muted-foreground">{card.subtitle}</p>
                     )}
                     <p className="text-sm text-foreground/80">{card.content}</p>
                   </div>
                 </div>
               </motion.div>
             );
           })}
         </div>
       </div>
     );
   }
 
   // Carousel Layout
   const card = cards[currentIndex];
   const IconComponent = card.icon ? iconMap[card.icon] || Shield : Shield;
 
   return (
     <div className="w-full space-y-4">
       {title && <h3 className="font-bold text-foreground text-center">{title}</h3>}
       
       {/* Progress Indicators */}
       <div className="flex items-center justify-center gap-2">
         {cards.map((_, index) => (
           <button
             key={index}
             onClick={() => goToCard(index)}
             className={cn(
               "w-3 h-3 rounded-full transition-all",
               index === currentIndex 
                 ? "bg-primary scale-125" 
                 : viewedCards.has(index)
                   ? "bg-success/50"
                   : "bg-muted hover:bg-muted-foreground/30"
             )}
           />
         ))}
       </div>
 
       {/* Card Display */}
       <div className="relative overflow-hidden">
         <AnimatePresence mode="wait">
           <motion.div
             key={currentIndex}
             initial={{ opacity: 0, x: 100 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -100 }}
             transition={{ duration: 0.3 }}
             className={cn(
               "p-6 rounded-xl border bg-gradient-to-br min-h-[200px]",
               colorClasses[card.color || 'primary']
             )}
           >
             <div className="flex flex-col items-center text-center space-y-4">
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ delay: 0.2, type: "spring" }}
                 className="w-16 h-16 rounded-full bg-background/50 flex items-center justify-center"
               >
                 <IconComponent className="w-8 h-8 text-foreground" />
               </motion.div>
               
               <div>
                 <h4 className="text-xl font-bold text-foreground mb-2">{card.title}</h4>
                 {card.subtitle && (
                   <p className="text-sm text-muted-foreground mb-2">{card.subtitle}</p>
                 )}
                 <p className="text-foreground/80">{card.content}</p>
               </div>
             </div>
           </motion.div>
         </AnimatePresence>
       </div>
 
       {/* Navigation */}
       <div className="flex items-center justify-between">
         <Button
           variant="outline"
           onClick={goToPrev}
           className="gap-2"
         >
           <ChevronRight className="w-4 h-4" />
           <span>הקודם</span>
         </Button>
 
         <span className="text-sm text-muted-foreground">
           {currentIndex + 1} / {cards.length}
         </span>
 
         <Button
           onClick={goToNext}
           className="gap-2"
         >
           <span>הבא</span>
           <ChevronLeft className="w-4 h-4" />
         </Button>
       </div>
 
       {/* View Progress */}
       <div className="text-center">
         <span className="text-xs text-muted-foreground">
           צפית ב-{viewedCards.size} מתוך {cards.length} כרטיסים
         </span>
       </div>
     </div>
   );
 }