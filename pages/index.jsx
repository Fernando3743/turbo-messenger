import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Welcome from '../components/welcome'

export default function Home() {

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
      <Welcome/>
    </div>
  );
}
