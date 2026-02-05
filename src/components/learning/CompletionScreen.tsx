 import { Button } from "@/components/ui/button";
 import { Card, CardContent } from "@/components/ui/card";
 import { useLearning } from "@/contexts/LearningContext";
 import { Trophy, RotateCcw, Star, Award } from "lucide-react";
 import { motion } from "framer-motion";
 import { cn } from "@/lib/utils";
 
 export function CompletionScreen() {
   const { 
     xp, 
     correctAnswers, 
     totalAnswers, 
     getBadges,
     restartModule 
   } = useLearning();
 
   const badges = getBadges();
   const earnedBadges = badges.filter(b => b.earned);
   const percentage = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
   const passedCertificate = percentage >= 80;
 
   return (
     <div className="min-h-screen pt-24 pb-8 px-4">
       <div className="max-w-2xl mx-auto space-y-6">
         {/* Trophy animation */}
         <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: "spring", duration: 0.8 }}
           className="flex justify-center"
         >
           <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
             <Trophy className="w-16 h-16 text-primary" />
           </div>
         </motion.div>
 
         {/* Title */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="text-center space-y-2"
         >
           <h1 className="text-3xl font-bold text-foreground">
             כל הכבוד! סיימת את ההכשרה
           </h1>
           <p className="text-muted-foreground">
             הנה הסיכום שלך
           </p>
         </motion.div>
 
         {/* Score Card */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
         >
           <Card className="border-0 shadow-lg overflow-hidden">
             <div className="bg-primary text-primary-foreground p-6 text-center">
               <div className="text-5xl font-bold font-montserrat mb-2">{percentage}%</div>
               <div className="text-primary-foreground/80">ציון סופי</div>
             </div>
             <CardContent className="p-6">
               <div className="grid grid-cols-3 gap-4 text-center">
                 <div>
                   <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary font-montserrat">
                     <Star className="w-5 h-5 fill-primary" />
                     {xp}
                   </div>
                   <div className="text-sm text-muted-foreground">XP</div>
                 </div>
                 <div>
                   <div className="text-2xl font-bold text-foreground font-montserrat">
                     {correctAnswers}/{totalAnswers}
                   </div>
                   <div className="text-sm text-muted-foreground">תשובות נכונות</div>
                 </div>
                 <div>
                   <div className="text-2xl font-bold text-foreground font-montserrat">
                     {earnedBadges.length}
                   </div>
                   <div className="text-sm text-muted-foreground">תגים</div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </motion.div>
 
         {/* Badges */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="space-y-3"
         >
           <h3 className="font-bold text-foreground flex items-center gap-2">
             <Award className="w-5 h-5 text-primary" />
             תגים שהושגו
           </h3>
           <div className="grid grid-cols-2 gap-3">
             {badges.map((badge, index) => (
               <motion.div
                 key={badge.id}
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.6 + index * 0.1 }}
               >
                 <Card className={cn(
                   "p-4 text-center transition-all",
                   badge.earned 
                     ? "border-primary/30 bg-primary/5" 
                     : "opacity-50 grayscale"
                 )}>
                   <div className="text-3xl mb-2">{badge.icon}</div>
                   <div className="font-medium text-foreground text-sm">{badge.name}</div>
                   <div className="text-xs text-muted-foreground">{badge.description}</div>
                 </Card>
               </motion.div>
             ))}
           </div>
         </motion.div>
 
         {/* Certificate message */}
         {passedCertificate && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8 }}
           >
             <Card className="border-2 border-success bg-success/5 p-6 text-center">
               <div className="text-success text-4xl mb-2">🎓</div>
               <div className="font-bold text-success">זכאי/ת לתעודת סיום!</div>
               <div className="text-sm text-muted-foreground">
                 עברת את ההכשרה בהצלחה עם ציון {percentage}%
               </div>
             </Card>
           </motion.div>
         )}
 
         {/* Restart button */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1 }}
         >
           <Button
             onClick={restartModule}
             variant="outline"
             className="w-full gap-2"
             size="lg"
           >
             <RotateCcw className="w-4 h-4" />
             <span>התחל/י מחדש</span>
           </Button>
         </motion.div>
       </div>
     </div>
   );
 }