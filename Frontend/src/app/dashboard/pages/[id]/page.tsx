'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useReport } from '@/context/ReportContext';
import { api } from '@/lib/api';
import { 
  FileText, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Plus, 
  Save, 
  Code, 
  Eye, 
  EyeOff, 
  ChevronLeft,
  LayoutGrid
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

export default function PageEditor({ params }: { params: Promise<{ id: string }> }) {
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

  // Advanced raw JSON editing states
  const [rawJsonEditId, setRawJsonEditId] = useState<string | null>(null);
  const [rawJsonText, setRawJsonText] = useState('');

  // Add block fields
  const [newBlockType, setNewBlockType] = useState('paragraph');
  const [blockAdding, setBlockAdding] = useState(false);

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
      // Revert if error
      loadPageData();
    }
  };

  // Create Block
  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlockAdding(true);
    
    // Set default contents depending on blockType
    let defaultContent: Record<string, any> = {};
    if (newBlockType === 'heading') {
      defaultContent = { level: 2, text: 'New Heading' };
    } else if (newBlockType === 'paragraph' || newBlockType === 'rich_text') {
      defaultContent = { text: 'New paragraph text...' };
    } else if (newBlockType === 'kpi_card') {
      defaultContent = { value: '0', label: 'Badge Label', prefix: '', suffix: '' };
    } else if (newBlockType === 'quote') {
      defaultContent = { text: 'Write quote here', author: 'Author Name' };
    } else if (newBlockType === 'divider') {
      defaultContent = {};
    } else if (newBlockType === 'table') {
      defaultContent = { headers: ['COL 1', 'COL 2'], rows: [['Value A', 'Value B']] };
    } else if (newBlockType === 'chart') {
      defaultContent = { chartType: 'bar', title: 'Chart Title', data: [{ label: 'Label 1', value: 10 }] };
    }

    try {
      const newBlock = await api.post<ContentBlock>(`/pages/${pageId}/blocks`, {
        blockType: newBlockType,
        content: defaultContent,
        sortOrder: blocks.length + 1,
        isVisible: true,
      });
      setBlocks([...blocks, newBlock]);
    } catch (err: any) {
      alert(`Failed to add content block: ${err.message}`);
    } finally {
      setBlockAdding(false);
    }
  };

  // Save specific block
  const handleSaveBlock = async (blockId: string, updatedContent: Record<string, any>, isVisible: boolean) => {
    try {
      const saved = await api.patch<ContentBlock>(`/pages/${pageId}/blocks/${blockId}`, {
        content: updatedContent,
        isVisible,
      });
      setBlocks(blocks.map(b => b.id === blockId ? saved : b));
      alert('Block saved successfully!');
    } catch (err: any) {
      alert(`Failed to save block: ${err.message}`);
    }
  };

  // Toggle Visibility
  const toggleVisibility = async (block: ContentBlock) => {
    const updatedVisible = !block.isVisible;
    // Optimistic UI update
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
    if (!confirm('Are you sure you want to delete this content block? This operation is permanent.')) return;
    try {
      await api.delete(`/pages/${pageId}/blocks/${blockId}`);
      setBlocks(blocks.filter(b => b.id !== blockId));
    } catch (err: any) {
      alert(`Failed to delete block: ${err.message}`);
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

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border border-primary border-t-transparent" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">Loading Editor...</span>
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
      {/* ── Header back navigation ── */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted hover:text-primary transition-colors border border-border bg-card px-2.5 py-1"
        >
          <ChevronLeft className="h-3 w-3" />
          Back to Overview
        </button>
      </div>

      {/* ── Title and Breadcrumb ── */}
      <div>
        <div className="mb-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted">
          <span>Chapters</span>
          <span>/</span>
          <span>Chapter {page.pageType === 'about' ? '01' : '04'}</span>
          <span>/</span>
          <span className="text-primary font-bold">{page.title}</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Page Block Editor
        </h1>
      </div>

      {/* ── Metadata Form Card ── */}
      <div className="border border-border bg-card p-6 shadow-sm relative">
        <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
          * PAGE PROPERTIES
        </span>

        <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
          SEO and Page Meta Configurations
        </h2>

        <form onSubmit={handleUpdatePageMeta} className="space-y-4">
          {successMsg && (
            <div className="border border-green-200 bg-green-50/50 p-3 text-xs text-green-700 font-mono">
              * SUCCESS: {successMsg.toUpperCase()}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                Admin Page Title
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
                placeholder="Leave blank to inherit"
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
                  Publish this Page
                </span>
              </label>
            </div>

            <div className="space-y-1 sm:col-span-2 md:col-span-3">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
                SEO Meta Description
              </label>
              <textarea
                rows={2}
                placeholder="Summary description for public SEO layout..."
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
              {savingPage ? 'Saving configs...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>

      {/* ── Content Blocks Section ── */}
      <div>
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted mb-4 block">
          Visual Content Blocks
        </h3>

        <div className="space-y-6">
          {blocks.length === 0 ? (
            <div className="text-center p-8 border border-dashed border-border bg-sidebar/20 font-mono text-xs uppercase text-muted py-12">
              * This page contains no content blocks yet. Create a block below.
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
                  {/* Block Header Tag */}
                  <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted">
                        * BLOCK {String(index + 1).padStart(2, '0')} : {block.blockType.toUpperCase()}
                      </span>
                      {!block.isVisible && (
                        <span className="font-mono text-[8px] uppercase text-red-500 border border-red-200 bg-red-50 px-1 py-0.5">
                          Hidden
                        </span>
                      )}
                    </div>

                    {/* Block Action Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveBlock(index, 'up')}
                        disabled={index === 0}
                        className="p-1 border border-border bg-card hover:bg-sidebar disabled:opacity-40"
                        title="Move Block Up"
                      >
                        <ArrowUp className="h-3.5 w-3.5 text-primary" />
                      </button>
                      <button
                        onClick={() => moveBlock(index, 'down')}
                        disabled={index === blocks.length - 1}
                        className="p-1 border border-border bg-card hover:bg-sidebar disabled:opacity-40"
                        title="Move Block Down"
                      >
                        <ArrowDown className="h-3.5 w-3.5 text-primary" />
                      </button>
                      
                      <div className="w-px h-5 bg-border mx-1" />

                      <button
                        onClick={() => toggleVisibility(block)}
                        className={`p-1 border border-border bg-card hover:bg-sidebar`}
                        title={block.isVisible ? 'Hide Block' : 'Show Block'}
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
                        title="Advanced JSON Editor"
                      >
                        <Code className="h-3.5 w-3.5 text-primary" />
                      </button>

                      <button
                        onClick={() => handleDeleteBlock(block.id)}
                        className="p-1 border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:border-red-300"
                        title="Delete Block"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Block Content Canvas */}
                  {isEditingRaw ? (
                    // RAW JSON EDITOR VIEW
                    <div className="space-y-4">
                      <div className="bg-red-50 p-2 text-[9px] font-mono text-red-700 uppercase border border-red-200">
                        * CAUTION: INCORRECT JSON FORMAT WILL PREVENT THIS BLOCK FROM RENDERING ON PUBLIC SITES.
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
                          Apply JSON
                        </button>
                      </div>
                    </div>
                  ) : (
                    // VISUAL EDITOR FOR KEY BLOCK TYPES
                    <div className="space-y-4">
                      {block.blockType === 'heading' && (
                        <div className="grid gap-4 sm:grid-cols-6">
                          <div className="sm:col-span-1 space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Level</label>
                            <select
                              value={block.content.level || 2}
                              onChange={(e) => {
                                const newContent = { ...block.content, level: Number(e.target.value) };
                                setBlocks(blocks.map(b => b.id === block.id ? { ...b, content: newContent } : b));
                              }}
                              className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                            >
                              {[1, 2, 3, 4, 5, 6].map(l => <option key={l} value={l}>H{l}</option>)}
                            </select>
                          </div>
                          <div className="sm:col-span-5 space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Heading Text</label>
                            <input
                              type="text"
                              value={block.content.text || ''}
                              onChange={(e) => {
                                const newContent = { ...block.content, text: e.target.value };
                                setBlocks(blocks.map(b => b.id === block.id ? { ...b, content: newContent } : b));
                              }}
                              className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {(block.blockType === 'paragraph' || block.blockType === 'rich_text') && (
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Body Text</label>
                            <textarea
                              rows={4}
                              value={block.content.text || ''}
                              onChange={(e) => {
                                const newContent = { ...block.content, text: e.target.value };
                                setBlocks(blocks.map(b => b.id === block.id ? { ...b, content: newContent } : b));
                              }}
                              className="w-full border border-border bg-[#fdfdfc] px-3 py-2 text-xs text-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                          {block.blockType === 'paragraph' && (
                            <div className="space-y-1">
                              <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Source Note (optional)</label>
                              <input
                                type="text"
                                placeholder="e.g. source: NCVET Total VET students & courses, 2024"
                                value={block.content.sourceNote || ''}
                                onChange={(e) => {
                                  const newContent = { ...block.content, sourceNote: e.target.value };
                                  setBlocks(blocks.map(b => b.id === block.id ? { ...b, content: newContent } : b));
                                }}
                                className="w-full border border-border bg-[#fdfdfc] px-3 py-1 text-xs text-primary focus:border-primary focus:outline-none"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {block.blockType === 'quote' && (
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Quote Text</label>
                            <textarea
                              rows={3}
                              value={block.content.text || ''}
                              onChange={(e) => {
                                const newContent = { ...block.content, text: e.target.value };
                                setBlocks(blocks.map(b => b.id === block.id ? { ...b, content: newContent } : b));
                              }}
                              className="w-full border border-border bg-[#fdfdfc] px-3 py-2 text-xs text-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Author / Citation</label>
                            <input
                              type="text"
                              value={block.content.author || ''}
                              onChange={(e) => {
                                const newContent = { ...block.content, author: e.target.value };
                                setBlocks(blocks.map(b => b.id === block.id ? { ...b, content: newContent } : b));
                              }}
                              className="w-full border border-border bg-[#fdfdfc] px-3 py-1 text-xs text-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {block.blockType === 'kpi_card' && (
                        <div className="grid gap-3 sm:grid-cols-4">
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted">Label</label>
                            <input
                              type="text"
                              value={block.content.label || ''}
                              onChange={(e) => {
                                const newContent = { ...block.content, label: e.target.value };
                                setBlocks(blocks.map(b => b.id === block.id ? { ...b, content: newContent } : b));
                              }}
                              className="w-full border border-border bg-[#fdfdfc] px-3 py-1 text-xs text-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-bold">Number Value</label>
                            <input
                              type="text"
                              value={block.content.value || ''}
                              onChange={(e) => {
                                const newContent = { ...block.content, value: e.target.value };
                                setBlocks(blocks.map(b => b.id === block.id ? { ...b, content: newContent } : b));
                              }}
                              className="w-full border border-border bg-[#fdfdfc] px-3 py-1 text-xs text-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-normal">Prefix</label>
                            <input
                              type="text"
                              placeholder="e.g. $"
                              value={block.content.prefix || ''}
                              onChange={(e) => {
                                const newContent = { ...block.content, prefix: e.target.value };
                                setBlocks(blocks.map(b => b.id === block.id ? { ...b, content: newContent } : b));
                              }}
                              className="w-full border border-border bg-[#fdfdfc] px-3 py-1 text-xs text-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block font-mono text-[8px] uppercase tracking-wider text-muted font-normal">Suffix</label>
                            <input
                              type="text"
                              placeholder="e.g. %"
                              value={block.content.suffix || ''}
                              onChange={(e) => {
                                const newContent = { ...block.content, suffix: e.target.value };
                                setBlocks(blocks.map(b => b.id === block.id ? { ...b, content: newContent } : b));
                              }}
                              className="w-full border border-border bg-[#fdfdfc] px-3 py-1 text-xs text-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {block.blockType === 'table' && (
                        <div className="space-y-3">
                          <span className="font-mono text-[8px] text-muted uppercase tracking-wider block">
                            * TABLE CONFIG (Visual Editor limited. Toggle Code block for full rows edits).
                          </span>
                          <div className="border border-border overflow-x-auto max-w-full">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-sidebar border-b border-border">
                                <tr>
                                  {block.content.headers?.map((header: string, i: number) => (
                                    <th key={i} className="p-2 font-mono uppercase text-[9px] text-muted border-r border-border font-bold">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {block.content.rows?.map((row: string[], i: number) => (
                                  <tr key={i} className="border-b border-border/40">
                                    {row.map((cell: string, j: number) => (
                                      <td key={j} className="p-2 border-r border-border/40 text-primary">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Fallback info when custom editing is required */}
                      {!['heading', 'paragraph', 'rich_text', 'quote', 'kpi_card', 'table'].includes(block.blockType) && (
                        <div className="border border-dashed border-border p-4 bg-sidebar/20 text-center font-mono text-[10px] text-muted">
                          * DYNAMIC MODULE: {block.blockType.toUpperCase()} DATA CAN BE CONFIGURED BY TOGGLING THE RAW JSON EDITOR ({"< >"}).
                        </div>
                      )}

                      {/* Inline block save */}
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => handleSaveBlock(block.id, block.content, block.isVisible)}
                          className="border border-primary bg-primary px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors flex items-center gap-1"
                        >
                          <Save className="h-3 w-3" />
                          Save Block
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Add Block Form ── */}
      <div className="border border-border bg-card p-6 shadow-sm relative">
        <span className="absolute top-2 right-3 font-mono text-[8px] uppercase tracking-widest text-muted">
          * ADD ELEMENT
        </span>
        
        <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
          Add New Content Block
        </h3>

        <form onSubmit={handleAddBlock} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="space-y-1 flex-1 w-full">
            <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
              Select Element Type
            </label>
            <select
              value={newBlockType}
              onChange={(e) => setNewBlockType(e.target.value)}
              className="w-full border border-border bg-[#fdfdfc] py-2 px-3 text-xs text-primary focus:outline-none"
            >
              <option value="paragraph">Paragraph Text</option>
              <option value="heading">HTML Heading (H1-H6)</option>
              <option value="kpi_card">KPI Metric Badge</option>
              <option value="table">Data Table</option>
              <option value="quote">Styled Blockquote</option>
              <option value="chart">Dynamic Chart Widget</option>
              <option value="divider">Horizontal Divider</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={blockAdding}
            className="w-full sm:w-auto border border-primary bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-white hover:bg-active transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Add Element
          </button>
        </form>
      </div>

    </div>
  );
}
