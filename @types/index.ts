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

    export interface Activity {
        _id: string;
        _createdAt: Date;
        _updatedAt: Date;
        title: string;
        description: string;
        images: SanityImageAssetDocument[];
        location: string;
        imageUrl: string;
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