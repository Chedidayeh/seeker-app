"use client";
import React, { useState, useMemo } from 'react';
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
import { Trash2, AlertCircle, Loader2, Search, Edit, X, ArrowUp, ArrowDown, ChevronsUpDown, CheckSquare } from 'lucide-react';
import { Category, updateCategory, deleteCategory, UpdateCategoryData } from './actions/actions';
import { Checkbox } from "@/components/ui/checkbox";

type SortField = 'name' | 'professionals' | 'views' | 'created_at';
type SortOrder = 'asc' | 'desc';

export default function view({ categories }: { categories: Category[] }) {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Search, Sort, and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  
  // Edit/Delete states
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Edit form state
  const [editForm, setEditForm] = useState<UpdateCategoryData>({});
  
  // Bulk selection states
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditForm({
      name: category.name,
      description: category.description || '',
      status: category.status,
      icon: category.icon || '',
    });
    setShowEditDialog(true);
  };

  const handleEditSubmit = async () => {
    if (!selectedCategory) return;
    
    setIsEditing(true);
    setMessage(null);
    
    try {
      const result = await updateCategory(selectedCategory.id, editForm);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setShowEditDialog(false);
        setSelectedCategory(null);
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

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) return;
    
    setIsDeleting(true);
    setMessage(null);
    
    try {
      const result = await deleteCategory(selectedCategory.id);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setShowDeleteDialog(false);
        setSelectedCategory(null);
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
    if (selectedIds.size === filteredAndSortedCategories.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAndSortedCategories.map(c => c.id)));
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
    
    // Check if any selected category has professionals
    const categoriesWithProfessionals = filteredAndSortedCategories.filter(
      cat => selectedIds.has(cat.id) && cat._count.professionals > 0
    );
    
    if (categoriesWithProfessionals.length > 0) {
      setMessage({ 
        type: 'error', 
        text: `Cannot delete ${categoriesWithProfessionals.length} category(ies) that have associated professionals.` 
      });
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedIds.size} category(ies)? This action cannot be undone.`)) {
      return;
    }

    setIsBulkDeleting(true);
    setMessage(null);
    
    try {
      let successCount = 0;
      let errorCount = 0;

      for (const id of Array.from(selectedIds)) {
        const result = await deleteCategory(id);
        if (result.success) {
          successCount++;
        } else {
          errorCount++;
        }
      }

      if (successCount > 0) {
        setMessage({ 
          type: 'success', 
          text: `Successfully deleted ${successCount} category(ies)${errorCount > 0 ? `. ${errorCount} failed.` : '.'}` 
        });
        setSelectedIds(new Set());
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage({ type: 'error', text: 'Failed to delete categories' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred during bulk delete' });
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const handleBulkStatusUpdate = async (status: 'active' | 'inactive') => {
    if (selectedIds.size === 0) return;
    
    setIsBulkUpdating(true);
    setMessage(null);
    
    try {
      let successCount = 0;
      let errorCount = 0;

      for (const id of Array.from(selectedIds)) {
        const result = await updateCategory(id, { status });
        if (result.success) {
          successCount++;
        } else {
          errorCount++;
        }
      }

      if (successCount > 0) {
        setMessage({ 
          type: 'success', 
          text: `Successfully updated ${successCount} category(ies) to ${status}${errorCount > 0 ? `. ${errorCount} failed.` : '.'}` 
        });
        setSelectedIds(new Set());
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage({ type: 'error', text: 'Failed to update categories' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred during bulk update' });
    } finally {
      setIsBulkUpdating(false);
    }
  };

  // Filter, search, and sort categories
  const filteredAndSortedCategories = useMemo(() => {
    let filtered = [...categories];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(cat => 
        cat.name.toLowerCase().includes(query) ||
        cat.description?.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(cat => cat.status === filterStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (sortField === 'professionals') {
        aValue = a._count.professionals;
        bValue = b._count.professionals;
      } else if (sortField === 'created_at') {
        aValue = new Date(a.created_at).getTime();
        bValue = new Date(b.created_at).getTime();
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

      // Handle null values
      if (aValue === null) return 1;
      if (bValue === null) return -1;

      // Convert strings to lowercase
      if (typeof aValue === 'string') {
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
  }, [categories, searchQuery, filterStatus, sortField, sortOrder]);
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Service Categories</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your service categories and domains ({filteredAndSortedCategories.length} of {categories.length})
        </p>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedIds.size > 0 && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-900 dark:text-blue-100">
                {selectedIds.size} category(ies) selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('active')}
                disabled={isBulkUpdating || isBulkDeleting}
                className="bg-green-500 hover:bg-green-600 text-white border-green-600"
              >
                {isBulkUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Set Active
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('inactive')}
                disabled={isBulkUpdating || isBulkDeleting}
                className="bg-orange-500 hover:bg-orange-600 text-white border-orange-600"
              >
                {isBulkUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Set Inactive
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

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or description..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
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
          <div className="min-w-[800px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell className="px-5 py-3 w-12">
                    <Checkbox
                      checked={selectedIds.size === filteredAndSortedCategories.length && filteredAndSortedCategories.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableCell>
                  <TableCell
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors select-none"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Category
                      {sortField === 'name' ? (
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
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Description
                  </TableCell>
                  <TableCell
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors select-none"
                    onClick={() => handleSort('professionals')}
                  >
                    <div className="flex items-center gap-2">
                      Professionals
                      {sortField === 'professionals' ? (
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
                  <TableCell
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {filteredAndSortedCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                      {searchQuery || filterStatus !== 'all'
                        ? 'No categories match your filters. Try adjusting your search criteria.'
                        : 'No categories found. Create your first category to get started.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedCategories.map((category) => (
                    <TableRow key={category.id} className={selectedIds.has(category.id) ? 'bg-blue-50 dark:bg-blue-500/5' : ''}>
                      <TableCell className="px-5 py-4">
                        <Checkbox
                          checked={selectedIds.has(category.id)}
                          onCheckedChange={() => toggleSelectRow(category.id)}
                          aria-label={`Select ${category.name}`}
                        />
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-3">
                          {category.icon && (
                            <span className="text-2xl">{category.icon}</span>
                          )}
                          <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {category.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 max-w-xs truncate">
                        {category.description || '-'}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {category._count.professionals}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {category.views}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <Badge
                          color={category.status === "active" ? "success" : "error"}
                        >
                          {category.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(category)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(category)}
                            className="h-8 w-8 p-0"
                            disabled={category._count.professionals > 0}
                            title={category._count.professionals > 0 ? 'Cannot delete category with professionals' : 'Delete category'}
                          >
                            <Trash2 className={`h-4 w-4 ${category._count.professionals > 0 ? 'text-gray-400' : 'text-red-600 dark:text-red-400'}`} />
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

      {/* Edit Category Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category information below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name *</Label>
                <Input
                  id="edit-name"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <textarea
                  id="edit-description"
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Enter description"
                  className="w-full min-h-[80px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-950 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="edit-icon">Icon (emoji)</Label>
                <Input
                  id="edit-icon"
                  value={editForm.icon || ''}
                  onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                  placeholder="Enter emoji icon (e.g., ⚖️)"
                  maxLength={2}
                />
              </div>

              <div>
                <Label htmlFor="edit-status">Status *</Label>
                <Select 
                  value={editForm.status || 'active'} 
                  onValueChange={(value) => setEditForm({ ...editForm, status: value })}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
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
              disabled={isEditing || !editForm.name}
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
              Are you sure you want to delete this category?
            </DialogDescription>
          </DialogHeader>
          
          {selectedCategory && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/[0.02] rounded-lg border border-gray-200 dark:border-white/[0.05]">
                {selectedCategory.icon && (
                  <span className="text-3xl">{selectedCategory.icon}</span>
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedCategory.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedCategory.description || 'No description'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {selectedCategory._count.professionals} professional(s)
                  </p>
                </div>
              </div>
              <p className="text-sm text-red-600 dark:text-red-400 mt-4">
                This action cannot be undone. This will permanently delete the category.
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
              Delete Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
