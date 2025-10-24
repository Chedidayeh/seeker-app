"use client";
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, AlertCircle, Loader2, Users, Search, ArrowUpDown, Edit, X, ArrowUp, ArrowDown, ChevronsUpDown, CheckSquare, Square } from 'lucide-react';
import { Professional, DuplicateGroup, findDuplicates, removeDuplicates, deleteProfessional, updateProfessional, getAllDomains, UpdateProfessionalData } from './actions/actions';
import { Checkbox } from "@/components/ui/checkbox";

type SortField = 'full_name' | 'headline' | 'city' | 'views' | 'created_at';
type SortOrder = 'asc' | 'desc';

export default function View({ professionals }: { professionals: Professional[] }) {
  const [showDuplicatesDialog, setShowDuplicatesDialog] = useState(false);
  const [duplicates, setDuplicates] = useState<DuplicateGroup[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Search, Sort, and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'unavailable'>('all');
  const [filterDomain, setFilterDomain] = useState<string>('all');
  
  // Edit/Delete states
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [domains, setDomains] = useState<{ id: string; name: string; icon: string | null }[]>([]);
  
  // Edit form state
  const [editForm, setEditForm] = useState<UpdateProfessionalData>({});
  
  // Bulk selection states
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const handleScanDuplicates = async () => {
    setIsScanning(true);
    setMessage(null);
    
    try {
      const result = await findDuplicates();
      
      if (result.success) {
        setDuplicates(result.duplicates);
        if (result.duplicates.length === 0) {
          setMessage({ type: 'success', text: 'No duplicates found! Database is clean.' });
        } else {
          setShowDuplicatesDialog(true);
        }
      } else {
        setMessage({ type: 'error', text: 'Failed to scan for duplicates' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while scanning' });
    } finally {
      setIsScanning(false);
    }
  };

  const handleRemoveDuplicates = async (keepOldest: boolean) => {
    setIsRemoving(true);
    
    try {
      const result = await removeDuplicates(keepOldest);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setShowDuplicatesDialog(false);
        setDuplicates([]);
        // Refresh the page to show updated data
        window.location.reload();
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while removing duplicates' });
    } finally {
      setIsRemoving(false);
    }
  };

  const handleEditClick = async (professional: Professional) => {
    setSelectedProfessional(professional);
    setEditForm({
      full_name: professional.full_name,
      headline: professional.headline,
      bio: professional.bio || '',
      email: professional.email || '',
      phone: professional.phone || '',
      city: professional.city || '',
      image_url: professional.image_url || '',
      available: professional.available,
      domain_id: professional.domain.id,
    });
    
    // Fetch domains if not already loaded
    if (domains.length === 0) {
      const allDomains = await getAllDomains();
      setDomains(allDomains);
    }
    
    setShowEditDialog(true);
  };

  const handleEditSubmit = async () => {
    if (!selectedProfessional) return;
    
    setIsEditing(true);
    setMessage(null);
    
    try {
      const result = await updateProfessional(selectedProfessional.id, editForm);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setShowEditDialog(false);
        setSelectedProfessional(null);
        // Refresh the page to show updated data
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating' });
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeleteClick = (professional: Professional) => {
    setSelectedProfessional(professional);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProfessional) return;
    
    setIsDeleting(true);
    setMessage(null);
    
    try {
      const result = await deleteProfessional(selectedProfessional.id);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setShowDeleteDialog(false);
        setSelectedProfessional(null);
        // Refresh the page to show updated data
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while deleting' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Bulk selection handlers
  const toggleSelectAll = () => {
    if (selectedIds.size === filteredAndSortedProfessionals.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAndSortedProfessionals.map(p => p.id)));
    }
  };

  const toggleSelectRow = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} professional(s)? This action cannot be undone.`)) {
      return;
    }

    setIsBulkDeleting(true);
    setMessage(null);
    
    try {
      let successCount = 0;
      let errorCount = 0;

      for (const id of Array.from(selectedIds)) {
        const result = await deleteProfessional(id);
        if (result.success) {
          successCount++;
        } else {
          errorCount++;
        }
      }

      if (successCount > 0) {
        setMessage({ 
          type: 'success', 
          text: `Successfully deleted ${successCount} professional(s)${errorCount > 0 ? `. ${errorCount} failed.` : '.'}` 
        });
        setSelectedIds(new Set());
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage({ type: 'error', text: 'Failed to delete professionals' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred during bulk delete' });
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const handleBulkStatusUpdate = async (available: boolean) => {
    if (selectedIds.size === 0) return;
    
    setIsBulkUpdating(true);
    setMessage(null);
    
    try {
      let successCount = 0;
      let errorCount = 0;

      for (const id of Array.from(selectedIds)) {
        const result = await updateProfessional(id, { available });
        if (result.success) {
          successCount++;
        } else {
          errorCount++;
        }
      }

      if (successCount > 0) {
        setMessage({ 
          type: 'success', 
          text: `Successfully updated ${successCount} professional(s) to ${available ? 'Available' : 'Unavailable'}${errorCount > 0 ? `. ${errorCount} failed.` : '.'}` 
        });
        setSelectedIds(new Set());
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage({ type: 'error', text: 'Failed to update professionals' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred during bulk update' });
    } finally {
      setIsBulkUpdating(false);
    }
  };

  // Get unique domains for filter
  const uniqueDomains = useMemo(() => {
    const domainMap = new Map();
    professionals.forEach(prof => {
      if (!domainMap.has(prof.domain.id)) {
        domainMap.set(prof.domain.id, prof.domain);
      }
    });
    return Array.from(domainMap.values());
  }, [professionals]);

  // Filter, search, and sort professionals
  const filteredAndSortedProfessionals = useMemo(() => {
    let filtered = [...professionals];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(prof => 
        prof.full_name.toLowerCase().includes(query) ||
        prof.headline.toLowerCase().includes(query) ||
        prof.email?.toLowerCase().includes(query) ||
        prof.phone?.toLowerCase().includes(query) ||
        prof.city?.toLowerCase().includes(query) ||
        prof.domain.name.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(prof => 
        filterStatus === 'available' ? prof.available : !prof.available
      );
    }

    // Apply domain filter
    if (filterDomain !== 'all') {
      filtered = filtered.filter(prof => prof.domain.id === filterDomain);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle null values
      if (aValue === null) return 1;
      if (bValue === null) return -1;

      // Convert to comparable values
      if (sortField === 'created_at') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [professionals, searchQuery, filterStatus, filterDomain, sortField, sortOrder]);
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Professionals</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage registered professionals on the platform ({filteredAndSortedProfessionals.length} of {professionals.length})
          </p>
        </div>
        <Button
          onClick={handleScanDuplicates}
          disabled={isScanning}
          variant="outline"
          className="flex items-center gap-2"
        >
          {isScanning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Users className="w-4 h-4" />
              Find Duplicates
            </>
          )}
        </Button>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedIds.size > 0 && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-900 dark:text-blue-100">
                {selectedIds.size} professional(s) selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate(true)}
                disabled={isBulkUpdating || isBulkDeleting}
                className="bg-green-500 hover:bg-green-600 text-white border-green-600"
              >
                {isBulkUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Set Available
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate(false)}
                disabled={isBulkUpdating || isBulkDeleting}
                className="bg-orange-500 hover:bg-orange-600 text-white border-orange-600"
              >
                {isBulkUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Set Unavailable
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkDelete}
                disabled={isBulkUpdating || isBulkDeleting}
                className="bg-red-500 hover:bg-red-600 text-white border-red-600"
              >
                {isBulkDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                Delete Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedIds(new Set())}
                disabled={isBulkUpdating || isBulkDeleting}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Search, Filter, and Sort Controls */}
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, email, phone, location, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Domain Filter */}
          <div>
            <Select value={filterDomain} onValueChange={setFilterDomain}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueDomains.map((domain) => (
                  <SelectItem key={domain.id} value={domain.id}>
                    {domain.icon && `${domain.icon} `}{domain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message && (
        <Alert className={`mb-6 ${
          message.type === 'success' 
            ? 'border-green-200 bg-green-50 dark:bg-green-500/10 dark:border-green-500/20'
            : 'border-red-200 bg-red-50 dark:bg-red-500/10 dark:border-red-500/20'
        }`}>
          <AlertCircle className={`h-4 w-4 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`} />
          <AlertDescription className={message.type === 'success' ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1100px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell className="px-5 py-3 w-12">
                    <Checkbox
                      checked={selectedIds.size === filteredAndSortedProfessionals.length && filteredAndSortedProfessionals.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableCell>
                  <TableCell 
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors select-none"
                    onClick={() => handleSort('full_name')}
                  >
                    <div className="flex items-center gap-2">
                      Professional
                      {sortField === 'full_name' ? (
                        sortOrder === 'asc' ? (
                          <ArrowUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell 
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors select-none"
                    onClick={() => handleSort('headline')}
                  >
                    <div className="flex items-center gap-2">
                      Headline
                      {sortField === 'headline' ? (
                        sortOrder === 'asc' ? (
                          <ArrowUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Category
                  </TableCell>
                  <TableCell 
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors select-none"
                    onClick={() => handleSort('city')}
                  >
                    <div className="flex items-center gap-2">
                      Location
                      {sortField === 'city' ? (
                        sortOrder === 'asc' ? (
                          <ArrowUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell 
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors select-none"
                    onClick={() => handleSort('views')}
                  >
                    <div className="flex items-center gap-2">
                      Views
                      {sortField === 'views' ? (
                        sortOrder === 'asc' ? (
                          <ArrowUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Status
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {filteredAndSortedProfessionals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                      {searchQuery || filterStatus !== 'all' || filterDomain !== 'all' 
                        ? 'No professionals match your filters. Try adjusting your search criteria.'
                        : 'No professionals found. Add professionals to get started.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedProfessionals.map((professional) => (
                    <TableRow key={professional.id} className={selectedIds.has(professional.id) ? 'bg-blue-50 dark:bg-blue-500/5' : ''}>
                      <TableCell className="px-5 py-4">
                        <Checkbox
                          checked={selectedIds.has(professional.id)}
                          onCheckedChange={() => toggleSelectRow(professional.id)}
                          aria-label={`Select ${professional.full_name}`}
                        />
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            {/* {professional.image_url ? (
                              <Image
                                width={40}
                                height={40}
                                src={professional.image_url}
                                alt={professional.full_name}
                                className="object-cover"
                              />
                            ) : ( */}
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
                                {professional.full_name.charAt(0).toUpperCase()}
                              </div>
                            {/* )} */}
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {professional.full_name}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {professional.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 max-w-xs truncate">
                        {professional.headline}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-2">
                          {professional.domain.icon && (
                            <span className="text-lg">{professional.domain.icon}</span>
                          )}
                          <span className="text-gray-800 text-theme-sm dark:text-white/90">
                            {professional.domain.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {professional.city || '-'}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {professional.views}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <Badge
                          color={professional.available ? "success" : "error"}
                        >
                          {professional.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(professional)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(professional)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Duplicates Dialog */}
      <Dialog open={showDuplicatesDialog} onOpenChange={setShowDuplicatesDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Duplicate Professionals Found</DialogTitle>
            <DialogDescription>
              Found {duplicates.length} duplicate group(s). Review and choose which records to keep.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            {duplicates.map((group, index) => (
              <div key={group.id} className="border border-gray-200 dark:border-white/[0.1] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="capitalize">
                    {group.type}
                  </Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {group.professionals.length} duplicates
                  </span>
                </div>
                
                <div className="space-y-2">
                  {group.professionals.map((prof, idx) => (
                    <div 
                      key={prof.id} 
                      className={`p-3 rounded-md ${
                        idx === 0 
                          ? 'bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20' 
                          : 'bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {prof.full_name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {prof.headline}
                          </p>
                          <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {prof.email && <span>📧 {prof.email}</span>}
                            {prof.phone && <span>📱 {prof.phone}</span>}
                            {prof.city && <span>📍 {prof.city}</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          {idx === 0 && (
                            <Badge variant="outline" className="text-xs bg-green-100 dark:bg-green-900/20">
                              Will Keep (Oldest)
                            </Badge>
                          )}
                          {idx !== 0 && (
                            <Badge variant="outline" className="text-xs bg-red-100 dark:bg-red-900/20">
                              Will Remove
                            </Badge>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(prof.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDuplicatesDialog(false)}
              disabled={isRemoving}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => handleRemoveDuplicates(false)}
              disabled={isRemoving}
            >
              {isRemoving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
              Keep Newest
            </Button>
            <Button
              onClick={() => handleRemoveDuplicates(true)}
              disabled={isRemoving}
              className="bg-red-500 hover:bg-red-600"
            >
              {isRemoving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
              Keep Oldest & Remove Duplicates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Professional Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Professional</DialogTitle>
            <DialogDescription>
              Update the professional's information below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="edit-name">Full Name *</Label>
                <Input
                  id="edit-name"
                  value={editForm.full_name || ''}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="edit-headline">Headline *</Label>
                <Input
                  id="edit-headline"
                  value={editForm.headline || ''}
                  onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                  placeholder="Enter headline"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="edit-bio">Bio</Label>
                <textarea
                  id="edit-bio"
                  value={editForm.bio || ''}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Enter bio"
                  className="w-full min-h-[100px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-950 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>

              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editForm.phone || ''}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="Enter phone"
                />
              </div>

              <div>
                <Label htmlFor="edit-city">City</Label>
                <Input
                  id="edit-city"
                  value={editForm.city || ''}
                  onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                  placeholder="Enter city"
                />
              </div>

              <div>
                <Label htmlFor="edit-domain">Category *</Label>
                <Select 
                  value={editForm.domain_id || ''} 
                  onValueChange={(value) => setEditForm({ ...editForm, domain_id: value })}
                >
                  <SelectTrigger id="edit-domain">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain.id} value={domain.id}>
                        {domain.icon && `${domain.icon} `}{domain.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={editForm.image_url || ''}
                  onChange={(e) => setEditForm({ ...editForm, image_url: e.target.value })}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={editForm.available?.toString() || 'true'} 
                  onValueChange={(value) => setEditForm({ ...editForm, available: value === 'true' })}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Available</SelectItem>
                    <SelectItem value="false">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              disabled={isEditing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSubmit}
              disabled={isEditing || !editForm.full_name || !editForm.headline}
            >
              {isEditing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this professional?
            </DialogDescription>
          </DialogHeader>
          
          {selectedProfessional && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/[0.02] rounded-lg border border-gray-200 dark:border-white/[0.05]">
                <div className="w-12 h-12 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  {selectedProfessional.image_url ? (
                    <Image
                      width={48}
                      height={48}
                      src={selectedProfessional.image_url}
                      alt={selectedProfessional.full_name}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                      {selectedProfessional.full_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedProfessional.full_name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedProfessional.headline}
                  </p>
                </div>
              </div>
              <p className="text-sm text-red-600 dark:text-red-400 mt-4">
                This action cannot be undone. This will permanently delete the professional and all associated data.
              </p>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
              Delete Professional
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}