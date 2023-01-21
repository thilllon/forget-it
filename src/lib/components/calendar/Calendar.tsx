/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useState } from "react";
import BigCalendar, { Event } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { EventDropHandler, EventResizeHandler, ExtendedEvent } from "./types";

BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar as any);

const Dnd = () => {
  const [events, setEvents] = useState<ExtendedEvent[]>([]);

  const onEventDrop: EventDropHandler = async ({ event, start, end }) => {
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    setEvents(nextEvents);
  };

  const resizeEvent: EventResizeHandler = async ({
    event,
    start,
    end,
    isAllDay,
  }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);
  };

  return (
    <DragAndDropCalendar
      selectable
      events={events as Event[]}
      onEventDrop={onEventDrop}
      resizable
      onEventResize={resizeEvent}
      defaultView={BigCalendar.Views.MONTH}
      defaultDate={new Date(2015, 3, 12)}
    />
  );
};

export const Calendar = DragDropContext(HTML5Backend)(Dnd);
