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
          appId: "YOUR_ONE_SIGNAL_ID",
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
