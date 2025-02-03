import ReactPills from '@/components/ReactPills';
import DndPills from '@/components/DndPills';

export type Pill = {
  id: number;
  text: string;
  width: number;
};

export default function Home() {
  const PILLS: Pill[] = [
    { id: 1, text: '1. Short', width: 80 },
    { id: 2, text: '2. Medium Length', width: 120 },
    { id: 3, text: '3. Very Long Content Here', width: 180 },
    { id: 4, text: '4. Brief', width: 70 },
    { id: 5, text: '5. Another Long Pill Here', width: 170 },
    { id: 6, text: '6. Quick', width: 65 },
    { id: 7, text: '7. Extended Content Pill', width: 160 },
    { id: 8, text: '8. Tiny', width: 60 },
    { id: 9, text: '9. Substantial Length Text', width: 175 },
    { id: 10, text: '10. Last One', width: 90 },
  ];

  return (
    <main className="flex flex-col items-center justify-items-center min-h-screen p-8 gap-12 font-[family-name:var(--font-geist-sans)]">
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
  );
}
