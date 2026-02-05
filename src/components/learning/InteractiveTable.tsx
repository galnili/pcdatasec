 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { ChevronDown, ChevronUp } from "lucide-react";
 import { TableData } from "@/data/types";
 import { cn } from "@/lib/utils";
 
 interface InteractiveTableProps {
   data: TableData;
   title?: string;
 }
 
 export function InteractiveTable({ data, title }: InteractiveTableProps) {
   const [expandedRow, setExpandedRow] = useState<number | null>(null);
 
   const toggleRow = (index: number) => {
     if (!data.expandableRows) return;
     setExpandedRow(prev => prev === index ? null : index);
   };
 
   return (
     <div className="w-full overflow-x-auto">
       {title && (
         <h3 className="font-bold text-foreground mb-3">{title}</h3>
       )}
       <div className="rounded-xl border border-border overflow-hidden">
         <table className="w-full">
           <thead>
             <tr className="bg-primary/10">
               {data.headers.map((header, index) => (
                 <th 
                   key={index}
                   className="px-4 py-3 text-right font-bold text-foreground text-sm"
                 >
                   {header}
                 </th>
               ))}
               {data.expandableRows && <th className="w-10"></th>}
             </tr>
           </thead>
           <tbody>
             {data.rows.map((row, rowIndex) => {
               const isExpanded = expandedRow === rowIndex;
               const rowKeys = Object.keys(row).filter(k => k !== 'details');
 
               return (
                 <motion.tr
                   key={rowIndex}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: rowIndex * 0.05 }}
                   onClick={() => toggleRow(rowIndex)}
                   className={cn(
                     "border-t border-border transition-colors",
                     data.expandableRows && "cursor-pointer hover:bg-muted/50",
                     isExpanded && "bg-muted/30"
                   )}
                 >
                   {rowKeys.map((key, cellIndex) => (
                     <td 
                       key={cellIndex}
                       className="px-4 py-3 text-sm text-foreground"
                     >
                       {row[key]}
                     </td>
                   ))}
                   {data.expandableRows && (
                     <td className="px-2">
                       {isExpanded ? (
                         <ChevronUp className="w-4 h-4 text-muted-foreground" />
                       ) : (
                         <ChevronDown className="w-4 h-4 text-muted-foreground" />
                       )}
                     </td>
                   )}
                 </motion.tr>
               );
             })}
           </tbody>
         </table>
       </div>
     </div>
   );
 }