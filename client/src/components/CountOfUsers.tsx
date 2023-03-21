import React from 'react';

type Props = {
  userCount: number; 
}

export function CountOfUsers({ userCount } : Props) {
  return (
    <div>
      <p> Number of Users: {userCount} </p>
    </div>
  );
}