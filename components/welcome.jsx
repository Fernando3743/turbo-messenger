import { useSession } from 'next-auth/react';
import Link from 'next/link';

const WelcomePage = () => {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Welcome {session.user.login} to Turbo Messenger</h1>
        <p className="text-gray-700 mb-8">
          Turbo Messenger is a messaging application designed for courier companies to efficiently manage and track packages
          from pickup to delivery. Whether your messengers use cars, motorcycles, or trucks, Turbo Messenger provides the tools
          to streamline your operations.
        </p>
        <p className="text-gray-700 mb-8">
          With Turbo Messenger, you can manage client information, messenger details, and track the status of packages from
          request to delivery. Clients can have multiple branches, each with its own contact information, and multiple users
          registered in the application.
        </p>
        <p className="text-gray-700 mb-8">
          Messengers are associated with clients and can handle multiple deliveries. Each service request generates a unique
          code and includes details such as pickup and delivery locations, description of items, transportation type, and number
          of packages. The service progresses through various states, from requested to delivered, with timestamps recorded
          for each state change.
        </p>
        <p className="text-gray-700 mb-8">
          Turbo Messenger also provides traceability for each delivery, allowing you to monitor the current status and the
          assigned messenger for each package.
        </p>
        <div className="text-center">
          <Link legacyBehavior href="/auth/signin">
            <a className="text-blue-500 hover:underline">Login</a>
          </Link>
          <span className="mx-2">|</span>
          <Link legacyBehavior href="/auth/signup">
            <a className="text-blue-500 hover:underline">Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
