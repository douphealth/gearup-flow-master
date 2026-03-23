import { motion } from "framer-motion";
import { categories } from "@/lib/blog-data";

const SiteHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="https://gearuptofit.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-xl font-bold uppercase tracking-tight"
        >
          Gear Up <span className="text-primary">To Fit</span>
        </a>

        {/* Nav links - desktop */}
        <nav className="hidden md:flex items-center gap-1">
          <a
            href="#quiz"
            className="px-3 py-2 text-xs font-display uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Quiz
          </a>
          {categories.slice(0, 4).map((cat) => (
            <a
              key={cat.slug}
              href={cat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-display uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {cat.name}
            </a>
          ))}
          <a
            href="#calculators"
            className="px-3 py-2 text-xs font-display uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Calculators
          </a>
        </nav>

        {/* CTA */}
        <a
          href="https://gearuptofit.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary font-display text-xs uppercase tracking-widest font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.97] rounded-sm hidden sm:inline-flex"
        >
          Visit Site
        </a>
      </div>
    </motion.header>
  );
};

export default SiteHeader;
