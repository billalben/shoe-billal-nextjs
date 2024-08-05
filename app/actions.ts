"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";
import { Cart } from "./lib/interfaces";
import { redis } from "./lib/redis";

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_USER_DASHBOARD) {
    redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim()),
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect("/dashboard/products");
}

export async function editProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_USER_DASHBOARD) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim()),
  );

  const productId = formData.get("productId") as string;

  try {
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: submission.value.name,
        description: submission.value.description,
        category: submission.value.category,
        price: submission.value.price,
        isFeatured: submission.value.isFeatured === true ? true : false,
        status: submission.value.status,
        images: flattenUrls,
      },
    });

    redirect("/dashboard/products");
  } catch (error) {
    // console.error(error);
    redirect("/dashboard/products");
  }
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_USER_DASHBOARD) {
    return redirect("/");
  }

  const productId = formData.get("productId") as string;

  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
  } catch (error) {
    // console.error(error);
    redirect("/dashboard/products");
  }
}

export async function createBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_USER_DASHBOARD) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect("/dashboard/banner");
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_USER_DASHBOARD) {
    return redirect("/");
  }

  const bannerId = formData.get("bannerId") as string;

  try {
    await prisma.banner.delete({
      where: {
        id: bannerId,
      },
    });

    redirect("/dashboard/banner");
  } catch (error) {
    // console.error(error);
    redirect("/dashboard/banner");
  }
}

export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
    where: {
      id: productId,
    },
  });

  if (!selectedProduct) throw new Error("No product with this id");

  if (!cart) {
    cart = {
      userId: user.id,
      items: [
        {
          price: selectedProduct.price,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          quantity: 1,
        },
      ],
    };
  } else {
    const itemIndex = cart.items.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({
        price: selectedProduct.price,
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        quantity: 1,
      });
    }
  }

  await redis.set(`cart-${user.id}`, cart);

  revalidatePath("/", "layout");
}

export async function deleteItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const productId = formData.get("productId");

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);
  }

  revalidatePath("/bag");
}
