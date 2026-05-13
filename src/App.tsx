import { useState } from 'react'
import './App.css'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { CV } from './CV'
import { About } from './About'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Teaching from './Teaching'

function App() {
  const [activePanel, setActivePanel] = useState<'cv' | 'about' | 'teaching' | null>(null)
  const postFiles = import.meta.glob('./blog/*.md', { query: '?raw', eager: true, import: 'default' })

  const posts = Object.entries(postFiles).map(([filePath, content]) => {
    const raw = content as string
    const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/)
    const frontmatter = frontmatterMatch ? frontmatterMatch[1] : ''
    const title = frontmatter.match(/title:\s*(.+)/)?.[1]?.trim() ?? ''
    const date = frontmatter.match(/date:\s*(.+)/)?.[1]?.trim() ?? ''
    const draft = frontmatter.match(/draft:\s*(.+)/)?.[1]?.trim()
    return {
      slug: filePath.replace('./blog/', '').replace('.md', ''),
      title,
      date,
      draft: draft === undefined || draft === 'true'
    }
  })
  return (
    <div className="flex flex-col min-h-screen">
      <section id="home" className="flex-1 flex flex-col items-start justify-start mx-4 my-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="writings">
            <AccordionTrigger className="text-8xl font-normal text-white">Ngozi Harrison</AccordionTrigger>
            <AccordionContent className='!h-auto'>
              <p className="text-xl text-neutral-300">I am a PhD student at UCLA in the department of Information Studies where I am advised by Dr. Safiya Noble</p>
              <p className="text-xl text-neutral-300">My research interests include critical computational and quantitative methods, the social aspects of mathematical knowledge, and the relationship between machine learning and society</p>

            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/*<p className="text-xl text-neutral-300">I am a PhD student at UCLA in the department of Information Studies where I am advised by Dr. Safiya Noble</p>
        <p className="text-xl text-neutral-300">My research focuses on the intersection</p>*/}
        <button onClick={() => setActivePanel('cv')} className="text-8xl text-white text-left hover:underline">C.V.</button>
        <button onClick={() => setActivePanel('teaching')} className="text-8xl text-white text-left hover:underline">Teaching</button>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="writings">
            <AccordionTrigger className="text-8xl font-normal text-white">Writings</AccordionTrigger>
            <AccordionContent className='!h-auto'>
              {/* Blog posts */}
              {posts.filter(post => !post.draft).map(post => (
                <div key={post.slug} className="mx-2">
                  <p className="text-5xl text-white">{post.title}</p>
                  <p className="text-white text-sm mx-1">Published {post.date}</p>
                </div>
              ))}

            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p className="text-8xl text-white">Research</p>
        <p className="text-8xl text-white">Presentations</p>
        <p className="text-8xl text-white">Current Reading</p>
        <button onClick={() => setActivePanel('about')} className="text-8xl text-white text-left hover:underline">About</button>
      </section>

      <Sidebar isOpen={activePanel !== null} onClose={() => setActivePanel(null)}>
        {activePanel === 'cv' && <CV />}
        {activePanel === 'about' && <About />}
        {activePanel === 'teaching' && <Teaching />}
      </Sidebar>

      <Footer />
    </div>
  )
}

export default App
