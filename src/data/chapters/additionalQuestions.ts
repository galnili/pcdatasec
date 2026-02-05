 import { Question } from '../types';
 
 // Additional questions for chapters that have two questions
 export const additionalQuestions: { [chapterId: number]: Question } = {
   8: {
     id: "q6",
     customerName: "נועה",
     scenario: "נועה שולחת לך הודעה בווטסאפ עם צילום מסך של פרטי החשבון שלה ואומרת:\n\n\"הנה ההוכחה שזה אני. עכשיו אפשר לקבל מידע על הפוליסה שלי?\"",
     question: "את/ה יודע/ת שהתשובה הנכונה היא:",
     options: [
       { id: "a", text: "צילום המסך של נועה מספיק לאימות", isCorrect: false },
       { id: "b", text: "צילום מסך אינו מהווה אימות ויש להפנות את נועה לערוץ מאובטח", isCorrect: true },
       { id: "c", text: "לבקש מנועה צילום נוסף של תעודת זהות", isCorrect: false },
       { id: "d", text: "לשלוח לנועה קוד לנייד ולהמשיך", isCorrect: false }
     ],
     explanation: "WhatsApp הוא ערוץ לא מאובטח. צילום מסך יכול להיות מזויף או גנוב. יש להפנות לערוץ מאובטח לביצוע אימות תקין."
   }
 };