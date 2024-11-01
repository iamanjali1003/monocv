/**
 * Landing page - Home page with hero section and call-to-action.
 * Introduces the resume builder and directs users to template selection.
 */

import Link from "next/link";
import { ArrowRight, FileText, Zap, Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header, Footer } from "@/components/layout";

const features = [
  {
    icon: Zap,
    title: "Real-time Preview",
    description: "See your resume update instantly as you type",
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "Download your resume as a professional PDF",
  },
  {
    icon: Shield,
    title: "ATS-Friendly",
    description: "Optimized format that passes applicant tracking systems",
  },
  {
    icon: FileText,
    title: "Multiple Templates",
    description: "Choose from a variety of professional designs",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-16 sm:py-24 md:py-32">
          <div className="container">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Build Your Professional Resume
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl px-4">
                Create a stunning, ATS-friendly resume in minutes. Our intuitive
                builder helps you showcase your skills and experience effectively.
              </p>
              <div className="mt-8 sm:mt-10">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/templates">
                    Create Resume
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 sm:py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              Why Choose Our Resume Builder
            </h2>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center sm:text-left">
                  <CardContent className="p-4 sm:p-6 flex flex-col items-center sm:items-start">
                    <feature.icon className="size-8 sm:size-10 text-primary mb-3 sm:mb-4" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 sm:py-16 md:py-24 border-t">
          <div className="container">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md px-4">
                Join thousands of professionals who have created their resumes
                with our free builder.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/templates">
                  Start Building
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
