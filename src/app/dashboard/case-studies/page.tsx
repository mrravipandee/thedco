"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CaseStudyHeader } from "@/components/dashboard/case-studies/CaseStudyHeader";
import { CaseStudyStats } from "@/components/dashboard/case-studies/CaseStudyStats";
import { CaseStudyToolbar } from "@/components/dashboard/case-studies/CaseStudyToolbar";
import { CaseStudyList } from "@/components/dashboard/case-studies/CaseStudyList";
import { CaseStudyEditor } from "@/components/dashboard/case-studies/CaseStudyEditor";
import { CaseStudyEmptyState } from "@/components/dashboard/case-studies/CaseStudyEmptyState";
import { mockCaseStudies as initialCaseStudies, CaseStudy } from "@/data/case-studies";

export default function CaseStudiesDashboardPage() {
  const prefersReduced = useReducedMotion();

  // Local state for case studies collection, filters, and editor modal
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Add or update case study record locally
  const handleSaveCaseStudy = (updatedCaseStudy: CaseStudy) => {
    setCaseStudies((prev) => {
      const exists = prev.some((cs) => cs.id === updatedCaseStudy.id);
      if (exists) {
        return prev.map((cs) => (cs.id === updatedCaseStudy.id ? updatedCaseStudy : cs));
      } else {
        return [updatedCaseStudy, ...prev];
      }
    });
    setIsEditorOpen(false);
  };

  // Find the selected case study details
  const selectedCaseStudy = useMemo(() => {
    return caseStudies.find((cs) => cs.id === selectedCaseStudyId) || null;
  }, [caseStudies, selectedCaseStudyId]);

  // Open editor for creating a new case study
  const handleNewCaseStudyClick = () => {
    setSelectedCaseStudyId(null);
    setIsEditorOpen(true);
  };

  // Open editor for modifying an existing case study
  const handleSelectCaseStudy = (caseStudy: CaseStudy) => {
    setSelectedCaseStudyId(caseStudy.id);
    setIsEditorOpen(true);
  };

  // Filter and sort evaluation calculations
  const filteredCaseStudies = useMemo(() => {
    let result = [...caseStudies];

    // 1. Search term match
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (cs) =>
          cs.title.toLowerCase().includes(term) ||
          cs.shortDescription.toLowerCase().includes(term) ||
          cs.challenge.toLowerCase().includes(term) ||
          cs.approach.toLowerCase().includes(term) ||
          cs.implementation.toLowerCase().includes(term) ||
          cs.outcome.toLowerCase().includes(term) ||
          cs.client.toLowerCase().includes(term)
      );
    }

    // 2. Status filter match
    if (statusFilter !== "all") {
      result = result.filter((cs) => cs.status === statusFilter);
    }

    // 3. Sector filter match
    if (sectorFilter !== "all") {
      result = result.filter((cs) => cs.sector.toLowerCase().includes(sectorFilter.toLowerCase()));
    }

    // 4. Sort order matches (by updatedAt date stamps)
    result.sort((a, b) => {
      const dateA = Date.parse(a.updatedAt) || 0;
      const dateB = Date.parse(b.updatedAt) || 0;
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [caseStudies, searchTerm, statusFilter, sectorFilter, sortOrder]);

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
      {/* Header sections */}
      <CaseStudyHeader onNewCaseStudyClick={handleNewCaseStudyClick} />

      {/* Case studies Stats total metrics */}
      <CaseStudyStats />

      {/* Filters toolbar */}
      <CaseStudyToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sectorFilter={sectorFilter}
        onSectorChange={setSectorFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {/* Table list rows / empty states */}
      {filteredCaseStudies.length > 0 ? (
        <CaseStudyList
          caseStudies={filteredCaseStudies}
          onSelectCaseStudy={handleSelectCaseStudy}
        />
      ) : (
        <CaseStudyEmptyState />
      )}

      {/* Modal Case Study Editor */}
      <CaseStudyEditor
        key={isEditorOpen ? (selectedCaseStudyId || "new") : "closed"}
        caseStudy={selectedCaseStudy} // Wait! It is caseStudy prop, and the variable is selectedCaseStudy! Let's correct this.
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveCaseStudy}
      />
    </motion.div>
  );
}
