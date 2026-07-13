"use client";

import { MapPin, Clock, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const infoItemHoverDelays = [0.1, 0.15, 0.2, 0.25] as const;

const infoItemCardClassName =
  "group flex items-center rounded-xl border border-border bg-background shadow-sm";

const infoItemIconClassName =
  "flex shrink-0 items-center justify-center rounded-lg bg-accent text-primary";

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

function InfoItemCard({
  item,
  index,
  className,
}: {
  item: (typeof infoItems)[number];
  index: number;
  className?: string;
}) {
  const hoverDelay = infoItemHoverDelays[index];

  return (
    <motion.div
      className={cn(infoItemCardClassName, className)}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{
        y: -2,
        borderColor: "var(--primary)",
        backgroundColor: "var(--card)",
        transition: { duration: 0.35, delay: hoverDelay, ease: "easeOut" },
      }}
      data-aos="fade-up"
      data-aos-delay={index * 75}
    >
      <motion.div
        className={cn(infoItemIconClassName, className?.includes("gap-4") ? "h-10 w-10" : "h-9 w-9")}
        whileHover={{
          scale: 1.08,
          backgroundColor: "var(--secondary)",
          transition: { duration: 0.35, delay: hoverDelay + 0.05, ease: "easeOut" },
        }}
      >
        <item.icon className="h-4 w-4" />
      </motion.div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {item.title}
        </p>
        <p className="text-sm font-medium leading-snug break-words">
          {"href" in item && item.href ? (
            <motion.a
              href={item.href}
              className="inline-block"
              whileHover={{
                color: "var(--primary)",
                x: 2,
                transition: { duration: 0.35, delay: hoverDelay + 0.08, ease: "easeOut" },
              }}
            >
              {item.value}
            </motion.a>
          ) : (
            item.value
          )}
        </p>
      </div>
    </motion.div>
  );
}

export function ContactInfoMobile() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
      {infoItems.map((item, index) => (
        <InfoItemCard
          key={item.title}
          item={item}
          index={index}
          className="gap-3 bg-muted p-3"
        />
      ))}
    </div>
  );
}

export function ContactInfoPanel() {
  return (
    <div
      className="hidden min-h-full md:flex md:flex-col md:justify-between border-l border-border bg-muted p-8 lg:p-10"
      data-aos="fade-left"
      data-aos-delay="200"
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary bg-accent px-3 py-1 text-xs font-medium text-primary"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary" />
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
              <InfoItemCard
                key={item.title}
                item={item}
                index={index}
                className="gap-4 p-4"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
