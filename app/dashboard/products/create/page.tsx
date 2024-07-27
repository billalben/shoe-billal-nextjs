"use client";

import { UploadDropzone } from "@/app/lib/uplaodthing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";

export default function ProductCreateRoute() {
  return (
    <form>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form you can create your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                defaultValue=""
                className="w-full"
                placeholder="Product Name"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                defaultValue=""
                placeholder="Write your description right here..."
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input defaultValue="" type="number" placeholder="$55" />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Switch defaultValue="false" />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // alert("Image uploaded");
                }}
                onUploadError={() => {
                  alert("Something went wrong");
                }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {/* <SubmitButton text="Create Product" /> */}
          <Button size="lg" className="ml-auto">
            Create Product
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
