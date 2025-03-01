import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | WeddingSnap",
  description:
    "Get in touch with the WeddingSnap team for support or inquiries.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-6 text-balance">
            Have questions about WeddingSnap or need assistance with your
            wedding album? We're here to help! Fill out the form below, and
            we'll get back to you as soon as possible.
          </p>
          <form className="flex flex-col gap-4">
            <Input type="text" placeholder="Your Name" />
            <Input type="email" placeholder="Your Email" />
            <Input type="text" placeholder="Subject" />
            <Textarea placeholder="Your Message" rows={5} />
            <Button type="submit" className="w-full md:w-auto">
              Send Message
            </Button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Mail className="size-5" />
              <span>support@weddingsnap.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="size-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-5" />
              <span>123 Wedding Lane, Photo City, PC 12345</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
            <p>Monday - Friday: 9:00 AM - 5:00 PM (EST)</p>
            <p>Saturday - Sunday: Closed</p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4">
              {/* Add your social media icons/links here */}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="mb-4 text-balance">
          For quick answers to common questions, check out our FAQ page.
        </p>
        <Button asChild variant="outline">
          <a href="/faq">Visit FAQ</a>
        </Button>
      </div>
    </div>
  );
}
