 import { Button } from "@/components/ui/button";
 import { useLearning } from "@/contexts/LearningContext";
 import { Shield, ArrowLeft } from "lucide-react";
 
 export function WelcomeScreen() {
   const { startLearning } = useLearning();
 
   return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
       <div className="max-w-2xl text-center space-y-8">
         {/* Logo/Icon */}
         <div className="flex justify-center">
           <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
             <Shield className="w-12 h-12 text-primary" />
           </div>
         </div>
 
         {/* Title */}
         <div className="space-y-4">
           <h1 className="text-4xl md:text-5xl font-bold text-foreground">
             ברוך/ה הבא/ה להכשרת אבטחת מידע
           </h1>
           <p className="text-xl text-muted-foreground">
             בוא/י נתחיל את המסע יחד
           </p>
         </div>
 
         {/* Description */}
         <div className="bg-card rounded-2xl p-6 shadow-sm">
           <p className="text-lg text-foreground leading-relaxed">
             במודול זה תלמד/י כיצד לשמור על אבטחת המידע במוקד השירות.
             תכיר/י טכניקות של תוקפים, תתרגל/י סימולציות מציאותיות,
             ותצבור/י ניקוד ותגים לאורך הדרך.
           </p>
         </div>
 
         {/* Stats preview */}
         <div className="grid grid-cols-3 gap-4">
           <div className="bg-card rounded-xl p-4">
             <div className="text-3xl font-bold text-primary">10</div>
             <div className="text-sm text-muted-foreground">פרקים</div>
           </div>
           <div className="bg-card rounded-xl p-4">
             <div className="text-3xl font-bold text-primary">10</div>
             <div className="text-sm text-muted-foreground">שאלות</div>
           </div>
           <div className="bg-card rounded-xl p-4">
             <div className="text-3xl font-bold text-primary">4</div>
             <div className="text-sm text-muted-foreground">תגים</div>
           </div>
         </div>
 
         {/* CTA Button */}
         <Button
           size="lg"
           onClick={startLearning}
           className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
         >
           <span>בוא/י נתחיל</span>
           <ArrowLeft className="mr-2 h-5 w-5" />
         </Button>
       </div>
     </div>
   );
 }