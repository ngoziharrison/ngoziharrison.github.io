import { useState } from 'react'
import './App.css'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { CV } from './CV'
import { About } from './About'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Teaching from './Teaching'
import { Presentations } from './Presentations'
import { BlogView } from './Blog-view'
import { getBlogPostMetadata } from './Blog-view'
import { CurrentReadingShelf } from './CurrentReadingShelf'
import { Toggle } from '@/components/ui/toggle'
import { NavLink } from "react-router"
import { Index } from './Index-Table'
import {  ArrowDown } from "lucide-react";

//import { Diagrams } from './diagrams'

function App() {
  const postFiles = import.meta.glob('./blog/*.md', { query: '?raw', eager: true, import: 'default' })
  const posts = Object.entries(postFiles).map(([filePath, content]) => {
    return getBlogPostMetadata(filePath, content as string)
  })

  const [activePanel, setActivePanel] = useState<'cv' | 'about' | 'teaching' | 'presentations' | null>(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash.startsWith('writing/')) return null
    return ['cv', 'about', 'teaching', 'presentations'].includes(hash) ? hash as any : null
  })

  const [activeBlogPost, setActiveBlogPost] = useState<string | null>(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash.startsWith('writing/')) {
      const slug = hash.replace('writing/', '')
      return postFiles[`./blog/${slug}.md`] as string ?? null
    }
    return null
  })

  const setPanel = (panel: typeof activePanel) => {
    window.location.hash = panel ?? ''
    setActivePanel(panel)
  }

  const openBlogPost = (slug: string) => {
    window.location.hash = `writing/${slug}`
    setActiveBlogPost(postFiles[`./blog/${slug}.md`] as string)
  }

  const closeBlogPost = () => {
    window.location.hash = ''
    setActiveBlogPost(null)
  }

  const toggleTheme = () => {
  const html = document.documentElement;
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};

  return (
    <div className="flex flex-col">
      {/* <Diagrams /> */}
      <section id="home" className="flex-1 flex flex-col items-start justify-start mx-2 md:mx-4 my-2 min-h-[100vh]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="bio">
            <AccordionTrigger className="text-6xl md:text-8xl font-normal">Ngozi Harrison</AccordionTrigger>
            <AccordionContent className='!h-auto'>
              <p className="text-base md:text-xl ">I am a PhD student at UCLA in the department of Information Studies where I am advised by Dr. Safiya Noble</p>
              <p className="text-base md:text-xl ">My research interests include critical computational and quantitative methods in social science research, critical data studies, philosophy of science, the social aspects of mathematical knowledge, and the relationship between machine learning and society</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <button onClick={() => setPanel('cv')} className="text-6xl md:text-8xl text-left hover:underline">C.V.</button>
        <button onClick={() => setPanel('teaching')} className="text-6xl md:text-8xl text-left hover:underline">Teaching</button>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="writings">
            <AccordionTrigger className="text-6xl md:text-8xl font-normal">Writings</AccordionTrigger>
            <AccordionContent className='!h-auto'>
              {posts.filter(post => !post.draft).map(post => (
                <div key={post.slug} className="mx-2 cursor-pointer" onClick={() => openBlogPost(post.slug)}>
                  <p className="text-2xl md:text-5xl">{post.title}</p>
                  <p className="text-sm mx-1">Published {post.date}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <NavLink to="research" className="text-6xl md:text-8xl hover:underline">Research</NavLink>
        {/* <button onClick={() => setPanel('presentations')} className="text-6xl md:text-8xl text-left hover:underline">Presentations</button> */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="current-reading">
            <AccordionTrigger className="text-6xl md:text-8xl font-normal">Current Reading</AccordionTrigger>
            <AccordionContent className='!h-auto'>
              <CurrentReadingShelf />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <button onClick={() => setPanel('about')} className="text-6xl md:text-8xl text-left hover:underline">About</button>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-black/30" />
        </div>
      </section>
      <Index></Index>

      <Sidebar isOpen={activePanel !== null} onClose={() => setPanel(null)}>        {activePanel === 'cv' && <CV />}
        {activePanel === 'about' && <About />}
        {activePanel === 'teaching' && <Teaching />}
        {activePanel === 'presentations' && <Presentations />}
      </Sidebar>
      <BlogView isOpen={activeBlogPost !== null} onClose={closeBlogPost} blogpost={activeBlogPost} />
      <Toggle onClick={toggleTheme} className="fixed bottom-4 right-4 px-4 py-2 bg-neutral-800! text-white! dark:bg-neutral-800 dark:text-white rounded hover:bg-neutral-700 focus:outline-none">Toggle Theme</Toggle>
      <Footer />
    </div>
  )
}

export default App
