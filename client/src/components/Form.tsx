import React, { useState } from 'react';
import { socket } from '../socket';
import { Chat } from '../App';

export function Form() {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit('chats', value, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={ onSubmit }>
      <input onChange={e => setValue(e.target.value) } />

      <button type="submit" disabled={ isLoading }>Send</button>
    </form>
  );
}