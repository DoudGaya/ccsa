'use client'

import { usePathname } from "next/navigation";

export default function useInvalidPathName() {
    const pathName = usePathname();
    const invalidPath = ['admin']
    const isInvalidPath = invalidPath.some((path) => pathName.includes(path)) 
    return isInvalidPath
}