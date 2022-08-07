import { Button } from '@chakra-ui/react';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignIn: React.FC<{ providers: any }> = ({ providers }) => {
  const router = useRouter();

  let redirectUrl = 'https://learning-nextauth.vercel.app/';

  useEffect(() => {
    const url = new URL(location.href);
    redirectUrl =
      url.searchParams.get('callbackUrl') !== null
        ? redirectUrl
        : 'https://learning-nextauth.vercel.app/';
  });

  return (
    <>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <Button
            onClick={() => signIn(provider.id, { callbackUrl: redirectUrl })}
          >
            Sign in with {provider.name}
          </Button>
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
