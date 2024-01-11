import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  adapter : MongoDBAdapter(clientPromise),

  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],

  secret: process.env.NEXT_PUBLIC_SECRET,
  
    async redirect(url, baseUrl) {
      // If a user is authenticated, redirect to "/AdminDashboard"
      if (url === '/') {
        console.log(process.env.GOOGLE_ID);
        console.log(process.env.GITHUB_SECRET);
        console.log(process.env.NEXTAUTH_URL);
        return '/AdminDashboard';
      }
  
      return baseUrl ;
    },
    

})