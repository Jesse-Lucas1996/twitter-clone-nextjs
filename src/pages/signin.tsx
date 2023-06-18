import { signIn, useSession } from 'next-auth/react';

const SignIn = () => {
  const { data: session } = useSession();

  if (session) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <button
        onClick={() => signIn('google')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 overflow-hidden"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;