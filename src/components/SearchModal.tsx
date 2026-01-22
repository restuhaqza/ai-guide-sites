import { Fragment, useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Search, FileText, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import clsx from 'clsx';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const { search, results } = useSearch();
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery(''); // Reset query when closed
        }
    }, [isOpen]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value;
        setQuery(q);
        search(q);
    };

    const handleSelect = (slug: string) => {
        navigate(`/docs/${slug}`);
        onClose();
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-background-void/80 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-brand-neon-blue/20 overflow-hidden rounded-xl bg-background-deep-mainframe border border-brand-neon-blue/30 shadow-2xl shadow-brand-neon-blue/20 transition-all">
                            <div className="relative">
                                <Search className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-text-muted" aria-hidden="true" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-text-primary placeholder:text-text-muted focus:ring-0 sm:text-sm font-sans"
                                    placeholder="Search documentation..."
                                    value={query}
                                    onChange={handleSearch}
                                />
                            </div>

                            {results.length > 0 && (
                                <ul className="max-h-96 overflow-y-auto p-2 scroll-py-2">
                                    {results.map((item) => (
                                        <li key={item.slug}>
                                            <button
                                                onClick={() => handleSelect(item.slug)}
                                                className={clsx(
                                                    'group flex w-full select-none items-center rounded-md p-3 hover:bg-white/5 transition-colors duration-150',
                                                )}
                                            >
                                                <div className={clsx(
                                                    'flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-brand-neon-blue/20',
                                                    item.matchType === 'title' ? 'bg-brand-neon-blue/10' : 'bg-brand-neon-pink/10'
                                                )}>
                                                    {item.matchType === 'title' ? (
                                                        <FileText className="h-6 w-6 text-brand-neon-blue" aria-hidden="true" />
                                                    ) : (
                                                        <Hash className="h-6 w-6 text-brand-neon-pink" aria-hidden="true" />
                                                    )}
                                                </div>
                                                <div className="ml-4 flex-auto text-left">
                                                    <p className={clsx(
                                                        'text-sm font-medium',
                                                        item.matchType === 'title' ? 'text-brand-neon-blue' : 'text-brand-neon-pink'
                                                    )}>
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs text-text-muted/80 line-clamp-1">
                                                        {item.matchType === 'title' ? item.description : item.snippet}
                                                    </p>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {query !== '' && results.length === 0 && (
                                <div className="p-6 text-center text-sm text-text-muted">
                                    <p>No results found for "{query}"</p>
                                </div>
                            )}

                            <div className="bg-background-crt-black/50 px-4 py-2 text-xs text-text-muted flex justify-between">
                                <span>Press <kbd className="font-mono bg-white/10 px-1 rounded">ESC</kbd> to close</span>
                                <span className="text-brand-neon-blue">AI Guide Search</span>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
