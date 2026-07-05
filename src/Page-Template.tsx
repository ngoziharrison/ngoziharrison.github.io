import React from 'react';
import { Footer } from './Footer'

interface PageTemplateProps {
    title: string
    desc: string
    date: string
    additionalInfo?: string
    children: React.ReactNode
}

export function PageTemplate({ title, desc, date, additionalInfo, children }: PageTemplateProps) {
    return (
        <div>
        <div className="max-w-6xl mx-auto mt-10">
            <div className="flex">
                <div className="w-14 flex-auto ..."><h1 className='text-5xl uppercase'>{title}</h1></div>

                <div className="w-32 flex-auto ..."><p>{desc}</p></div>
            </div>

            <div className="mt-10 flex w-full items-center justify-between mb-20">
                <p>{date}</p>
                {additionalInfo && <p>{additionalInfo}</p>}
            </div>
            {children}
            
        </div>
        <div className="position-absolute bottom-0">
        <Footer  />
        </div>
        </div>
    )
}