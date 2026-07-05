import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ReactMarkdown from "react-markdown"

function row(title: string, date: string, type: string) {
  return (
    <div className="grid grid-cols-4 gap-4 w-full border-black  pt-1 pb-1 border-b-1 cursor-pointer">
  <div className="col-span-2 ">
    <p className="text-2xl md:text-3xl ">{title}</p>
  </div>

  <div className="col-span-1">
    <p className="text-2xl md:text-3xl text-right">{date}</p>
  </div>


  <div className="col-span-1">
    <p className="text-2xl md:text-3xl text-right">{type}</p>
  </div>
</div>

    
  );
}

const indexData = [
  { published: true, title: "Modeling Information Behavior and Practices using Hidden Markov Models: A Socio-cognitive Approach", date: "Ongoing", type: "Project", link: "/Research" },
  { published: true, title: "Cluster 10C Introduction to Critical AI and ML Studies", date: "Spring 2026", type: "Course", link: "/teaching/critical-ai-studies" },
  {published: true, title: " Cluster 10B Data, Justice, and Society", date: "Winter 2026", type:"Course", desc: "Cluster 10B Data Justice and Society \nTeaching Assistant \nData-based computation (i.e., algorithms, artificial intelligence, predictive modeling) increasingly play a dominant role in shaping everyday experiences of culture and society. Data and data analytics define everything from social relations and public policy to juridical status and market logistics. Study pursues thinking about ethics and justice in a data-driven society but focus on concrete case studies. Students gain critical understanding of technology sector, and also learn of community-engaged models of deploying data skills for social justice."},
  {published: true, title: " Cluster 10A Data, Justice, and Society", date: "Fall 2026", type:"Course", desc: "Cluster 10B Data Justice and Society \nTeaching Assistant \nData-based computation (i.e., algorithms, artificial intelligence, predictive modeling) increasingly play a dominant role in shaping everyday experiences of culture and society. Data and data analytics define everything from social relations and public policy to juridical status and market logistics. Study pursues thinking about ethics and justice in a data-driven society but focus on concrete case studies. Students gain critical understanding of technology sector, and also learn of community-engaged models of deploying data skills for social justice."},
  {published: false, title: "Another Project Title", date: "2024", type: "Project", desc: "Description for another project" },
  {published: false, title: "Yet Another Project Title", date: "2023", type: "Project", desc: "Description for yet another project" },
  {published: true, title: "Infrastructure and Critical Code Studies", type: "Guest Lecture", desc: "A guest lecture given to Prof. [Gregory Leazer](https://leazer.info/)'s Methods in Science and Technology Studies course. In this lecture I discussed the intersections of infrastructure studies and critical code studies as methodological traditions and approaches to studying technology and society. My approach to these methods comes via my engagement with Black studies, critical information studies, and Black computational thought. In this discussion we explored these theoretical frameworks and I provided examples of how these approaches inform my in progress research \n(see [slides](https://ngoziharrison.github.io/ngozi-presentations/IS%20298%20Guest%20Lecture/))" , date: "Jan 2026"},
  {published: true, date: "Spring 2025", type: "Course", title: "Cluster 10C The Long History of Computational Reason and Algorithmic Culture", desc: "Cluster 10C The Long History of Computational Reason and Algorithmic Culture\nInstructor of Record \nExamination of current developments in generative artificial intelligence (AI) within long history of information, mathematical formalism, and algorithmic culture. Investigation of social history of mathematical, philosophical, and information practices that led to development of current AI systems. Study addresses key areas of critical AI studies including fairness and bias, data politics, digital labor, classification, data colonialism, and algorithmic justice. Exploration of current architectures, philosophical inquiries, and social implications of AI systems, as well as potential algorithmic justice interventions."}
];


export function Index() {
  return (
    <div className="min-h-[50vh] flex flex-col items-start justify-start my-2 dark:bg-stone-200 w-full mt">
      <div className = "mx-20 mt-10 mb-20 w-[91%]">
      <h1 className="text-6xl md:text-6xl font-normal dark:text-black mb-5">Index</h1>
      <Accordion type="single" collapsible className="w-full dark:text-black border-black border-t-1">
        {indexData.filter(item => item.published).map((item, index) => (
          <AccordionItem key={index} value={`${index + 1}`} {...(item.link ? {onClick: () => window.location.href = item.link} : {})}>
            <AccordionTrigger className="text-6xl py-0! md:text-5xl font-normal hover:no-underline">{row(item.title, item.date, item.type)}</AccordionTrigger>
             { item.desc ? <AccordionContent className='h-auto!'>
              <ReactMarkdown components={{
          p: ({ children }) => (
            <p className="text-base md:text-xl py-8 whitespace-pre-line">{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="underline hover:opacity-80"
            >
              {children}
            </a>
          ),
        }}>{item.desc}</ReactMarkdown>
            </AccordionContent>: null } 
          </AccordionItem>
        ))}
      </Accordion>
      </div>
    </div>
  )
}