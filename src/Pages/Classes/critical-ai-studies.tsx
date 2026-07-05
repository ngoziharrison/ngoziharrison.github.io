import { PageTemplate } from "@/Page-Template";

const courseDesc = "In this course, we seek to understand current developments in generative AI and machine learning within a long history of information, mathematical formalisms, and algorithmic culture. We will investigate the social history of the mathematical, philosophical, and information practices that have led to the development of current AI systems. We will address key areas of Critical AI studies, including fairness and bias, data politics, digital labor, classification, data colonialism, and algorithmic justice. Students will become familiar with the current architectures, philosophical inquiries, and social implications of AI systems and explore potential algorithmic justice interventions."

export function CriticalAIStudies() {
  const cvPdfUrl = `${import.meta.env.BASE_URL}cv.pdf`;

  return (
    <PageTemplate title="cluster 10C INTRODUCTION TO CRITICAL AI STUDIES" desc={courseDesc} date="SPRING 2026" additionalInfo="University of California, Los Angeles">

      <iframe className="mb-20 w-full min-h-[560px] h-[80vh] max-h-[1200px]" src="https://docs.google.com/document/d/e/2PACX-1vQ8Shh3c_QV38awoCv03FmojNL64ZrpH1Nm4uZ8VDUbeldXWbw1kt8PqlWMYzEi2Do3G6PwFlKfTon6/pub?embedded=true"></iframe>
      <div className="flex flex-col ">
        
      </div>
      
      {/* <h1 className="text-4xl mb-4 self-start">Key Assignments</h1>

      <div className="mt-10 flex w-full flex-start items-start justify-between mb-20">
        <p className="flex-1">Investigate That Tech Report</p>
        <p className="flex-1">The Investigate that Tech Worksheet developed by the Detroit Community Technology project provides a framework for beginning to investigate the technology around us daily. We will adapt this worksheet to investigate the way AI is integrated into technologies we use everyday and document the design, affordances, and people behind these tools. After completing the worksheet in class, you will write a report based on your findings.</p>
      </div> */}
    

    </PageTemplate >
  );
}