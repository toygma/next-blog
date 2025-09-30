import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/", 
          "/blog",
          "/hakkimda", 
          "/detay/*", 
        ],
        disallow: [
          "/api/*", 
          "/admin/*", 
          "/giris-yap", 
          "/kayit-ol", 
          "/_next/*", 
          "*.css", 
          "*.js", 
        ],
      },
      {
        userAgent: "Googlebot",
        allow: ["/"], 
      },
    ],
    sitemap: "https://toygma.com/sitemap.xml", 
    host: "https://toygma.com", 
  };
}