import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import text from "./text.json";

export const metadata: Metadata = {
  title: "Contact Us | Memora",
  description: "Get in touch with the Memora team for support or inquiries.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-4xl font-bold mb-8 text-center">{text.pt.title}</h1>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {text.pt.get_in_touch.title}
          </h2>
          <p className="mb-6 text-balance">
            {text.pt.get_in_touch.description}
          </p>
          <form className="flex flex-col gap-4">
            <Input type="text" placeholder={text.pt.form.name_placeholder} />
            <Input type="email" placeholder={text.pt.form.email_placeholder} />
            <Input type="text" placeholder={text.pt.form.subject_placeholder} />
            <Textarea placeholder={text.pt.form.message_placeholder} rows={5} />
            <Button type="submit" className="w-full md:w-auto">
              {text.pt.form.send_message}
            </Button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {text.pt.contact_information.title}
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Mail className="size-5" />
              <span>{text.pt.contact_information.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="size-5" />
              <span>{text.pt.contact_information.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-5" />
              <span>{text.pt.contact_information.address}</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">
              {text.pt.contact_information.office_hours.title}
            </h3>
            {text.pt.contact_information.office_hours.hours.map(
              (hour, index) => (
                <p key={index}>{hour}</p>
              )
            )}
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">
              {text.pt.contact_information.follow_us.title}
            </h3>
            <div className="flex gap-4">
              {/* Add your social media icons/links here */}
              {text.pt.contact_information.follow_us.social_media}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">{text.pt.faq.title}</h2>
        <p className="mb-4 text-balance">{text.pt.faq.description}</p>
        <Button asChild variant="outline">
          <a href="/faq">{text.pt.faq.visit_faq}</a>
        </Button>
      </div>
    </div>
  );
}
