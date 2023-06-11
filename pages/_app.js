import '@/styles/globals.css'
import { useEffect } from 'react'
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
