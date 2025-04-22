import Link from "next/link"
import { ArrowRight, BarChart3, FileSpreadsheet, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <Logo />
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/services" className="text-gray-700 hover:text-fsw-blue font-medium">
              Services
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-fsw-blue font-medium">
              Products
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-fsw-blue font-medium">
              Resources
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-fsw-blue font-medium">
              About Us
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button className="bg-fsw-yellow hover:bg-fsw-yellow-dark text-black">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-fsw-blue/80 z-10"></div>
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Food background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-20 px-4 md:px-6 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Share Food Knowledge,
              <br />
              Make Healthy Choices
            </h1>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl">
              Join our community to share and discover detailed food information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-fsw-yellow hover:bg-fsw-yellow-dark text-black px-8">
                  Share Your Food <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="bg-white text-fsw-blue hover:bg-gray-100 px-8">
                  Explore Foods
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-fsw-yellow py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-white">1,200+</h2>
              <p className="text-lg text-white">Ingredients Cataloged</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-white">500+</h2>
              <p className="text-lg text-white">Active Users</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-white">10M+</h2>
              <p className="text-lg text-white">API Requests Monthly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-fsw-blue">
              Our <span className="text-fsw-yellow">Services</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Our platform provides comprehensive nutritional data and ingredient analysis for food safety professionals
              and health-conscious individuals.
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 bg-fsw-blue/10 flex items-center justify-center rounded-lg border border-fsw-blue/20 mb-4">
                <FileSpreadsheet className="h-10 w-10 text-fsw-blue" />
              </div>
              <h3 className="text-xl font-bold text-fsw-blue">Detailed Nutrition Data</h3>
              <p className="text-gray-500">
                Access comprehensive nutritional information including macros, amino acids, vitamins, and minerals.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 bg-fsw-yellow/10 flex items-center justify-center rounded-lg border border-fsw-yellow/20 mb-4">
                <BarChart3 className="h-10 w-10 text-fsw-yellow" />
              </div>
              <h3 className="text-xl font-bold text-fsw-blue">API Integration</h3>
              <p className="text-gray-500">
                Integrate our food data into your applications with our easy-to-use API and token-based system.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 bg-fsw-green/10 flex items-center justify-center rounded-lg border border-fsw-green/20 mb-4">
                <ShieldCheck className="h-10 w-10 text-fsw-green" />
              </div>
              <h3 className="text-xl font-bold text-fsw-blue">Data Management</h3>
              <p className="text-gray-500">
                Upload and manage ingredient data with our intuitive Excel upload system and user management tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo className="text-white mb-4" />
              <p className="text-gray-300">
                Comprehensive food data management for food safety professionals and health-conscious individuals.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-gray-300 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-300 hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="text-gray-300 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-gray-300 hover:text-white">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-300 hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-300">Email: info@foodpandora.com</li>
                <li className="text-gray-300">Phone: +1 (555) 123-4567</li>
                <li className="text-gray-300">Address: 123 Food St, Nutrition City</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>© 2025 Food Pandora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
