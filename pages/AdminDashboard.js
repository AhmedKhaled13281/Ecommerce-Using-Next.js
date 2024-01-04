import React , {useState , useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Image from 'next/image'
import { useSession , signOut ,  getSession} from "next-auth/react"
import Offcanvas from 'react-bootstrap/Offcanvas';
import Alert from 'react-bootstrap/Alert';
import {Container, Row, Col, Card,  Nav , Navbar} from "react-bootstrap";

const AdminDashboard = () => {

  return (
    <div>
      Adinm

    </div>
  );
}

AdminDashboard.layout = 'L2'

// export async function getServerSideProps (context) {
//     const session = await getSession({req : context.req})
//     if(!session) {
//       return {
//         redirect : {
//           destination : "/"
//         }
//       }
//     }
  
//     return { props : {session}}
//   }


export default AdminDashboard