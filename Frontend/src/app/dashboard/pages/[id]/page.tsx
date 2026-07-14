"use client";

import React, { useEffect, useState, use, useRef } from "react";
import { useRouter } from "next/navigation";
import { useReport } from "@/context/ReportContext";
import { api } from "@/lib/api";
import {
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Save,
  Code,
  Eye,
  EyeOff,
  ChevronLeft,
  Settings,
  Grid,
  Heading as HeadingIcon,
  Type,
  Link as LinkIcon,
  CheckCircle,
  HelpCircle,
  BarChart,
  List as ListIcon,
  MessageSquare,
  MapPin,
  X,
  CreditCard,
  Tag,
  Briefcase,
  TrendingUp,
  FileText,
} from "lucide-react";

interface ContentBlock {
  id: string;
  blockType: string;
  content: Record<string, any>;
  sortOrder: number;
  isVisible: boolean;
}

interface PageDetail {
  id: string;
  title: string;
  pageType: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  parentPathway?: string;
}

const RichTextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const editorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCmd = (cmd: string, arg: string = "") => {
    document.execCommand(cmd, false, arg);
    handleInput();
  };

  return (
    <div className="border border-border rounded-sm overflow-hidden bg-card">
      <div className="flex flex-wrap items-center gap-1 bg-sidebar/20 p-2 border-b border-border/80 text-[10px] font-mono select-none">
        <button
          type="button"
          onClick={() => execCmd("bold")}
          className="px-2.5 py-1 border border-border bg-card hover:bg-sidebar rounded font-bold cursor-pointer"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => execCmd("italic")}
          className="px-2.5 py-1 border border-border bg-card hover:bg-sidebar rounded italic cursor-pointer"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => execCmd("underline")}
          className="px-2.5 py-1 border border-border bg-card hover:bg-sidebar rounded underline cursor-pointer"
          title="Underline"
        >
          U
        </button>
        <div className="w-px h-4 bg-border/80 mx-1" />
        <button
          type="button"
          onClick={() => execCmd("formatBlock", "<h2>")}
          className="px-2 py-1 border border-border bg-card hover:bg-sidebar rounded font-bold cursor-pointer"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => execCmd("formatBlock", "<h3>")}
          className="px-2 py-1 border border-border bg-card hover:bg-sidebar rounded font-bold cursor-pointer"
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => execCmd("formatBlock", "<p>")}
          className="px-2 py-1 border border-border bg-card hover:bg-sidebar rounded font-normal cursor-pointer"
          title="Paragraph Text"
        >
          Normal
        </button>
        <div className="w-px h-4 bg-border/80 mx-1" />
        <button
          type="button"
          onClick={() => execCmd("insertUnorderedList")}
          className="px-2 py-1 border border-border bg-card hover:bg-sidebar rounded font-bold cursor-pointer"
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => execCmd("insertOrderedList")}
          className="px-2 py-1 border border-border bg-card hover:bg-sidebar rounded font-bold cursor-pointer"
          title="Numbered List"
        >
          1. List
        </button>
        <div className="w-px h-4 bg-border/80 mx-1" />
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) execCmd("createLink", url);
          }}
          className="px-2.5 py-1 border border-border bg-card hover:bg-sidebar rounded font-mono text-[9px] cursor-pointer"
          title="Add Link"
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => execCmd("unlink")}
          className="px-2.5 py-1 border border-border bg-card hover:bg-sidebar rounded font-mono text-[9px] cursor-pointer"
          title="Remove Link"
        >
          Unlink
        </button>
        <div className="w-px h-4 bg-border/80 mx-1" />
        <button
          type="button"
          onClick={() => execCmd("removeFormat")}
          className="px-2.5 py-1 border border-border bg-card hover:bg-sidebar rounded text-[8px] uppercase font-bold cursor-pointer"
          title="Clear Formatting"
        >
          Clear
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="w-full min-h-[140px] p-3 text-xs text-primary focus:outline-none bg-[#fdfdfc] leading-relaxed prose prose-sm max-w-none font-sans"
        style={{ outline: "none" }}
      />
    </div>
  );
};

export default function PageBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: pageId } = use(params);
  const { activeReport } = useReport();
  const router = useRouter();

  const [page, setPage] = useState<PageDetail | null>(null);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPage, setSavingPage] = useState(false);

  // Page Form Fields
  const [pageTitle, setPageTitle] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  // Active overlay selectors
  const [showCatalog, setShowCatalog] = useState(false);
  const [rawJsonEditId, setRawJsonEditId] = useState<string | null>(null);
  const [rawJsonText, setRawJsonText] = useState("");

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showFloatingAdd, setShowFloatingAdd] = useState(false);
  const [showFloatingSave, setShowFloatingSave] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const addBlockBtnRef = useRef<HTMLButtonElement>(null);
  const saveBtnRef = useRef<HTMLButtonElement>(null);
  const newBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeReport && pageId) {
      loadPageData();
    }
  }, [activeReport, pageId]);

  // Floating add button: show when the header Add Block btn scrolls out of view
  useEffect(() => {
    const el = addBlockBtnRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingAdd(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [addBlockBtnRef.current]);

  // Floating save button: show when the header Save btn scrolls out of view
  useEffect(() => {
    const el = saveBtnRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingSave(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [saveBtnRef.current]);

  const loadPageData = async () => {
    setLoading(true);
    try {
      // Fetch Page Details
      const pageData = await api.get<PageDetail>(
        `/reports/${activeReport!.id}/pages/${pageId}`,
      );
      setPage(pageData);
      setPageTitle(pageData.title);
      setMetaTitle(pageData.metaTitle || "");
      setMetaDescription(pageData.metaDescription || "");
      setIsPublished(pageData.isPublished);

      // Fetch Blocks
      const blocksData = await api.get<ContentBlock[]>(
        `/pages/${pageId}/blocks`,
      );
      setBlocks(blocksData.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (err) {
      console.error("Failed to load page data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reorder Blocks
  const moveBlock = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const updatedBlocks = [...blocks];
    const temp = updatedBlocks[index];
    updatedBlocks[index] = updatedBlocks[targetIndex];
    updatedBlocks[targetIndex] = temp;

    // Optimistic UI update
    setBlocks(updatedBlocks);

    try {
      const orderedIds = updatedBlocks.map((b) => b.id);
      await api.patch(`/pages/${pageId}/blocks/reorder`, { orderedIds });
    } catch (err: any) {
      console.error("Failed to reorder blocks:", err);
      loadPageData();
    }
  };

  // Create Block (Component Catalog flow)
  const handleAddBlock = async (type: string) => {
    setShowCatalog(false);

    let defaultContent: Record<string, any> = {};
    if (type === "heading") {
      defaultContent = { level: 2, text: "Heading Component", align: "left" };
    } else if (type === "paragraph") {
      defaultContent = {
        text: "Write standard body paragraph content here...",
      };
    } else if (type === "cta_button") {
      defaultContent = {
        label: "Click Here",
        url: "https://",
        style: "primary",
      };
    } else if (type === "kpi_card") {
      defaultContent = {
        value: "48,800",
        label: "Employees",
        prefix: "",
        suffix: "",
        description: "councils",
      };
    } else if (type === "stat_group") {
      defaultContent = {
        title: "Icon Box Title",
        description: "Box description details...",
        icon: "globe",
      };
    } else if (type === "map") {
      defaultContent = { state: "QLD", zoom: 5, center: "Australia" };
    } else if (type === "chart") {
      defaultContent = {
        chartType: "bar",
        title: "Employment Growth Trends",
        source: "source: ABS Public Sector Employment",
        data: [
          { label: "NSW", value: 120 },
          { label: "VIC", value: 90 },
          { label: "QLD", value: 75 },
        ],
      };
    } else if (type === "quote") {
      defaultContent = {
        text: "This is a stakeholder feedback quote text block.",
        author: "Stakeholder Body",
      };
    } else if (type === "list") {
      defaultContent = {
        items: ["First list item detail", "Second list item detail"],
      };
    } else if (type === "cards") {
      defaultContent = {
        columnsPerRow: 2,
        cards: [
          {
            number: "01",
            title: "First Nations Participation",
            description: "Details about participation...",
            tags: ["Tag 1", "Tag 2"],
          },
          {
            number: "02",
            title: "AI & Digital Transformation",
            description: "Details about AI impact...",
            tags: ["Tag 3"],
          },
        ],
      };
    } else if (type === "tags") {
      defaultContent = {
        prefix: "ON THIS PAGE",
        tags: [
          "Evidence",
          "Industry voice",
          "Insights",
          "Strategies",
          "Outlook",
        ],
      };
    } else if (type === "strategy_card") {
      defaultContent = {
        strategies: [
          {
            number: "1",
            title: "Map shortages to VET training products",
            breadcrumbs: ["Theme 1", "Insights 1-3", "Strategy 1"],
            deliverable: "Occupational Shortage Map",
            timeline: "12-month",
          },
          {
            number: "2",
            title: "Facilitate a whole-of-VET roundtable",
            breadcrumbs: ["Theme 2", "Insights 4-7", "Strategy 2"],
            deliverable: "Roundtable + summary report",
            timeline: "12-month",
          },
        ],
      };
    } else if (type === "numbered_list_theme") {
      defaultContent = {
        themes: [
          {
            title: "Local Government-specific occupational shortages",
            countText: "3",
            items: [
              {
                number: "1",
                text: "Councils need a broad, diverse skill base to cover expanding responsibilities",
              },
              {
                number: "2",
                text: "Skills needs are shifting with technology, workforce pressure & community expectations",
              },
              {
                number: "3",
                text: "Acute Local Government-specific shortages persist — especially emergency management",
              },
            ],
          },
        ],
      };
    } else if (type === "kpi_dashboard") {
      defaultContent = {
        kpis: [
          {
            value: "218,000",
            label: "Total workforce",
            subtext: "employees, June 2025",
          },
          { value: "+14%", label: "Workforce growth", subtext: "2020 → 2025" },
          {
            value: "55%",
            label: "Regional, rural & remote",
            subtext: "share of councils",
          },
          {
            value: "8.2%",
            label: "First Nations workforce",
            subtext: "vs 3.8% population",
          },
        ],
        showTrend: true,
        trendTitle: "Projected workforce demand →",
        trendSubtext: "significant growth projected to 2035",
        trendPoints: [10, 12, 11, 15, 14, 18, 20],
      };
    } else if (type === "rich_text") {
      defaultContent = { html: "<p>Write your rich text content here...</p>" };
    }

    try {
      const newBlock = await api.post<ContentBlock>(`/pages/${pageId}/blocks`, {
        blockType: type,
        content: defaultContent,
        sortOrder: blocks.length + 1,
        isVisible: true,
      });
      setBlocks((prev) => [...prev, newBlock]);
      // Scroll to the newly added block after a brief paint delay
      setTimeout(() => {
        newBlockRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    } catch (err: any) {
      alert(`Failed to add component: ${err.message}`);
    }
  };

  // Save as Draft (isPublished = false)
  const handleSaveAsDraft = async () => {
    setSavingDraft(true);
    setSuccessMsg(null);
    try {
      const updatedPage = await api.patch<PageDetail>(
        `/reports/${activeReport!.id}/pages/${pageId}`,
        {
          title: pageTitle,
          metaTitle: metaTitle || null,
          metaDescription: metaDescription || null,
          isPublished: false,
        },
      );
      setPage(updatedPage);
      setIsPublished(false);

      const updatedBlocks = await Promise.all(
        blocks.map((block) =>
          api.patch<ContentBlock>(`/pages/${pageId}/blocks/${block.id}`, {
            content: block.content,
            isVisible: block.isVisible,
          }),
        ),
      );
      setBlocks(updatedBlocks.sort((a, b) => a.sortOrder - b.sortOrder));
      setSuccessMsg("Chapter saved as draft.");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(`Failed to save draft: ${err.message}`);
    } finally {
      setSavingDraft(false);
    }
  };

  // Publish (isPublished = true)
  const handleSavePageBlocks = async () => {
    setSavingPage(true);
    setSuccessMsg(null);
    try {
      // 1. Save Page Meta
      const updatedPage = await api.patch<PageDetail>(
        `/reports/${activeReport!.id}/pages/${pageId}`,
        {
          title: pageTitle,
          metaTitle: metaTitle || null,
          metaDescription: metaDescription || null,
          isPublished: true,
        },
      );
      setPage(updatedPage);
      setIsPublished(true);

      // 2. Save all content blocks concurrently
      const updatedBlocks = await Promise.all(
        blocks.map((block) =>
          api.patch<ContentBlock>(`/pages/${pageId}/blocks/${block.id}`, {
            content: block.content,
            isVisible: block.isVisible,
          }),
        ),
      );
      setBlocks(updatedBlocks.sort((a, b) => a.sortOrder - b.sortOrder));

      setSuccessMsg(
        "Chapter published successfully — all layout blocks saved.",
      );
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err: any) {
      alert(`Failed to publish chapter: ${err.message}`);
    } finally {
      setSavingPage(false);
    }
  };

  // Toggle Visibility locally (saved on clicking global Save & Publish)
  const toggleVisibility = (block: ContentBlock) => {
    setBlocks(
      blocks.map((b) =>
        b.id === block.id ? { ...b, isVisible: !b.isVisible } : b,
      ),
    );
  };

  // Delete Block
  const handleDeleteBlock = async (blockId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this component? This operation is permanent.",
      )
    )
      return;
    try {
      await api.delete(`/pages/${pageId}/blocks/${blockId}`);
      setBlocks(blocks.filter((b) => b.id !== blockId));
    } catch (err: any) {
      alert(`Failed to delete component: ${err.message}`);
    }
  };

  // Raw JSON Editor Actions
  const handleOpenRawJson = (block: ContentBlock) => {
    setRawJsonEditId(block.id);
    setRawJsonText(JSON.stringify(block.content, null, 2));
  };

  const handleSaveRawJson = (blockId: string) => {
    try {
      const parsedContent = JSON.parse(rawJsonText);
      setBlocks(
        blocks.map((b) =>
          b.id === blockId ? { ...b, content: parsedContent } : b,
        ),
      );
      setRawJsonEditId(null);
    } catch (err: any) {
      alert(`JSON Syntax Error: ${err.message}`);
    }
  };

  // Sub-editors helper state updates
  const updateBlockContentField = (
    blockId: string,
    field: string,
    value: any,
  ) => {
    setBlocks(
      blocks.map((b) => {
        if (b.id === blockId) {
          return {
            ...b,
            content: {
              ...b.content,
              [field]: value,
            },
          };
        }
        return b;
      }),
    );
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border border-primary border-t-transparent" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
            Loading CMS Builder...
          </span>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="text-center p-8 border border-border bg-sidebar/20 font-mono text-xs uppercase text-muted">
        * Error: Page not found
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back to Report Editor */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (activeReport) {
              router.push(`/dashboard/reports/${activeReport.id}`);
            } else {
              router.push("/dashboard/reports");
            }
          }}
          className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted hover:text-primary transition-colors border border-border bg-card px-2.5 py-1"
        >
          <ChevronLeft className="h-3 w-3" />
          Back to Report Editor
        </button>
      </div>

      {/* Page Builder Actions Bar */}
      <div className="border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-xs gap-3">
        <div className="flex items-center gap-3">
          <div>
            <div className="mb-1 flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-muted">
              <span>Chapter page</span>
              <span>/</span>
              <span className="text-primary font-bold">{page.title}</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-primary uppercase leading-none">
              {pageTitle || "Chapter Builder"}
            </h1>
          </div>

          <span
            className={`inline-flex items-center text-[8px] font-mono font-bold py-0.5 px-1.5 border leading-none ${
              isPublished
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-yellow-50 border-yellow-200 text-yellow-700"
            }`}
          >
            {isPublished ? "PUBLISHED" : "DRAFT"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            ref={addBlockBtnRef}
            onClick={() => setShowCatalog(true)}
            className="border border-border bg-card px-3 py-1.5 font-mono text-[10px] uppercase hover:bg-sidebar transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Block
          </button>

          <button
            onClick={handleSaveAsDraft}
            disabled={savingDraft || savingPage}
            className="border border-border bg-card px-3 py-1.5 font-mono text-[10px] uppercase hover:bg-sidebar transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer text-muted"
          >
            <Save className="h-3.5 w-3.5" />
            {savingDraft ? "Saving..." : "Save as Draft"}
          </button>

          <button
            ref={saveBtnRef}
            onClick={handleSavePageBlocks}
            disabled={savingPage || savingDraft}
            className="border border-primary bg-primary px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer font-bold"
          >
            <Save className="h-4 w-4" />
            {savingPage ? "Publishing..." : "Publish Chapter"}
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="border border-green-200 bg-green-50/50 p-3 text-xs text-green-700 font-mono">
          * SUCCESS: {successMsg.toUpperCase()}
        </div>
      )}

      {/* ── Page properties configuration ── */}
      <div className="border border-border bg-card p-6 shadow-sm relative">
        <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
          * CHAPTER CONFIG
        </span>

        <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
          SEO and Page Settings
        </h2>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                Page Title
              </label>
              <input
                type="text"
                required
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none placeholder:text-muted/40"
              />
            </div>

            <div className="flex items-center h-full pt-4 md:pl-4">
              <span
                className={`inline-flex items-center text-[8px] font-mono font-bold py-0.5 px-2 border leading-none ${
                  isPublished
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-yellow-50 border-yellow-200 text-yellow-700"
                }`}
              >
                {isPublished ? "● PUBLISHED" : "● DRAFT"}
              </span>
            </div>

            <div className="space-y-1 sm:col-span-2 md:col-span-3">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                SEO Meta Description
              </label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Content Components Canvas ── */}
      <div className="space-y-6">
        {/* Floating Action Bar: Save as Draft + Add Block */}
        {(showFloatingAdd || showFloatingSave) && blocks.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 items-end">
            {showFloatingSave && (
              <>
                <button
                  onClick={handleSaveAsDraft}
                  disabled={savingDraft || savingPage}
                  className="flex items-center gap-2 bg-card border border-border text-primary px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest shadow-lg hover:bg-sidebar transition-all rounded-sm disabled:opacity-50"
                >
                  <Save className="h-3.5 w-3.5" />
                  {savingDraft ? "Saving..." : "Save as Draft"}
                </button>
                <button
                  onClick={handleSavePageBlocks}
                  disabled={savingPage || savingDraft}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest shadow-lg hover:bg-active transition-all border border-primary/20 rounded-sm disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {savingPage ? "Publishing..." : "Publish Chapter"}
                </button>
              </>
            )}
            {showFloatingAdd && (
              <button
                onClick={() => setShowCatalog(true)}
                className="flex items-center gap-2 bg-sidebar border border-border text-primary px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest shadow-lg hover:bg-card transition-all rounded-sm"
              >
                <Plus className="h-4 w-4" />
                Add Block
              </button>
            )}
          </div>
        )}
        {blocks.length === 0 ? (
          <div
            className="text-center py-16 border border-dashed border-border bg-sidebar/20 font-mono text-xs uppercase text-muted cursor-pointer hover:border-primary transition-all"
            onClick={() => setShowCatalog(true)}
          >
            * Canvas is empty. Click here to select a component layout.
          </div>
        ) : (
          blocks.map((block, index) => {
            const isEditingRaw = rawJsonEditId === block.id;
            const isNewest = index === blocks.length - 1;

            return (
              <div
                key={block.id}
                ref={isNewest ? newBlockRef : undefined}
                className={`border bg-card p-6 shadow-sm relative transition-all ${
                  block.isVisible
                    ? "border-border"
                    : "border-dashed border-border/40 opacity-70 bg-sidebar/10"
                }`}
              >
                {/* Component Toolbar */}
                <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                      * COMPONENT {String(index + 1).padStart(2, "0")} :{" "}
                      {block.blockType.toUpperCase()}
                    </span>
                    {!block.isVisible && (
                      <span className="font-mono text-[8px] uppercase text-red-500 border border-red-200 bg-red-50 px-1 py-0.5">
                        Hidden
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveBlock(index, "up")}
                      disabled={index === 0}
                      className="p-1 border border-border bg-card hover:bg-sidebar disabled:opacity-40"
                      title="Move Up"
                    >
                      <ArrowUp className="h-3.5 w-3.5 text-primary" />
                    </button>
                    <button
                      onClick={() => moveBlock(index, "down")}
                      disabled={index === blocks.length - 1}
                      className="p-1 border border-border bg-card hover:bg-sidebar disabled:opacity-40"
                      title="Move Down"
                    >
                      <ArrowDown className="h-3.5 w-3.5 text-primary" />
                    </button>

                    <div className="w-px h-5 bg-border mx-1" />

                    <button
                      onClick={() => toggleVisibility(block)}
                      className={`p-1 border border-border bg-card hover:bg-sidebar`}
                      title={
                        block.isVisible ? "Hide Component" : "Show Component"
                      }
                    >
                      {block.isVisible ? (
                        <Eye className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5 text-muted" />
                      )}
                    </button>

                    <button
                      onClick={() =>
                        isEditingRaw
                          ? setRawJsonEditId(null)
                          : handleOpenRawJson(block)
                      }
                      className={`p-1 border border-border hover:bg-sidebar ${isEditingRaw ? "bg-sidebar border-primary/50" : "bg-card"}`}
                      title="JSON Schema"
                    >
                      <Code className="h-3.5 w-3.5 text-primary" />
                    </button>

                    <button
                      onClick={() => handleDeleteBlock(block.id)}
                      className="p-1 border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:border-red-300"
                      title="Delete Component"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Component editing forms */}
                {isEditingRaw ? (
                  // RAW JSON SCHEMA EDITOR
                  <div className="space-y-4">
                    <div className="bg-red-50 p-2 text-[9px] font-mono text-red-700 uppercase border border-red-200">
                      * WARNING: INCORRECT SCHEMA FORMATS WILL PREVENT THE SITE
                      FROM BUILDING.
                    </div>
                    <textarea
                      rows={8}
                      value={rawJsonText}
                      onChange={(e) => setRawJsonText(e.target.value)}
                      className="w-full border border-border bg-sidebar/20 p-3 font-mono text-xs text-primary focus:border-primary focus:outline-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setRawJsonEditId(null)}
                        className="border border-border bg-card px-3 py-1 font-mono text-[9px] uppercase hover:bg-sidebar"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveRawJson(block.id)}
                        className="border border-primary bg-primary px-3 py-1 font-mono text-[9px] uppercase text-white hover:bg-active"
                      >
                        Apply Schema
                      </button>
                    </div>
                  </div>
                ) : (
                  // VISUAL ELEMENT ATTRIBUTE FORM CONSOLES
                  <div className="space-y-4">
                    {/* Heading Editor */}
                    {block.blockType === "heading" && (
                      <div className="grid gap-3 sm:grid-cols-6">
                        <div className="sm:col-span-1 space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                            Size
                          </label>
                          <select
                            value={block.content.level || 2}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "level",
                                Number(e.target.value),
                              )
                            }
                            className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                          >
                            {[1, 2, 3, 4, 5, 6].map((l) => (
                              <option key={l} value={l}>
                                H{l}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="sm:col-span-3 space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                            Heading Text
                          </label>
                          <input
                            type="text"
                            value={block.content.text || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "text",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2 space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-normal">
                            Alignment
                          </label>
                          <select
                            value={block.content.align || "left"}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "align",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                          >
                            <option value="left">Left Align</option>
                            <option value="center">Center Align</option>
                            <option value="right">Right Align</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Paragraph Editor */}
                    {block.blockType === "paragraph" && (
                      <div className="space-y-1">
                        <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                          Paragraph Content
                        </label>
                        <textarea
                          rows={4}
                          value={block.content.text || ""}
                          onChange={(e) =>
                            updateBlockContentField(
                              block.id,
                              "text",
                              e.target.value,
                            )
                          }
                          className="w-full border border-border bg-[#fdfdfc] px-3 py-2 text-xs text-primary focus:border-primary focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Button / CTA Editor */}
                    {block.blockType === "cta_button" && (
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">
                            Button Label
                          </label>
                          <input
                            type="text"
                            value={block.content.label || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "label",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                            Redirect URL
                          </label>
                          <input
                            type="text"
                            value={block.content.url || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "url",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-normal">
                            Button Design
                          </label>
                          <select
                            value={block.content.style || "primary"}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "style",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                          >
                            <option value="primary">
                              Primary (Solid Black)
                            </option>
                            <option value="secondary">
                              Secondary (Bordered Line)
                            </option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Number Box Editor */}
                    {block.blockType === "kpi_card" && (
                      <div className="grid gap-3 sm:grid-cols-5">
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                            Stat Label
                          </label>
                          <input
                            type="text"
                            value={block.content.label || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "label",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">
                            Numeric Value
                          </label>
                          <input
                            type="text"
                            value={block.content.value || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "value",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-normal">
                            Prefix
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. $"
                            value={block.content.prefix || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "prefix",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-normal">
                            Suffix
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. %"
                            value={block.content.suffix || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "suffix",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                            Description
                          </label>
                          <input
                            type="text"
                            value={block.content.description || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "description",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Icon Box Editor */}
                    {block.blockType === "stat_group" && (
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                            Box Title
                          </label>
                          <input
                            type="text"
                            value={block.content.title || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "title",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                            Box Description
                          </label>
                          <input
                            type="text"
                            value={block.content.description || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "description",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-normal">
                            Select Icon
                          </label>
                          <select
                            value={block.content.icon || "globe"}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "icon",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                          >
                            <option value="globe">Globe World</option>
                            <option value="users">Users Group</option>
                            <option value="file">File Sheet</option>
                            <option value="sliders">Sliders Slider</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Interactive Map Editor */}
                    {block.blockType === "map" && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">
                            Focus State Territory
                          </label>
                          <select
                            value={block.content.state || "QLD"}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "state",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                          >
                            <option value="National">National Australia</option>
                            <option value="NSW">New South Wales</option>
                            <option value="VIC">Victoria</option>
                            <option value="QLD">Queensland</option>
                            <option value="WA">Western Australia</option>
                            <option value="SA">South Australia</option>
                            <option value="TAS">Tasmania</option>
                            <option value="NT">Northern Territory</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                            Zoom Index (1-10)
                          </label>
                          <input
                            type="number"
                            value={block.content.zoom || 5}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "zoom",
                                Number(e.target.value),
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Bullet List Editor */}
                    {block.blockType === "list" && (
                      <div className="space-y-3">
                        <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                          Bullet Items
                        </label>
                        <div className="space-y-2">
                          {(block.content.items || []).map(
                            (item: string, i: number) => (
                              <div key={i} className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => {
                                    const newItems = [
                                      ...(block.content.items || []),
                                    ];
                                    newItems[i] = e.target.value;
                                    updateBlockContentField(
                                      block.id,
                                      "items",
                                      newItems,
                                    );
                                  }}
                                  className="flex-1 border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newItems = (
                                      block.content.items || []
                                    ).filter(
                                      (_: any, idx: number) => idx !== i,
                                    );
                                    updateBlockContentField(
                                      block.id,
                                      "items",
                                      newItems,
                                    );
                                  }}
                                  className="p-1 border border-red-200 bg-[#fff5f5] text-red-500 hover:bg-red-100"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ),
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = [
                                ...(block.content.items || []),
                                "New Bullet Point",
                              ];
                              updateBlockContentField(
                                block.id,
                                "items",
                                newItems,
                              );
                            }}
                            className="border border-dashed border-border hover:bg-sidebar px-3 py-1 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1 mt-2 text-muted"
                          >
                            <Plus className="h-3 w-3" /> Add Bullet Item
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Quote Editor */}
                    {block.blockType === "quote" && (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">
                            Quote Statement
                          </label>
                          <textarea
                            rows={3}
                            value={block.content.text || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "text",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-2 text-xs focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                            Speaker / Consultation Source
                          </label>
                          <input
                            type="text"
                            value={block.content.author || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "author",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Chart Editor */}
                    {block.blockType === "chart" && (
                      <div className="space-y-3">
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                              Chart Title
                            </label>
                            <input
                              type="text"
                              value={block.content.title || ""}
                              onChange={(e) =>
                                updateBlockContentField(
                                  block.id,
                                  "title",
                                  e.target.value,
                                )
                              }
                              className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                              Chart Type
                            </label>
                            <select
                              value={block.content.chartType || "bar"}
                              onChange={(e) =>
                                updateBlockContentField(
                                  block.id,
                                  "chartType",
                                  e.target.value,
                                )
                              }
                              className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                            >
                              <option value="bar">Bar Chart</option>
                              <option value="line">Line Chart</option>
                              <option value="pie">Pie Chart</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                              Source Note
                            </label>
                            <input
                              type="text"
                              value={block.content.source || ""}
                              onChange={(e) =>
                                updateBlockContentField(
                                  block.id,
                                  "source",
                                  e.target.value,
                                )
                              }
                              className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                              placeholder="e.g. source: NCVET, 2024"
                            />
                          </div>
                        </div>

                        {/* Chart Dataset Grid */}
                        <div className="space-y-2 border-t border-border/40 pt-3">
                          <span className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">
                            Chart Datasets
                          </span>

                          {(block.content.data || []).map(
                            (
                              pt: { label: string; value: number },
                              i: number,
                            ) => (
                              <div key={i} className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  placeholder="Label"
                                  value={pt.label || ""}
                                  onChange={(e) => {
                                    const newData = [
                                      ...(block.content.data || []),
                                    ];
                                    newData[i] = {
                                      ...newData[i],
                                      label: e.target.value,
                                    };
                                    updateBlockContentField(
                                      block.id,
                                      "data",
                                      newData,
                                    );
                                  }}
                                  className="flex-1 border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                                />
                                <input
                                  type="number"
                                  placeholder="Value"
                                  value={pt.value || 0}
                                  onChange={(e) => {
                                    const newData = [
                                      ...(block.content.data || []),
                                    ];
                                    newData[i] = {
                                      ...newData[i],
                                      value: Number(e.target.value),
                                    };
                                    updateBlockContentField(
                                      block.id,
                                      "data",
                                      newData,
                                    );
                                  }}
                                  className="w-28 border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newData = (
                                      block.content.data || []
                                    ).filter(
                                      (_: any, idx: number) => idx !== i,
                                    );
                                    updateBlockContentField(
                                      block.id,
                                      "data",
                                      newData,
                                    );
                                  }}
                                  className="p-1 border border-red-200 bg-[#fff5f5] text-red-500 hover:bg-red-100"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ),
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const newData = [
                                ...(block.content.data || []),
                                { label: "New Point", value: 0 },
                              ];
                              updateBlockContentField(
                                block.id,
                                "data",
                                newData,
                              );
                            }}
                            className="border border-dashed border-border hover:bg-sidebar px-3 py-1 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1 mt-2 text-muted"
                          >
                            <Plus className="h-3 w-3" /> Add Data Row
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Cards Grid Component Editor */}
                    {block.blockType === "cards" && (
                      <div className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                              Columns Per Row
                            </label>
                            <select
                              value={block.content.columnsPerRow || 2}
                              onChange={(e) =>
                                updateBlockContentField(
                                  block.id,
                                  "columnsPerRow",
                                  Number(e.target.value),
                                )
                              }
                              className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                            >
                              <option value={1}>1 Column</option>
                              <option value={2}>2 Columns</option>
                              <option value={3}>3 Columns</option>
                              <option value={4}>4 Columns</option>
                            </select>
                          </div>
                        </div>

                        <span className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold border-t border-border/40 pt-3">
                          Cards Layout Items
                        </span>

                        <div className="space-y-4">
                          {(block.content.cards || []).map(
                            (
                              card: {
                                number: string;
                                title: string;
                                description: string;
                                tags?: string[];
                                _tagsInput?: string;
                              },
                              i: number,
                            ) => (
                              <div
                                key={i}
                                className="border border-border p-4 bg-sidebar/25 relative space-y-3"
                              >
                                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                                  <span className="font-mono text-[8px] uppercase text-muted font-semibold">
                                    Card #{i + 1}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newCards = (
                                        block.content.cards || []
                                      ).filter(
                                        (_: any, idx: number) => idx !== i,
                                      );
                                      updateBlockContentField(
                                        block.id,
                                        "cards",
                                        newCards,
                                      );
                                    }}
                                    className="text-red-500 hover:text-red-700 p-0.5 border border-transparent hover:border-red-150 bg-card cursor-pointer"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-4">
                                  <div className="space-y-1">
                                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                      Badge/Num
                                    </label>
                                    <input
                                      type="text"
                                      value={card.number || ""}
                                      onChange={(e) => {
                                        const newCards = [
                                          ...(block.content.cards || []),
                                        ];
                                        newCards[i] = {
                                          ...newCards[i],
                                          number: e.target.value,
                                        };
                                        updateBlockContentField(
                                          block.id,
                                          "cards",
                                          newCards,
                                        );
                                      }}
                                      placeholder="e.g. 01"
                                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                                    />
                                  </div>
                                  <div className="space-y-1 sm:col-span-3">
                                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                      Card Title
                                    </label>
                                    <input
                                      type="text"
                                      value={card.title || ""}
                                      onChange={(e) => {
                                        const newCards = [
                                          ...(block.content.cards || []),
                                        ];
                                        newCards[i] = {
                                          ...newCards[i],
                                          title: e.target.value,
                                        };
                                        updateBlockContentField(
                                          block.id,
                                          "cards",
                                          newCards,
                                        );
                                      }}
                                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                                    />
                                  </div>
                                  <div className="space-y-1 sm:col-span-4">
                                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                      Card Tags (Comma-separated)
                                    </label>
                                    <input
                                      type="text"
                                      value={
                                        card._tagsInput !== undefined
                                          ? card._tagsInput
                                          : (card.tags || []).join(", ")
                                      }
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        const tagsArray = val
                                          .split(",")
                                          .map((s) => s.trim())
                                          .filter(Boolean);
                                        const newCards = [
                                          ...(block.content.cards || []),
                                        ];
                                        newCards[i] = {
                                          ...newCards[i],
                                          tags: tagsArray,
                                          _tagsInput: val,
                                        };
                                        updateBlockContentField(
                                          block.id,
                                          "cards",
                                          newCards,
                                        );
                                      }}
                                      onBlur={() => {
                                        const newCards = [
                                          ...(block.content.cards || []),
                                        ];
                                        if (
                                          newCards[i]._tagsInput !== undefined
                                        ) {
                                          delete newCards[i]._tagsInput;
                                          updateBlockContentField(
                                            block.id,
                                            "cards",
                                            newCards,
                                          );
                                        }
                                      }}
                                      placeholder="e.g. First Nations, Regional"
                                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                                    />
                                  </div>
                                  <div className="space-y-1 sm:col-span-4">
                                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                      Card Description
                                    </label>
                                    <textarea
                                      rows={2}
                                      value={card.description || ""}
                                      onChange={(e) => {
                                        const newCards = [
                                          ...(block.content.cards || []),
                                        ];
                                        newCards[i] = {
                                          ...newCards[i],
                                          description: e.target.value,
                                        };
                                        updateBlockContentField(
                                          block.id,
                                          "cards",
                                          newCards,
                                        );
                                      }}
                                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            ),
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const newCards = [
                                ...(block.content.cards || []),
                                {
                                  number: String(
                                    block.content.cards?.length + 1 || 1,
                                  ).padStart(2, "0"),
                                  title: "New Card Title",
                                  description: "",
                                  tags: [],
                                },
                              ];
                              updateBlockContentField(
                                block.id,
                                "cards",
                                newCards,
                              );
                            }}
                            className="border border-dashed border-border hover:bg-sidebar px-3 py-1.5 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1 mt-2 text-muted cursor-pointer"
                          >
                            <Plus className="h-3 w-3" /> Add Grid Card
                          </button>
                        </div>

                        {/* Visual Preview */}
                        <div className="border-t border-border/40 pt-4 space-y-2">
                          <span className="block font-mono text-[8px] uppercase tracking-widest text-muted font-bold">
                            * COMPONENT PREVIEW
                          </span>
                          <div
                            className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-${block.content.columnsPerRow || 2}`}
                          >
                            {(block.content.cards || []).map(
                              (card: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="border border-border p-4 bg-[#fdfdfc] rounded-sm space-y-2 shadow-xs"
                                >
                                  <div className="flex items-start gap-2">
                                    <span className="font-mono text-[10px] text-muted/60 font-bold">
                                      {card.number}
                                    </span>
                                  </div>
                                  <h4 className="text-xs font-bold text-primary uppercase leading-tight font-sans">
                                    {card.title}
                                  </h4>
                                  <p className="text-[11px] text-muted leading-relaxed font-sans">
                                    {card.description}
                                  </p>
                                  {(card.tags || []).length > 0 && (
                                    <div className="flex flex-wrap gap-1 pt-1">
                                      {(card.tags || []).map(
                                        (tag: string, tIdx: number) => (
                                          <span
                                            key={tIdx}
                                            className="px-1.5 py-0.5 bg-[#f4f2ee] border border-border/60 text-primary text-[8px] font-mono leading-none rounded"
                                          >
                                            {tag}
                                          </span>
                                        ),
                                      )}
                                    </div>
                                  )}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tags Component Editor */}
                    {block.blockType === "tags" && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                            Prefix Label
                          </label>
                          <input
                            type="text"
                            value={block.content.prefix || ""}
                            onChange={(e) =>
                              updateBlockContentField(
                                block.id,
                                "prefix",
                                e.target.value,
                              )
                            }
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                            placeholder="e.g. ON THIS PAGE"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">
                            Tags List
                          </label>
                          <div className="flex flex-wrap gap-2 items-center">
                            {(block.content.tags || []).map(
                              (tag: string, i: number) => (
                                <div
                                  key={i}
                                  className="flex items-center border border-border bg-[#fdfdfc] pl-3 pr-1 py-1 text-xs gap-1.5"
                                >
                                  <span>{tag}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newTags = (
                                        block.content.tags || []
                                      ).filter(
                                        (_: any, idx: number) => idx !== i,
                                      );
                                      updateBlockContentField(
                                        block.id,
                                        "tags",
                                        newTags,
                                      );
                                    }}
                                    className="text-red-500 hover:text-red-700 p-0.5"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ),
                            )}
                          </div>

                          <div className="flex gap-2 max-w-xs mt-2">
                            <input
                              type="text"
                              id={`new-tag-input-${block.id}`}
                              placeholder="New tag name"
                              className="flex-1 border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs focus:outline-none"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const target = e.currentTarget;
                                  const value = target.value.trim();
                                  if (value) {
                                    updateBlockContentField(block.id, "tags", [
                                      ...(block.content.tags || []),
                                      value,
                                    ]);
                                    target.value = "";
                                  }
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const input = document.getElementById(
                                  `new-tag-input-${block.id}`,
                                ) as HTMLInputElement;
                                const value = input?.value.trim();
                                if (value) {
                                  updateBlockContentField(block.id, "tags", [
                                    ...(block.content.tags || []),
                                    value,
                                  ]);
                                  input.value = "";
                                }
                              }}
                              className="border border-border bg-card hover:bg-sidebar px-3 py-1 font-mono text-[9px] uppercase"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {/* Visual Preview */}
                        <div className="border-t border-border/40 pt-4 space-y-2">
                          <span className="block font-mono text-[8px] uppercase tracking-widest text-muted font-bold">
                            * COMPONENT PREVIEW
                          </span>
                          <div className="flex flex-wrap items-center gap-2 border border-border/40 p-4 bg-[#fcfcfb]">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-muted mr-2 font-bold">
                              {block.content.prefix || "ON THIS PAGE"}
                            </span>
                            {(block.content.tags || []).map(
                              (tag: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 text-xs font-semibold rounded-full bg-[#f4f2ee] border border-border text-primary font-sans leading-none"
                                >
                                  {tag}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Strategy Card Component Editor */}
                    {block.blockType === "strategy_card" && (
                      <div className="space-y-4">
                        <span className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">
                          Strategies List
                        </span>

                        <div className="space-y-4">
                          {(block.content.strategies || []).map(
                            (strat: any, i: number) => (
                              <div
                                key={i}
                                className="border border-border p-4 bg-sidebar/25 relative space-y-3"
                              >
                                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                                  <span className="font-mono text-[8px] uppercase text-muted font-semibold">
                                    Strategy #{i + 1}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newStrats = (
                                        block.content.strategies || []
                                      ).filter(
                                        (_: any, idx: number) => idx !== i,
                                      );
                                      updateBlockContentField(
                                        block.id,
                                        "strategies",
                                        newStrats,
                                      );
                                    }}
                                    className="text-red-500 hover:text-red-700 p-0.5 border border-transparent hover:border-red-150 bg-card cursor-pointer"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-4">
                                  <div className="space-y-1">
                                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                      Badge/Num
                                    </label>
                                    <input
                                      type="text"
                                      value={strat.number || ""}
                                      onChange={(e) => {
                                        const newStrats = [
                                          ...(block.content.strategies || []),
                                        ];
                                        newStrats[i] = {
                                          ...newStrats[i],
                                          number: e.target.value,
                                        };
                                        updateBlockContentField(
                                          block.id,
                                          "strategies",
                                          newStrats,
                                        );
                                      }}
                                      placeholder="e.g. 1"
                                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                                    />
                                  </div>
                                  <div className="space-y-1 sm:col-span-3">
                                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                      Strategy Title
                                    </label>
                                    <input
                                      type="text"
                                      value={strat.title || ""}
                                      onChange={(e) => {
                                        const newStrats = [
                                          ...(block.content.strategies || []),
                                        ];
                                        newStrats[i] = {
                                          ...newStrats[i],
                                          title: e.target.value,
                                        };
                                        updateBlockContentField(
                                          block.id,
                                          "strategies",
                                          newStrats,
                                        );
                                      }}
                                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                                    />
                                  </div>
                                  <div className="space-y-1 sm:col-span-4">
                                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                      Breadcrumbs (Comma-separated)
                                    </label>
                                    <input
                                      type="text"
                                      value={
                                        strat._breadcrumbsInput !== undefined
                                          ? strat._breadcrumbsInput
                                          : (strat.breadcrumbs || []).join(", ")
                                      }
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        const breadcrumbsArray = val
                                          .split(",")
                                          .map((s) => s.trim())
                                          .filter(Boolean);
                                        const newStrats = [
                                          ...(block.content.strategies || []),
                                        ];
                                        newStrats[i] = {
                                          ...newStrats[i],
                                          breadcrumbs: breadcrumbsArray,
                                          _breadcrumbsInput: val,
                                        };
                                        updateBlockContentField(
                                          block.id,
                                          "strategies",
                                          newStrats,
                                        );
                                      }}
                                      onBlur={() => {
                                        const newStrats = [
                                          ...(block.content.strategies || []),
                                        ];
                                        if (
                                          newStrats[i]._breadcrumbsInput !==
                                          undefined
                                        ) {
                                          delete newStrats[i]._breadcrumbsInput;
                                          updateBlockContentField(
                                            block.id,
                                            "strategies",
                                            newStrats,
                                          );
                                        }
                                      }}
                                      placeholder="e.g. Theme 1, Insights 1-3, Strategy 1"
                                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                                    />
                                  </div>
                                  <div className="space-y-1 sm:col-span-2">
                                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                      Deliverable
                                    </label>
                                    <input
                                      type="text"
                                      value={strat.deliverable || ""}
                                      onChange={(e) => {
                                        const newStrats = [
                                          ...(block.content.strategies || []),
                                        ];
                                        newStrats[i] = {
                                          ...newStrats[i],
                                          deliverable: e.target.value,
                                        };
                                        updateBlockContentField(
                                          block.id,
                                          "strategies",
                                          newStrats,
                                        );
                                      }}
                                      placeholder="e.g. Occupational Shortage Map"
                                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                                    />
                                  </div>
                                  <div className="space-y-1 sm:col-span-2">
                                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                      Timeline
                                    </label>
                                    <input
                                      type="text"
                                      value={strat.timeline || ""}
                                      onChange={(e) => {
                                        const newStrats = [
                                          ...(block.content.strategies || []),
                                        ];
                                        newStrats[i] = {
                                          ...newStrats[i],
                                          timeline: e.target.value,
                                        };
                                        updateBlockContentField(
                                          block.id,
                                          "strategies",
                                          newStrats,
                                        );
                                      }}
                                      placeholder="e.g. 12-month"
                                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            ),
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const newStrats = [
                                ...(block.content.strategies || []),
                                {
                                  number: String(
                                    block.content.strategies?.length + 1 || 1,
                                  ),
                                  title: "New Strategy Action",
                                  breadcrumbs: [],
                                  deliverable: "",
                                  timeline: "",
                                },
                              ];
                              updateBlockContentField(
                                block.id,
                                "strategies",
                                newStrats,
                              );
                            }}
                            className="border border-dashed border-border hover:bg-sidebar px-3 py-1.5 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1 mt-2 text-muted cursor-pointer"
                          >
                            <Plus className="h-3 w-3" /> Add Strategy Card
                          </button>
                        </div>

                        {/* Visual Preview */}
                        <div className="border-t border-border/40 pt-4 space-y-2">
                          <span className="block font-mono text-[8px] uppercase tracking-widest text-muted font-bold">
                            * COMPONENT PREVIEW
                          </span>
                          <div className="space-y-4">
                            {(block.content.strategies || []).map(
                              (strat: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="border border-border bg-[#fdfdfc] p-6 rounded-md shadow-xs space-y-4"
                                >
                                  <div className="flex gap-4 items-start">
                                    <span className="w-8 h-8 rounded bg-[#2b2a27] text-[#fdfdfc] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                                      {strat.number}
                                    </span>
                                    <div className="space-y-2 flex-1">
                                      <h4 className="text-sm font-bold text-primary font-sans leading-snug">
                                        {strat.title}
                                      </h4>
                                      <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-mono text-muted">
                                        {(strat.breadcrumbs || []).map(
                                          (bc: string, bIdx: number) => (
                                            <React.Fragment key={bIdx}>
                                              {bIdx > 0 && (
                                                <span className="text-muted/40">
                                                  →
                                                </span>
                                              )}
                                              <span className="px-2 py-0.5 bg-[#f4f2ee] rounded border border-border/60">
                                                {bc}
                                              </span>
                                            </React.Fragment>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="border-t border-border/40 pt-3 flex justify-between items-center text-[10px] font-mono text-muted">
                                    <span>
                                      Deliverable ·{" "}
                                      <strong className="text-primary font-normal">
                                        {strat.deliverable || "None"}
                                      </strong>
                                    </span>
                                    <span className="text-right">
                                      {strat.timeline || "TBD"}
                                    </span>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Numbered List with Theme Component Editor */}
                    {block.blockType === "numbered_list_theme" && (
                      <div className="space-y-4">
                        <span className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">
                          Themes & Sub-lists
                        </span>

                        <div className="space-y-4">
                          {(block.content.themes || []).map(
                            (theme: any, tIdx: number) => (
                              <div
                                key={tIdx}
                                className="border border-border p-4 bg-sidebar/25 relative space-y-3"
                              >
                                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                                  <span className="font-mono text-[8px] uppercase text-muted font-semibold">
                                    Theme Grid #{tIdx + 1}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newThemes = (
                                        block.content.themes || []
                                      ).filter(
                                        (_: any, idx: number) => idx !== tIdx,
                                      );
                                      updateBlockContentField(
                                        block.id,
                                        "themes",
                                        newThemes,
                                      );
                                    }}
                                    className="text-red-500 hover:text-red-700 p-0.5 border border-transparent hover:border-red-150 bg-card cursor-pointer"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-4">
                                  <div className="space-y-1 sm:col-span-3">
                                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                      Theme Title
                                    </label>
                                    <input
                                      type="text"
                                      value={theme.title || ""}
                                      onChange={(e) => {
                                        const newThemes = [
                                          ...(block.content.themes || []),
                                        ];
                                        newThemes[tIdx] = {
                                          ...newThemes[tIdx],
                                          title: e.target.value,
                                        };
                                        updateBlockContentField(
                                          block.id,
                                          "themes",
                                          newThemes,
                                        );
                                      }}
                                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                      Count Text (e.g. total)
                                    </label>
                                    <input
                                      type="text"
                                      value={theme.countText || ""}
                                      onChange={(e) => {
                                        const newThemes = [
                                          ...(block.content.themes || []),
                                        ];
                                        newThemes[tIdx] = {
                                          ...newThemes[tIdx],
                                          countText: e.target.value,
                                        };
                                        updateBlockContentField(
                                          block.id,
                                          "themes",
                                          newThemes,
                                        );
                                      }}
                                      placeholder="e.g. 3"
                                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                                    />
                                  </div>
                                </div>

                                {/* Nested items inside this theme */}
                                <div className="space-y-2 border-t border-border/40 pt-3">
                                  <span className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">
                                    List Items
                                  </span>
                                  {(theme.items || []).map(
                                    (item: any, iIdx: number) => (
                                      <div
                                        key={iIdx}
                                        className="flex gap-2 items-center"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Num (e.g. 1)"
                                          value={item.number || ""}
                                          onChange={(e) => {
                                            const newThemes = [
                                              ...(block.content.themes || []),
                                            ];
                                            const newItems = [
                                              ...(newThemes[tIdx].items || []),
                                            ];
                                            newItems[iIdx] = {
                                              ...newItems[iIdx],
                                              number: e.target.value,
                                            };
                                            newThemes[tIdx] = {
                                              ...newThemes[tIdx],
                                              items: newItems,
                                            };
                                            updateBlockContentField(
                                              block.id,
                                              "themes",
                                              newThemes,
                                            );
                                          }}
                                          className="w-16 border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs focus:outline-none text-center"
                                        />
                                        <input
                                          type="text"
                                          placeholder="Item detail description text"
                                          value={item.text || ""}
                                          onChange={(e) => {
                                            const newThemes = [
                                              ...(block.content.themes || []),
                                            ];
                                            const newItems = [
                                              ...(newThemes[tIdx].items || []),
                                            ];
                                            newItems[iIdx] = {
                                              ...newItems[iIdx],
                                              text: e.target.value,
                                            };
                                            newThemes[tIdx] = {
                                              ...newThemes[tIdx],
                                              items: newItems,
                                            };
                                            updateBlockContentField(
                                              block.id,
                                              "themes",
                                              newThemes,
                                            );
                                          }}
                                          className="flex-1 border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs focus:outline-none"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newThemes = [
                                              ...(block.content.themes || []),
                                            ];
                                            newThemes[tIdx] = {
                                              ...newThemes[tIdx],
                                              items: (
                                                newThemes[tIdx].items || []
                                              ).filter(
                                                (_: any, idx: number) =>
                                                  idx !== iIdx,
                                              ),
                                            };
                                            updateBlockContentField(
                                              block.id,
                                              "themes",
                                              newThemes,
                                            );
                                          }}
                                          className="p-1 border border-red-200 bg-[#fff5f5] text-red-500 hover:bg-red-100"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </button>
                                      </div>
                                    ),
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newThemes = [
                                        ...(block.content.themes || []),
                                      ];
                                      newThemes[tIdx] = {
                                        ...newThemes[tIdx],
                                        items: [
                                          ...(newThemes[tIdx].items || []),
                                          {
                                            number: String(
                                              newThemes[tIdx].items?.length +
                                                1 || 1,
                                            ),
                                            text: "New insight/item details...",
                                          },
                                        ],
                                      };
                                      updateBlockContentField(
                                        block.id,
                                        "themes",
                                        newThemes,
                                      );
                                    }}
                                    className="border border-dashed border-border hover:bg-sidebar px-2 py-1 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1 text-muted cursor-pointer"
                                  >
                                    <Plus className="h-2.5 w-2.5" /> Add List
                                    Item
                                  </button>
                                </div>
                              </div>
                            ),
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const newThemes = [
                                ...(block.content.themes || []),
                                {
                                  title: "New Theme Section",
                                  countText: "1",
                                  items: [
                                    {
                                      number: "1",
                                      text: "Theme item description",
                                    },
                                  ],
                                },
                              ];
                              updateBlockContentField(
                                block.id,
                                "themes",
                                newThemes,
                              );
                            }}
                            className="border border-dashed border-border hover:bg-sidebar px-3 py-1.5 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1 mt-2 text-muted cursor-pointer"
                          >
                            <Plus className="h-3 w-3" /> Add Theme Section
                          </button>
                        </div>

                        {/* Visual Preview */}
                        <div className="border-t border-border/40 pt-4 space-y-4">
                          <span className="block font-mono text-[8px] uppercase tracking-widest text-muted font-bold">
                            * COMPONENT PREVIEW
                          </span>
                          <div className="space-y-6">
                            {(block.content.themes || []).map(
                              (theme: any, tIdx: number) => (
                                <div key={tIdx} className="space-y-3">
                                  <div className="flex justify-between items-center border-b border-border/60 pb-1.5 font-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                                    <span>
                                      Theme {tIdx + 1} &nbsp;{theme.title}
                                    </span>
                                    <span className="text-muted/60">
                                      {theme.countText}
                                    </span>
                                  </div>
                                  <div className="divide-y divide-border/40">
                                    {(theme.items || []).map(
                                      (item: any, iIdx: number) => (
                                        <div
                                          key={iIdx}
                                          className="py-3 flex gap-3.5 items-start first:pt-0 last:pb-0"
                                        >
                                          <span className="w-6 h-6 bg-[#f4f2ee] border border-border/60 text-primary rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                                            {item.number}
                                          </span>
                                          <span className="text-xs text-primary leading-relaxed font-sans">
                                            {item.text}
                                          </span>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* KPI Dashboard Component Editor */}
                    {block.blockType === "kpi_dashboard" && (
                      <div className="space-y-4">
                        <span className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">
                          KPI Stats Panel
                        </span>

                        <div className="space-y-3">
                          {(block.content.kpis || []).map(
                            (kpi: any, kIdx: number) => (
                              <div
                                key={kIdx}
                                className="border border-border p-3 bg-sidebar/20 relative grid gap-3 sm:grid-cols-3"
                              >
                                <div className="space-y-1">
                                  <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                    Stat Value (e.g. +14% or 218,000)
                                  </label>
                                  <input
                                    type="text"
                                    value={kpi.value || ""}
                                    onChange={(e) => {
                                      const newKpis = [
                                        ...(block.content.kpis || []),
                                      ];
                                      newKpis[kIdx] = {
                                        ...newKpis[kIdx],
                                        value: e.target.value,
                                      };
                                      updateBlockContentField(
                                        block.id,
                                        "kpis",
                                        newKpis,
                                      );
                                    }}
                                    className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                    Descriptor Label
                                  </label>
                                  <input
                                    type="text"
                                    value={kpi.label || ""}
                                    onChange={(e) => {
                                      const newKpis = [
                                        ...(block.content.kpis || []),
                                      ];
                                      newKpis[kIdx] = {
                                        ...newKpis[kIdx],
                                        label: e.target.value,
                                      };
                                      updateBlockContentField(
                                        block.id,
                                        "kpis",
                                        newKpis,
                                      );
                                    }}
                                    className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-1 relative pr-8">
                                  <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                    Subtext Context
                                  </label>
                                  <input
                                    type="text"
                                    value={kpi.subtext || ""}
                                    onChange={(e) => {
                                      const newKpis = [
                                        ...(block.content.kpis || []),
                                      ];
                                      newKpis[kIdx] = {
                                        ...newKpis[kIdx],
                                        subtext: e.target.value,
                                      };
                                      updateBlockContentField(
                                        block.id,
                                        "kpis",
                                        newKpis,
                                      );
                                    }}
                                    className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs focus:outline-none"
                                  />

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newKpis = (
                                        block.content.kpis || []
                                      ).filter(
                                        (_: any, idx: number) => idx !== kIdx,
                                      );
                                      updateBlockContentField(
                                        block.id,
                                        "kpis",
                                        newKpis,
                                      );
                                    }}
                                    className="absolute top-6 right-2 text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            ),
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              const newKpis = [
                                ...(block.content.kpis || []),
                                {
                                  value: "0%",
                                  label: "Metric",
                                  subtext: "description...",
                                },
                              ];
                              updateBlockContentField(
                                block.id,
                                "kpis",
                                newKpis,
                              );
                            }}
                            className="border border-dashed border-border hover:bg-sidebar px-3 py-1.5 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1 text-muted cursor-pointer"
                          >
                            <Plus className="h-3 w-3" /> Add KPI Statistic
                          </button>
                        </div>

                        {/* Trend Chart Sparkline Configurations */}
                        <div className="border-t border-border/40 pt-4 space-y-3">
                          <span className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">
                            Trend Sparkline Column
                          </span>

                          <div className="flex items-center gap-2 mb-2">
                            <input
                              type="checkbox"
                              id={`show-trend-${block.id}`}
                              checked={block.content.showTrend ?? false}
                              onChange={(e) =>
                                updateBlockContentField(
                                  block.id,
                                  "showTrend",
                                  e.target.checked,
                                )
                              }
                              className="h-4 w-4 rounded border-border text-primary focus:ring-0 cursor-pointer"
                            />
                            <label
                              htmlFor={`show-trend-${block.id}`}
                              className="font-mono text-[9px] uppercase tracking-wider text-primary cursor-pointer select-none"
                            >
                              Include Trend Sparkline Column
                            </label>
                          </div>

                          {block.content.showTrend && (
                            <div className="grid gap-3 sm:grid-cols-3 bg-sidebar/10 p-3 border border-border">
                              <div className="space-y-1">
                                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                  Trend Title
                                </label>
                                <input
                                  type="text"
                                  value={block.content.trendTitle || ""}
                                  onChange={(e) =>
                                    updateBlockContentField(
                                      block.id,
                                      "trendTitle",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                  Trend Subtext Caption
                                </label>
                                <input
                                  type="text"
                                  value={block.content.trendSubtext || ""}
                                  onChange={(e) =>
                                    updateBlockContentField(
                                      block.id,
                                      "trendSubtext",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">
                                  Data Coordinates (Comma-separated)
                                </label>
                                <input
                                  type="text"
                                  value={(block.content.trendPoints || []).join(
                                    ", ",
                                  )}
                                  onChange={(e) => {
                                    const coords = e.target.value
                                      .split(",")
                                      .map((s) => Number(s.trim()))
                                      .filter((n) => !isNaN(n));
                                    updateBlockContentField(
                                      block.id,
                                      "trendPoints",
                                      coords,
                                    );
                                  }}
                                  placeholder="e.g. 10, 15, 12, 18, 20"
                                  className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1 text-xs focus:outline-none"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Visual Preview */}
                        <div className="border-t border-border/40 pt-4 space-y-2">
                          <span className="block font-mono text-[8px] uppercase tracking-widest text-muted font-bold">
                            * COMPONENT PREVIEW
                          </span>

                          {(() => {
                            const points = block.content.trendPoints || [
                              10, 12, 11, 15, 14, 18, 20,
                            ];
                            const max = Math.max(...points, 1);
                            const min = Math.min(...points, 0);
                            const range = max - min || 1;
                            const svgPath = points
                              .map((p: number, idx: number) => {
                                const x = (idx / (points.length - 1)) * 120;
                                const y = 35 - ((p - min) / range) * 30;
                                return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                              })
                              .join(" ");

                            const dottedPath = points
                              .map((p: number, idx: number) => {
                                const x = (idx / (points.length - 1)) * 120;
                                const y = 38 - ((p - min) / range) * 15;
                                return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                              })
                              .join(" ");

                            return (
                              <div className="grid grid-cols-1 md:grid-cols-5 border border-border bg-[#fdfdfc] divide-y md:divide-y-0 md:divide-x divide-border rounded-sm shadow-xs">
                                {(block.content.kpis || []).map(
                                  (kpi: any, idx: number) => (
                                    <div key={idx} className="p-5 space-y-1">
                                      <div className="text-2xl font-bold tracking-tight text-primary leading-none font-sans">
                                        {kpi.value}
                                      </div>
                                      <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold">
                                        {kpi.label}
                                      </div>
                                      <div className="font-mono text-[8px] text-muted">
                                        {kpi.subtext}
                                      </div>
                                    </div>
                                  ),
                                )}
                                {block.content.showTrend && (
                                  <div className="p-5 md:col-span-1 space-y-2 flex flex-col justify-between min-h-24">
                                    <span className="font-mono text-[8px] text-primary uppercase font-bold block leading-none">
                                      {block.content.trendTitle ||
                                        "Projected workforce demand →"}
                                    </span>
                                    <div className="h-10 flex items-center justify-center">
                                      <svg
                                        className="w-full h-full overflow-visible"
                                        viewBox="0 0 120 40"
                                      >
                                        <path
                                          d={svgPath}
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          className="text-primary"
                                        />
                                        <path
                                          d={dottedPath}
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="1"
                                          strokeDasharray="2,2"
                                          className="text-muted/40"
                                        />
                                      </svg>
                                    </div>
                                    <span className="font-mono text-[8px] text-muted block leading-none">
                                      {block.content.trendSubtext ||
                                        "significant growth projected"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    )}

                    {/* Rich Text Editor */}
                    {block.blockType === "rich_text" && (
                      <div className="space-y-4">
                        <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">
                          WYSIWYG Rich Text Content
                        </label>
                        <RichTextEditor
                          value={block.content.html || ""}
                          onChange={(val) =>
                            updateBlockContentField(block.id, "html", val)
                          }
                        />
                        <div className="border-t border-border/40 pt-4 space-y-2">
                          <span className="block font-mono text-[8px] uppercase tracking-widest text-muted font-bold">
                            * COMPONENT PREVIEW
                          </span>
                          <div
                            className="border border-border/40 p-4 bg-[#fcfcfb] text-xs text-primary leading-relaxed font-sans prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                              __html:
                                block.content.html ||
                                '<p class="italic text-muted/60">* Empty Rich Text Content *</p>',
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── Component Catalog Overlay ── */}
      {showCatalog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 backdrop-blur-xs px-4">
          <div className="w-full max-w-lg border border-border bg-card shadow-lg p-6 relative">
            <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
              * COMPONENTS LIBRARY
            </span>

            <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                Select CMS Component
              </h3>
              <button
                onClick={() => setShowCatalog(false)}
                className="p-1 border border-border hover:bg-sidebar text-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Heading */}
              <div
                onClick={() => handleAddBlock("heading")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <HeadingIcon className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Heading Title
                </span>
              </div>

              {/* Paragraph */}
              <div
                onClick={() => handleAddBlock("paragraph")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <Type className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Paragraph Text
                </span>
              </div>

              {/* Button / CTA */}
              <div
                onClick={() => handleAddBlock("cta_button")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <LinkIcon className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Button / CTA
                </span>
              </div>

              {/* Number Box */}
              <div
                onClick={() => handleAddBlock("kpi_card")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <CheckCircle className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Number Box
                </span>
              </div>

              {/* Icon Box */}
              <div
                onClick={() => handleAddBlock("stat_group")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <HelpCircle className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Icon Box
                </span>
              </div>

              {/* Map */}
              <div
                onClick={() => handleAddBlock("map")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <MapPin className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Map Module
                </span>
              </div>

              {/* Chart */}
              <div
                onClick={() => handleAddBlock("chart")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <BarChart className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Graph / Chart
                </span>
              </div>

              {/* Bullet list */}
              <div
                onClick={() => handleAddBlock("list")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <ListIcon className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Bullet List
                </span>
              </div>

              {/* Quote */}
              <div
                onClick={() => handleAddBlock("quote")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <MessageSquare className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Quote Card
                </span>
              </div>

              {/* Cards Grid */}
              <div
                onClick={() => handleAddBlock("cards")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <CreditCard className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Cards Grid
                </span>
              </div>

              {/* Tags List */}
              <div
                onClick={() => handleAddBlock("tags")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <Tag className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Tags List
                </span>
              </div>

              {/* Strategy Card */}
              <div
                onClick={() => handleAddBlock("strategy_card")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <Briefcase className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Strategy Cards
                </span>
              </div>

              {/* Numbered List with Theme */}
              <div
                onClick={() => handleAddBlock("numbered_list_theme")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <ListIcon className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Theme List
                </span>
              </div>

              {/* KPI Dashboard */}
              <div
                onClick={() => handleAddBlock("kpi_dashboard")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <TrendingUp className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  KPI Dashboard
                </span>
              </div>

              {/* Rich Text Element */}
              <div
                onClick={() => handleAddBlock("rich_text")}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <FileText className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                  Rich Text
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
