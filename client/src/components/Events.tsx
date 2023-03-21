import React from 'react';
import { Chat } from '../App';

type Props = {
  events: string[];
}

export function Events({ events }: Props) {
  console.log(events);
  return (
    <ul>
    {
      events.map((event, index) =>
        <li key={index}>{event}</li>
      )
    }
    </ul>
  );
}