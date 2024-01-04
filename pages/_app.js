import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from "next-auth/react"
import NavBar from '@/Layout/NavBar';
import DefaultLayout from '@/Layout/DefaultLayout';

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  let layouts = {
    'L1' : DefaultLayout,
    'L2' : NavBar
  }
  
  let Layout = layouts[Component.layout]; 

  return (
    <SessionProvider session={session}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

