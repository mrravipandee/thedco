"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BlogHeader } from "@/components/dashboard/blog/BlogHeader";
import { BlogStats } from "@/components/dashboard/blog/BlogStats";
import { BlogToolbar } from "@/components/dashboard/blog/BlogToolbar";
import { BlogList } from "@/components/dashboard/blog/BlogList";
import { BlogEditor } from "@/components/dashboard/blog/BlogEditor";
import { BlogEmptyState } from "@/components/dashboard/blog/BlogEmptyState";
import { mockBlogPosts as initialPosts, BlogPost } from "@/data/blog";

export default function BlogDashboardPage() {
  const prefersReduced = useReducedMotion();

  // Local state for blog articles, search, filter criteria, and editor modal
  const [articles, setArticles] = useState<BlogPost[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Add or update article in local state for realistic CMS interactions
  const handleSaveArticle = (updatedArticle: BlogPost) => {
    setArticles((prev) => {
      const exists = prev.some((art) => art.id === updatedArticle.id);
      if (exists) {
        return prev.map((art) => (art.id === updatedArticle.id ? updatedArticle : art));
      } else {
        return [updatedArticle, ...prev];
      }
    });
    setIsEditorOpen(false);
  };

  // Find the selected article details
  const selectedArticle = useMemo(() => {
    return articles.find((art) => art.id === selectedArticleId) || null;
  }, [articles, selectedArticleId]);

  // Open editor for creating a new article
  const handleNewArticleClick = () => {
    setSelectedArticleId(null);
    setIsEditorOpen(true);
  };

  // Open editor for modifying an existing article
  const handleSelectArticle = (article: BlogPost) => {
    setSelectedArticleId(article.id);
    setIsEditorOpen(true);
  };

  // Dynamic filter and sort evaluations
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // 1. Search term match
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (art) =>
          art.title.toLowerCase().includes(term) ||
          art.excerpt.toLowerCase().includes(term) ||
          art.content.toLowerCase().includes(term) ||
          art.author.toLowerCase().includes(term)
      );
    }

    // 2. Status filter match
    if (statusFilter !== "all") {
      result = result.filter((art) => art.status === statusFilter);
    }

    // 3. Category filter match
    if (categoryFilter !== "all") {
      result = result.filter((art) => art.category === categoryFilter);
    }

    // 4. Sort order match (by updatedAt date stamps parsing)
    result.sort((a, b) => {
      const dateA = Date.parse(a.updatedAt) || 0;
      const dateB = Date.parse(b.updatedAt) || 0;
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [articles, searchTerm, statusFilter, categoryFilter, sortOrder]);

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
      {/* CMS Page Header */}
      <BlogHeader onNewArticleClick={handleNewArticleClick} />

      {/* Blog Metrics stats panels */}
      <BlogStats />

      {/* Toolbar filters */}
      <BlogToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {/* Article List / Empty States */}
      {filteredArticles.length > 0 ? (
        <BlogList
          articles={filteredArticles}
          onSelectArticle={handleSelectArticle}
        />
      ) : (
        <BlogEmptyState />
      )}

      {/* Modal Editorial Form Editor */}
      <BlogEditor
        key={isEditorOpen ? (selectedArticleId || "new") : "closed"}
        article={selectedArticle}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveArticle}
      />
    </motion.div>
  );
}
