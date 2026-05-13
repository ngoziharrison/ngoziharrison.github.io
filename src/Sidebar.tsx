
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export function Sidebar({ isOpen, onClose, children }: SidebarProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-10 flex justify-end">
            <div className="flex-1 bg-black/50" onClick={onClose} />
            <div className="w-1/2 h-full dark:bg-[#191919] flex flex-col">
                <div className='h-10 bg-white'>
                    <button onClick={onClose} className="p-2 text-black self-start">✕ Close</button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
