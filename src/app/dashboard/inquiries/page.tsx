"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { InquiryHeader } from "@/components/dashboard/inquiries/InquiryHeader";
import { InquiryStats } from "@/components/dashboard/inquiries/InquiryStats";
import { InquiryToolbar } from "@/components/dashboard/inquiries/InquiryToolbar";
import { InquiryTable } from "@/components/dashboard/inquiries/InquiryTable";
import { InquiryDrawer } from "@/components/dashboard/inquiries/InquiryDrawer";
import { InquiryEmptyState } from "@/components/dashboard/inquiries/InquiryEmptyState";
import { mockInquiries as initialInquiries, Inquiry, InquiryStatus } from "@/data/inquiries";

export default function InquiriesDashboardPage() {
  const prefersReduced = useReducedMotion();

  // Local state for inquiries data, search, filter criteria, and drawer
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Status update handler (local state update only for realistic UX interaction)
  const handleStatusUpdate = (id: string, newStatus: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  // Find the currently selected inquiry details from state
  const selectedInquiry = useMemo(() => {
    return inquiries.find((inq) => inq.id === selectedInquiryId) || null;
  }, [inquiries, selectedInquiryId]);

  // Drawer select handler
  const handleSelectInquiry = (inquiry: Inquiry) => {
    setSelectedInquiryId(inquiry.id);
    setIsDrawerOpen(true);
  };

  // Filter and sort inquiries lists dynamically
  const filteredInquiries = useMemo(() => {
    let result = [...inquiries];

    // 1. Search term match
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (inq) =>
          inq.name.toLowerCase().includes(term) ||
          inq.email.toLowerCase().includes(term) ||
          inq.company.toLowerCase().includes(term) ||
          inq.type.toLowerCase().includes(term)
      );
    }

    // 2. Status filter match
    if (statusFilter !== "all") {
      result = result.filter((inq) => inq.status === statusFilter);
    }

    // 3. Date filter match (using mock date days relative to Aug 22)
    if (dateFilter !== "all") {
      result = result.filter((inq) => {
        const day = parseInt(inq.date.split(" ")[0]);
        if (dateFilter === "today") {
          return day === 22;
        }
        if (dateFilter === "7days") {
          return day >= 15; // Within last 7 days of 22nd
        }
        if (dateFilter === "30days") {
          return day >= 1; // All Aug entries
        }
        return true;
      });
    }

    // 4. Sort order match (by day value descending or ascending)
    result.sort((a, b) => {
      const dayA = parseInt(a.date.split(" ")[0]);
      const dayB = parseInt(b.date.split(" ")[0]);
      
      // Secondary sort by time if days are equal
      if (dayA === dayB) {
        return b.time.localeCompare(a.time);
      }

      return sortOrder === "newest" ? dayB - dayA : dayA - dayB;
    });

    return result;
  }, [inquiries, searchTerm, statusFilter, dateFilter, sortOrder]);

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReduced ? 0.05 : 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="space-y-8 pb-12 select-none"
    >
      {/* Page Header */}
      <InquiryHeader />

      {/* Metrics strip */}
      <InquiryStats />

      {/* Filter toolbar */}
      <InquiryToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {/* Table list / empty states */}
      {filteredInquiries.length > 0 ? (
        <InquiryTable
          inquiries={filteredInquiries}
          onSelectInquiry={handleSelectInquiry}
        />
      ) : (
        <InquiryEmptyState />
      )}

      {/* Details drawer panel */}
      <InquiryDrawer
        inquiry={selectedInquiry}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </motion.div>
  );
}
