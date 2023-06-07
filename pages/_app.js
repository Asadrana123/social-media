import '@/styles/globals.css'
import { useEffect } from 'react'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
export default function App({ Component, pageProps:{session,...pageProps} }) {
  useEffect(() => {
    if (typeof window !== undefined) {
      window.OneSignal = window.OneSignal || [];
      OneSignal.push(function () {
        OneSignal.init({
          appId: "33e21049-b34b-4962-87f9-73029cd74383",
          notifyButton: {
            enable: true,
          },
        });
      });
    }
    return () => {
      window.OneSignal = undefined;
    };
  }, []);
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>
    </SessionProvider>
  )
}
