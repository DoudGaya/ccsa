import { SanityImageAssetDocument } from "next-sanity";
import { PortableTextProps } from "@portabletext/react";

export namespace SanityTypes {
    export interface Article {
        _id: string;
        _createdAt: string;
        _updatedAt: string;
        overview: string;
        title: string; 
        dateCreated: string;
        slug: string
        body: PortableTextProps;
        type: {
            name: string;
            slug: string
        };
        imageUrl: string;
        tags: string[];
        author: Author;
    }

    export interface Trainings {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        slug: string;
        body: any; // Portable text content
        imageUrl: string;
    }

    export interface StandingCommitteeType {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        slug: string;
    }

    export interface PublicationType {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        slug: string;
    }

    export interface EthicsType {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        slug: {
            current: string;
        }
    }

    export interface Ethics {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        slug: {
            current: string;
        }
        body: PortableTextProps;
        ethicsType: EthicsType;
        tags: string[];
    }


    export interface MemberType {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        slug: string;
    }

    export interface MediaType {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        slug: string;
       
    }

    export interface Events {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        slug: {
            current: string;
        };
        startDate: Date;
        endDate: Date;
        location: string;
        venue: string;
        tags: string[];
    }

    export interface Media {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        slug: string;
        mediaType: MediaType;
        video: string;
        images: SanityImageAssetDocument[];
        tags: string[];
    }

    export interface Member {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        name: string;
        email: string;
        slug: string;
        role: string;
        facebook: string;
        twitter: string;
        priority: string;
        linkedin: string;
        memberType: MemberType;
        bio: string;
        imageUrl: string;
    }

    export interface Publication {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        slug: string;
        url: string;
        fileUrl: string;
        author: Author;
        date: Date;
        publicationType: PublicationType;
        tags: string[];
    }

    export interface Activity {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        contents: string;
        images: SanityImageAssetDocument[];
        location: string;
        imageUrl: string;
        author: Author;
        activityType: {
            name: string;
            slug:string
        };
        slug: { current: string };
        tags: string[];
    }

    export interface Author {
        _id: string;
        name: string;
        designation: string;
        email: string;
        imageUrl: string;
        slug: { current: string };
        bio: string;
    }
}


export interface TrainingApplication {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    organization: string;
    gender: "Male" | "Female";
    age: number;
    role: string;
    training: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface VolunteersApplication {
    id: number;
    name: string;
    email: string;
    phone?: string;
    organization?: string;
    state?: string;
    localGovernment?: string;
    statementOfInterest?: string;
    yearsOfFarmingExperience?: number;
    gender?: "Male" | "Female";
    createdAt: string;
    updatedAt: string;
}

export interface ProgramApplication {
    id: number;
    firstName: string;
    middleName?: string;
    surname: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    address: string;
    passportNumber: string;
    duration?: string;
    passportDateOfIssue: string;
    passportExpiryDate: string;
    passportCountryOfIssue: string;
    highestQualification: string;
    isCosmopolitanStudent: boolean;
    course?: string;
    program?: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    updatedAt: string;
}

export interface Contact {
    id: number;
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Volunteer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    state?: string;
    gender?: "Male" | "Female";
    localGovernment?: string;
    organization?: string;
    statementOfInterest?: string;
    createdAt: string;
    updatedAt: string;
    yearsOfFarmingExperience?: number;
}

export interface EventBooking {
    id: number;
    name: string;
    email: string;
    phone: string;
    organization: string;
    event: string;
    gender: "Male" | "Female";
    age: number;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface CustomCourse {
    id: number;
    name: string;
    email: string;
    phone: string;
    organization: string;
    course: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    name?: string;
    email: string;
    emailVerified?: string;
    image?: string;
    password?: string;
    role: "ADMIN" | "USER";
    createdAt: string;
    updatedAt: string;
}

