import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentSales() {
  const data = [
    {
      id: 1,
      User: {
        firstName: "John Doe",
        email: "john@gmail.com",
        profileImage: "/all.jpeg",
      },
      amount: 1000,
    },
    {
      id: 2,
      User: {
        firstName: "John Doe",
        email: "john@gmail.com",
        profileImage: "/all.jpeg",
      },
      amount: 1000,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src={item.User?.profileImage} alt="Avatar Image" />
              <AvatarFallback>
                {item.User?.firstName.slice(0, 3)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium">{item.User?.firstName}</p>
              <p className="text-sm text-muted-foreground">
                {item.User?.email}
              </p>
            </div>
            <p className="ml-auto font-medium">
              +${new Intl.NumberFormat("en-US").format(item.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
