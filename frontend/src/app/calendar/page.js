"use client";

import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";

import Header from "../components/header";

/* -------------------- */
/* Reusable Calendar UI */
/* -------------------- */
function Calendar({
  events = [],
  onEventsChange,
  initialView = "dayGridMonth",
  height = "auto",
  weekends = true,
  dayMaxEvents = true,
  showAddButton = true,
  title = "Calendar View",
  ...props
}) {
  const calendarRef = useRef(null);
  const [localEvents, setLocalEvents] = useState(events);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("add");
  const [editingId, setEditingId] = useState(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [applyToSeries, setApplyToSeries] = useState(false);
  const [oldStartStr, setOldStartStr] = useState("");

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    type: "activity",
    recurrence: "none",
  });

  useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const eventClassNames = (arg) => {
    const type = arg.event.extendedProps?.type;
    return [type || ""];
  };

  const generateRRule = (recurrence) => {
    if (recurrence === "none") return undefined;
    return { freq: recurrence, interval: 1, count: 10 };
  };

  const updateEvents = (updater) => {
    const updated = updater(localEvents);
    setLocalEvents(updated);
    onEventsChange?.(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const common = {
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      extendedProps: { type: newEvent.type },
      ...(newEvent.recurrence !== "none" && {
        rrule: generateRRule(newEvent.recurrence),
      }),
    };

    if (mode === "edit") {
      updateEvents((prev) =>
        prev.map((e) => (e.id === editingId ? { ...e, ...common } : e))
      );
    } else {
      updateEvents((prev) => [
        ...prev,
        { id: Date.now().toString(), ...common },
      ]);
    }

    setShowModal(false);
    setMode("add");
    setEditingId(null);
  };

  return (
    <div className="w-full">
      <Header activeKey="Calendar" />

      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h1>{title}</h1>
          {showAddButton && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add New Event
            </button>
          )}
        </div>

        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            rrulePlugin,
          ]}
          initialView={initialView}
          events={localEvents}
          editable
          selectable
          eventClassNames={eventClassNames}
          height={height}
          weekends={weekends}
          dayMaxEvents={dayMaxEvents}
          {...props}
        />

        {showModal && (
          <form
            onSubmit={handleSubmit}
            className="fixed top-1/2 left-1/2 bg-white p-4 rounded"
            style={{ transform: "translate(-50%, -50%)", zIndex: 1000 }}
          >
            <input
              placeholder="Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              required
            />
            <button type="submit">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}

/* -------------------- */
/* ✅ PAGE COMPONENT    */
/* -------------------- */
export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  return (
    <Calendar
      events={events}
      onEventsChange={setEvents}
      initialView="dayGridMonth"
      height="auto"
    />
  );
}
