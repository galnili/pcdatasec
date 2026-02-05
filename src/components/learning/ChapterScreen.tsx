 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { useLearning } from "@/contexts/LearningContext";
 import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Play } from "lucide-react";
 import { motion } from "framer-motion";
 
 export function ChapterScreen() {
   const { 
     currentChapterId, 
     getCurrentChapter, 
     goToQuestion, 
     nextChapter,
     previousChapter,
     completedChapters 
   } = useLearning();
 
   const chapter = getCurrentChapter();
   
   if (!chapter) return null;
 
   const hasQuestion = chapter.question !== undefined;
   const isCompleted = completedChapters.has(chapter.id);
 
   return (
     <div className="min-h-screen pt-24 pb-8 px-4">
       <div className="max-w-3xl mx-auto space-y-6">
         {/* Chapter header */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center space-y-2"
         >
           <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
             <BookOpen className="w-4 h-4" />
             <span className="font-montserrat">פרק {currentChapterId}</span>
           </div>
           <h1 className="text-3xl font-bold text-foreground">{chapter.title}</h1>
         </motion.div>
 
         {/* Content Card */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
         >
           <Card className="shadow-lg border-0 bg-card">
             <CardHeader>
               <CardTitle className="text-xl text-foreground">
                 {chapter.content.title}
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               <p className="text-foreground/80 leading-relaxed">
                 {chapter.content.description}
               </p>
               
               <div className="space-y-3 mt-6">
                 {chapter.content.points.map((point, index) => (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.2 + index * 0.1 }}
                     className="flex items-start gap-3 p-3 bg-background rounded-lg"
                   >
                     <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                     <span className="text-foreground">{point}</span>
                   </motion.div>
                 ))}
               </div>
             </CardContent>
           </Card>
         </motion.div>
 
         {/* Navigation */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="flex justify-between items-center pt-4"
         >
           <Button
             variant="outline"
             onClick={previousChapter}
             disabled={currentChapterId === 1}
             className="gap-2"
           >
             <ArrowRight className="w-4 h-4" />
             <span>הקודם</span>
           </Button>
 
           {hasQuestion ? (
             <Button
               onClick={goToQuestion}
               className="gap-2 px-6"
             >
               <Play className="w-4 h-4" />
               <span>לסימולציה</span>
             </Button>
           ) : (
             <Button
               onClick={nextChapter}
               className="gap-2 px-6"
             >
               <span>הבא</span>
               <ArrowLeft className="w-4 h-4" />
             </Button>
           )}
         </motion.div>
       </div>
     </div>
   );
 }