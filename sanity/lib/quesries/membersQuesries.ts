import { groq } from "next-sanity";
import { client } from "../client";
import { revalidate } from "../queries";



revalidate


export const getSingleMemberType = (type: string) => {
    const query = groq`
    *[_type == "memberType" && slug.current == $type] | order(_createdAt desc) {
        _id,
        title,
        description,
        'slug' : slug.current,
    }[0]
    `
    return client.fetch(query, {type})
}


export const getPriorityBoardMembers = (type: string) => {
    const query = groq`
    *[_type == "member" && memberType->slug.current == $type  && priority == 1] | order(_createdAt asc) {
        _id,
        name,
        email,
        role,
        facebook,
        priority,
        twitter,
        linkedin,
        'slug' : slug.current,
        bio,
        'imageUrl': image.asset->url,
        memberType->{
            title,
            description,
            'slug': slug.current
        }
    }
    `
    return client.fetch(query, {type})
}


export const getBoardMembersWithoutPriority = (type: string) => {
    const query = groq`
    *[_type == "member" && memberType->slug.current == $type  && priority != 1] | order(_createdAt desc) {
        _id,
        name,
        email,
        role,
        facebook,
        twitter,
        linkedin,
        'slug' : slug.current,
        bio,
        'imageUrl': image.asset->url,
        memberType->{
            title,
            description,
            'slug': slug.current
        }
    }
    `
    return client.fetch(query, {type})
}


// export const getPriorityBoardMembers = (type: string) => {
//     const query = groq`
//     *[_type == "member" && memberType->priority == 1 && slug.current == $type] | order(_createdAt desc) {
//         _id,
//         name,
//         email,
//         role,
//         facebook,
//         twitter,
//         linkedin,
//         bio,
//         'slug' : slug.current,
//         'imageUrl': image.asset->url,
//         memberType->{
//             title,
//             description,
//             'slug': slug.current
//         }
//     }
//     `
//     return client.fetch(query, {type})
// }


export const getSingleMember = (memberSlug: string) => {
    const query = groq`
    *[_type == "member" && slug.current == $memberSlug] {
        _id,
        name,
        email,
        role,
        facebook,
        priority,
        twitter,
        linkedin,
        bio,
        'slug' : slug.current,
        'imageUrl': image.asset->url,
        memberType->{
            title,
            description,
            'slug': slug.current
    }
    }[0]
    `
    return client.fetch(query, {memberSlug})
}



export const getManagementMembers = (type: string) => {
    const query = groq`
    *[_type == "member" && memberType->slug.current == 'management-team'] | order(priority asc) {
        _id,
        name,
        email,
        role,
        facebook,
        priority,
        twitter,
        linkedin,
        'slug' : slug.current,
        bio,
        'imageUrl': image.asset->url,
        memberType->{
            title,
            description,
            'slug': slug.current
        }
    }
    `
    return client.fetch(query, {type})
}



export const getAllMemberType = (type: string) => {
    const query = groq`
    *[_type == "member" && memberType->slug.current == $type] | order(priority asc) {
        _id,
        name,
        email,
        role,
        facebook,
        twitter,
        linkedin,
        'slug' : slug.current,
        bio,
        'imageUrl': image.asset->url,
        memberType->{
            title,
            description,
            'slug': slug.current
        }
    }
    `
    return client.fetch(query, {type})
}

