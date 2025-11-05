import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/api/",
          "/admin/",
          "/giris-yap",
          "/kayit-ol",
        ],
      },
    ],
    sitemap: "https://toygma.com/sitemap.xml",
  };
}
