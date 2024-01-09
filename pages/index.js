import Head from 'next/head'
import { useSession ,  getSession} from "next-auth/react"
import LoginPage from '@/Components/LoginPage';
import { useEffect } from 'react';
import { useRouter } from 'next/router';



const Home = (prop) => {
  console.log(prop);
  // const {data: session} = useSession()
  // const router = useRouter()
  // console.log(session);
  // useEffect(() => {
  //   if(session){
  //     router.push("/AdminDashboard")
  //   }
  // } , [router , session])
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='d-flex justify-content-center align-items-center rounded overflow-hidden' style={{backgroundColor : "#D3D4D5" , height : "100dvh"}}>
          <LoginPage />
      </main>
    </>
  )
}

Home.layout = "L1"
export default Home;


export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req });
    console.log(session);
    if (session) {
      return {
        redirect: {
          destination: "/AdminDashboard",
          permanent: false, // Set to false to allow redirects to work on subsequent visits
        },
      };
    }

    return { props: { session } };

}