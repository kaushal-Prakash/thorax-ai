// components/Footer.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full mt-16">
      <Card className="rounded-none shadow-none border-t bg-background/70 backdrop-blur-md">
        <CardContent className="py-12 px-6 md:px-16">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Branding */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight">Thorax AI</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-md">
                Breathing Life into Intelligence
              </p>
            </div>

            {/* Navigation Links in a row */}
            <div className="flex gap-6 text-sm font-medium">
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
