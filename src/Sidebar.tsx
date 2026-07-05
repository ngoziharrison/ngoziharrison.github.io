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
            <div className="w-full md:w-1/2 h-full bg-stone-200 dark:bg-[#191919] flex flex-col">
                <div className='h-10 bg-neutral-800 dark:bg-white flex items-center'>
                    <button onClick={onClose} className="p-2 text-white dark:text-black">✕ Close</button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
