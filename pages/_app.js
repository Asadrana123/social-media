import '@/styles/globals.css'
import '../styles/globals.css'
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
export default function App({ Component, pageProps:{session,...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>
    </SessionProvider>
  )
}
