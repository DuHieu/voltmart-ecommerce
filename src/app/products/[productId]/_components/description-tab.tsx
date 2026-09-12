"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ProductType } from "@/types";
import { getProductRichInfo } from "@/data/productRichDetails";
import {
  Zap,
  ShieldCheck,
  Sparkles,
  Cpu,
  BatteryCharging,
  Volume2,
  Wifi,
  Feather,
  CheckCircle2,
  Package,
  Layers,
  Award,
  Check,
} from "lucide-react";

type DescriptionTabProps = {
  product: ProductType;
};

export function DescriptionTab({ product }: DescriptionTabProps) {
  const richInfo = getProductRichInfo(product);

  const renderHighlightIcon = (iconName: string) => {
    const iconClass = "h-5 w-5 text-primary";
    switch (iconName) {
      case "volume":
        return <Volume2 className={iconClass} />;
      case "battery":
        return <BatteryCharging className={iconClass} />;
      case "wifi":
        return <Wifi className={iconClass} />;
      case "cpu":
        return <Cpu className={iconClass} />;
      case "sparkles":
        return <Sparkles className={iconClass} />;
      case "feather":
        return <Feather className={iconClass} />;
      case "shield":
        return <ShieldCheck className={iconClass} />;
      default:
        return <Zap className={iconClass} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Shopee-style Chi Tiết Sản Phẩm (Basic Meta Table) */}
      <Card className="border-border/60 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2 border-b border-border/50 pb-3">
            <Layers className="h-5 w-5 text-primary" />
            <h3 className="text-base font-bold text-foreground uppercase tracking-wide">
              Chi Tiết Sản Phẩm
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-y-2.5 text-sm sm:grid-cols-2 sm:gap-x-8">
            <div className="flex items-center justify-between border-b border-border/30 py-1.5">
              <span className="text-muted-foreground">Thương hiệu:</span>
              <span className="font-semibold text-primary">VoltMart Flagship</span>
            </div>
            <div className="flex items-center justify-between border-b border-border/30 py-1.5">
              <span className="text-muted-foreground">Mã SKU:</span>
              <span className="font-medium text-foreground">{product.sku || "VLT-PRO-SERIES"}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border/30 py-1.5">
              <span className="text-muted-foreground">Hạn bảo hành:</span>
              <span className="font-medium text-foreground">24 Tháng (1 đổi 1)</span>
            </div>
            <div className="flex items-center justify-between border-b border-border/30 py-1.5">
              <span className="text-muted-foreground">Loại bảo hành:</span>
              <span className="font-medium text-foreground">Bảo hành điện tử chính hãng</span>
            </div>
            <div className="flex items-center justify-between border-b border-border/30 py-1.5">
              <span className="text-muted-foreground">Tình trạng kho:</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {product.stock} sản phẩm sẵn sàng giao
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border/30 py-1.5">
              <span className="text-muted-foreground">Kho vận xuất hàng:</span>
              <span className="font-medium text-foreground">Hà Nội & TP. Hồ Chí Minh</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shopee-style Mô Tả Sản Phẩm (Rich Content, Gallery, Highlights) */}
      <Card className="border-border/60 shadow-sm">
        <CardContent className="space-y-8 p-6 sm:p-8">
          {/* Header & Tagline */}
          <div className="border-b border-border/50 pb-5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Award className="h-3.5 w-3.5" />
              Sản Phẩm Flagship Chính Hãng
            </div>
            <h2 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
              {product.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-muted-foreground italic">
              &ldquo;{richInfo.tagline}&rdquo;
            </p>
          </div>

          {/* Key Feature Highlights Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {richInfo.highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border/40 bg-muted/30 p-4 transition-colors hover:border-primary/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  {renderHighlightIcon(h.icon)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{h.title}</h4>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                    {h.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Narrative Story Description */}
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p className="font-medium text-foreground">
              {product.description}
            </p>
            {richInfo.narrativeParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Shopee-style Embedded Image Gallery with captions */}
          <div className="space-y-6 border-t border-border/50 pt-6">
            <h3 className="text-base font-bold text-foreground uppercase tracking-wide">
              Hình Ảnh Chi Tiết & Trải Nghiệm Thực Tế
            </h3>

            <div className="space-y-6">
              {richInfo.gallery.map((img, i) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-xl border border-border/60 bg-muted/20 shadow-sm"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      src={img.url}
                      alt={img.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="text-sm font-bold text-foreground">{img.title}</h5>
                    <p className="mt-1 text-xs text-muted-foreground">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What's In The Box Section */}
          <div className="rounded-xl border border-border/60 bg-muted/20 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
                Bộ Sản Phẩm Đóng Gói Chuẩn Bao Gồm
              </h4>
            </div>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs">
              {richInfo.inTheBox.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-foreground">
                  <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    <strong>{item.name}</strong>{" "}
                    <span className="text-muted-foreground">({item.quantity})</span>
                    {item.note && (
                      <span className="ml-1 text-[11px] text-primary">[{item.note}]</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Warranty & Guarantee Policy */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
                Chính Sách Hậu Mãi & Bảo Hành VoltMart Flagship
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {richInfo.warrantyHighlights.map((w, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}