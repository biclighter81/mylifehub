import React from "react";

interface EventItemProps {
  id: string;
  time: string;
  text: string;
}

const EventItem = (props: EventItemProps) => {
  return (
    <div className="pt-4 relative">
      <div className="flex justify-between rounded-3xl bg-gray-300 h-auto p-4">
        {props.text}
        <div className="flex gap-0.5 my-auto">
          <div className=" w-2 h-2 bg-gray-700 rounded-full"></div>
          <div className=" w-2 h-2 bg-gray-700 rounded-full"></div>
          <div className=" w-2 h-2 bg-gray-700 rounded-full"></div>
        </div>
      </div>
      <div className="shadow-md font-bold absolute bg-[#0038FF] rounded-full min-w-min top-1 left-0 px-3 py-1 text-xs text-white">
        {props.time}
      </div>
    </div>
  );
}

export default EventItem;