import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function Hero() {
  const data = await getData();

  return (
    <Carousel>
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[60vh] lg:h-[80vh]">
              <Image
                alt="Banner Image"
                src={item.imageString}
                fill
                className="h-full w-full rounded-xl object-cover"
              />
              <div className="absolute left-6 top-6 rounded-xl bg-neutral-500 bg-opacity-75 px-4 py-2 text-white shadow-lg transition-transform hover:scale-105">
                <h2 className="text-xl font-bold lg:text-2xl tracking-wide">{item.title}</h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
