import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/clientes')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  return (
    <div>
      <h1>TurboMessenger</h1>
      <div>{data && data.map(item => <p>{Object.values(item).join(', ')}</p>)}</div>
    </div>
  );
}
