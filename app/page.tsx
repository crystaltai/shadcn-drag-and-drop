import Link from 'next/link';
import ReactPills from '@/components/ReactPills';
import DndPills from '@/components/DndPills';

import { GithubIcon } from 'lucide-react';

export type Pill = {
  id: number;
  text: string;
  width: number;
};

export default function Home() {
  const PILLS: Pill[] = [
    { id: 1, text: '1. Short Pill', width: 90 },
    { id: 2, text: '2. Medium Length Pill', width: 150 },
    { id: 3, text: '3. Very Long Content Pill', width: 170 },
    { id: 4, text: '4. Brief Pill', width: 90 },
    { id: 5, text: '5. Another Long Pill Pill', width: 150 },
    { id: 6, text: '6. Quick Pill', width: 90 },
    { id: 7, text: '7. Extended Content Pill', width: 170 },
    { id: 8, text: '8. Tiny Pill', width: 80 },
    { id: 9, text: '9. Substantial Length Text Pill', width: 195 },
    { id: 10, text: '10. Last One Pill', width: 110 },
  ];

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pt-24 gap-12 font-[family-name:var(--font-geist-sans)]">
      <main className="flex-1 flex flex-col items-center justify-items-center gap-12">
        <div className="flex flex-col items-center justify-items-center gap-2">
          <h1 className="text-2xl font-medium">HTML5 Drag and Drop</h1>
          <div className="mt-4 text-sm text-gray-600">Uses the native HTML5 drag and drop API.</div>
          <ReactPills pills={PILLS} />
        </div>
        <div className="flex flex-col items-center justify-items-center gap-2">
          <h1 className="text-2xl font-medium">dnd-kit/core and dnd-kit/sortable</h1>
          <div className="mt-4 text-sm text-gray-600">
            Uses dnd-kit/core and dnd-kit/sortable using a line indicator for drop position.
          </div>
          <DndPills pills={PILLS} />
        </div>
      </main>
      <footer className="flex flex-col items-center justify-items-center gap-2">
        <div>
          <Link
            href="https://github.com/crystaltai/shadcn-drag-and-drop"
            className="hover:underline flex items-center gap-1"
            target="_blank"
          >
            <GithubIcon className="w-5 h-5" />
            <span>Code</span>
          </Link>
        </div>
        <p className="text-gray-600">
          Built by{' '}
          <Link href="https://x.com/crystaltaixyz" className="hover:underline" target="_blank">
            @crystaltaixyz
          </Link>
        </p>
      </footer>
    </div>
  );
}
