import { writeFileSync } from 'fs';

import type { Presentation } from '../src/types'

const types = ['Class Slides', 'Conferences'];

const res = await fetch('https://api.github.com/repos/ngoziharrison/ngozi-presentations/git/trees/main?recursive=1')
const data = await res.json()

function isPresentationFile(item: Presentation) {
    return item.type === 'blob' &&
        !item.path.includes('engine') &&
        (item.path.endsWith('/index.html') || item.path.endsWith('/index.htm'))
}

const files: Presentation[] = data.tree
    .map((item: any) => (console.log(item.path, isPresentationFile(item)), item))
    .filter(isPresentationFile)
    .flatMap((item: Presentation) => {
        const parts = item.path.split('/')
        if (parts.length > 5) return []
        const [type, year, className, name] = parts
        const folderPath = parts.slice(0, 4).join('/')
        console.log({ type, year, className, name, folderPath })
        if (!types.includes(type)) return []
        return [{
            name: name,
            path: folderPath,
            url: `https://ngoziharrison.github.io/ngozi-presentations/${folderPath}`,
            type,
            year,
            class: className
        }]


    })

writeFileSync('public/presentations.json', JSON.stringify(files, null, 2))
console.log(`Generated ${files.length} presentations`)