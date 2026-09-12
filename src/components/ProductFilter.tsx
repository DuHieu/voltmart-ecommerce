"use client";

import { motion } from "motion/react";
import { Filter, SortAsc } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterOptions } from "@/hooks/queries";

interface ProductFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

const stockOptions = [
  { value: "all", label: "All Products" },
  { value: "in-stock", label: "In Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
];

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "audio", label: "Audio & Sound" },
  { value: "computing", label: "Computing & Workspace" },
  { value: "wearables", label: "Smart Gear & Wearables" },
  { value: "gaming", label: "Gaming & Controllers" },
  { value: "networking", label: "Networking & Smart Home" },
];

export function ProductFilter({ filters, onFilterChange }: ProductFilterProps) {
  const handleSortChange = (value: string | null) => {
    if (value == null) return;
    onFilterChange({
      ...filters,
      sortBy: value as FilterOptions["sortBy"],
    });
  };

  const handleStockChange = (value: string | null) => {
    if (value == null) return;
    onFilterChange({
      ...filters,
      stockFilter: value as FilterOptions["stockFilter"],
    });
  };

  const handleCategoryChange = (value: string | null) => {
    if (value == null) return;
    onFilterChange({
      ...filters,
      categoryFilter: value as FilterOptions["categoryFilter"],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg border p-2 sm:p-4"
    >
      {/* Mobile: compact horizontal scroll row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
        <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium sm:text-sm">
          <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Filters:</span>
        </div>

        {/* Sort Options */}
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="h-8 w-[130px] shrink-0 text-xs sm:h-9 sm:w-[180px] sm:text-sm">
            <SortAsc className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Stock Filter */}
        <Select value={filters.stockFilter} onValueChange={handleStockChange}>
          <SelectTrigger className="h-8 w-[110px] shrink-0 text-xs sm:h-9 sm:w-[150px] sm:text-sm">
            <SelectValue placeholder="Stock" />
          </SelectTrigger>
          <SelectContent>
            {stockOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select
          value={filters.categoryFilter}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="h-8 w-[120px] shrink-0 text-xs sm:h-9 sm:w-[150px] sm:text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
}
