"use client"

import type React from "react"

import { useState } from "react"
import { FileSpreadsheet, Upload, X, Check, AlertCircle, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function AdminExcelUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("preview")
  const [previewData, setPreviewData] = useState<any[] | null>(null)
  const [validationResults, setValidationResults] = useState<{
    valid: boolean
    errors: string[]
    warnings: string[]
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setUploadSuccess(false)
    setUploadProgress(0)
    setValidationResults(null)

    // In a real app, you would parse the Excel file here
    // For demo purposes, we'll simulate preview data
    if (selectedFile) {
      // Simulate file validation
      setTimeout(() => {
        // Mock validation results
        setValidationResults({
          valid: true,
          errors: [],
          warnings: ["Some amino acid values are missing for BARLEY", "CABBAGE has incomplete vitamin data"],
        })

        // Mock preview data based on the sample provided
        setPreviewData([
          {
            id: "22365",
            name: "BAJRA",
            source: "Internal testing",
            allergen: "None",
            type: "Veg",
            glycemicIndex: 45,
            moisture: 12.4,
            protein: 11.6,
            fat: 5.0,
            fibre: 2.3,
            carbohydrate: 67.5,
            energy: 361.0,
            minerals: {
              calcium: 42.0,
              phosphorous: 296.0,
              iron: 8.0,
            },
            vitamins: {
              carotene: 132.0,
              thiamine: 0.33,
              riboflavin: 0.25,
              niacin: 2.3,
              folicAcid: {
                free: 14.7,
                total: 45.5,
              },
            },
          },
          {
            id: "86575",
            name: "BARLEY",
            source: "USFDA",
            allergen: "None",
            type: "Veg",
            glycemicIndex: 54,
            moisture: 12.5,
            protein: 11.5,
            fat: 1.3,
            fibre: 1.2,
            carbohydrate: 69.6,
            energy: 336.0,
            minerals: {
              calcium: 26.0,
              phosphorous: 215.0,
              iron: 1.67,
            },
            vitamins: {
              carotene: 10.0,
              thiamine: 0.47,
              riboflavin: 0.2,
              niacin: 5.4,
            },
          },
          {
            id: "65758",
            name: "COW PEA",
            source: "NIN",
            allergen: "None",
            type: "Veg",
            glycemicIndex: 55,
            moisture: 13.4,
            protein: 24.1,
            fat: 1.0,
            fibre: 3.8,
            carbohydrate: 54.5,
            energy: 323.0,
            minerals: {
              calcium: 77.0,
              phosphorous: 414.0,
              iron: 8.6,
            },
            vitamins: {
              carotene: 12.0,
              thiamine: 0.51,
              riboflavin: 0.2,
              niacin: 1.3,
              folicAcid: {
                free: 69.0,
                total: 133.0,
              },
            },
          },
          {
            id: "65758",
            name: "FIELD BEAN (dry)",
            source: "NIN",
            allergen: "None",
            type: "Veg",
            glycemicIndex: 66,
            moisture: 9.6,
            protein: 24.9,
            fat: 0.8,
            fibre: 1.4,
            carbohydrate: 60.1,
            energy: 347.0,
            minerals: {
              calcium: 60.0,
              phosphorous: 433.0,
              iron: 2.7,
            },
            vitamins: {
              thiamine: 0.52,
              riboflavin: 0.16,
              niacin: 1.8,
            },
          },
          {
            id: "76859",
            name: "BRUSSELS SPROUTS",
            source: "USFDA",
            allergen: "None",
            type: "Veg",
            glycemicIndex: 44,
            moisture: 85.5,
            protein: 4.7,
            fat: 0.5,
            fibre: 1.2,
            carbohydrate: 7.1,
            energy: 52.0,
            minerals: {
              calcium: 43.0,
              phosphorous: 82.0,
              iron: 1.8,
            },
            vitamins: {
              carotene: 126.0,
              thiamine: 0.05,
              riboflavin: 0.16,
              niacin: 0.4,
              folicAcid: {
                free: 13.3,
                total: 23.0,
              },
              vitaminC: 124.0,
            },
          },
          {
            id: "65758",
            name: "CABBAGE",
            source: "Internal testing",
            allergen: "None",
            type: "Veg",
            glycemicIndex: 66,
            moisture: 91.9,
            protein: 1.8,
            fat: 0.1,
            fibre: 1.0,
            carbohydrate: 4.6,
            energy: 27.0,
            minerals: {
              calcium: 39.0,
              phosphorous: 44.0,
              iron: 0.8,
            },
            vitamins: {
              carotene: 120.0,
              thiamine: 0.06,
              riboflavin: 0.09,
              niacin: 0.4,
              vitaminC: 124.0,
            },
          },
        ])
      }, 500)
    } else {
      setPreviewData(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 300)

      // In a real app, this would be an API call to upload the file
      await new Promise((resolve) => setTimeout(resolve, 3000))

      clearInterval(interval)
      setUploadProgress(100)
      setUploadSuccess(true)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleClearFile = () => {
    setFile(null)
    setPreviewData(null)
    setUploadSuccess(false)
    setUploadProgress(0)
    setValidationResults(null)
  }

  return (
    <div className="space-y-6">
      <Card className="border-fsw-blue/20">
        <CardHeader className="border-b border-fsw-blue/10">
          <CardTitle className="text-fsw-blue">Upload Ingredient Data</CardTitle>
          <CardDescription>
            Upload an Excel file with ingredient data. The file should include columns for ingredient name, macros,
            amino acids profile, vitamins, and minerals.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="excel-file">Excel File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="excel-file"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className={file ? "hidden" : "border-fsw-blue/20 focus-visible:ring-fsw-blue"}
              />
              {file && (
                <div className="flex w-full items-center gap-2 rounded-md border border-fsw-blue/20 px-3 py-2">
                  <FileSpreadsheet className="h-5 w-5 text-fsw-blue" />
                  <span className="flex-1 truncate">{file.name}</span>
                  <Button variant="ghost" size="icon" onClick={handleClearFile} disabled={isUploading}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {validationResults && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">File Validation</h3>
                {validationResults.valid ? (
                  <Badge className="bg-fsw-green">Valid</Badge>
                ) : (
                  <Badge variant="destructive">Invalid</Badge>
                )}
              </div>

              {validationResults.errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Errors</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {validationResults.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {validationResults.warnings.length > 0 && (
                <Alert className="bg-fsw-yellow/10 border-fsw-yellow text-fsw-yellow-dark">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Warnings</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {validationResults.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {previewData && (
            <div className="space-y-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">File Preview</h3>
                  <TabsList className="bg-fsw-blue/10">
                    <TabsTrigger
                      value="preview"
                      className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white"
                    >
                      Basic Info
                    </TabsTrigger>
                    <TabsTrigger
                      value="macros"
                      className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white"
                    >
                      Macros
                    </TabsTrigger>
                    <TabsTrigger
                      value="minerals"
                      className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white"
                    >
                      Minerals
                    </TabsTrigger>
                    <TabsTrigger
                      value="vitamins"
                      className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white"
                    >
                      Vitamins
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="preview" className="mt-4">
                  <div className="rounded-md border border-fsw-blue/20">
                    <Table>
                      <TableHeader className="bg-fsw-blue/5">
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Allergen</TableHead>
                          <TableHead>GI</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewData.map((row) => (
                          <TableRow key={`${row.id}-${row.name}`}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            <TableCell>{row.source}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-fsw-green/10 text-fsw-green border-fsw-green/20">
                                {row.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{row.allergen || "None"}</TableCell>
                            <TableCell>{row.glycemicIndex}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="macros" className="mt-4">
                  <div className="rounded-md border border-fsw-blue/20">
                    <Table>
                      <TableHeader className="bg-fsw-blue/5">
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Moisture (g)</TableHead>
                          <TableHead>Protein (g)</TableHead>
                          <TableHead>Fat (g)</TableHead>
                          <TableHead>Fibre (g)</TableHead>
                          <TableHead>Carbs (g)</TableHead>
                          <TableHead>Energy (kcal)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewData.map((row) => (
                          <TableRow key={`${row.id}-${row.name}-macros`}>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            <TableCell>{row.moisture.toFixed(2)}</TableCell>
                            <TableCell>{row.protein.toFixed(2)}</TableCell>
                            <TableCell>{row.fat.toFixed(2)}</TableCell>
                            <TableCell>{row.fibre.toFixed(2)}</TableCell>
                            <TableCell>{row.carbohydrate.toFixed(2)}</TableCell>
                            <TableCell>{row.energy.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="minerals" className="mt-4">
                  <div className="rounded-md border border-fsw-blue/20">
                    <Table>
                      <TableHeader className="bg-fsw-blue/5">
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Calcium (mg)</TableHead>
                          <TableHead>Phosphorous (mg)</TableHead>
                          <TableHead>Iron (mg)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewData.map((row) => (
                          <TableRow key={`${row.id}-${row.name}-minerals`}>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            <TableCell>{row.minerals.calcium.toFixed(2)}</TableCell>
                            <TableCell>{row.minerals.phosphorous.toFixed(2)}</TableCell>
                            <TableCell>{row.minerals.iron.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="vitamins" className="mt-4">
                  <div className="rounded-md border border-fsw-blue/20">
                    <Table>
                      <TableHeader className="bg-fsw-blue/5">
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Carotene (mg)</TableHead>
                          <TableHead>Thiamine (mg)</TableHead>
                          <TableHead>Riboflavin (mg)</TableHead>
                          <TableHead>Niacin (mg)</TableHead>
                          <TableHead>Vitamin C (mg)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewData.map((row) => (
                          <TableRow key={`${row.id}-${row.name}-vitamins`}>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            <TableCell>{row.vitamins.carotene?.toFixed(2) || "-"}</TableCell>
                            <TableCell>{row.vitamins.thiamine?.toFixed(2) || "-"}</TableCell>
                            <TableCell>{row.vitamins.riboflavin?.toFixed(2) || "-"}</TableCell>
                            <TableCell>{row.vitamins.niacin?.toFixed(2) || "-"}</TableCell>
                            <TableCell>{row.vitamins.vitaminC?.toFixed(2) || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
              <p className="text-xs text-gray-500">
                Showing {previewData.length} of {file?.name ? "156" : "0"} rows
              </p>
            </div>
          )}

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2 bg-fsw-blue/20" indicatorClassName="bg-fsw-blue" />
            </div>
          )}

          {uploadSuccess && (
            <Alert className="bg-fsw-green/10 border-fsw-green">
              <Check className="h-4 w-4 text-fsw-green" />
              <AlertTitle className="text-fsw-green">Upload Successful</AlertTitle>
              <AlertDescription className="text-fsw-green-dark">
                Your ingredient data has been successfully uploaded and processed. 156 ingredients were added to the
                database.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="border-t border-fsw-blue/10 pt-4">
          <Button
            onClick={handleUpload}
            disabled={!file || isUploading || uploadSuccess || (validationResults && !validationResults.valid)}
            className="flex items-center gap-2 bg-fsw-yellow hover:bg-fsw-yellow-dark text-black"
          >
            {isUploading ? "Uploading..." : "Upload File"}
            {!isUploading && <Upload className="h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-fsw-blue/20">
        <CardHeader className="border-b border-fsw-blue/10">
          <CardTitle className="text-fsw-blue">Upload Requirements</CardTitle>
          <CardDescription>Make sure your Excel file meets these requirements</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-fsw-blue">Required Columns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-fsw-blue">Basic Information</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
                    <li>Product ID (unique identifier)</li>
                    <li>Name of the food article (text)</li>
                    <li>Source (text)</li>
                    <li>Allergen (text)</li>
                    <li>Type of food (Veg/Vegan/Non-veg)</li>
                    <li>Glycemic index (numeric)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-fsw-blue">Macronutrients</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
                    <li>Moisture (g per 100g)</li>
                    <li>Protein (g per 100g)</li>
                    <li>Fat (g per 100g)</li>
                    <li>Fibre (g per 100g)</li>
                    <li>Carbohydrate (g per 100g)</li>
                    <li>Energy (kcal)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-fsw-blue">Optional Detailed Nutrient Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-fsw-yellow">Amino Acids</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
                    <li>Histidine (mg)</li>
                    <li>Isoleucine (mg)</li>
                    <li>Leucine (mg)</li>
                    <li>Lysine (mg)</li>
                    <li>Methionine (mg)</li>
                    <li>And others...</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-fsw-yellow">Fats Breakdown</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
                    <li>Saturated fats (g)</li>
                    <li>Monounsaturated fats (g)</li>
                    <li>Polyunsaturated fats (g)</li>
                    <li>Trans fats (g)</li>
                    <li>Cholesterol (g)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-fsw-green">Minerals & Vitamins</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
                    <li>Sodium, Calcium, Iron, etc. (mg)</li>
                    <li>Carotene, Thiamine, Riboflavin, etc. (mg)</li>
                    <li>Vitamin C (mg)</li>
                    <li>Folic Acid (Free & Total) (mg)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-fsw-blue">File Format</h3>
              <p className="text-sm text-gray-500">
                Excel files (.xlsx or .xls) or CSV files with a maximum size of 10MB. The first row should contain
                column headers exactly as specified in the template.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Button variant="outline" size="sm" className="text-fsw-blue border-fsw-blue/20 hover:bg-fsw-blue/10">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
                <Button variant="outline" size="sm" className="text-fsw-blue border-fsw-blue/20 hover:bg-fsw-blue/10">
                  <Info className="mr-2 h-4 w-4" />
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
