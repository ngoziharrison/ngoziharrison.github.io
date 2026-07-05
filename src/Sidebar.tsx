interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export function Sidebar({ isOpen, onClose, children }: SidebarProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-10 flex justify-end">
            <div className="hidden md:flex flex-1 dark:bg-black/50" onClick={onClose} />
            <div className="w-full md:w-1/2 h-full bg-white dark:bg-[#191919] flex flex-col">
                <div className='h-10 bg-white dark:bg-[#191919] flex items-center'>
                    <button onClick={onClose} className="p-2">✕ Close</button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
