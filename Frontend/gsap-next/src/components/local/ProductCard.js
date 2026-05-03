'use client';
import { use } from "react";
import { useProducts } from "@/context/ProductProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductCard({ products }) {
  const pro = useProducts().products;

  return (
    <div className="grid grid-cols-4 gap-4">
      {pro.map((elem) => (
        <Card key={elem.id} className="relative mx-auto w-full max-w-sm pt-0">
          <img
            src={elem.image}
            alt={elem.title}
            className="aspect-video w-full object-cover"
          />

          <CardHeader>
            <CardAction>
              <Badge variant="secondary">$ {elem.price}</Badge>
            </CardAction>

            <CardTitle>{elem.title}</CardTitle>
            <CardDescription>{elem.category}</CardDescription>
          </CardHeader>

          <CardFooter>
            <Button className="w-full">Shop Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}