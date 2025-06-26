# 📆 Dayly: A Dynamic Event Calendar App

This is a feature-rich, fully responsive **Event Calendar** built with **React.js** and **Tailwind CSS**. It allows users to manage events with support for **adding, editing, deleting, recurring scheduling**, and **drag-and-drop rescheduling** — all while offering a clean and user-friendly interface.



##  Features Implemented

###  Monthly View Calendar
- Classic monthly calendar layout
- Highlights **today’s date**
- Navigation for previous/next months

###  Event Management
-  Add Events (with title, description, time, color)
-  Edit Events directly from calendar
-  Delete Events with confirmation
-  Assign Events to specific dates

###  Recurring Events
-  Repeat options:
  - **Daily**
  - **Weekly**
  - **Monthly**
  - **Custom** (every X days)
- Correctly displayed across all relevant dates

###  Drag-and-Drop Rescheduling
-  Drag events to new dates
- Automatically updates event schedule
- Prevents overlapping/conflicting events

###  Conflict Management
- Alerts users of **event time overlaps**
- Prevents scheduling conflicts visually & functionally

###  Search and Filter
-  Search by title or description
- Real-time filtering of matching events

###  Event Persistence
- All data stored in **LocalStorage**
- Events are saved even after page refresh

###  Responsive Design
-  Optimized for mobile and tablet views
- Clean layout across screen sizes

###  Export Functionality
-  Export all events as **JSON or CSV**

###  UI Highlights
-  Sky-blue themed background
-  Google Fonts (Poppins, Montserrat)
-  Toast notifications with animations
-  Conflict alerts with animation on top

---

##  Tech Stack

| Tech       | Description                          |
|------------|--------------------------------------|
| React.js   | Frontend JavaScript framework        |
| TailwindCSS| Utility-first CSS framework          |
| React DnD  | For drag-and-drop scheduling         |
| React Hook Form | Form handling                   |
| Lucide Icons | Icon set used in UI                |
| LocalStorage | Data persistence                   |

---

##  Getting Started

### Prerequisites
- Node.js ≥ 14
- npm or yarn

### Setup

```bash
# Clone this repository

# Navigate to project using cd

# Install dependencies
npm install

# Start development server
npm start
