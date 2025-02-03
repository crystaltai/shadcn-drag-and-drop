'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import DraggableSpace from '@/components/DraggableSpace';
import { Pill } from '@/app/page';

interface Props {
  pills: Pill[];
}

const ReactPills = ({ pills }: Props) => {
  const [items, setItems] = useState<Pill[]>(pills);

  const [draggedItem, setDraggedItem] = useState<Pill | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<Pill | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Pill) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, item: Pill) => {
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
    <DraggableSpace>
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
    </DraggableSpace>
  );
};

export default ReactPills;
