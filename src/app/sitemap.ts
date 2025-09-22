import { MetadataRoute } from "next";
import prisma from "@/lib/prisma"; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    {
      url: "https://toygma.com",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: "https://toygma.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: "https://toygma.com/work",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: "https://toygma.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true, 
      updatedAt: true,
    },
  });

  const dynamicPages = posts.map((post) => ({
    url: `https://toygma.com/detail/${post.id}/${post.title}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...dynamicPages];
}