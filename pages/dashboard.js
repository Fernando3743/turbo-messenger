import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log("Status: ",status);
      signIn();
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
    </div>
  );
}
