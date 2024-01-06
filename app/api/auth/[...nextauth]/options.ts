import connectDB from "@/db/config";
import userModel from "@/model/usermodel";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";


export const authOptions:AuthOptions={

    pages:{
        signIn:"/login",
        
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            connectDB();
            try
            {
                
                const getuser=await userModel.findOne({email:user.email});
                if(getuser)
                {
                    return true;
                }
                else
                {
                    await userModel.create({
                        email:user.email,
                        name:user.name,
                        
                    });
                    return true;
                }
            }
            catch(error)
            {
                console.log("Sign in error : "+error);
                return false;
            }
        },
    },
    providers:[
       CredentialsProvider({
        name:"Next Auth",
        credentials:{
            email:{
                label:"Email",
                type:"email",
                placeholder:"Enter your email"
            },
            password:{
                label:"Password",
                type:"password",
                placeholder:"Enter your password"
            },
        },
        async authorize(credentials, req) 
        {
            connectDB();

            const user = userModel.findOne({email:credentials?.email});

            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user
            } 
            else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
        },
       }),

       GitHubProvider({
        clientId: process.env.GITHUB_CLIENTID as string ,
        clientSecret: process.env.GITHUB_CLIENTSECRET as string
      }),

      GoogleProvider({
        clientId:process.env.GOOGLE_CLIENTID as string,
        clientSecret:process.env.GOOGLE_SECRETID as string
      })
    ]

}