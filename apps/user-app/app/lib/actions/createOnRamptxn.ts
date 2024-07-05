//we have to metion that this need to bee called on server side only otherwise it's will be called on client side when we click on AddMoney button
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createOnRampTransaction(amount: number,provider: string){
    const session = await getServerSession(authOptions);  //this is the way to get user session in server side
    const userId=session.user.id;
    const token=Math.random().toString(); // in real world this token will provided by the bank like const token =await axios.get("https://bank.com/getToken",{amunt:amount}) 
    if(!userId){
        return {
            message: "User not found"
        }
    }
   await prisma.onRampTransaction.create({
    data:{
        provider,
        userId:Number(userId),
        amount:amount,
        status:"Processing",
        startTime:new Date(),
        token:token,

    }
   })

return {
    message: "On Ramp Transaction added "
}

}