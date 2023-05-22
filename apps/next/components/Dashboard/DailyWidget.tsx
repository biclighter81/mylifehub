import React from "react";
import EventItem from "../app/EventItem";
import Headline from "../app/Headline";
import { UpcomingEvents } from "../../lib/types/upcomingEvents";

const DailyWidget = (props: UpcomingEvents) => {
  return (
    <>
      <Headline text={"Daily Hub"} level={2}/>
      <Headline text={"Upcoming Events"} level={3}/>
      {props.events?.map((event) => (
        <EventItem key={event.id} id={event.id} time={event.time} text={event.name}/>
      ))}
    </>
  );
}

export default DailyWidget;