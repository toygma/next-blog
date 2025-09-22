import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/", 
          "/blog",
          "/work", 
          "/about", 
          "/detail/*", 
        ],
        disallow: [
          "/api/*", 
          "/admin/*", 
          "/login", 
          "/signup", 
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