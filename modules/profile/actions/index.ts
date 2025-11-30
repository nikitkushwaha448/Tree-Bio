"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getAvailableUsernameSuggestions } from "../utils";
import { ProfileFormData } from "@/modules/links/components/link-form";

export const checkProfileUsernameAvailability = async (username: string) => {
  if (!username) return { available: false, suggestions: [] };

  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    return { available: true };
  }

  const suggestions = await getAvailableUsernameSuggestions(username , 3 , 10)


  return {
    available:false,
    suggestions
  }
};


export const claimUsername = async (username:string)=>{
  try {
    const loggedInUser = await currentUser();
    if(!loggedInUser) return { success: false, error: "No authenticated user found" }

    const user = await db.user.update({
      where:{ clerkId: loggedInUser.id },
      data:{ username }
    })

    if (!user) return { success: false, error: "No authenticated user found" };
    return { success: true };
  } catch (err) {
    return { success: false, error: "Authentication unavailable" }
  }
}


export const getCurrentUsername = async()=>{
  try {
    const user = await currentUser();
    if (!user) return null

    const currentUsername = await db.user.findUnique({
      where:{ clerkId: user.id },
      select:{ firstName:true, lastName:true, username:true, bio:true, socialLinks:true }
    })

    return currentUsername;
  } catch (err) {
    // Clerk middleware may be unavailable in this environment — return null instead of throwing
    return null
  }
}


export const createUserProfile = async (data:ProfileFormData)=>{
  try {
    const user = await currentUser();
    if (!user) return { success: false, error: "No authenticated user found" };

    const profile = await db.user.update({
      where:{ clerkId: user.id! },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        imageUrl: data.imageUrl,
        username: data.username,
      }
    })

    return { success:true, message:"Profile created successfully", data:profile }
  } catch (err) {
    return { success: false, error: "Authentication unavailable" }
  }
}


export const getUserByUsername = async (username:string)=>{
  const currentUser = await db.user.findUnique({
    where:{
      username:username
    },
    include:{
      links:true,
      socialLinks:true
    }
  })

  return currentUser;
}