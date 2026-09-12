"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { createDemoOrder } from "./actions";
import { ShieldCheck, Truck, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutRedirect() {
  const router = useRouter();
  const { cartItems, subtotal, clearCart, isLoading: cartLoading } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    fullName: "VoltMart Demo Customer",
    street: "100 Market St, Suite 400",
    city: "San Francisco",
    state: "CA",
    zip_code: "94105",
    country: "United States",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");

  const shippingFee = subtotal >= 150 ? 0 : 5.99;
  const totalAmount = Number((subtotal + shippingFee).toFixed(2));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.street || !formData.city || !formData.zip_code) {
      toast.error("Please fill in all required shipping address fields.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      router.push("/cart");
      return;
    }

    try {
      setIsSubmitting(true);

      const clientCartItems = cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));

      const result = await createDemoOrder({
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
        country: formData.country,
        clientCartItems,
      });

      if (!result.success || !result.orderId) {
        throw new Error(result.error || "Failed to process order.");
      }

      // Clear local cart
      await clearCart();

      toast.success("Order placed successfully!");
      router.push(`/checkout/success?order_id=${result.orderId}`);
    } catch (error) {
      console.error("Checkout submission error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to place order."
      );
      setIsSubmitting(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="bg-background min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="mx-auto max-w-md text-center py-8">
          <CardHeader>
            <CardTitle>Your Cart is Empty</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link href="/">
              <Button className="w-full cursor-pointer">Explore Catalog</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/cart"
            className="text-primary hover:text-primary/80 flex items-center text-sm font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Shipping & Payment */}
            <div className="lg:col-span-7 space-y-6">
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      placeholder="123 Tech Parkway"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="San Francisco"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State / Province</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="CA"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip_code">Postal / ZIP Code</Label>
                      <Input
                        id="zip_code"
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleChange}
                        required
                        placeholder="94105"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Demo Card Option */}
                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/5 shadow-xs"
                        : "border-border hover:border-border/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="text-primary focus:ring-primary h-4 w-4"
                        />
                        <span className="font-semibold text-sm">
                          VoltMart Demo Instant Card
                        </span>
                      </div>
                      <span className="text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        Test Mode
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">
                      Simulated zero-latency payment verification. No real money will be charged.
                    </p>
                    {paymentMethod === "card" && (
                      <div className="mt-3 ml-6 pt-3 border-t border-border/40 grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-muted-foreground">Card Number:</span>
                          <p className="font-mono text-foreground font-medium">•••• •••• •••• 4242</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expires / CVC:</span>
                          <p className="font-mono text-foreground font-medium">12/28 •••</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery Option */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-primary bg-primary/5 shadow-xs"
                        : "border-border hover:border-border/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="font-semibold text-sm">
                        Pay on Delivery
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6 mt-1">
                      Pay upon delivery receipt at your shipping destination.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items list */}
                  <div className="max-h-72 overflow-y-auto space-y-3 divide-y divide-border/40 pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={item.product_id}
                        className="flex items-center gap-3 pt-3 first:pt-0"
                      >
                        <div className="h-12 w-12 rounded-lg bg-muted relative shrink-0 overflow-hidden border border-border/60">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-foreground">
                          ${(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="border-t border-border/60 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Shipping</span>
                      {shippingFee === 0 ? (
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          FREE
                        </span>
                      ) : (
                        <span className="text-foreground">${shippingFee.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between border-t border-border/60 pt-3 text-base font-bold text-foreground">
                      <span>Total</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Guarantee banner */}
                  <div className="rounded-lg bg-muted/60 p-3 text-[11px] text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>2-Year Warranty & 30-Day Risk-Free Returns included.</span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer font-semibold shadow-md"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <LoadingSpinner />
                        Placing Order...
                      </span>
                    ) : (
                      `Complete Purchase — $${totalAmount.toFixed(2)}`
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}