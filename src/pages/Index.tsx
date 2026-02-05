import { LearningProvider } from "@/contexts/LearningContext";
import { LearningModule } from "@/components/learning/LearningModule";

const Index = () => {
  return (
    <LearningProvider>
      <LearningModule />
    </LearningProvider>
  );
};

export default Index;
