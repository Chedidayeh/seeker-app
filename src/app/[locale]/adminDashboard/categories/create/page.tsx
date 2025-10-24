"use client";

import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, XCircle, AlertCircle, Download, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from 'next/navigation';
import { CSVCategory, insertCategories, validateCategories, ValidationError } from '../actions/actions';

type ParsedCategory = CSVCategory & {
  _rowIndex: number;
};

export default function View() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<ParsedCategory[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isInserting, setIsInserting] = useState(false);
  const [parseError, setParseError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      setParseError('Please upload a valid CSV file');
      return;
    }

    setFile(selectedFile);
    setParseError('');
    setErrors([]);
    setSuccessMessage('');

    const text = await selectedFile.text();
    parseCSV(text);
  };

  const parseCSV = (text: string) => {
    try {
      const lines = text.split('\n').filter(line => line.trim());
      if (lines.length < 2) {
        setParseError('CSV file is empty or has no data rows');
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      // Validate required headers
      const requiredHeaders = ['name', 'status'];
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
      if (missingHeaders.length > 0) {
        setParseError(`Missing required columns: ${missingHeaders.join(', ')}`);
        return;
      }

      const parsed: ParsedCategory[] = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const row: any = { _rowIndex: i + 1 };
        
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        parsed.push(row);
      }

      setCategories(parsed);
    } catch (error) {
      setParseError('Failed to parse CSV file. Please check the format.');
    }
  };

  const handleValidate = async () => {
    setIsValidating(true);
    setErrors([]);
    setSuccessMessage('');

    try {
      const result = await validateCategories(categories);
      setErrors(result.errors);
      
      if (result.valid) {
        setSuccessMessage('Validation passed! All categories are ready to be imported.');
      }
    } catch (error) {
      setParseError('Validation failed. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleInsert = async () => {
    setIsInserting(true);
    setSuccessMessage('');

    try {
      const result = await insertCategories(categories);
      
      if (result.success) {
        setSuccessMessage(result.message);
        // Clear form after 2 seconds and redirect
        setTimeout(() => {
          router.push('/adminDashboard/categories');
        }, 2000);
      } else {
        setParseError(result.message);
      }
    } catch (error) {
      setParseError('Failed to insert categories. Please try again.');
    } finally {
      setIsInserting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setCategories([]);
    setErrors([]);
    setParseError('');
    setSuccessMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = () => {
    const csv = 'name,description,status,icon\nHome Cleaning,Professional home cleaning services,active,🧹\nPlumbing,Expert plumbing services,active,🔧';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'categories_template.csv';
    a.click();
  };

  const getRowErrors = (rowIndex: number) => {
    return errors.filter(e => e.row === rowIndex);
  };

  const hasRowErrors = (rowIndex: number) => {
    return errors.some(e => e.row === rowIndex);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Import Categories
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Upload a CSV file to bulk import service categories
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/[0.05] p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Upload CSV File
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Required columns: <span className="font-mono font-medium">name, status</span>
              <br />
              Optional columns: <span className="font-mono font-medium">description, icon</span>
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadTemplate}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Template
          </Button>
        </div>

        <div className="border-2 border-dashed border-gray-300 dark:border-white/[0.1] rounded-lg p-8 text-center hover:border-gray-400 dark:hover:border-white/[0.2] transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            id="csv-upload"
          />
          <label
            htmlFor="csv-upload"
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                CSV files only, max 5MB
              </p>
            </div>
          </label>
        </div>

        {file && (
          <div className="mt-4 flex items-center justify-between bg-gray-50 dark:bg-white/[0.02] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(2)} KB • {categories.length} rows
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Alerts */}
      {parseError && (
        <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-500/10 dark:border-red-500/20">
          <XCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-800 dark:text-red-400">
            {parseError}
          </AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-500/10 dark:border-green-500/20">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-800 dark:text-green-400">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {errors.length > 0 && (
        <Alert className="mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-500/10 dark:border-yellow-500/20">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-400">
            Found {errors.length} validation error(s). Please review and fix them before importing.
          </AlertDescription>
        </Alert>
      )}

      {/* Preview Table */}
      {categories.length > 0 && (
        <div className="bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/[0.05] overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-white/[0.05] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Preview ({categories.length} categories)
            </h2>
            <div className="flex gap-2">
              <Button
                onClick={handleValidate}
                disabled={isValidating || isInserting}
                variant="outline"
                size="sm"
              >
                {isValidating ? 'Validating...' : 'Validate'}
              </Button>
              <Button
                onClick={handleInsert}
                disabled={errors.length > 0 || isInserting || isValidating || categories.length === 0}
                size="sm"
              >
                {isInserting ? 'Importing...' : 'Import Categories'}
              </Button>
            </div>
          </div>

          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Row
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Name
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Description
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Status
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Icon
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Validation
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {categories.map((category, index) => {
                  const rowErrors = getRowErrors(category._rowIndex);
                  const hasErrors = hasRowErrors(category._rowIndex);

                  return (
                    <TableRow
                      key={index}
                      className={hasErrors ? 'bg-red-50/50 dark:bg-red-500/5' : ''}
                    >
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {category._rowIndex}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {category.name || <span className="text-red-500">Missing</span>}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 max-w-xs truncate">
                        {category.description || '-'}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <Badge
                          color={
                            !category.status ? 'error' :
                            category.status.toLowerCase() === 'active' ? 'success' : 'error'
                          }
                        >
                          {category.status || 'Missing'}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-center">
                        {category.icon ? (
                          <span className="text-2xl">{category.icon}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        {rowErrors.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {rowErrors.map((error, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-red-600 dark:text-red-400">
                                  <span className="font-medium">{error.field}:</span> {error.message}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : errors.length > 0 ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 dark:text-green-400">Valid</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">Not validated</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Instructions */}
      {categories.length === 0 && !file && (
        <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200 dark:border-blue-500/20 p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-3">
            CSV Format Requirements
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span><strong>name</strong> - Category name (required, must be unique)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span><strong>status</strong> - Must be "active" or "inactive" (required)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span><strong>description</strong> - Brief description (optional)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span><strong>icon</strong> - Emoji or icon (optional)</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}