import { links } from "../src/data/index";
import prisma from "../src/lib/prisma";


async function main() {
  const allCategories = Array.from(
    new Set(links.flatMap(link => link.categories))
  );

  for (const catName of allCategories) {
    await prisma.category.upsert({
      where: { name: catName },
      create: { name: catName, id: catName.toLowerCase() },
      update: {}
    });
  }

  for (const link of links) {
    const categoryConnections = link.categories.map(catName => ({
      name: catName
    }));

    await prisma.post.create({
      data: {
        postType: link.postType,
        title: link.title,
        content: link.content,
        featuredImage: link.featuredImage,
        authorId: link.authorId,
        categories: {
          connect: categoryConnections
        }
      }
    });
    console.log(`✅ Post added: ${link.title}`);
  }
}

main()
  .catch(e => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
