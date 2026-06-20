'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useReport } from '@/context/ReportContext';
import { api } from '@/lib/api';
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
  CreditCard
} from 'lucide-react';

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

export default function PageBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: pageId } = use(params);
  const { activeReport } = useReport();
  const router = useRouter();

  const [page, setPage] = useState<PageDetail | null>(null);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPage, setSavingPage] = useState(false);

  // Page Form Fields
  const [pageTitle, setPageTitle] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  // Active overlay selectors
  const [showCatalog, setShowCatalog] = useState(false);
  const [rawJsonEditId, setRawJsonEditId] = useState<string | null>(null);
  const [rawJsonText, setRawJsonText] = useState('');

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (activeReport && pageId) {
      loadPageData();
    }
  }, [activeReport, pageId]);

  const loadPageData = async () => {
    setLoading(true);
    try {
      // Fetch Page Details
      const pageData = await api.get<PageDetail>(`/reports/${activeReport!.id}/pages/${pageId}`);
      setPage(pageData);
      setPageTitle(pageData.title);
      setMetaTitle(pageData.metaTitle || '');
      setMetaDescription(pageData.metaDescription || '');
      setIsPublished(pageData.isPublished);

      // Fetch Blocks
      const blocksData = await api.get<ContentBlock[]>(`/pages/${pageId}/blocks`);
      setBlocks(blocksData.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (err) {
      console.error('Failed to load page data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePageMeta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReport) return;
    setSavingPage(true);
    setSuccessMsg(null);
    try {
      const updated = await api.patch<PageDetail>(`/reports/${activeReport.id}/pages/${pageId}`, {
        title: pageTitle,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        isPublished,
      });
      setPage(updated);
      setSuccessMsg('Page configuration saved.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(`Error saving page settings: ${err.message}`);
    } finally {
      setSavingPage(false);
    }
  };

  // Reorder Blocks
  const moveBlock = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const updatedBlocks = [...blocks];
    const temp = updatedBlocks[index];
    updatedBlocks[index] = updatedBlocks[targetIndex];
    updatedBlocks[targetIndex] = temp;

    // Optimistic UI update
    setBlocks(updatedBlocks);

    try {
      const orderedIds = updatedBlocks.map(b => b.id);
      await api.patch(`/pages/${pageId}/blocks/reorder`, { orderedIds });
    } catch (err: any) {
      console.error('Failed to reorder blocks:', err);
      loadPageData();
    }
  };

  // Create Block (Wordpress Component Catalog flow)
  const handleAddBlock = async (type: string) => {
    setShowCatalog(false);
    
    let defaultContent: Record<string, any> = {};
    if (type === 'heading') {
      defaultContent = { level: 2, text: 'Heading Component', align: 'left' };
    } else if (type === 'paragraph') {
      defaultContent = { text: 'Write standard body paragraph content here...' };
    } else if (type === 'cta_button') {
      defaultContent = { label: 'Click Here', url: 'https://', style: 'primary' };
    } else if (type === 'kpi_card') {
      defaultContent = { value: '48,800', label: 'Employees', prefix: '', suffix: '', description: 'councils' };
    } else if (type === 'stat_group') {
      defaultContent = { title: 'Icon Box Title', description: 'Box description details...', icon: 'globe' };
    } else if (type === 'map') {
      defaultContent = { state: 'QLD', zoom: 5, center: 'Australia' };
    } else if (type === 'chart') {
      defaultContent = { 
        chartType: 'bar', 
        title: 'Employment Growth Trends', 
        source: 'source: ABS Public Sector Employment',
        data: [
          { label: 'NSW', value: 120 },
          { label: 'VIC', value: 90 },
          { label: 'QLD', value: 75 }
        ] 
      };
    } else if (type === 'quote') {
      defaultContent = { text: 'This is a stakeholder feedback quote text block.', author: 'Stakeholder Body' };
    } else if (type === 'list') {
      defaultContent = { items: ['First list item detail', 'Second list item detail'] };
    } else if (type === 'cards') {
      defaultContent = {
        cards: [
          { number: '01', title: 'First Nations Participation', description: 'Details about participation...' },
          { number: '02', title: 'AI & Digital Transformation', description: 'Details about AI impact...' }
        ]
      };
    }

    try {
      const newBlock = await api.post<ContentBlock>(`/pages/${pageId}/blocks`, {
        blockType: type,
        content: defaultContent,
        sortOrder: blocks.length + 1,
        isVisible: true,
      });
      setBlocks([...blocks, newBlock]);
    } catch (err: any) {
      alert(`Failed to add component: ${err.message}`);
    }
  };

  // Save specific block content
  const handleSaveBlock = async (blockId: string, updatedContent: Record<string, any>, isVisible: boolean) => {
    try {
      const saved = await api.patch<ContentBlock>(`/pages/${pageId}/blocks/${blockId}`, {
        content: updatedContent,
        isVisible,
      });
      setBlocks(blocks.map(b => b.id === blockId ? saved : b));
      alert('Component saved successfully!');
    } catch (err: any) {
      alert(`Failed to save component: ${err.message}`);
    }
  };

  // Toggle Visibility
  const toggleVisibility = async (block: ContentBlock) => {
    const updatedVisible = !block.isVisible;
    setBlocks(blocks.map(b => b.id === block.id ? { ...b, isVisible: updatedVisible } : b));
    try {
      await api.patch(`/pages/${pageId}/blocks/${block.id}`, {
        isVisible: updatedVisible,
      });
    } catch (err: any) {
      console.error('Failed to toggle block visibility:', err);
      loadPageData();
    }
  };

  // Delete Block
  const handleDeleteBlock = async (blockId: string) => {
    if (!confirm('Are you sure you want to delete this component? This operation is permanent.')) return;
    try {
      await api.delete(`/pages/${pageId}/blocks/${blockId}`);
      setBlocks(blocks.filter(b => b.id !== blockId));
    } catch (err: any) {
      alert(`Failed to delete component: ${err.message}`);
    }
  };

  // Raw JSON Editor Actions
  const handleOpenRawJson = (block: ContentBlock) => {
    setRawJsonEditId(block.id);
    setRawJsonText(JSON.stringify(block.content, null, 2));
  };

  const handleSaveRawJson = async (blockId: string) => {
    try {
      const parsedContent = JSON.parse(rawJsonText);
      const targetBlock = blocks.find(b => b.id === blockId);
      if (targetBlock) {
        await handleSaveBlock(blockId, parsedContent, targetBlock.isVisible);
        setRawJsonEditId(null);
      }
    } catch (err: any) {
      alert(`JSON Syntax Error: ${err.message}`);
    }
  };

  // Sub-editors helper state updates
  const updateBlockContentField = (blockId: string, field: string, value: any) => {
    setBlocks(blocks.map(b => {
      if (b.id === blockId) {
        return {
          ...b,
          content: {
            ...b.content,
            [field]: value
          }
        };
      }
      return b;
    }));
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border border-primary border-t-transparent" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">Loading CMS Builder...</span>
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
      
      {/* Back to Overview */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted hover:text-primary transition-colors border border-border bg-card px-2.5 py-1"
        >
          <ChevronLeft className="h-3 w-3" />
          Back to Overview
        </button>
      </div>

      {/* Title */}
      <div className="flex justify-between items-end">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted">
            <span>Chapters</span>
            <span>/</span>
            <span>Pages</span>
            <span>/</span>
            <span className="text-primary font-bold">{page.title}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary uppercase">
            WordPress-Style Page Builder
          </h1>
        </div>

        <button
          onClick={() => setShowCatalog(true)}
          className="border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors flex items-center justify-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Add Component Block
        </button>
      </div>

      {/* ── Page properties configuration ── */}
      <div className="border border-border bg-card p-6 shadow-sm relative">
        <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
          * CHAPTER CONFIG
        </span>

        <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
          SEO and Page Settings
        </h2>

        <form onSubmit={handleUpdatePageMeta} className="space-y-4">
          {successMsg && (
            <div className="border border-green-200 bg-green-50/50 p-3 text-xs text-green-700 font-mono">
              * SUCCESS: {successMsg.toUpperCase()}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">Title (WordPress Style)</label>
              <input
                type="text"
                required
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">SEO Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none placeholder:text-muted/40"
              />
            </div>

            <div className="flex items-center h-full pt-4 md:pl-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-0 cursor-pointer"
                />
                <span className="font-mono text-[9px] uppercase tracking-wider text-primary">
                  Publish public view
                </span>
              </label>
            </div>

            <div className="space-y-1 sm:col-span-2 md:col-span-3">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">SEO Meta Description</label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingPage}
              className="border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              <Save className="h-3.5 w-3.5" />
              Save Configuration
            </button>
          </div>
        </form>
      </div>

      {/* ── Content Components Canvas ── */}
      <div className="space-y-6">
        {blocks.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border bg-sidebar/20 font-mono text-xs uppercase text-muted cursor-pointer hover:border-primary transition-all" onClick={() => setShowCatalog(true)}>
            * Canvas is empty. Click here to select a component layout.
          </div>
        ) : (
          blocks.map((block, index) => {
            const isEditingRaw = rawJsonEditId === block.id;

            return (
              <div 
                key={block.id} 
                className={`border bg-card p-6 shadow-sm relative transition-all ${
                  block.isVisible ? 'border-border' : 'border-dashed border-border/40 opacity-70 bg-sidebar/10'
                }`}
              >
                
                {/* Component Toolbar */}
                <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
                      * COMPONENT {String(index + 1).padStart(2, '0')} : {block.blockType.toUpperCase()}
                    </span>
                    {!block.isVisible && (
                      <span className="font-mono text-[8px] uppercase text-red-500 border border-red-200 bg-red-50 px-1 py-0.5">
                        Hidden
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveBlock(index, 'up')}
                      disabled={index === 0}
                      className="p-1 border border-border bg-card hover:bg-sidebar disabled:opacity-40"
                      title="Move Up"
                    >
                      <ArrowUp className="h-3.5 w-3.5 text-primary" />
                    </button>
                    <button
                      onClick={() => moveBlock(index, 'down')}
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
                      title={block.isVisible ? 'Hide Component' : 'Show Component'}
                    >
                      {block.isVisible ? (
                        <Eye className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5 text-muted" />
                      )}
                    </button>

                    <button
                      onClick={() => isEditingRaw ? setRawJsonEditId(null) : handleOpenRawJson(block)}
                      className={`p-1 border border-border hover:bg-sidebar ${isEditingRaw ? 'bg-sidebar border-primary/50' : 'bg-card'}`}
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
                      * WARNING: INCORRECT SCHEMA FORMATS WILL PREVENT THE SITE FROM BUILDING.
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
                    {block.blockType === 'heading' && (
                      <div className="grid gap-3 sm:grid-cols-6">
                        <div className="sm:col-span-1 space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Size</label>
                          <select
                            value={block.content.level || 2}
                            onChange={(e) => updateBlockContentField(block.id, 'level', Number(e.target.value))}
                            className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                          >
                            {[1, 2, 3, 4, 5, 6].map(l => <option key={l} value={l}>H{l}</option>)}
                          </select>
                        </div>
                        <div className="sm:col-span-3 space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Heading Text</label>
                          <input
                            type="text"
                            value={block.content.text || ''}
                            onChange={(e) => updateBlockContentField(block.id, 'text', e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2 space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-normal">Alignment</label>
                          <select
                            value={block.content.align || 'left'}
                            onChange={(e) => updateBlockContentField(block.id, 'align', e.target.value)}
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
                    {block.blockType === 'paragraph' && (
                      <div className="space-y-1">
                        <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Paragraph Content</label>
                        <textarea
                          rows={4}
                          value={block.content.text || ''}
                          onChange={(e) => updateBlockContentField(block.id, 'text', e.target.value)}
                          className="w-full border border-border bg-[#fdfdfc] px-3 py-2 text-xs text-primary focus:border-primary focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Button / CTA Editor */}
                    {block.blockType === 'cta_button' && (
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Button Label</label>
                          <input
                            type="text"
                            value={block.content.label || ''}
                            onChange={(e) => updateBlockContentField(block.id, 'label', e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Redirect URL</label>
                          <input
                            type="text"
                            value={block.content.url || ''}
                            onChange={(e) => updateBlockContentField(block.id, 'url', e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-normal">Button Design</label>
                          <select
                            value={block.content.style || 'primary'}
                            onChange={(e) => updateBlockContentField(block.id, 'style', e.target.value)}
                            className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                          >
                            <option value="primary">Primary (Solid Black)</option>
                            <option value="secondary">Secondary (Bordered Line)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Number Box Editor */}
                    {block.blockType === 'kpi_card' && (
                      <div className="grid gap-3 sm:grid-cols-5">
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Stat Label</label>
                          <input
                            type="text"
                            value={block.content.label || ''}
                            onChange={(e) => updateBlockContentField(block.id, 'label', e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Numeric Value</label>
                          <input
                            type="text"
                            value={block.content.value || ''}
                            onChange={(e) => updateBlockContentField(block.id, 'value', e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-normal">Prefix</label>
                          <input
                            type="text"
                            placeholder="e.g. $"
                            value={block.content.prefix || ''}
                            onChange={(e) => updateBlockContentField(block.id, 'prefix', e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-normal">Suffix</label>
                          <input
                            type="text"
                            placeholder="e.g. %"
                            value={block.content.suffix || ''}
                            onChange={(e) => updateBlockContentField(block.id, 'suffix', e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Description</label>
                          <input
                            type="text"
                            value={block.content.description || ''}
                            onChange={(e) => updateBlockContentField(block.id, 'description', e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Icon Box Editor */}
                    {block.blockType === 'stat_group' && (
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Box Title</label>
                          <input
                            type="text"
                            value={block.content.title || ''}
                            onChange={(e) => updateBlockContentField(block.id, 'title', e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Box Description</label>
                          <input
                            type="text"
                            value={block.content.description || ''}
                            onChange={(e) => updateBlockContentField(block.id, 'description', e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-normal">Select Icon</label>
                          <select
                            value={block.content.icon || 'globe'}
                            onChange={(e) => updateBlockContentField(block.id, 'icon', e.target.value)}
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
                    {block.blockType === 'map' && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Focus State Territory</label>
                          <select
                            value={block.content.state || 'QLD'}
                            onChange={(e) => updateBlockContentField(block.id, 'state', e.target.value)}
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
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Zoom Index (1-10)</label>
                          <input
                            type="number"
                            value={block.content.zoom || 5}
                            onChange={(e) => updateBlockContentField(block.id, 'zoom', Number(e.target.value))}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Bullet List Editor */}
                    {block.blockType === 'list' && (
                      <div className="space-y-3">
                        <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Bullet Items</label>
                        <div className="space-y-2">
                          {(block.content.items || []).map((item: string, i: number) => (
                            <div key={i} className="flex gap-2 items-center">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                  const newItems = [...(block.content.items || [])];
                                  newItems[i] = e.target.value;
                                  updateBlockContentField(block.id, 'items', newItems);
                                }}
                                className="flex-1 border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newItems = (block.content.items || []).filter((_: any, idx: number) => idx !== i);
                                  updateBlockContentField(block.id, 'items', newItems);
                                }}
                                className="p-1 border border-red-200 bg-[#fff5f5] text-red-500 hover:bg-red-100"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = [...(block.content.items || []), 'New Bullet Point'];
                              updateBlockContentField(block.id, 'items', newItems);
                            }}
                            className="border border-dashed border-border hover:bg-sidebar px-3 py-1 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1 mt-2 text-muted"
                          >
                            <Plus className="h-3 w-3" /> Add Bullet Item
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Quote Editor */}
                    {block.blockType === 'quote' && (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Quote Statement</label>
                          <textarea
                            rows={3}
                            value={block.content.text || ''}
                            onChange={(e) => updateBlockContentField(block.id, 'text', e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-2 text-xs focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Speaker / Consultation Source</label>
                          <input
                            type="text"
                            value={block.content.author || ''}
                            onChange={(e) => updateBlockContentField(block.id, 'author', e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-3 py-1 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Chart Editor */}
                    {block.blockType === 'chart' && (
                      <div className="space-y-3">
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Chart Title</label>
                            <input
                              type="text"
                              value={block.content.title || ''}
                              onChange={(e) => updateBlockContentField(block.id, 'title', e.target.value)}
                              className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Chart Type</label>
                            <select
                              value={block.content.chartType || 'bar'}
                              onChange={(e) => updateBlockContentField(block.id, 'chartType', e.target.value)}
                              className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                            >
                              <option value="bar">Bar Chart</option>
                              <option value="line">Line Chart</option>
                              <option value="pie">Pie Chart</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Source Note</label>
                            <input
                              type="text"
                              value={block.content.source || ''}
                              onChange={(e) => updateBlockContentField(block.id, 'source', e.target.value)}
                              className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                              placeholder="e.g. source: NCVET, 2024"
                            />
                          </div>
                        </div>

                        {/* Chart Dataset Grid */}
                        <div className="space-y-2 border-t border-border/40 pt-3">
                          <span className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Chart Datasets</span>
                          
                          {(block.content.data || []).map((pt: { label: string; value: number }, i: number) => (
                            <div key={i} className="flex gap-2 items-center">
                              <input
                                type="text"
                                placeholder="Label"
                                value={pt.label || ''}
                                onChange={(e) => {
                                  const newData = [...(block.content.data || [])];
                                  newData[i] = { ...newData[i], label: e.target.value };
                                  updateBlockContentField(block.id, 'data', newData);
                                }}
                                className="flex-1 border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                              />
                              <input
                                type="number"
                                placeholder="Value"
                                value={pt.value || 0}
                                onChange={(e) => {
                                  const newData = [...(block.content.data || [])];
                                  newData[i] = { ...newData[i], value: Number(e.target.value) };
                                  updateBlockContentField(block.id, 'data', newData);
                                }}
                                className="w-28 border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newData = (block.content.data || []).filter((_: any, idx: number) => idx !== i);
                                  updateBlockContentField(block.id, 'data', newData);
                                }}
                                className="p-1 border border-red-200 bg-[#fff5f5] text-red-500 hover:bg-red-100"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => {
                              const newData = [...(block.content.data || []), { label: 'New Point', value: 0 }];
                              updateBlockContentField(block.id, 'data', newData);
                            }}
                            className="border border-dashed border-border hover:bg-sidebar px-3 py-1 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1 mt-2 text-muted"
                          >
                            <Plus className="h-3 w-3" /> Add Data Row
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Cards Grid Component Editor */}
                    {block.blockType === 'cards' && (
                      <div className="space-y-3">
                        <span className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Cards Layout Items</span>
                        
                        <div className="space-y-4">
                          {(block.content.cards || []).map((card: { number: string; title: string; description: string }, i: number) => (
                            <div key={i} className="border border-border p-4 bg-sidebar/25 relative space-y-3">
                              <div className="flex justify-between items-center border-b border-border/40 pb-2">
                                <span className="font-mono text-[8px] uppercase text-muted font-semibold">Card #{i+1}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newCards = (block.content.cards || []).filter((_: any, idx: number) => idx !== i);
                                    updateBlockContentField(block.id, 'cards', newCards);
                                  }}
                                  className="text-red-500 hover:text-red-700 p-0.5 border border-transparent hover:border-red-150 bg-card"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>

                              <div className="grid gap-3 sm:grid-cols-4">
                                <div className="space-y-1">
                                  <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Badge/Num</label>
                                  <input
                                    type="text"
                                    value={card.number || ''}
                                    onChange={(e) => {
                                      const newCards = [...(block.content.cards || [])];
                                      newCards[i] = { ...newCards[i], number: e.target.value };
                                      updateBlockContentField(block.id, 'cards', newCards);
                                    }}
                                    placeholder="e.g. 01"
                                    className="w-full border border-border bg-[#fdfdfc] px-3 py-1 text-xs focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1 sm:col-span-3">
                                  <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Card Title</label>
                                  <input
                                    type="text"
                                    value={card.title || ''}
                                    onChange={(e) => {
                                      const newCards = [...(block.content.cards || [])];
                                      newCards[i] = { ...newCards[i], title: e.target.value };
                                      updateBlockContentField(block.id, 'cards', newCards);
                                    }}
                                    className="w-full border border-border bg-[#fdfdfc] px-3 py-1 text-xs focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1 sm:col-span-4">
                                  <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Card Description</label>
                                  <textarea
                                    rows={2}
                                    value={card.description || ''}
                                    onChange={(e) => {
                                      const newCards = [...(block.content.cards || [])];
                                      newCards[i] = { ...newCards[i], description: e.target.value };
                                      updateBlockContentField(block.id, 'cards', newCards);
                                    }}
                                    className="w-full border border-border bg-[#fdfdfc] px-3 py-1 text-xs focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => {
                              const newCards = [...(block.content.cards || []), { number: String(block.content.cards?.length + 1 || 1).padStart(2, '0'), title: 'New Card Title', description: '' }];
                              updateBlockContentField(block.id, 'cards', newCards);
                            }}
                            className="border border-dashed border-border hover:bg-sidebar px-3 py-1 font-mono text-[8px] uppercase tracking-wider flex items-center gap-1 mt-2 text-muted"
                          >
                            <Plus className="h-3 w-3" /> Add Grid Card
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Save Component details button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleSaveBlock(block.id, block.content, block.isVisible)}
                        className="border border-primary bg-primary px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors flex items-center gap-1"
                      >
                        <Save className="h-3 w-3" />
                        Save Component
                      </button>
                    </div>

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
                onClick={() => handleAddBlock('heading')}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <HeadingIcon className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">Heading Title</span>
              </div>

              {/* Paragraph */}
              <div 
                onClick={() => handleAddBlock('paragraph')}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <Type className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">Rich Paragraph</span>
              </div>

              {/* Button / CTA */}
              <div 
                onClick={() => handleAddBlock('cta_button')}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <LinkIcon className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">Button / CTA</span>
              </div>

              {/* Number Box */}
              <div 
                onClick={() => handleAddBlock('kpi_card')}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <CheckCircle className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">Number Box</span>
              </div>

              {/* Icon Box */}
              <div 
                onClick={() => handleAddBlock('stat_group')}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <HelpCircle className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">Icon Box</span>
              </div>

              {/* Map */}
              <div 
                onClick={() => handleAddBlock('map')}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <MapPin className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">Map Module</span>
              </div>

              {/* Chart */}
              <div 
                onClick={() => handleAddBlock('chart')}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <BarChart className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">Graph / Chart</span>
              </div>

              {/* Bullet list */}
              <div 
                onClick={() => handleAddBlock('list')}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <ListIcon className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">Bullet List</span>
              </div>

              {/* Quote */}
              <div 
                onClick={() => handleAddBlock('quote')}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <MessageSquare className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">Quote Card</span>
              </div>

              {/* Cards Grid */}
              <div 
                onClick={() => handleAddBlock('cards')}
                className="border border-border p-4 bg-sidebar/20 hover:border-primary cursor-pointer transition-colors flex flex-col items-center text-center gap-2"
              >
                <CreditCard className="h-6 w-6 text-muted" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary">Cards Grid</span>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
