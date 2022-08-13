import React from 'react';
import { Button } from 'react-bootstrap';
import User from '../components/User';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function Profile() {
  const { user } = useAuth();
  console.warn(user);
  return (
    <>
      <div>
        <title>Trello-Ish</title>
        <User
          name={user.displayName}
          email={user.email}
          img={user.photoURL}
          lastLogin={user.metadata.lastSignInTime}
        />
      </div>
      <button type="button" onClick={signOut}> Blow this scene</button>
      <div><User
        name={user.displayName}
        email={user.email}
        img={user.photoURL}
        lastLogin={user.metadata.lastSignInTime}
      />
        <Button
          onClick={signOut}
          variant="primary"
        >Sign Out
        </Button>
      </div>
    </>
  );
}
