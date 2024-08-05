import { deleteItem } from "@/app/actions";
import { CheckoutButton, DeleteItem } from "@/app/components/SubmitButtons";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

import { redirect } from "next/navigation";

export default async function BagRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect("/");

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  const totalPrice =
    cart?.items.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  return (
    <div className="min-h-[calc(100vh-160px)] sm:container">
      {!cart || !cart.items || cart.items.length === 0 ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="mx-auto grid h-20 w-20 place-content-center rounded-full bg-primary/10">
            <ShoppingBag className="h-10 w-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            You don&apos;t have any products in your Bag
          </h2>
          <p className="mx-auto mb-8 mt-2 max-w-sm text-center text-sm leading-6 text-muted-foreground">
            You currently don&apos;t have any products in your shopping bag.
            Please add some so that you can see them right here.
          </p>

          <Button asChild>
            <Link href="/products/all">Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {cart?.items.map((item) => (
            <div key={item.id} className="flex gap-2 rounded-md border p-4">
              <div className="relative h-24 w-24 shrink-0 sm:h-32 sm:w-32">
                <Image
                  className="rounded-md border object-cover"
                  fill
                  src={item.imageString}
                  alt="Product image"
                />
              </div>
              <div className="flex w-full justify-between font-medium">
                <p>{item.name}</p>
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>{item.quantity} x</p>
                    <p>${item.price}</p>
                  </div>

                  <form action={deleteItem} className="text-end">
                    <input type="hidden" name="productId" value={item.id} />
                    <DeleteItem />
                  </form>
                </div>
              </div>
            </div>
          ))}
          {cart.items.length > 0 && (
            <div className="col-span-full rounded-md border p-4">
              <div className="flex items-center justify-between font-medium">
                <p>Subtotal:</p>
                <p>${new Intl.NumberFormat("en-US").format(totalPrice)}</p>
              </div>

              <CheckoutButton />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
