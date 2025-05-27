import Image from "next/image"
import Link from "next/link"
// import type { Article } from "@/types/article"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { SanityTypes } from "@/@types"

interface ArticlesListProps {
  articles: SanityTypes.Article[]
}

export function ArticlesList({ articles }: ArticlesListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card key={article._id} className="flex flex-col overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Image src={article.imageUrl || "/placeholder.svg"} alt={article.title} layout="fill" objectFit="cover" />
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-4">
            <Badge className="mb-2">{article.type.name}</Badge>
            <h3 className="text-lg font-semibold mb-2">
              <Link href={`/${article.type.slug}/${article.slug}`} className="hover:underline">
                {article.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3">{article.overview}</p>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={`${article.author.imageUrl}`} className=" w-full h-full" />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="text-sm font-medium">{article.author.name}</p>
                <p className="text-xs text-gray-500">{formatDate(article._createdAt)}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}


