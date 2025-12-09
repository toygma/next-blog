import { MetadataRoute } from "next";
import {prisma} from "@/lib/prisma";
import slugify from "slugify";

export const dynamic = "force-dynamic";
export const revalidate = 3600; 

const BASE_URL = "https://toygma.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/hakkimda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5000,
    });

    const dynamicPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${BASE_URL}/detay/${post.id}/${slugify(post.title, { 
        lower: true, 
        strict: true,
        locale: "tr"
      })}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...staticPages, ...dynamicPages];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return staticPages;
  } finally {
    await prisma.$disconnect();
  }
}
