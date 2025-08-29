// components/Footer.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // newsletter input
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full mt-16">
      <Card className="rounded-none shadow-none border-t bg-background/70 backdrop-blur-md">
        <CardContent className="py-12 px-6 md:px-16">
          {/* Top Section */}
          <div className="grid gap-10 md:grid-cols-3 items-start">
            {/* Branding */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Thorax AI</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Thorax AI leverages advanced AI-powered analysis to solve
                critical real-world challenges, empowering innovation and
                progress.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-3 text-sm font-medium">
              <a href="/about" className="hover:text-primary transition-colors">
                About
              </a>
              <a href="/contact" className="hover:text-primary transition-colors">
                Contact
              </a>
              <a href="/blog" className="hover:text-primary transition-colors">
                Blog
              </a>
            </div>

            {/* Newsletter Signup */}
            <div>
              <p className="text-sm font-medium mb-2">Subscribe to our updates</p>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="text-sm"
                />
                <Button type="submit" className="shrink-0">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Separator */}
          <Separator className="my-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
            <p>© {new Date().getFullYear()} Thorax AI. All rights reserved.</p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Policies */}
            <div className="flex gap-5">
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </footer>
  );
};

export default Footer;
