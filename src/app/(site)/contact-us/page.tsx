"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Mail, Phone, MapPin, Clock, CircleCheck } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    await fetch("/api/resend/contact_form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setIsSending(false);
    setMessageSent(true);
  };

  return (
    <main className="bg-neutral-100 text-neutral-800 my-20 md:my-44 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="tracking-tighter font-extrabold text-[3rem] sm:text-[4rem] mb-5">
          Contact Us
        </h1>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-xl font-medium mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-neutral-400" />
                <p>+61 2 1234 5678</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-neutral-400" />
                <p>contact@dymone.com.au</p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-neutral-400" />
                <p>
                  123 Collins Street
                  <br />
                  Melbourne, VIC 3000
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-neutral-400" />
                <p>
                  Mon - Fri: 9:00 AM - 6:00 PM
                  <br />
                  Sat: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            {messageSent ? (
              <div className="h-full flex flex-col items-center justify-center gap-10">
                <h2 className="text-center font-medium">
                  Message sent successfully
                </h2>
                <CircleCheck
                  size={64}
                  color="#33cc33"
                  strokeWidth={1.5}
                  className="mx-auto"
                />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-medium mb-6">Send a Message</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSending}
                    className={`${isSending ? "hover:cursor-auto bg-neutral-500" : "hover:bg-neutral-800 bg-black"} w-full text-white py-3 rounded-lg transition-colors`}>
                    {isSending ? <LoadingSpinner size="sm" /> : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-[400px] bg-white rounded-xl shadow-sm overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345256!2d144.96766!3d-37.813611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b8c21cb649%3A0x1c045678462e0!2sCollins%20St%2C%20Melbourne%20VIC%203000!5e0!3m2!1sen!2sau!4v1645451234567!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
}
