import { getProviders, signIn } from 'next-auth/react';
import { useEffect } from 'react';

const SignIn: React.FC<{ providers: any }> = ({ providers }) => {
  let redirectUrl = 'http://localhost:3000';

  useEffect(() => {
    const url = new URL(location.href);
    redirectUrl = url.searchParams.get('callbackUrl')!;
  });

  return (
    <>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: redirectUrl })}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
};

export default SignIn;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};
