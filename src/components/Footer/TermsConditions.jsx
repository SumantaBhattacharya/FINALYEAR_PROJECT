"use client"

import { useState, forwardRef } from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva } from "class-variance-authority"

// Utility function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(" ")

// Icons
const ChevronDown = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const Menu = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)

const X = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

// Collapsible Components
const Collapsible = CollapsiblePrimitive.Root
const CollapsibleTrigger = CollapsiblePrimitive.Trigger
const CollapsibleContent = forwardRef(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content ref={ref} className={cn("overflow-hidden transition-all", className)} {...props}>
    {children}
  </CollapsiblePrimitive.Content>
))
CollapsibleContent.displayName = "CollapsibleContent"

// Button Component
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const Button = forwardRef(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

// Sheet Components
const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetPortal = SheetPrimitive.Portal
const SheetOverlay = forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
)

const SheetContent = forwardRef(({ side = "left", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

// Main Component
const TermsConditions = () => {
  const [activeSection, setActiveSection] = useState("introduction")

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "user-rights", title: "User Rights" },
    { id: "privacy-policy", title: "Privacy Policy" },
    { id: "disclaimer", title: "Disclaimer" },
  ]

  const handleNavClick = (id) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-gray-950 py-12 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Terms & Conditions</h1>
            <p className="text-lg text-gray-400">
              Please read these terms and conditions carefully before using our services.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="container mx-auto my-12 px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Navigation */}
          <div className="lg:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-between">
                  <span>Navigate to Section</span>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="mt-8 space-y-2 text-sm font-medium">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        handleNavClick(section.id)
                        document.querySelector("[data-radix-collection-item]")?.click()
                      }}
                      className={`block w-full text-left rounded-md px-3 py-2 ${
                        activeSection === section.id ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Sidebar Navigation */}
          <div className="hidden lg:block w-1/4">
            <nav className="sticky top-4 space-y-2 text-sm font-medium">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`block w-full text-left rounded-md px-3 py-2 ${
                    activeSection === section.id ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Collapsible Content Sections */}
            {sections.map((section) => (
              <Collapsible key={section.id} defaultOpen={activeSection === section.id}>
                <CollapsibleTrigger
                  id={section.id}
                  className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-200"
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.title}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${activeSection === section.id ? "rotate-180" : ""}`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-6 text-gray-700">
                  {section.id === "introduction" && (
                    <div className="space-y-4">
                      <p>
                        This Terms and Conditions document outlines the terms for using our website and services. By
                        accessing or using our website, you agree to comply with these terms.
                      </p>
                      <p>
                        These terms constitute a legally binding agreement between you and our company regarding your
                        use of the website and any services offered through it.
                      </p>
                    </div>
                  )}
                  {section.id === "user-rights" && (
                    <div className="space-y-4">
                      <p>
                        As a user of this website, you have the right to access and use our services according to the
                        terms outlined here. You also have the right to request information about how your data is being
                        used.
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Right to access your personal data</li>
                        <li>Right to request correction of inaccurate data</li>
                        <li>Right to request deletion of your data under certain circumstances</li>
                        <li>Right to restrict or object to processing of your data</li>
                      </ul>
                    </div>
                  )}
                  {section.id === "privacy-policy" && (
                    <div className="space-y-4">
                      <p>
                        We value your privacy and have implemented measures to protect your personal information. Our
                        privacy policy outlines how we collect, use, and store your data.
                      </p>
                      <p>
                        We collect information that you provide directly to us, information we collect automatically
                        when you use our services, and information we obtain from third-party sources.
                      </p>
                      <p>
                        We use cookies and similar tracking technologies to track activity on our website and hold
                        certain information. You can instruct your browser to refuse all cookies or to indicate when a
                        cookie is being sent.
                      </p>
                    </div>
                  )}
                  {section.id === "disclaimer" && (
                    <div className="space-y-4">
                      <p>
                        The content provided on this website is for informational purposes only. We do not guarantee the
                        accuracy of any information on this site, and we are not liable for any damages resulting from
                        the use of this content.
                      </p>
                      <p>
                        To the maximum extent permitted by applicable law, we exclude all representations, warranties,
                        and conditions relating to our website and the use of this website.
                      </p>
                      <p>
                        Nothing in this disclaimer will limit or exclude our liability for death or personal injury,
                        limit or exclude our liability for fraud or fraudulent misrepresentation, or limit any of our
                        liabilities in any way that is not permitted under applicable law.
                      </p>
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions
