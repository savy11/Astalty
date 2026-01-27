"use client";

import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";

import Header from "../components/header";

function Calendar({
  events = [],
  onEventsChange,
  initialView = "dayGridMonth",
  height = "auto",
  weekends = true,
  dayMaxEvents = true,
  showAddButton = true,
  title = "Calendar View",
  // ... other FullCalendar props can be passed through
  ...props
}) {
  const calendarRef = useRef(null);
  const [localEvents, setLocalEvents] = useState(events);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("add"); // 'add' or 'edit'
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

  // Sync external events changes - with content check to prevent infinite loops from reference changes
  useEffect(() => {
    setLocalEvents((current) => {
      if (JSON.stringify(current) !== JSON.stringify(events)) {
        return events;
      }
      return current;
    });
  }, [events]);

  // Event classNames for color-coding
  const eventClassNames = (arg) => {
    const type = arg.event.extendedProps?.type;
    return [type || ""];
  };

  // Generate RRULE
  const generateRRule = (recurrence) => {
    if (recurrence === "none") return undefined;
    return {
      freq: recurrence,
      interval: 1,
      count: 10,
    };
  };

  // Reset form
  const resetForm = () => {
    setNewEvent({
      title: "",
      start: "",
      end: "",
      type: "activity",
      recurrence: "none",
    });
  };

  // Update events (local + callback)
  const updateEvents = (updater) => {
    const newEvents = updater(localEvents);
    setLocalEvents(newEvents);
    onEventsChange?.(newEvents);
  };

  // Handle "Add New Event" button
  const handleAddClick = () => {
    const now = new Date();
    const startStr = now.toISOString().slice(0, 16);
    const endStr = new Date(now.getTime() + 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16);
    setMode("add");
    setEditingId(null);
    setIsRecurring(false);
    setApplyToSeries(false);
    setOldStartStr("");
    setNewEvent({
      title: "",
      start: startStr,
      end: endStr,
      type: "activity",
      recurrence: "none",
    });
    setShowModal(true);
  };

  // Handle date select
  const handleDateSelect = (selectInfo) => {
    const startStr = selectInfo.startStr.slice(0, 16);
    const endStr = selectInfo.endStr.slice(0, 16);
    setMode("add");
    setEditingId(null);
    setIsRecurring(false);
    setApplyToSeries(false);
    setOldStartStr("");
    setNewEvent({
      title: "",
      start: startStr,
      end: endStr,
      type: "activity",
      recurrence: "none",
    });
    setShowModal(true);
    selectInfo.view.calendar.unselect();
  };

  // Handle event click
  const handleEventClick = (clickInfo) => {
    const master = localEvents.find((e) => e.id === clickInfo.event.id);
    const isRecur = !!master?.rrule;
    const recurFreq = isRecur ? master.rrule.freq : "none";
    setMode("edit");
    setEditingId(clickInfo.event.id);
    setIsRecurring(isRecur);
    setApplyToSeries(!isRecur);
    setOldStartStr(clickInfo.event.startStr);
    setNewEvent({
      title: clickInfo.event.title,
      start: clickInfo.event.startStr.slice(0, 16),
      end: clickInfo.event.endStr.slice(0, 16),
      type: clickInfo.event.extendedProps?.type,
      recurrence: recurFreq,
    });
    setShowModal(true);
  };

  // Handle event drop
  const handleEventDrop = (info) => {
    updateEvents((prev) =>
      prev.map((event) =>
        event.id === info.event.id
          ? {
              ...event,
              start: info.event.startStr,
              end: info.event.endStr,
            }
          : event
      )
    );
  };

  // Handle event resize
  const handleEventResize = (info) => {
    updateEvents((prev) =>
      prev.map((event) =>
        event.id === info.event.id
          ? {
              ...event,
              start: info.event.startStr,
              end: info.event.endStr,
            }
          : event
      )
    );
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Please fill in all fields");
      return;
    }
    if (new Date(newEvent.end) <= new Date(newEvent.start)) {
      alert("End time must be after start time");
      return;
    }

    const title = newEvent.title;
    const start = newEvent.start;
    const end = newEvent.end;
    const type = newEvent.type;
    const shouldAddRrule =
      (mode === "add" || applyToSeries || !isRecurring) &&
      newEvent.recurrence !== "none";
    const rrule = shouldAddRrule
      ? generateRRule(newEvent.recurrence, start)
      : undefined;

    const commonUpdates = {
      title,
      start,
      end,
      extendedProps: { type },
      ...(rrule && { rrule }),
    };

    if (mode === "edit") {
      if (isRecurring && !applyToSeries) {
        // Edit single instance
        updateEvents((prev) => {
          let newEvents = [...prev];
          // Add exdate to master
          const masterIdx = newEvents.findIndex((e) => e.id === editingId);
          if (masterIdx !== -1) {
            const master = { ...newEvents[masterIdx] };
            if (!master.exdate) master.exdate = [];
            if (!master.exdate.includes(oldStartStr)) {
              master.exdate.push(oldStartStr);
            }
            newEvents[masterIdx] = master;
          }
          // Add new individual event
          const newIndividual = {
            id: `edit-instance-${Date.now()}`,
            ...commonUpdates,
          };
          newEvents.push(newIndividual);
          return newEvents;
        });
      } else {
        // Update existing
        updateEvents((prev) =>
          prev.map((e) => (e.id === editingId ? { ...e, ...commonUpdates } : e))
        );
      }
    } else {
      // Add new
      const newId = Date.now().toString();
      const newEv = { id: newId, ...commonUpdates };
      updateEvents((prev) => [...prev, newEv]);
    }

    setShowModal(false);
    setEditingId(null);
    setMode("add");
    setIsRecurring(false);
    setApplyToSeries(false);
    setOldStartStr("");
    resetForm();
  };

  // Handle delete
  const handleDelete = () => {
    if (mode !== "edit") return;
    const master = localEvents.find((e) => e.id === editingId);
    const isRecur = !!master?.rrule;
    let doDeleteSeries = true;
    if (isRecur) {
      doDeleteSeries = confirm(
        "This is a recurring event. Delete the entire series? (Click Cancel to delete only this instance.)"
      );
    }
    if (doDeleteSeries) {
      updateEvents((prev) => prev.filter((e) => e.id !== editingId));
    } else {
      updateEvents((prev) => {
        const index = prev.findIndex((e) => e.id === editingId);
        if (index === -1) return prev;
        const updated = { ...prev[index] };
        if (!updated.exdate) updated.exdate = [];
        if (!updated.exdate.includes(oldStartStr)) {
          updated.exdate.push(oldStartStr);
        }
        const newEvents = [...prev];
        newEvents[index] = updated;
        return newEvents;
      });
    }
    setShowModal(false);
    setEditingId(null);
    setMode("add");
    setIsRecurring(false);
    setApplyToSeries(false);
    setOldStartStr("");
    resetForm();
  };

  // Handle input change
  const handleInputChange = (field) => (e) => {
    setNewEvent({ ...newEvent, [field]: e.target.value });
  };

  const showRecurrence =
    mode === "add" || (mode === "edit" && (!isRecurring || applyToSeries));

  return (
    <div className="w-full">
      <Header activeKey="Calendar" />
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <h1 className="pt-2">{title}</h1>
          {showAddButton && (
            <button
              onClick={handleAddClick}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ease-linear"
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
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          events={localEvents}
          eventClassNames={eventClassNames}
          editable={true}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          height={height}
          weekends={weekends}
          dayMaxEvents={dayMaxEvents}
          {...props}
        />
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              zIndex: 1000,
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <h2>{mode === "add" ? "Add Event" : "Edit Event"}</h2>
            {mode === "edit" && isRecurring && (
              <div style={{ marginBottom: "10px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={applyToSeries}
                    onChange={(e) => setApplyToSeries(e.target.checked)}
                  />
                  Apply changes to entire series
                </label>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <label>Title:</label>
                <input
                  type="text"
                  placeholder="Event title"
                  value={newEvent.title}
                  onChange={handleInputChange("title")}
                  required
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Start Time:</label>
                <input
                  type="datetime-local"
                  value={newEvent.start}
                  onChange={handleInputChange("start")}
                  required
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>End Time:</label>
                <input
                  type="datetime-local"
                  value={newEvent.end}
                  onChange={handleInputChange("end")}
                  required
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Type:</label>
                <select
                  value={newEvent.type}
                  onChange={handleInputChange("type")}
                  style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                >
                  <option value="activity">Activity</option>
                  <option value="busy">Busy Time</option>
                  <option value="appointment">Appointment</option>
                </select>
              </div>
              {showRecurrence && (
                <div style={{ marginBottom: "10px" }}>
                  <label>Recurrence:</label>
                  <select
                    value={newEvent.recurrence}
                    onChange={handleInputChange("recurrence")}
                    style={{ width: "100%", padding: "5px", marginTop: "5px" }}
                  >
                    <option value="none">None</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              )}
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{ padding: "8px 16px", flex: 1 }}>
                  {mode === "add" ? "Add Event" : "Update Event"}
                </button>
                {mode === "edit" && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    style={{
                      padding: "8px 16px",
                      flex: 1,
                      backgroundColor: "#dc3545",
                      color: "white",
                    }}
                  >
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setMode("add");
                    setIsRecurring(false);
                    setApplyToSeries(false);
                    setOldStartStr("");
                    resetForm();
                  }}
                  style={{ padding: "8px 16px", flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        {/* Overlay */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              zIndex: 999,
            }}
            onClick={() => {
              setShowModal(false);
              setEditingId(null);
              setMode("add");
              setIsRecurring(false);
              setApplyToSeries(false);
              setOldStartStr("");
              resetForm();
            }}
          />
        )}
        <style jsx>{`
          .activity {
            background-color: #28a745 !important;
            border-color: #28a745 !important;
            color: white;
          }
          .busy {
            background-color: #dc3545 !important;
            border-color: #dc3545 !important;
            color: white;
          }
          .appointment {
            background-color: #007bff !important;
            border-color: #007bff !important;
            color: white;
          }
        `}</style>
      </div>
    </div>
  );
}

export default Calendar;
