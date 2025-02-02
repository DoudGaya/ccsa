import { PortableTextProps, SanityImageAssetDocument } from "next-sanity";

export namespace SanityTypes {
    export interface Article {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
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

    export interface PublicationType {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        slug: string;
    }


    export interface MemberType {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        slug: string;
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
        description: string;
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