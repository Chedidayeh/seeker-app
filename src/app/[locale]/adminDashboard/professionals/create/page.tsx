"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Trash2,
  ChevronDown,
  Loader2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  CSVProfessional,
  insertProfessionals,
  validateProfessionals,
  ValidationError,
  createDomains,
} from "../actions/actions";

type ParsedProfessional = CSVProfessional & {
  _rowIndex: number;
};

export default function View() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [professionals, setProfessionals] = useState<ParsedProfessional[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isInserting, setIsInserting] = useState(false);
  const [parseError, setParseError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [missingDomains, setMissingDomains] = useState<string[]>([]);
  const [showDomainDialog, setShowDomainDialog] = useState(false);
  const [isCreatingDomains, setIsCreatingDomains] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const isCSV = selectedFile.name.endsWith(".csv");
    const isJSON = selectedFile.name.endsWith(".json");

    if (!isCSV && !isJSON) {
      setParseError("Please upload a valid CSV or JSON file");
      return;
    }

    setFile(selectedFile);
    setParseError("");
    setErrors([]);
    setSuccessMessage("");

    const text = await selectedFile.text();

    if (isJSON) {
      parseJSON(text);
    } else {
      parseCSV(text);
    }
  };

  const parseJSON = (text: string) => {
    try {
      const jsonData = JSON.parse(text);

      // Check if it's an array
      if (!Array.isArray(jsonData)) {
        setParseError("JSON file must contain an array of professionals");
        return;
      }

      if (jsonData.length === 0) {
        setParseError("JSON file is empty or has no data");
        return;
      }

      // Validate required fields
      const requiredFields = [
        "full_name",
        "headline",
        "domain_name",
        "address",
        "available",
      ];
      const firstItem = jsonData[0];
      const missingFields = requiredFields.filter(
        (field) => !(field in firstItem)
      );

      if (missingFields.length > 0) {
        setParseError(`Missing required fields: ${missingFields.join(", ")}`);
        return;
      }

      const parsed: ParsedProfessional[] = jsonData.map((item, index) => ({
        ...item,
        _rowIndex: index + 2, // +2 to account for header
      }));

      setProfessionals(parsed);
    } catch (error) {
      setParseError("Failed to parse JSON file. Please check the format.");
    }
  };

  const parseCSV = (text: string) => {
    try {
      const lines = text.split("\n").filter((line) => line.trim());
      if (lines.length < 2) {
        setParseError("CSV file is empty or has no data rows");
        return;
      }

      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

      // Validate required headers
      const requiredHeaders = [
        "full_name",
        "headline",
        "domain_name",
        "address",
        "available",
      ];
      const missingHeaders = requiredHeaders.filter(
        (h) => !headers.includes(h)
      );
      if (missingHeaders.length > 0) {
        setParseError(`Missing required columns: ${missingHeaders.join(", ")}`);
        return;
      }

      const parsed: ParsedProfessional[] = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim());
        const row: any = { _rowIndex: i + 1 };

        headers.forEach((header, index) => {
          row[header] = values[index] || "";
        });

        parsed.push(row);
      }

      setProfessionals(parsed);
    } catch (error) {
      setParseError("Failed to parse CSV file. Please check the format.");
    }
  };

  const handleDeleteRow = (rowIndex: number) => {
    // Remove the professional from the list
    const updatedProfessionals = professionals.filter(
      (p) => p._rowIndex !== rowIndex
    );
    setProfessionals(updatedProfessionals);

    // Remove errors associated with this row
    const updatedErrors = errors.filter((e) => e.row !== rowIndex);
    setErrors(updatedErrors);

    // Clear success message when modifying data
    setSuccessMessage("");
  };

  const handleCreateDomainsAndRevalidate = async () => {
    setIsCreatingDomains(true);
    setShowDomainDialog(false);

    try {
      const result = await createDomains(missingDomains);

      if (result.success) {
        setSuccessMessage(
          `Created ${result.count} new domain(s). Re-validating...`
        );

        // Wait a moment then re-validate
        setTimeout(async () => {
          setIsValidating(true);
          setSuccessMessage("");

          try {
            const validationResult = await validateProfessionals(professionals);
            setErrors(validationResult.errors);

            if (validationResult.valid) {
              setSuccessMessage(
                "Validation passed! All professionals are ready to be imported."
              );
            }
          } catch (error) {
            setParseError("Re-validation failed. Please try again.");
          } finally {
            setIsValidating(false);
            setIsCreatingDomains(false);
          }
        }, 500);
      } else {
        setParseError(result.message);
        setIsCreatingDomains(false);
      }
    } catch (error) {
      setParseError("Failed to create domains. Please try again.");
      setIsCreatingDomains(false);
    }
  };

  const handleValidate = async () => {
    setIsValidating(true);
    setErrors([]);
    setSuccessMessage("");
    setMissingDomains([]);

    try {
      const result = await validateProfessionals(professionals);
      setErrors(result.errors);

      // Extract missing domains from errors
      const domainErrors = result.errors.filter(
        (e) => e.field === "domain_name" && e.message.includes("does not exist")
      );

      if (domainErrors.length > 0) {
        // Extract unique missing domain names
        const missingDomainNames = Array.from(
          new Set(
            domainErrors
              .map((error) => {
                const match = error.message.match(
                  /Domain "([^"]+)" does not exist/
                );
                return match ? match[1] : null;
              })
              .filter(Boolean) as string[]
          )
        );

        setMissingDomains(missingDomainNames);
        setShowDomainDialog(true);
      } else if (result.valid) {
        setSuccessMessage(
          "Validation passed! All professionals are ready to be imported."
        );
      }
    } catch (error) {
      setParseError("Validation failed. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleInsert = async () => {
    setIsInserting(true);
    setSuccessMessage("");

    try {
      const result = await insertProfessionals(professionals);

      if (result.success) {
        setSuccessMessage(result.message);
        // Clear form after 2 seconds and redirect
        setTimeout(() => {
          router.push("/adminDashboard/professionals");
        }, 2000);
      } else {
        setParseError(result.message);
      }
    } catch (error) {
      setParseError("Failed to insert professionals. Please try again.");
    } finally {
      setIsInserting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setProfessionals([]);
    setErrors([]);
    setParseError("");
    setSuccessMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const downloadTemplateCSV = () => {
    const csv =
      "full_name,headline,bio,domain_name,email,phone,website,linkedin_url,instagram_url,city,country,address,image_url,available\nJohn Doe,Professional Plumber,Expert in residential plumbing,Plumbing,john@example.com,+1234567890,https://johndoe.com,https://linkedin.com/in/johndoe,https://instagram.com/johndoe,New York,USA,123 Main Street,https://example.com/photo.jpg,true\nJane Smith,Home Cleaning Specialist,10 years experience,Home Cleaning,,+0987654321,,,,Los Angeles,USA,456 Oak Avenue,,yes";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "professionals_template.csv";
    a.click();
  };

  const downloadTemplateJSON = () => {
    const jsonData = [
      {
        full_name: "John Doe",
        headline: "Professional Plumber",
        bio: "Expert in residential plumbing",
        domain_name: "Plumbing",
        email: "john@example.com",
        phone: "+1234567890",
        website: "https://johndoe.com",
        linkedin_url: "https://linkedin.com/in/johndoe",
        instagram_url: "https://instagram.com/johndoe",
        city: "New York",
        address: "123 Main Street",
        image_url: "https://example.com/photo.jpg",
        available: "true",
      },
      {
        full_name: "Jane Smith",
        headline: "Home Cleaning Specialist",
        bio: "10 years experience",
        domain_name: "Home Cleaning",
        email: "",
        phone: "+0987654321",
        website: "",
        linkedin_url: "",
        instagram_url: "",
        city: "Los Angeles",
        address: "456 Oak Avenue",
        image_url: "",
        available: "yes",
      },
    ];
    const json = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "professionals_template.json";
    a.click();
  };

  const getRowErrors = (rowIndex: number) => {
    return errors.filter((e) => e.row === rowIndex);
  };

  const hasRowErrors = (rowIndex: number) => {
    return errors.some((e) => e.row === rowIndex);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Import Professionals
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Upload a CSV or JSON file to bulk import professionals
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/[0.05] p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Upload CSV or JSON File
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Required columns:{" "}
              <span className="font-mono font-medium">
                full_name, headline, domain_name, address, available
              </span>
              <br />
              Optional columns:{" "}
              <span className="font-mono font-medium">
                email, bio, phone, website, linkedin_url, instagram_url, city,
                country, image_url
              </span>
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Template
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={downloadTemplateCSV}>
                <FileText className="w-4 h-4 mr-2" />
                CSV Template
              </DropdownMenuItem>
              <DropdownMenuItem onClick={downloadTemplateJSON}>
                <FileText className="w-4 h-4 mr-2" />
                JSON Template
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="border-2 border-dashed border-gray-300 dark:border-white/[0.1] rounded-lg p-8 text-center hover:border-gray-400 dark:hover:border-white/[0.2] transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                {file ? file.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                CSV or JSON files, max 5MB
              </p>
            </div>
          </label>
        </div>

        {file && (
          <div className="mt-4 flex items-center justify-between bg-gray-50 dark:bg-white/[0.02] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(2)} KB • {professionals.length}{" "}
                  rows
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
            <div className="font-semibold mb-2">
              Found {errors.length} validation error(s):
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {errors.filter((e) => e.message.includes("already exists"))
                .length > 0 && (
                <li>
                  {
                    errors.filter((e) => e.message.includes("already exists"))
                      .length
                  }{" "}
                  duplicate(s) found in database
                </li>
              )}
              {errors.filter((e) => e.message.includes("Duplicate")).length >
                0 && (
                <li>
                  {errors.filter((e) => e.message.includes("Duplicate")).length}{" "}
                  duplicate(s) found within file
                </li>
              )}
              {errors.filter((e) => e.message.includes("Similar professional"))
                .length > 0 && (
                <li>
                  {
                    errors.filter((e) =>
                      e.message.includes("Similar professional")
                    ).length
                  }{" "}
                  similar professional(s) found in database
                </li>
              )}
              {errors.filter(
                (e) =>
                  !e.message.includes("already exists") &&
                  !e.message.includes("Duplicate") &&
                  !e.message.includes("Similar")
              ).length > 0 && (
                <li>
                  {
                    errors.filter(
                      (e) =>
                        !e.message.includes("already exists") &&
                        !e.message.includes("Duplicate") &&
                        !e.message.includes("Similar")
                    ).length
                  }{" "}
                  other validation error(s)
                </li>
              )}
            </ul>
            <p className="mt-2 text-xs">
              Please review and fix them before importing.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* Preview Table */}
      {professionals.length > 0 && (
        <div className="bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/[0.05] overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-white/[0.05] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Preview ({professionals.length} professionals)
            </h2>
            <div className="flex gap-2">
              <Button
                onClick={handleValidate}
                disabled={isValidating || isInserting}
                variant="outline"
                size="sm"
              >
                {isValidating ? "Validating..." : "Validate"}
              </Button>
              <Button
                onClick={handleInsert}
                disabled={
                  errors.length > 0 ||
                  isInserting ||
                  isValidating ||
                  professionals.length === 0
                }
                size="sm"
              >
                {isInserting ? "Importing..." : "Import Professionals"}
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
                    Image
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Full Name
                  </TableCell>

                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Headline
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Domain
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Location
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Address
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Available
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Validation
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {professionals.map((professional, index) => {
                  const rowErrors = getRowErrors(professional._rowIndex);
                  const hasErrors = hasRowErrors(professional._rowIndex);

                  return (
                    <TableRow
                      key={index}
                      className={
                        hasErrors ? "bg-red-50/50 dark:bg-red-500/5" : ""
                      }
                    >
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {professional._rowIndex}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {professional.image_url ? (
                          <img
                            src={professional.image_url}
                            alt={professional.full_name}
                            className="w-12 h-12 rounded-full"
                          />
                        ) : (
                          <span className="text-red-500">Missing</span>
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {professional.full_name || (
                            <span className="text-red-500">Missing</span>
                          )}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 max-w-xs truncate">
                        {professional.headline || (
                          <span className="text-red-500">Missing</span>
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {professional.domain_name || (
                          <span className="text-red-500">Missing</span>
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {professional.city
                          ? `${professional.city}`
                          : professional.city || "-"}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {professional.address || (
                          <span className="text-red-500">Missing</span>
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <Badge
                          color={
                            !professional.available
                              ? "error"
                              : ["true", "yes"].includes(
                                  professional.available.toLowerCase()
                                )
                              ? "success"
                              : "error"
                          }
                        >
                          {professional.available || "Missing"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        {rowErrors.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {rowErrors.map((error, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-red-600 dark:text-red-400">
                                  <span className="font-medium">
                                    {error.field}:
                                  </span>{" "}
                                  {error.message}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : errors.length > 0 ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 dark:text-green-400">
                              Valid
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            Not validated
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDeleteRow(professional._rowIndex)
                          }
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                          title="Delete this row"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
      {professionals.length === 0 && !file && (
        <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200 dark:border-blue-500/20 p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-3">
            File Format Requirements
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-300 mb-4">
            Upload either a CSV or JSON file with the following structure:
          </p>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>full_name</strong> - Professional's full name (required)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>headline</strong> - Professional title/headline
                (required)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>domain_name</strong> - Category name (required, must
                exist in database)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>address</strong> - Professional's address (required)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>available</strong> - "true", "false", "yes", or "no"
                (required)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>
                  email, bio, phone, website, linkedin_url, instagram_url, city,
                  country, image_url
                </strong>{" "}
                - Optional fields
              </span>
            </li>
          </ul>
          <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-900 dark:text-blue-300">
              <strong>Note:</strong> For JSON files, provide an array of
              objects. For CSV files, the first row should contain column
              headers.
            </p>
          </div>
        </div>
      )}

      {/* Missing Domains Dialog */}
      <Dialog open={showDomainDialog} onOpenChange={setShowDomainDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Missing Domains Detected</DialogTitle>
            <DialogDescription>
              The following domains were referenced but don't exist in the
              database. Would you like to create them?
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <ul className="space-y-2">
              {missingDomains.map((domain, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Badge variant="outline">{domain}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDomainDialog(false)}
              disabled={isCreatingDomains}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateDomainsAndRevalidate}
              disabled={isCreatingDomains}
            >
              {isCreatingDomains && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create & Re-validate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
