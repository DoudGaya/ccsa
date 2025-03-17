import { PortableTextProps, SanityImageAssetDocument } from "next-sanity";

export namespace SanityTypes {
    export interface Article {
        _id: string;
        _createdAt: string;
        _updatedAt: string;
        overview: string;
        title: string; 
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


    export interface StandingCommitteeType {
        title: string
        description: string
        slug: string
    }

    export interface Trainings {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        overview: string;
        mandate: string;
        learningOutcomes: string[];
        curriculum: string[];
        pedagogy: string[];
        targetAudience: string[];
        slug: string;
        location: string;
        venue: string;
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
    name: string;
    email: string;
    phone: string;
    organization: string;
    gender: string;
    role: string;
    training: string;
}


export interface Training {

}

