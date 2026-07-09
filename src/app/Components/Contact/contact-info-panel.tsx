"use client";

import { MapPin, Clock, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";

const infoItems = [
  {
    icon: MapPin,
    title: "Based in",
    value: "Bulacan, Philippines",
  },
  {
    icon: Mail,
    title: "Email",
    value: "francogregorio2004@gmail.com",
    href: "mailto:francogregorio2004@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+63 912 345 6789",
  },
  {
    icon: Clock,
    title: "Response time",
    value: "Within 24 hours",
  },


] as const;

export function ContactInfoMobile() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
      {infoItems.map((item, index) => (
        <div
          key={item.title}
          className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3"
          data-aos="fade-up"
          data-aos-delay={index * 75}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <item.icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {item.title}
            </p>
            <p className="text-sm font-medium leading-snug break-words">
              {"href" in item && item.href ? (
                <a
                  href={item.href}
                  className="transition-colors hover:text-primary"
                >
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
}

export function ContactInfoPanel() {
  return (
    <div
      className="relative hidden min-h-full overflow-hidden md:flex md:flex-col md:justify-between"
      data-aos="fade-left"
      data-aos-delay="200"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-muted/40 to-background dark:from-primary/15 dark:via-muted/20 dark:to-card" />
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for new projects
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-6 text-2xl font-bold tracking-tight lg:text-3xl"
          >
            Let&apos;s build something{" "}
            <span className="gradient-text">great together</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground text-justify md:text-left"
          >
            Whether you have a project in mind, need a developer for your team, or simply want to connect—I&apos;d love to hear from you.
          </motion.p>

          <div className="mt-8 space-y-3">
            {infoItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.06 }}
                className="group flex items-center gap-4 rounded-xl border border-border/60 bg-background/60 p-4 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-background/80 dark:bg-background/30 dark:hover:bg-background/40"
                data-aos="fade-up"
                data-aos-delay={150 + index * 75}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.title}
                  </p>
                  <p className="text-sm font-medium">
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        className="transition-colors hover:text-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
