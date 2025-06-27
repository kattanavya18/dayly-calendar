import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';
import EventModal from './EventModal';
import EventList from './EventList';
import SearchBar from './SearchBar';
import ExportButton from './ExportButton';
import { Toaster } from './ui/toaster';

function isOverlapping(a, b) {
  return new Date(a.start) < new Date(b.end) && new Date(b.start) < new Date(a.end);
}

function hasConflict(newEvent, allEvents) {
  return allEvents.some(existing => {
    if (newEvent.id && newEvent.id === existing.id) return false;
    return isOverlapping(newEvent, existing);
  });
}

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleSaveEvent = (newEvent) => {
    if (hasConflict(newEvent, events)) {
      alert("⚠️ Conflict! Another event is scheduled during this time.");
      return;
    }

    if (newEvent.id) {
      setEvents(prev =>
        prev.map(ev => (ev.id === newEvent.id ? newEvent : ev))
      );
    } else {
      setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
    }

    handleCloseModal();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {/* 🌟 FULL SCREEN SKY BLUE CONTAINER */}
      <div className="w-full min-h-screen bg-sky-100 px-4 py-6 flex flex-col space-y-4 animate-fadeIn">
        
        {/* 🔍 Header */}
        <div className="flex justify-between items-center">
          <SearchBar />
          <ExportButton />
        </div>

        {/* 🗓️ Main Content (Flexible Height) */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
          
          {/* 📅 Calendar Section */}
          <div className="flex-1 bg-white rounded-lg p-4 shadow overflow-auto">
            <CalendarHeader 
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            <CalendarGrid 
              currentDate={currentDate}
              selectedDate={selectedDate}
              events={events}
              onDateClick={handleDateClick}
              onEditEvent={handleEditEvent}
            />
          </div>

          {/* 📋 Sidebar */}
          {/* <div className="w-full lg:w-[300px] bg-white rounded-lg p-4 shadow overflow-auto">
            <EventList 
              selectedDate={selectedDate}
              events={events}
              onEditEvent={handleEditEvent}
            />
          </div> */}
        </div>

        {/* 💬 Modal + Toaster */}
        <EventModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedDate={selectedDate}
          editEvent={editingEvent}
          onSave={handleSaveEvent}
        />
        <Toaster />
      </div>
    </DndProvider>
  );
}

export default Calendar;
