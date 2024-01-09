import React , {useState , useRef} from 'react'
import { Button , Form , InputGroup , Row , Col}from 'react-bootstrap';
import {useSession, signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column overflow-hidden">
      <div className=' w-100'>
        <h2 className='fw-bold text-center'>Login</h2>
        <p className="text-body-tertiary text-center w-100">Welcome back! Please login to your account</p>
      </div>
      <div>
      </div>
      <Button variant="primary" className='d-flex justify-content-center mb-3' onClick={() => signIn("google")}>
        <h4 className='pe-3'>Login With Google</h4>
        <FcGoogle className='fs-1'/>
      </Button>
      <Button variant="dark" className='d-flex justify-content-center' onClick={() => signIn("github" , {callbackUrl : process.env.NEXT_PUBLIC_URL})}>
        <h4 className='pe-3'>Login With Github</h4>
        <BsGithub className='fs-1'/>
      </Button>
    </div>
  );
}

export default LoginForm

