 import { Badge } from '../types';
 
 export const badges: Badge[] = [
   { 
     id: "secrets", 
     name: "שומר/ת הסודות", 
     icon: "🛡️", 
     description: "הבנת עקרונות CIA", 
     chapter: 1 
   },
   { 
     id: "threats", 
     name: "מזהה/ה איומים", 
     icon: "🔍", 
     description: "זיהוי טקטיקות תוקפים", 
     chapter: 4 
   },
   { 
     id: "principles", 
     name: "שולט/ת בעקרונות", 
     icon: "📋", 
     description: "ששת עקרונות העבודה", 
     chapter: 6 
   },
   { 
     id: "verifier", 
     name: "מאמת/ת מקצועי/ת", 
     icon: "✅", 
     description: "שליטה בתהליך אימות", 
     chapter: 8 
   },
   { 
     id: "responder", 
     name: "מגיב/ה מהיר/ה", 
     icon: "⚡", 
     description: "תגובה נכונה לאירוע אבטחה", 
     chapter: 14 
   },
   { 
     id: "expert", 
     name: "מומחה/ית אבטחה", 
     icon: "🏆", 
     description: "ציון 90%+", 
     chapter: null 
   }
 ];