'use client';

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { Pill } from '@/app/page';
import { Badge } from '@/components/ui/badge';
import DraggableSpace from '@/components/DraggableSpace';

interface Props {
  pills: Pill[];
}

const DropLineIndicator = () => <div className="w-0.5 h-6 bg-gray-500 mx-1" />;

const SortablePill = ({ item }: { item: Pill }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id: item.id });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Badge
      ref={setNodeRef}
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
        !ring-0
        ${isMounted && isDragging ? 'opacity-50' : ''}
      `}
      {...(isMounted ? attributes : {})}
      {...(isMounted ? listeners : {})}
    >
      {item.text}
    </Badge>
  );
};

const DndPills = ({ pills }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [items, setItems] = useState(pills);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (!event.over) {
      setOverIndex(null);
      return;
    }

    const overIndex = items.findIndex(item => item.id === event.over?.id);
    const activeIndex = items.findIndex(item => item.id === event.active.id);

    // If dragging before the target, show indicator after the target
    if (activeIndex > overIndex) {
      setOverIndex(overIndex);
    } else {
      // If dragging after the target, show indicator before the target
      setOverIndex(overIndex + 1);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
    setOverIndex(null);
  };

  // Render static version during SSR and hydration
  if (!isMounted) {
    return (
      <DraggableSpace>
        {items.map(item => (
          <Badge
            key={item.id}
            style={{ width: item.width }}
            className="px-2 py-1 rounded-md text-white cursor-grab flex items-center justify-center transition-colors whitespace-nowrap"
          >
            {item.text}
          </Badge>
        ))}
      </DraggableSpace>
    );
  }

  // Render interactive version after hydration
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <DraggableSpace>
        <SortableContext items={items.map(item => item.id)}>
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {/* Only show the indicator if it's the first position or after this pill */}
              {overIndex === index && index === 0 && <DropLineIndicator />}
              <SortablePill item={item} />
              {overIndex === index + 1 && activeId !== item.id && <DropLineIndicator />}
            </React.Fragment>
          ))}
        </SortableContext>
      </DraggableSpace>

      {isMounted && activeId && (
        <DragOverlay>
          <Badge
            style={{ width: items.find(item => item.id === activeId)?.width }}
            className="px-2 py-1 rounded-md text-white cursor-grab flex items-center justify-center transition-colors whitespace-nowrap !ring-0"
          >
            {items.find(item => item.id === activeId)?.text}
          </Badge>
        </DragOverlay>
      )}
    </DndContext>
  );
};

export default DndPills;
