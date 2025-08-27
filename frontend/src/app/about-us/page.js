"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Zap,
  Globe,
  Lock,
  BarChart3,
  Code2,
  Database,
  Cpu,
  Terminal,
  GitBranch,
  Sun,
  Moon,
} from "lucide-react";

export default function AboutPage() {
  // const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //   if (localStorage.getItem("theme")) {
  //     setTheme(localStorage.getItem("theme"));
  //     document.documentElement.classList.toggle(
  //       "dark",
  //       localStorage.getItem("theme") === "dark"
  //     );
  //   }
  // }, []);

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);
  //   document.documentElement.classList.toggle("dark", newTheme === "dark");
  // };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 dark:bg-gray-950 dark:text-gray-100 min-h-screen">
      {/* Theme Toggle
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
      </div> */}

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">⚡ Thorax AI</h1>
        <p className="text-lg text-muted-foreground dark:text-gray-300">
          Thorax AI is an intelligent system designed to leverage{" "}
          <b>AI-powered analysis</b> for solving critical real-world challenges.
          Built with a modern <b>MERN stack frontend</b> and a{" "}
          <b>FastAPI backend</b>, Thorax AI is scalable, modular, and
          production-ready.
        </p>
      </div>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">🌟 Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-md dark:bg-gray-900">
            <CardContent className="flex items-center gap-4 p-6">
              <Bot className="w-6 h-6 text-primary" />
              <span>AI-driven insights</span>
            </CardContent>
          </Card>
          <Card className="shadow-md dark:bg-gray-900">
            <CardContent className="flex items-center gap-4 p-6">
              <Zap className="w-6 h-6 text-primary" />
              <span>FastAPI backend</span>
            </CardContent>
          </Card>
          <Card className="shadow-md dark:bg-gray-900">
            <CardContent className="flex items-center gap-4 p-6">
              <Globe className="w-6 h-6 text-primary" />
              <span>MERN stack frontend</span>
            </CardContent>
          </Card>
          <Card className="shadow-md dark:bg-gray-900">
            <CardContent className="flex items-center gap-4 p-6">
              <Lock className="w-6 h-6 text-primary" />
              <span>Authentication & RBAC</span>
            </CardContent>
          </Card>
          <Card className="shadow-md dark:bg-gray-900">
            <CardContent className="flex items-center gap-4 p-6">
              <BarChart3 className="w-6 h-6 text-primary" />
              <span>Data visualization</span>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">🛠️ Tech Stack</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="dark:bg-gray-900">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Code2 className="w-5 h-5" /> Frontend
              </h3>
              <ul className="list-disc list-inside text-muted-foreground dark:text-gray-300">
                <li>Next.js</li>
                <li>Tailwind CSS / SCSS</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-900">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Cpu className="w-5 h-5" /> Backend
              </h3>
              <ul className="list-disc list-inside text-muted-foreground dark:text-gray-300">
                <li>FastAPI</li>
                <li>Python (ML/AI models)</li>
                <li>Node.js</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-900">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Database className="w-5 h-5" /> Database
              </h3>
              <ul className="list-disc list-inside text-muted-foreground dark:text-gray-300">
                <li>MongoDB (NoSQL)</li>
                <li>Mongoose ORM</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* System Requirements */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">⚙️ System Requirements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="dark:bg-gray-900">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold">Hardware</h3>
              <ul className="list-disc list-inside text-muted-foreground dark:text-gray-300">
                <li>Processor: Intel i3 or higher</li>
                <li>Memory: 8 GB RAM minimum</li>
                <li>Storage: 20 GB free disk space</li>
                <li>GPU (optional, for AI acceleration)</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-900">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold">Software</h3>
              <ul className="list-disc list-inside text-muted-foreground dark:text-gray-300">
                <li>Node.js (v18 or later)</li>
                <li>Python (3.10 or later)</li>
                <li>MongoDB (v6 or later)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Getting Started */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">🚀 Getting Started</h2>
        <Card className="dark:bg-gray-900">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Terminal className="w-5 h-5" /> Clone the Repository
            </h3>
            <pre className="bg-muted dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
              <code>
{`git clone https://github.com/kaushal-Prakash/thorax-ai
cd thorax-ai`}
              </code>
            </pre>
            <Button className="mt-2" asChild>
              <a
                href="https://github.com/kaushal-Prakash/thorax-ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitBranch className="w-4 h-4 mr-2" /> View on GitHub
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
