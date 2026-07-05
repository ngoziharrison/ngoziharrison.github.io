import { useEffect, useState } from 'react'
import type { Presentation } from './types'



export function Presentations() {
    const [files, setFiles] = useState<Presentation[]>([])

    useEffect(() => {
        fetch('/presentations.json')
            .then(res => res.json())
            .then((data: Presentation[]) => setFiles(data))
    }, [])

    const grouped = files.reduce((acc, file) => {
        acc[file.type] ??= {}
        acc[file.type][file.year] ??= {}
        acc[file.type][file.year][file.class] ??= []
        acc[file.type][file.year][file.class].push(file)
        return acc
    }, {} as Record<string, Record<string, Record<string, Presentation[]>>>)

    return (
        <div>
            {Object.entries(grouped).map(([type, years]) => (
                <Accordian key={type} title={type}>
                    {Object.entries(years).map(([year, classes]) => (
                        <Accordian key={year} title={year}>
                            {Object.entries(classes).map(([className, presentations]) => (
                                <Accordian key={className} title={className}>
                                    <ul className="px-0">
                                        {presentations.map(file => (
                                            <li key={file.path}>
                                                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    {file.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </Accordian>
                            ))}
                        </Accordian>
                    ))}
                </Accordian>
            ))}
        </div>
    )
}

function Accordian({ title, children }: { title: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border border-neutral-400 dark:border-neutral-700 rounded my-2">
            <button
                className="w-full text-left px-4 py-2 hover:bg-neutral-300 dark:hover:bg-neutral-700 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
            </button>
            {isOpen && <div className="px-4 py-2">{children}</div>}
        </div>
    )
}
