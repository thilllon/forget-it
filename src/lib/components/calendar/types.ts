import { Event, stringOrDate } from "react-big-calendar";

export type EventDropHandler =
  | ((args: {
      event: Event;
      start: stringOrDate;
      end: stringOrDate;
      isAllDay: boolean;
    }) => void)
  | undefined;

export type EventResizeHandler =
  | ((args: {
      event: Event;
      start: stringOrDate;
      end: stringOrDate;
      isAllDay: boolean;
    }) => void)
  | undefined;

export type ExtendedEvent = Event & {
  id: number;
  desc?: string;
};
