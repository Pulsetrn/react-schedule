import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { IUser } from "../../storage/user.slice.ts";
import { useState } from "react";
import { IEvent } from "../EventCalendar/EventCalendar.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../storage/store.ts";
import { formatDate } from "../../helpers/date.ts";
import moment, { Moment } from "moment";

export const rules = {
  required: (message: string = "Mandatory field") => ({
    required: true,
    message: message,
  }),
  isDateAfter: (message: string) => () => ({
    validator(_: any, value: Moment) {
      if (value.isSameOrAfter(moment())) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error(message));
      }
    },
  }),
};

export interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

// props - это объект, включающий все пропсы - переданные мной и переданный
// по умолчанию так, как это определено в react, например children в этом объекте props
function EventForm(props: EventFormProps) {
  const { user } = useSelector((state: RootState) => state.user);
  const initialFormState = {
    author: user?.username,
    guest: "",
    date: "",
    description: "",
  };

  const [eventData, setEventData] = useState<IEvent>(initialFormState);

  function handleFinish() {
    // Задачей формы является создание event, который уже будет прокидываться в то место, где он необходим
    // В данном случае event прокидывается в CalendarPage, который будет менять глобальное
    // состояние массива event, чтобы эти events уже использовать в EventCalendar
    const temp = { ...eventData };
    props.submit(temp);
  }

  return (
    <Form onFinish={handleFinish}>
      <Form.Item
        label="Description"
        name={"description"}
        rules={[rules.required()]}
      >
        <Input
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
        ></Input>
      </Form.Item>
      <Form.Item
        label="Date"
        name={"date"}
        rules={[
          rules.required("Date field is required"),
          rules.isDateAfter("Date must be after current date"),
        ]}
      >
        <DatePicker
          style={{ width: "100%" }}
          onChange={(value) => {
            if (value) {
              setEventData((current) => ({
                ...current,
                date: formatDate(value.toDate()),
              }));
            }
          }}
        ></DatePicker>
      </Form.Item>
      <Form.Item
        label="Guest"
        name={"guest"}
        rules={[rules.required("Guest field is required")]}
      >
        <Select
          onChange={(guest: string) => {
            setEventData((current) => ({ ...current, guest: guest.trim() }));
          }}
          options={props.guests.map((guest) => ({
            value: guest.username,
            label: guest.username.toLowerCase(),
          }))}
        ></Select>
      </Form.Item>
      <Row justify={"end"}>
        <Form.Item>
          <Button type={"primary"} htmlType={"submit"}>
            Add event
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
}

export default EventForm;
