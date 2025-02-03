export default function DraggableSpace({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-wrap items-start gap-2 p-4 bg-gray-100 rounded-lg max-w-[800px] min-h-32"
      style={{ alignContent: 'flex-start' }}
    >
      {children}
    </div>
  );
}
