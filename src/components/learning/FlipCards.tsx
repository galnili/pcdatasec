 import { useState } from "react";
 import { motion } from "framer-motion";
 import { cn } from "@/lib/utils";
 import { FlipCard } from "@/data/types";
 import { Shield, Lock, Clock, Eye, FileCheck, AlertTriangle } from "lucide-react";
 
 interface FlipCardsProps {
   cards: FlipCard[];
 }
 
 const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
   shield: Shield,
   lock: Lock,
   clock: Clock,
   eye: Eye,
   fileCheck: FileCheck,
   alert: AlertTriangle,
 };
 
 export function FlipCards({ cards }: FlipCardsProps) {
   const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
 
   const toggleCard = (index: number) => {
     setFlippedCards(prev => {
       const newSet = new Set(prev);
       if (newSet.has(index)) {
         newSet.delete(index);
       } else {
         newSet.add(index);
       }
       return newSet;
     });
   };
 
   return (
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       {cards.map((card, index) => {
         const isFlipped = flippedCards.has(index);
         const IconComponent = card.icon ? iconMap[card.icon] : Shield;
 
         return (
           <motion.div
             key={index}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: index * 0.1 }}
             className="perspective-1000 cursor-pointer h-48"
             onClick={() => toggleCard(index)}
           >
             <motion.div
               className="relative w-full h-full"
               style={{ transformStyle: "preserve-3d" }}
               animate={{ rotateY: isFlipped ? 180 : 0 }}
               transition={{ duration: 0.6 }}
             >
               {/* Front */}
               <div 
                 className={cn(
                   "absolute inset-0 backface-hidden rounded-xl p-4 flex flex-col items-center justify-center text-center",
                   "bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20",
                   "hover:border-primary/40 transition-colors"
                 )}
                 style={{ backfaceVisibility: "hidden" }}
               >
                 {IconComponent && <IconComponent className="w-10 h-10 text-primary mb-3" />}
                 <h3 className="font-bold text-foreground text-lg">{card.front}</h3>
                 <p className="text-xs text-muted-foreground mt-2">לחץ/י להפיכה</p>
               </div>
 
               {/* Back */}
               <div 
                 className={cn(
                   "absolute inset-0 backface-hidden rounded-xl p-4 flex items-center justify-center text-center",
                   "bg-primary text-primary-foreground"
                 )}
                 style={{ 
                   backfaceVisibility: "hidden",
                   transform: "rotateY(180deg)"
                 }}
               >
                 <p className="text-sm leading-relaxed">{card.back}</p>
               </div>
             </motion.div>
           </motion.div>
         );
       })}
     </div>
   );
 }