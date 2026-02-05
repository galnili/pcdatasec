 // Learning Module Data - Security Training for Service Center
 
 export interface Question {
   id: string;
   scenario: string;
   customerName: string;
   question: string;
   options: {
     id: string;
     text: string;
     isCorrect: boolean;
   }[];
 }
 
 export interface Chapter {
   id: number;
   title: string;
   content: {
     title: string;
     description: string;
     points: string[];
   };
   interactionType: 'flipCards' | 'matching' | 'infographic' | 'dragDrop' | 'table' | 'flowchart' | 'checklist' | 'findFlags';
   question?: Question;
 }
 
 export const chapters: Chapter[] = [
   {
     id: 1,
     title: "מבוא לאבטחת מידע",
     content: {
       title: "מהי אבטחת מידע?",
       description: "אבטחת מידע היא הגנה על מידע מפני גישה, שימוש, חשיפה, שיבוש, שינוי או השמדה בלתי מורשים.",
       points: [
         "סודיות (Confidentiality) - רק מי שמורשה יכול לגשת למידע",
         "שלמות (Integrity) - המידע מדויק ולא שונה",
         "זמינות (Availability) - המידע זמין למורשים בכל עת"
       ]
     },
     interactionType: 'flipCards'
   },
   {
     id: 2,
     title: "למה המוקד קריטי?",
     content: {
       title: "מוקד השירות - נקודת כניסה קריטית",
       description: "מוקד השירות הוא יעד מועדף לתוקפים בגלל הגישה הישירה למידע רגיש.",
       points: [
         "ריבוי ערוצים - טלפון, צ'אט, מייל, וואטסאפ",
         "לחץ זמן - עומס שיחות מוביל לטעויות",
         "הנדסה חברתית - תוקפים מנצלים אמון ולחץ"
       ]
     },
     interactionType: 'infographic'
   },
   {
     id: 3,
     title: "מיפוי נכסי המידע",
     content: {
       title: "סוגי מידע רגיש",
       description: "הכר/י את סוגי המידע הרגיש שאת/ה מטפל/ת בהם יומיום.",
       points: [
         "פרטים מזהים - ת.ז., שם מלא, כתובת, טלפון",
         "מידע פיננסי - מספרי חשבון, כרטיסי אשראי, יתרות",
         "מידע רפואי/ביטוחי - פוליסות, תביעות, מצב בריאותי",
         "מסמכים רשמיים - חוזים, ייפויי כוח, אישורים"
       ]
     },
     interactionType: 'table',
     question: {
       id: "q1",
       customerName: "דנה",
       scenario: "דנה מתקשרת אלייך ואומרת: \"היי, אני צריכה לדעת מה מספר כרטיס האשראי שלי בחשבון, שכחתי אותו.\"",
       question: "מה מהבאים מהווה מידע רגיש הדורש אימות זהות לפני מסירה?",
       options: [
         { id: "a", text: "שעות פעילות הסניף", isCorrect: false },
         { id: "b", text: "מספר כרטיס האשראי שדנה מבקשת", isCorrect: true },
         { id: "c", text: "כתובת האתר של החברה", isCorrect: false },
         { id: "d", text: "שם המוצר שדנה רכשה", isCorrect: false }
       ]
     }
   },
   {
     id: 4,
     title: "מודל איום - טקטיקות תוקפים",
     content: {
       title: "כיצד תוקפים פועלים?",
       description: "למד/י לזהות את הטקטיקות הנפוצות של תוקפים.",
       points: [
         "התחזות - מציגים עצמם כלקוח, עובד IT, או גורם מוסמך",
         "דחיפות מלאכותית - \"זה דחוף!\", \"אני בטיסה עוד 5 דקות!\"",
         "משחק סמכות - \"אני המנכ\"ל\", \"דבר עם המנהל שלך\"",
         "פישינג - הודעות מזויפות ללקיחת פרטים"
       ]
     },
     interactionType: 'flipCards',
     question: {
       id: "q2",
       customerName: "אבי",
       scenario: "מתקשר אלייך מישהו שמציג את עצמו כאבי מצוות ה-IT:\n\n\"שלום, אני אבי ממחלקת המחשוב. יש לנו בעיה דחופה במערכת ואני צריך את הסיסמה שלך עכשיו כדי לתקן את זה. זה ממש דחוף!\"",
       question: "את/ה מזהה/ה שזה \"דגל אדום\". למה?",
       options: [
         { id: "a", text: "אבי מבקש לדעת את יתרת החשבון שלך", isCorrect: false },
         { id: "b", text: "אבי מספק ת.ז. ושם מלא", isCorrect: false },
         { id: "c", text: "אבי דורש את הסיסמה שלך בדחיפות", isCorrect: true },
         { id: "d", text: "אבי מבקש לעדכן כתובת", isCorrect: false }
       ]
     }
   },
   {
     id: 5,
     title: "ששת עקרונות העבודה",
     content: {
       title: "העקרונות המנחים",
       description: "ששה עקרונות שיעזרו לך לשמור על אבטחת המידע.",
       points: [
         "Need-to-Know - מסור/י רק מידע שהמבקש זקוק לו",
         "Minimum Necessary - מסור/י את המינימום ההכרחי",
         "Verify then Trust - אמת/י לפני שאת/ה סומך/ת",
         "Least Privilege - הרשאות מינימליות",
         "Secure by Default - ברירת מחדל מאובטחת",
         "If in Doubt, Escalate - בספק? העבר/י לממונה"
       ]
     },
     interactionType: 'flipCards',
     question: {
       id: "q3",
       customerName: "יוסי",
       scenario: "יוסי, עמית שלך מהמחלקה השכנה, ניגש אלייך ואומר:\n\n\"היי, אני צריך את רשימת הלקוחות לפרויקט שאני עובד עליו. תוכל/י לשלוח לי?\"",
       question: "מה את/ה עושה/עושה?",
       options: [
         { id: "a", text: "שולח/ת את הרשימה מיד ליוסי", isCorrect: false },
         { id: "b", text: "מוודא/ת שליוסי יש הרשאה ואישור מתאים לקבל את המידע", isCorrect: true },
         { id: "c", text: "מתעלם/ת מהבקשה של יוסי", isCorrect: false },
         { id: "d", text: "שולח/ת ליוסי רק חלק מהרשימה", isCorrect: false }
       ]
     }
   },
   {
     id: 6,
     title: "סיווג מידע והרשאות",
     content: {
       title: "רמות סיווג מידע",
       description: "לא כל מידע שווה - יש רמות סיווג שונות.",
       points: [
         "ציבורי - מידע שמותר לפרסם לכולם",
         "פנימי - מידע לשימוש עובדים בלבד",
         "חסוי - מידע רגיש הדורש הרשאה מיוחדת",
         "חסוי מאוד - מידע קריטי בגישה מוגבלת מאוד"
       ]
     },
     interactionType: 'table',
     question: {
       id: "q4",
       customerName: "מיכל",
       scenario: "מתקשרת אלייך מיכל ואומרת:\n\n\"שלום, אני מיכל, אשתו של רוני כהן. רוני נמצא בפגישה ואני צריכה לדעת מה היתרה בחשבון שלנו. אנחנו נשואים 20 שנה, הכל משותף.\"",
       question: "מה את/ה עושה/עושה?",
       options: [
         { id: "a", text: "מוסר/ת למיכל מידע כי היא בת זוג", isCorrect: false },
         { id: "b", text: "מבקש/ת ממיכל ייפוי כוח או שרוני יתקשר בעצמו", isCorrect: true },
         { id: "c", text: "מוסר/ת למיכל מידע חלקי בלבד", isCorrect: false },
         { id: "d", text: "מבקש/ת ממיכל לשלוח מייל", isCorrect: false }
       ]
     }
   },
   {
     id: 7,
     title: "תהליך אימות זהות",
     content: {
       title: "Runbook לאימות זהות",
       description: "תהליך מובנה לוודא שאת/ה מדבר/ת עם הלקוח הנכון.",
       points: [
         "שלב 1: בקש/י פרטים מזהים (ת.ז., שם מלא)",
         "שלב 2: אמת/י מול המערכת",
         "שלב 3: שאל/י שאלות אבטחה נוספות במידת הצורך",
         "שלב 4: רק אחרי אימות מלא - מסור/י מידע"
       ]
     },
     interactionType: 'flowchart',
     question: {
       id: "q5",
       customerName: "שירה",
       scenario: "שירה מתקשרת ואומרת:\n\n\"היי, אני שירה לוי. אני צריכה לשנות את כתובת המייל בחשבון שלי. המייל הישן נפרץ ואני לא יכולה להיכנס אליו יותר.\"",
       question: "מה נדרש ממך?",
       options: [
         { id: "a", text: "לשנות מיד את המייל לפי בקשתה של שירה", isCorrect: false },
         { id: "b", text: "לבצע אימות מוגבר כולל שאלות אבטחה לשירה", isCorrect: true },
         { id: "c", text: "לבקש משירה לשלוח מייל (מהמייל הישן)", isCorrect: false },
         { id: "d", text: "להעביר את שירה לממונה שלך", isCorrect: false }
       ]
     }
   },
   {
     id: 8,
     title: "מסירת מידע ותסריטי שירות",
     content: {
       title: "כלל המינימום במסירת מידע",
       description: "מסור/י רק את המינימום הנדרש, בצורה מקצועית.",
       points: [
         "אל תחשוף/י פרטים שלא נדרשו",
         "השתמש/י בניסוחים כלליים כשאפשר",
         "במקום סכום מדויק - \"יש יתרה לתשלום\"",
         "הימנע/י מפרטים שיכולים לשמש לגניבת זהות"
       ]
     },
     interactionType: 'checklist',
     question: {
       id: "q7",
       customerName: "אבי",
       scenario: "אבי מתקשר ושואל אותך ישירות:\n\n\"תגיד/י לי, כמה אני חייב לכם? אני צריך לדעת את הסכום המדויק.\"",
       question: "מה את/ה אומר/ת לאבי?",
       options: [
         { id: "a", text: "\"אבי, יש לך חוב של 5,000 ש\"ח מ-3 חודשים\"", isCorrect: false },
         { id: "b", text: "\"אבי, יש יתרה לתשלום. האם תרצה שאפרט?\"", isCorrect: true },
         { id: "c", text: "\"אבי, את/ה לא חייב כלום\"", isCorrect: false },
         { id: "d", text: "מעביר/ה את אבי ישירות לגבייה", isCorrect: false }
       ]
     }
   },
   {
     id: 9,
     title: "דגלים אדומים והסלמה",
     content: {
       title: "זיהוי סימני אזהרה",
       description: "למד/י לזהות מתי משהו \"לא מריח טוב\".",
       points: [
         "דחיפות קיצונית - \"זה חייב להיות עכשיו!\"",
         "חוסר עקביות בסיפור או בפרטים",
         "בקשות חריגות - סיסמאות, עקיפת נהלים",
         "ניסיון לגרום לך להרגיש אשם/ה או לחוץ/ה"
       ]
     },
     interactionType: 'findFlags',
     question: {
       id: "q8",
       customerName: "מאור",
       scenario: "השעה 21:55, עוד 5 דקות לסוף המשמרת שלך. מאור מתקשר ואומר בלחץ:\n\n\"תשמע/י, אני ממהר לטיסה ואין לי זמן לכל השאלות האלה. את/ה לא יכול/ה פשוט לעזור לי בלי כל הבירוקרטיה? אני לקוח ותיק!\"",
       question: "מה את/ה עושה/עושה?",
       options: [
         { id: "a", text: "עוזר/ת למאור מהר כי הוא ממהר וגם את/ה רוצה לסיים את המשמרת", isCorrect: false },
         { id: "b", text: "מתנצל/ת בפני מאור שאי אפשר לסטות מהנוהל ומבצע/ת אימות רגיל", isCorrect: true },
         { id: "c", text: "מקצר/ת את תהליך האימות למאור", isCorrect: false },
         { id: "d", text: "מעביר/ה את מאור לנציג/ה אחר/ת", isCorrect: false }
       ]
     }
   },
   {
     id: 10,
     title: "תיעוד נכון ואירועי אבטחה",
     content: {
       title: "תיעוד מקצועי ותגובה לאירועים",
       description: "תיעוד נכון מגן עלייך ועל הארגון.",
       points: [
         "תעד/י כל שיחה - מי, מתי, מה בוצע",
         "בעת חשד לאירוע: עצור/י → תעד/י → הסלם/י",
         "אל תודיע/י ללקוח החשוד על החשד",
         "דווח/י מיד לממונה או לאבטחת מידע"
       ]
     },
     interactionType: 'flowchart',
     question: {
       id: "q9",
       customerName: "רוני",
       scenario: "סיימת עכשיו שיחה עם רוני שביקש מידע על יתרת החשבון. ביצעת אימות מוגבר.",
       question: "מה התיעוד הנכון?",
       options: [
         { id: "a", text: "\"לקוח עצבני, ביקש פרטי חשבון\"", isCorrect: false },
         { id: "b", text: "\"רוני התקשר, בוצע אימות, נמסר מידע על יתרה\"", isCorrect: false },
         { id: "c", text: "\"רוני כהן ת.ז. XXX ביקש פרטים, בוצע אימות מוגבר, נמסרה יתרה בהתאם לנוהל\"", isCorrect: true },
         { id: "d", text: "\"שיחה רגילה\"", isCorrect: false }
       ]
     }
   }
 ];
 
 // Additional question for chapter 7 (second question)
 export const additionalQuestions: { [chapterId: number]: Question } = {
   7: {
     id: "q6",
     customerName: "נועה",
     scenario: "נועה שולחת לך הודעה בווטסאפ עם צילום מסך של פרטי החשבון שלה ואומרת:\n\n\"הנה ההוכחה שזה אני. עכשיו אפשר לקבל מידע על הפוליסה שלי?\"",
     question: "את/ה יודע/ת שהתשובה הנכונה היא:",
     options: [
       { id: "a", text: "צילום המסך של נועה מספיק לאימות", isCorrect: false },
       { id: "b", text: "צילום מסך אינו מהווה אימות ויש להפנות את נועה לערוץ מאובטח", isCorrect: true },
       { id: "c", text: "לבקש מנועה צילום נוסף של תעודת זהות", isCorrect: false },
       { id: "d", text: "לשלוח לנועה קוד לנייד ולהמשיך", isCorrect: false }
     ]
   },
   10: {
     id: "q10",
     customerName: "שירה",
     scenario: "אוי לא! בטעות מסרת פרטים של שירה לוי למישהו שהתחזה להיות שירה. רק עכשיו הבנת שזה לא היה הלקוח האמיתי.",
     question: "מה הצעד הראשון שלך?",
     options: [
       { id: "a", text: "מתקשר/ת לשירה האמיתית ומודיע/ה לה מיד", isCorrect: false },
       { id: "b", text: "עוצר/ת ומתעד/ת את כל הפרטים שנמסרו בטעות", isCorrect: true },
       { id: "c", text: "מתעלם/ת כי זה כבר קרה ואי אפשר לשנות", isCorrect: false },
       { id: "d", text: "מספר/ת לעמית/ה שלך ומבקש/ת עצה", isCorrect: false }
     ]
   }
 };
 
 export const badges = [
   { id: "secrets", name: "שומר/ת הסודות", icon: "🛡️", description: "סיום פרק CIA", chapter: 1 },
   { id: "threats", name: "מזהה/ה איומים", icon: "🔍", description: "זיהוי כל הדגלים האדומים", chapter: 4 },
   { id: "responder", name: "מגיב/ה מהיר/ה", icon: "⚡", description: "תגובה נכונה לאירוע אבטחה", chapter: 10 },
   { id: "expert", name: "מומחה/ית אבטחה", icon: "🏆", description: "ציון 90%+", chapter: null }
 ];