import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  ChevronDown, 
  Mail, 
  MessageSquare, 
  Send, 
  Github, 
  Twitter, 
  Linkedin,
  Building,
  LifeBuoy,
  Terminal,
  Building2,
  Instagram
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

export default function Contact() {
  const form = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        setShowConfirmation(true);
        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    {
      icon: <Github className="h-4 w-4" />,
      href: "https://github.com/devmulkalwar",
      label: "GitHub"
    },
    {
      icon: <Linkedin className="h-4 w-4" />,
      href: "https://www.linkedin.com/in/dev-mulkalwar-b2745a258/",
      label: "LinkedIn"
    },
    {
      icon: <Instagram className="h-4 w-4" />,
      href: "https://www.instagram.com/dev_mulkalwar/",
      label: "Instagram"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-background py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full text-primary">
            <Terminal className="h-5 w-5" />
            <span className="text-sm font-medium">Contact Support</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our team is ready to help you with any questions about PseudoAPI
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
         
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  We typically respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name <span className="text-primary">*</span></Label>
                      <Input 
                        name="user_name"
                        placeholder="Your name" 
                        value={name}
                         required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email <span className="text-primary">*</span></Label>
                      <Input 
                        name="user_email"
                        type="email" 
                        placeholder="you@company.com" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Subject <span className="text-primary">*</span></Label>
                    <Select name="subject" required value={subject} onValueChange={setSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feedback">Product Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Message <span className="text-primary">*</span></Label>
                    <Textarea 
                      name="message"
                      placeholder="Describe your request in detail..." 
                      rows={6} 
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="gap-2" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

           {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Contact Options
                </CardTitle>
                <CardDescription>Choose your preferred method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Email Support</h3>
                      <p className="text-sm text-muted-foreground">devmulkalwar95@gmail.com</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Office</h3>
                      <a href='https://maps.app.goo.gl/u5uE7vArFP3va3S5A' target="_blank"
                          rel="noopener noreferrer"
                         className="h-auto p-0">
                        Visit Help Center
                      </a>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Follow Us</h3>
                  <div className="flex gap-2">
                    {socialLinks.map(({ icon, href, label }) => (
                      <Button
                        key={label}
                        variant="outline"
                        size="icon"
                        className="rounded-full hover:text-primary hover:border-primary transition-colors"
                        asChild
                      >
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                        >
                          {icon}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <Send className="h-6 w-6 text-primary" />
              <AlertDialogTitle>Message Sent Successfully</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-2">
              Thank you for contacting us! We'll respond to your inquiry within 24 hours.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue Browsing</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}