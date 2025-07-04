import React from 'react';
import { useEvents } from '../context/EventContext';
import DraggableEvent from './DraggableEvent';
import DroppableDay from './DroppableDay';

function CalendarGrid({ currentDate, selectedDate, onDateClick, onEditEvent }) {
  const { events, deleteEvent } = useEvents();

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const renderDays = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
    const days = [];
    const today = new Date();

    const prevMonthDays = startingDay;
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonthLastDay - i);
      days.push(renderDay(date, true, today));
    }

    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push(renderDay(date, false, today));
    }

    
    const remainingDays = 42 - days.length;
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);
      days.push(renderDay(date, true, today));
    }

    return days;
  };

  const renderDay = (date, isOutsideMonth, today) => {
    const dateStr = date.toDateString();
    const dayEvents = events[dateStr] || [];
    const isToday = today.toDateString() === dateStr;
    const isSelected = selectedDate?.toDateString() === dateStr;

    return (
      <div
        key={dateStr}
        className={`
          relative min-h-[100px] p-2 border bg-white transition-all duration-200 cursor-pointer
          ${isToday ? 'border-blue-500 bg-blue-50' : ''}
          ${isOutsideMonth ? 'bg-gray-100 text-gray-400' : ''}
          ${isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''}
          hover:bg-blue-50
        `}
        onClick={() => onDateClick(date)}
      >
        <div className="text-sm font-semibold mb-1 text-gray-700">{date.getDate()}</div>
        <DroppableDay date={date}>
          <div className="space-y-1 overflow-y-auto max-h-[70px] text-xs">
            {dayEvents.slice(0, 3).map((event) => (
              <DraggableEvent
                key={event.id}
                event={event}
                onDelete={deleteEvent}
                onEdit={onEditEvent}
              />
            ))}
            {dayEvents.length > 3 && (
              <div className="text-[10px] text-gray-500 pl-1">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </DroppableDay>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-7 gap-[1px] bg-gray-300 border rounded-lg overflow-hidden shadow-md">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div
          key={day}
          className="p-2 text-sm font-bold text-center bg-blue-100 text-blue-800 border-b border-gray-300"
        >
          {day}
        </div>
      ))}
      {renderDays()}
    </div>
  );
}

export default CalendarGrid;
