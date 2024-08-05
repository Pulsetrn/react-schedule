import { FC, useEffect, useState } from "react";
import EventCalendar, {
  IEvent,
} from "../components/EventCalendar/EventCalendar.tsx";
import { Button, Layout, Modal, Row } from "antd";
import EventForm from "../components/EventForm/EventForm.tsx";
import UserService from "../api/UserService.ts";
import { IUser } from "../storage/user.slice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "../storage/store.ts";
import { eventActions } from "../storage/events.slice.ts";

const CalendarPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests] = useState<IUser[]>([]);
  const dispatch = useDispatch<RootDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { events } = useSelector((state: RootState) => state.events);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);

  function handleClick() {
    setIsModalOpen(true);
  }

  async function getGuests() {
    // Получаем из axios запроса на сервер по ключу data из возвращаемго объекта данные, которые приходят
    const { data } = await UserService.getUsers();
    setGuests(data);
  }

  useEffect(() => {
    setFilteredEvents((filteredEvents) => {
      if (events) {
        return [
          ...events.filter((event) => {
            return (
              event.author === user?.username || event.guest === user?.username
            );
          }),
        ];
      } else {
        return [...filteredEvents];
      }
    });
  }, [events]);

  useEffect(() => {
    getGuests();
  }, []);

  return (
    <Layout>
      <EventCalendar events={filteredEvents}></EventCalendar>
      <Row justify={"center"}>
        <Button onClick={handleClick}>Add event</Button>
      </Row>
      <Modal
        title={"Add event"}
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <EventForm
          guests={guests}
          submit={(event: IEvent) => {
            setIsModalOpen(false);
            dispatch(eventActions.addEvent(event));
          }}
        />
      </Modal>
    </Layout>
  );
};

export default CalendarPage;
