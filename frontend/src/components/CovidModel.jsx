"use client";
import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Download,
  XCircle,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const CovidModel = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [processedImage, setProcessedImage] = useState("");

  const onDrop = (acceptedFiles) => {
    setError("");
    setResults(null);
    setProcessedImage("");

    if (acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];

    // Check if file is an image
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
  });

  const analyzeImage = async () => {
    if (!file) return;

    setIsLoading(true);
    setProgress(0);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate progress for demo
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      // Replace with your actual API endpoint
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/analyze/covid`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.");
      }

      const data = await response.json();
      setResults(data);

      // If the response includes a processed image
      if (data.processed_image) {
        setProcessedImage(data.processed_image);
      }

      // Simulate processed image for demo if not available
      if (!data.processed_image && previewUrl) {
        setProcessedImage(previewUrl);
      }
    } catch (err) {
      setError(err.message || "An error occurred during analysis");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!results) return;

    // In a real implementation, this would generate or fetch a PDF
    // For demo purposes, we'll create a simple download link
    const pdfContent = JSON.stringify(results, null, 2);
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `covid-analysis-${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetAnalysis = () => {
    setFile(null);
    setPreviewUrl("");
    setResults(null);
    setError("");
    setProcessedImage("");
    setProgress(0);
  };

  const getStatusIcon = () => {
    if (!results) return null;

    switch (results.case) {
      case "covid":
        return <XCircle className="h-6 w-6 text-red-500" />;
      case "viral":
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case "normal":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    if (!results) return "";

    switch (results.case) {
      case "covid":
        return "bg-red-100 text-red-800";
      case "viral":
        return "bg-yellow-100 text-yellow-800";
      case "normal":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            COVID-19 X-Ray Analysis
          </CardTitle>
          <CardDescription>
            Upload a chest X-ray image to analyze for COVID-19, viral pneumonia,
            or normal lungs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed border-blue-500 rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag and drop an X-ray image, or click to select"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports JPG, JPEG, PNG
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {isLoading ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="font-medium">Analyzing X-ray image...</p>
                    <p className="text-sm text-gray-500">
                      This may take a few moments
                    </p>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              ) : results ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon()}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
                      >
                        {results.case.toUpperCase()}
                      </span>
                    </div>
                    <Button onClick={downloadPDF}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF Report
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Original X-Ray</h3>
                      <img
                        src={previewUrl}
                        alt="Original X-ray"
                        className="rounded-md border w-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Processed Image</h3>
                      <img
                        src={processedImage || previewUrl}
                        alt="Processed X-ray"
                        className="rounded-md border w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Analysis Results</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Confidence Level</p>
                        <Progress
                          value={results.confidence * 100}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500">
                          {Math.round(results.confidence * 100)}%
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          Probability Distribution
                        </p>
                        <div className="flex space-x-2">
                          <Badge
                            variant={
                              results.case === "covid" ? "default" : "secondary"
                            }
                            className="flex-1"
                          >
                            COVID:{" "}
                            {Math.round(
                              results.probabilities?.covid * 100 || 0
                            )}
                            %
                          </Badge>
                          <Badge
                            variant={
                              results.case === "viral" ? "default" : "secondary"
                            }
                            className="flex-1"
                          >
                            Viral:{" "}
                            {Math.round(
                              results.probabilities?.viral * 100 || 0
                            )}
                            %
                          </Badge>
                          <Badge
                            variant={
                              results.case === "normal"
                                ? "default"
                                : "secondary"
                            }
                            className="flex-1"
                          >
                            Normal:{" "}
                            {Math.round(
                              results.probabilities?.normal * 100 || 0
                            )}
                            %
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {results.notes && (
                      <div>
                        <p className="text-sm font-medium mb-2">
                          Additional Notes
                        </p>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                          {results.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={resetAnalysis}
                    className="w-full"
                  >
                    Analyze Another Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="rounded-md border max-h-64"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button onClick={analyzeImage} className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Analyze Image
                    </Button>
                    <Button variant="outline" onClick={resetAnalysis}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CovidModel;
