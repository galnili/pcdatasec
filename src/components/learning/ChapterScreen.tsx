 import { Button } from "@/components/ui/button";
 import { Card, CardContent } from "@/components/ui/card";
 import { useLearning } from "@/contexts/LearningContext";
 import { ArrowLeft, ArrowRight, BookOpen, Play, Lightbulb } from "lucide-react";
 import { motion } from "framer-motion";
 import { FlipCards } from "./FlipCards";
 import { InteractiveTable } from "./InteractiveTable";
 import { FlowchartDiagram } from "./FlowchartDiagram";
 import { DominoEffect } from "./DominoEffect";
 import { ScenarioCards } from "./ScenarioCards";
 import { PhishingGame } from "./PhishingGame";
 import { HighlightBox } from "./HighlightBox";
 import { ComparisonTable } from "./ComparisonTable";
import { MatchingGame } from "./MatchingGame";
import { AnimatedSteps } from "./AnimatedSteps";
import { AccordionList } from "./AccordionList";
import { InteractiveCards } from "./InteractiveCards";
import { ContentSection, FlipCard, TableData, FlowchartStep, DominoItem, ScenarioScript, PhishingExample, ComparisonItem, MatchPair, AccordionItem, CarouselCard } from "@/data/types";
 import { chapters } from "@/data/learningModuleData";
 
 function renderSection(section: ContentSection, index: number) {
   switch (section.type) {
     case 'text':
       return (
         <motion.p
           key={index}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: index * 0.1 }}
           className="text-foreground/80 leading-relaxed"
         >
           {section.content as string}
         </motion.p>
       );
     case 'cards':
       return (
         <motion.div
           key={index}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: index * 0.1 }}
         >
           {section.title && <h3 className="font-bold text-foreground mb-4">{section.title}</h3>}
           <FlipCards cards={section.content as FlipCard[]} />
         </motion.div>
       );
     case 'table':
       return (
         <motion.div
           key={index}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: index * 0.1 }}
         >
           <InteractiveTable data={section.content as TableData} title={section.title} />
         </motion.div>
       );
     case 'flowchart':
       return (
         <motion.div
           key={index}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: index * 0.1 }}
         >
           <FlowchartDiagram steps={section.content as FlowchartStep[]} title={section.title} />
         </motion.div>
       );
     case 'domino':
       return (
         <motion.div
           key={index}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: index * 0.1 }}
         >
           <DominoEffect items={section.content as DominoItem[]} title={section.title} />
         </motion.div>
       );
     case 'scenario':
       return (
         <motion.div
           key={index}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: index * 0.1 }}
         >
           <ScenarioCards scripts={section.content as ScenarioScript[]} title={section.title} />
         </motion.div>
       );
     case 'phishing':
       return (
         <motion.div
           key={index}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: index * 0.1 }}
         >
           <PhishingGame examples={section.content as PhishingExample[]} title={section.title} />
         </motion.div>
       );
     case 'comparison':
       return (
         <motion.div
           key={index}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: index * 0.1 }}
         >
           <ComparisonTable items={section.content as ComparisonItem[]} title={section.title} />
         </motion.div>
       );
      case 'matching':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <MatchingGame pairs={section.content as MatchPair[]} title={section.title} />
          </motion.div>
        );
      case 'steps':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <AnimatedSteps steps={section.content as FlowchartStep[]} title={section.title} />
          </motion.div>
        );
      case 'accordion':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <AccordionList items={section.content as AccordionItem[]} title={section.title} />
          </motion.div>
        );
      case 'carousel':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <InteractiveCards cards={section.content as CarouselCard[]} title={section.title} />
          </motion.div>
        );
     case 'highlight':
       return (
         <HighlightBox
           key={index}
           type={section.title === 'quote' ? 'quote' : section.title?.includes('אזהרה') || section.title?.includes('דגל') ? 'warning' : 'important'}
           content={section.content as string}
           title={section.title !== 'quote' ? section.title : undefined}
         />
       );
     case 'warning':
       return <HighlightBox key={index} type="warning" content={section.content as string} title={section.title} />;
     case 'tip':
       return <HighlightBox key={index} type="tip" content={section.content as string} title={section.title} />;
     default:
       return null;
   }
 }
 
 export function ChapterScreen() {
   const { 
     currentChapterId, 
     getCurrentChapter, 
     goToQuestion, 
     nextChapter,
     previousChapter
   } = useLearning();
 
   const chapter = getCurrentChapter();
   
   if (!chapter) return null;
 
   const hasQuestion = chapter.question !== undefined;
 
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
             <span className="font-montserrat">פרק {currentChapterId} מתוך {chapters.length}</span>
           </div>
           <h1 className="text-3xl font-bold text-foreground">{chapter.title}</h1>
           {chapter.subtitle && (
             <p className="text-muted-foreground">{chapter.subtitle}</p>
           )}
         </motion.div>
 
         {/* Sections */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
         >
           <Card className="shadow-lg border-0 bg-card">
             <CardContent className="p-6 space-y-6">
               {chapter.sections.map((section, index) => renderSection(section, index))}
             </CardContent>
           </Card>
         </motion.div>
 
         {/* Key Takeaway */}
         {chapter.keyTakeaway && (
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3"
           >
             <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
             <div>
               <span className="font-bold text-primary text-sm">נקודה מרכזית: </span>
               <span className="text-foreground">{chapter.keyTakeaway}</span>
             </div>
           </motion.div>
         )}
 
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