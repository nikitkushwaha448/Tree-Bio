"use server";

import {db} from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { LinkFormData } from "../components/link-form";
import { SocialLinkFormData } from "../components/social-link-modal";



export const createLinkByUser = async (data:LinkFormData)=>{
    const user = await currentUser();

    if(!user) return { success: false, error: "No authenticated user found" };

    const link = await db.link.create({
        data:{
            title:data.title,
            url:data.url,
            description:data.description,
            clickCount:0,
            user:{
                connect:{
                    clerkId:user.id
                }
            }
        }
    })

      return {
        sucess:true,
        message:"Link created successfully",
        data:link
    }
}


export const getAllLinkForUser = async ()=>{
    const user = await currentUser()

    const links = await db.link.findMany({
        where:{
            user:{
                clerkId:user?.id
            }
        },
        select:{
              id:true,
            title:true,
            description:true,
            url:true,
            clickCount:true,
            createdAt:true,
        }
    })

     return {
        success:true,
        message:"Gets All Link successfully",
        data:links
    }

}

export const addSocialLink = async(data:SocialLinkFormData)=>{
    const user = await currentUser()

      if (!user) return { success: false, error: "No authenticated user found" };

      const socialLink = await db.socialLink.create({
        data:{
            platform:data.platform,
            url:data.url,
            user:{
                connect:{
                    clerkId:user.id
                }
            }
        }
      })

      return {
        sucess:true,
        message:"Social link added successfully",
        data:socialLink
    }
}

export const editSocialLink = async(data:SocialLinkFormData,socialLinkId:string)=>{
    const user = await currentUser();

    if (!user) return { success: false, error: "No authenticated user found" };

    await db.socialLink.update({where:{id:socialLinkId , user:{clerkId:user.id}},data:data});
    return {sucess:true, message:"Social link updated successfully!"}
}

// ShortLink management actions (no user ownership in schema yet)
export const deleteShortLink = async (id: string) => {
    try {
        await db.shortLink.delete({ where: { id } });
        return { success: true };
    } catch (e:any) {
        return { success: false, error: e.message };
    }
};

export const deleteMultipleShortLinks = async (ids: string[]) => {
    try {
        await db.shortLink.deleteMany({ where: { id: { in: ids } } });
        return { success: true };
    } catch (e:any) {
        return { success: false, error: e.message };
    }
};