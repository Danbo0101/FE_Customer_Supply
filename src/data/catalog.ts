export type CatalogProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
};

export type CatalogCategoryChild = {
  slug: string;
  label: string;
  href: string;
  description: string;
  products: CatalogProduct[];
};

export type CatalogCategory = {
  slug: string;
  label: string;
  href: string;
  image: string;
  description: string;
  children: CatalogCategoryChild[];
};

function makeProducts(
  categorySlug: string,
  childSlug: string,
  childLabel: string,
  image: string,
) {
  const productTypes = [
    "Essential Set",
    "Daily Care Kit",
    "Pro Finish Tool",
    "Studio Refill",
    "Soft Touch Duo",
    "Precision Edit",
    "Treatment Pack",
    "Clean Routine Set",
    "Travel Mini",
    "Salon Backup",
    "Luxe Refill",
    "Starter Bundle",
  ];

  return productTypes.map((productType, index) => {
    const name = `${childLabel} ${productType}`;

    return {
      id: `${categorySlug}-${childSlug}-${String(index + 1).padStart(2, "0")}`,
      name,
      price: `$${(15 + ((index * 3) % 18)).toFixed(2)}`,
      image,
      description: `${name} is selected for a polished beauty routine with a clean finish, comfortable handling, and everyday professional use.`,
    };
  });
}

function child(
  categorySlug: string,
  slug: string,
  label: string,
  image: string,
): CatalogCategoryChild {
  return {
    slug,
    label,
    href: `/categories/${categorySlug}/${slug}`,
    description: `Explore ${label.toLowerCase()} picks selected for everyday professional beauty routines.`,
    products: makeProducts(categorySlug, slug, label, image),
  };
}

export const catalogCategories: CatalogCategory[] = [
  {
    slug: "skincare",
    label: "Skincare",
    href: "/categories/skincare",
    image: "/category-skincare-tools.png",
    description:
      "Care essentials for face, body, lip, and eye routines with a polished spa finish.",
    children: [
      child("skincare", "face", "Face", "/category-skincare-tools.png"),
      child("skincare", "body", "Body", "/category-body-feet.png"),
      child("skincare", "lip", "Lip", "/category-skincare-tools.png"),
      child("skincare", "eye", "Eye", "/category-face.png"),
    ],
  },
  {
    slug: "face",
    label: "Face",
    href: "/categories/face",
    image: "/category-face.png",
    description:
      "Base, color, and complexion essentials grouped clearly by product type.",
    children: [
      child("face", "foundation", "Foundation", "/category-face.png"),
      child("face", "powder", "Powder", "/category-brushes.png"),
      child("face", "blush", "Blush", "/category-face.png"),
      child("face", "concealer", "Concealer", "/category-face.png"),
    ],
  },
  {
    slug: "lash",
    label: "Lash",
    href: "/categories/lash",
    image: "/category-lashes.png",
    description:
      "Lash extensions, adhesive, tools, and care products for clean application.",
    children: [
      child("lash", "extensions", "Extensions", "/category-lashes.png"),
      child("lash", "glue", "Glue", "/category-lashes.png"),
      child("lash", "tools", "Tools", "/category-lashes.png"),
      child("lash", "care", "Care", "/category-lashes.png"),
    ],
  },
  {
    slug: "wax",
    label: "Wax",
    href: "/categories/wax",
    image: "/category-body-feet.png",
    description:
      "Waxing formulas, accessories, and aftercare arranged for easy browsing.",
    children: [
      child("wax", "hard-wax", "Hard Wax", "/category-body-feet.png"),
      child("wax", "soft-wax", "Soft Wax", "/category-body-feet.png"),
      child("wax", "accessories", "Accessories", "/category-hand-nail.png"),
      child("wax", "after-care", "After Care", "/category-skincare-tools.png"),
    ],
  },
];

export function getCatalogCategory(slug: string) {
  return catalogCategories.find((category) => category.slug === slug);
}

export function getCatalogCategoryChild(categorySlug: string, childSlug: string) {
  const category = getCatalogCategory(categorySlug);
  const childCategory = category?.children.find((child) => child.slug === childSlug);

  if (!category || !childCategory) {
    return null;
  }

  return {
    category,
    childCategory,
  };
}

export function getAllCatalogProducts() {
  return catalogCategories.flatMap((category) =>
    category.children.flatMap((childCategory) => childCategory.products),
  );
}

export function getCatalogProduct(productId: string) {
  return getAllCatalogProducts().find((product) => product.id === productId);
}

export function getCatalogProductContext(productId: string) {
  for (const category of catalogCategories) {
    for (const childCategory of category.children) {
      const product = childCategory.products.find((item) => item.id === productId);

      if (product) {
        return {
          category,
          childCategory,
          product,
        };
      }
    }
  }

  return null;
}

export function getRelatedCatalogProducts(productId: string, limit = 4) {
  const context = getCatalogProductContext(productId);
  const products = context?.childCategory.products ?? getAllCatalogProducts();

  return products
    .filter((product) => product.id !== productId)
    .slice(0, limit);
}
