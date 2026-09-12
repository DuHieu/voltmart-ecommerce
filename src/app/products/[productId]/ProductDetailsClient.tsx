"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ProductType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react"; 


import {
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Check,
} from "lucide-react";
import { ReviewTab } from "./_components/review-tab";
import { DescriptionTab } from "./_components/description-tab";
import { ShopProfileCard } from "@/components/ShopProfileCard";
import { getProductRichInfo } from "@/data/productRichDetails";

type ProductDetailsClientProps = {
  product: ProductType;
};

export default function ProductDetailsClient({
  product,
}: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Get reviews for this product
  // const { data: reviews = [], isLoading: reviewsLoading } = useGetProductReviews(
  //   product.product_id,
  // );

  // Generate multiple images from the single image (mock data for demo)
  const productImages = product.image
    ? [product.image, product.image, product.image, product.image]
    : ["/placeholder-product.svg"];

 

  const handleAddToCart = async () => {
    try {
      await addToCart(product, quantity);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + productImages.length) % productImages.length,
    );
  };

  

  // Mock rating distribution for demo
  

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  className="relative h-full w-full"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {product.image ? (
                    <Image
                      src={productImages[selectedImageIndex]}
                      alt={product.title}
                      fill
                      className="object-contain p-4"
                      loading="eager"
                    />
                  ) : (
                    <div className="bg-muted flex h-full w-full items-center justify-center">
                      <span className="text-muted-foreground text-sm">
                        No image available
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {productImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-background/80 absolute top-1/2 left-4 -translate-y-1/2 backdrop-blur-sm"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-background/80 absolute top-1/2 right-4 -translate-y-1/2 backdrop-blur-sm"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background/80 cursor-pointer backdrop-blur-sm"
                  onClick={() => setIsFavorited(!isFavorited)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isFavorited ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background/80 cursor-pointer backdrop-blur-sm"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <motion.button
                    key={index}
                    className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <motion.h1
                className="text-foreground mb-2 text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {product.title}
              </motion.h1>

              {/* <motion.div
                className="mb-4 flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <RenderStars rating={product.rating || 0} size="sm" />
              </motion.div> */}

              <motion.div
                className="mb-6 flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-foreground text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                {product.stock > 0 ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    In Stock ({product.stock} available)
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </motion.div>
            </div>

            <motion.p
              className="text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {product.description}
            </motion.p>

            {/* Quantity and Add to Cart */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <h3 className="mb-3 font-medium">Quantity</h3>
                <div className="flex items-center gap-3">
                  <div className="border-border flex items-center rounded-lg border">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="cursor-pointer"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="min-w-[60px] px-4 py-2 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                      className="cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {product.stock} items available
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full cursor-pointer"
                disabled={!product.stock || product.stock === 0}
                onClick={handleAddToCart}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </Button>
            </motion.div>

            {/* Shipping Info */}
            <motion.div
              className="border-border grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <Truck className="text-primary h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-muted-foreground text-xs">
                    Orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-primary h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-muted-foreground text-xs">SSL encrypted</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="text-primary h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">30-Day Returns</p>
                  <p className="text-muted-foreground text-xs">
                    No questions asked
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Direct Brand Assurance Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <ShopProfileCard />
        </motion.div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description & Details</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <DescriptionTab product={product} />
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <Card className="border-border/60 shadow-sm">
                <CardContent className="space-y-6 p-6">
                  {getProductRichInfo(product).specGroups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-3">
                      <h4 className="border-b border-border/40 pb-2 text-sm font-bold text-foreground uppercase tracking-wider text-primary">
                        {group.group}
                      </h4>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm">
                        {group.items.map((item, iIdx) => (
                          <div
                            key={iIdx}
                            className="flex justify-between border-b border-border/20 py-2 sm:pr-4"
                          >
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-medium text-foreground text-right pl-2">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <ReviewTab product={product} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
