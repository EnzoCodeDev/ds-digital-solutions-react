import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Navbar } from "../navbar/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { uiOpenModal } from "../../redux/actions/ui";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import {
  eventSetActive,
  eventClearActiveEvent,
  evenStartLoading,
} from "../../redux/actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";
const localizer = momentLocalizer(moment);
export const CalendarScreen = () => {
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const messages = {
    allDay: t("calendary.all-day"),
    previous: t("calendary.previous"),
    next: t("calendary.next"),
    today: t("calendary.today"),
    month: t("calendary.month"),
    week: t("calendary.week"),
    day: t("calendary.day"),
    agenda: t("calendary.agenda"),
    date: t("calendary.date"),
    time: t("calendary.time"),
    event: t("calendary.event"),
    noEventsInRange: t("calendary.no-events-in-range"),
    showMore: (total) => `+ Ver más (${total})`,
  };
  useEffect(() => {
    dispatch(evenStartLoading());
  }, [dispatch]);
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const onDoubleClick = (e) => {
    // console.log(e);
    dispatch(uiOpenModal());
  };
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };
  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
  };
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };
  return (
    <div>
      <Navbar />
      <div className="calendar-screen">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          onSelectSlot={onSelectSlot}
          selectable={true}
          view={lastView}
          components={{
            event: CalendarEvent,
          }}
        />
        <AddNewFab />
        {activeEvent && <DeleteEventFab />}
        <CalendarModal />
      </div>
    </div>
  );
};
