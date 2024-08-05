import { Calendar } from "antd";
import { Moment } from "moment";
import { formatDate } from "../../helpers/date.ts";

export interface IEvent {
  author: string | undefined;
  guest: string | undefined;
  date: string | undefined;
  description: string | undefined;
}

export interface CalendarProps {
  events: IEvent[];
}

function EventCalendar(props: CalendarProps) {
  function dateCellRender(value: Moment) {
    const formattedDate = formatDate(value.toDate());
    const daysWithEvents = props.events.filter((event) => {
      return formattedDate === event.date;
    });
    return (
      <div>
        {daysWithEvents.map((item, index: number) => {
          return <div key={index}>{item.description}</div>;
        })}
      </div>
    );
  }

  // @ts-ignore
  return <Calendar cellRender={dateCellRender} />;
}

export default EventCalendar;
