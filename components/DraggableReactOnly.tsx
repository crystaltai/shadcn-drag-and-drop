'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Pill } from '@/app/page';

type Item = {
  id: number;
  text: string;
  width: number;
};

interface Props {
  pills: Pill[];
}

const DraggableReactOnly = ({ pills }: Props) => {
  const [items, setItems] = useState<Item[]>(pills);

  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<Item | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Item) => {
    setDraggedItem(item);
    // Set the drag image to be the entire pill element
    const pill = e.target as HTMLDivElement;
    e.dataTransfer.setDragImage(pill, pill.offsetWidth / 2, pill.offsetHeight / 2);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, item: Item) => {
    e.preventDefault();
    setDraggedOverItem(item);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!draggedItem || !draggedOverItem || draggedItem.id === draggedOverItem.id) {
      return;
    }

    const newItems = [...items];
    const draggedIndex = items.findIndex(item => item.id === draggedItem.id);
    const dropIndex = items.findIndex(item => item.id === draggedOverItem.id);

    // Remove the dragged item and insert it at the new position
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, removed);

    setItems(newItems);
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  return (
    <div>
      <div
        className="flex flex-wrap items-start gap-2 p-4 bg-gray-100 rounded-lg max-w-[800px] min-h-32"
        style={{ alignContent: 'flex-start' }}
      >
        {items.map(item => (
          <Badge
            key={item.id}
            draggable
            onDragStart={e => handleDragStart(e, item)}
            onDragOver={e => handleDragOver(e, item)}
            onDrop={handleDrop}
            style={{ width: item.width }}
            className={`
              px-2 py-1
              rounded-md
              text-white 
              cursor-grab 
              flex 
              items-center 
              justify-center
              transition-colors
              whitespace-nowrap
              ${draggedOverItem?.id === item.id ? 'bg-gray-600' : ''}
              ${draggedItem?.id === item.id ? 'opacity-50' : ''}
            `}
          >
            {item.text}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default DraggableReactOnly;
