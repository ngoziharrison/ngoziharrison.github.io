import ReactMarkdown from 'react-markdown';

interface BlogViewProps {
    isOpen: boolean;
    onClose: () => void;
    blogpost: string | null;
}



export function getBlogPostMetadata(filePath: string, content: string) {
    const raw = content as string
    const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/)
    const frontmatter = frontmatterMatch ? frontmatterMatch[1] : ''
    const title = frontmatter.match(/title:\s*(.+)/)?.[1]?.trim() ?? ''
    const date = frontmatter.match(/date:\s*(.+)/)?.[1]?.trim() ?? ''
    const draft = frontmatter.match(/draft:\s*(.+)/)?.[1]?.trim()
    const body = raw.replace(/^---[\s\S]*?---\n/, '')
    return {
        slug: filePath.replace('./blog/', '').replace('.md', ''),
        title,
        date,
        draft: draft === undefined || draft === 'true',
        body
    }
}



export function BlogView({ isOpen, onClose, blogpost }: BlogViewProps) {
    if (!isOpen) return null;
    const parsedblogpost = blogpost ? getBlogPostMetadata(blogpost, blogpost) : null
    const content = parsedblogpost ? parsedblogpost.body : 'Blog post not found.'
    return (
        <div className="fixed inset-0 z-10 flex justify-end">
            <div className="hidden md:flex flex-1 bg-black/50" onClick={onClose} />
            <div className="w-full md:w-full h-full dark:bg-[#191919] flex flex-col">
                <div className='h-10 bg-white flex items-center'>
                    <button onClick={onClose} className="p-2 text-black">✕ Close</button>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto p-4">
                    <div className="prose prose-invert mx-auto">
                        <p className="text-white text-6xl mb-0">{parsedblogpost?.title}</p>
                        <p className="text-white text-sm mx-1 mb-6">Published {parsedblogpost?.date}</p>
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}