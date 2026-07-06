import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ContactForm } from './contact-data'
import { ContactInfoPanel, ContactInfoMobile } from './contact-info-panel'
import { useState, useEffect } from 'react'
import { Mail, MessageSquare, Send, User } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const fieldClassName =
    'h-11 rounded-xl border-border/60 bg-muted/30 px-3 pl-10 transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary/50 focus-visible:bg-background focus-visible:ring-primary/20 dark:bg-muted/20'

function FormSkeleton() {
    return (
        <div className="flex flex-col gap-6 p-6 md:p-8 lg:p-10">
            <div className="space-y-2">
                <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
            </div>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-11 animate-pulse rounded-xl bg-muted" />
                ))}
            </div>
            <div className="h-11 animate-pulse rounded-xl bg-muted" />
        </div>
    )
}

export function ContactLayouts({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [message, setMessage] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertTitle, setAlertTitle] = useState<string>("");
    const [alertDescription, setAlertDescription] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const SubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isClient) return;

        setIsSubmitting(true);

        try {
            await ContactForm(name, email, message);
            setAlertTitle("Success!");
            setAlertDescription("Your message has been sent successfully. I'll get back to you soon!");
            setShowAlert(true);
            setEmail("")
            setName("")
            setMessage("")
        } catch {
            setAlertTitle("Error");
            setAlertDescription("Failed to send your message. Please try again later.");
            setShowAlert(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <ContactInfoMobile />
            <Card className="overflow-hidden border-border/60 bg-card/80 py-0 shadow-lg backdrop-blur-sm">
                <CardContent className="grid p-0 md:grid-cols-2">
                    {!isClient ? (
                        <FormSkeleton />
                    ) : (
                        <form onSubmit={SubmitData} className="p-6 md:p-8 lg:p-10">
                            <div className="flex flex-col gap-6">
                                <div className="space-y-2">
                                    <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                                        Get in touch
                                    </span>
                                    <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
                                        Contact <span className="gradient-text">Me</span>
                                    </h1>
                                    <p className="text-sm leading-relaxed text-muted-foreground text-justify md:text-left">
                                        Have a question or a project idea? Drop a message and I&apos;ll get back to you.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="text-sm font-medium">
                                            Name
                                        </Label>
                                        <div className="relative">
                                            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Your name"
                                                onChange={e => setName(e.target.value)}
                                                value={name}
                                                required
                                                disabled={isSubmitting}
                                                className={fieldClassName}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </Label>
                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                                disabled={isSubmitting}
                                                className={fieldClassName}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="message" className="text-sm font-medium">
                                            Message
                                        </Label>
                                        <div className="relative">
                                            <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Textarea
                                                id="message"
                                                placeholder="Tell me about your project or question..."
                                                onChange={e => setMessage(e.target.value)}
                                                value={message}
                                                required
                                                disabled={isSubmitting}
                                                className="min-h-[120px] resize-none rounded-xl border-border/60 bg-muted/30 py-3 pl-10 transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary/50 focus-visible:bg-background focus-visible:ring-primary/20 dark:bg-muted/20"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="group h-11 w-full rounded-xl text-sm font-medium shadow-sm transition-all hover:shadow-md"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}

                    <ContactInfoPanel />
                </CardContent>
            </Card>

            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {alertDescription}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
