import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryPageHeroProps {
  icon: string;
  title: string;
  gradient: string;
  description: string;
  stats: { num: string; label: string }[];
  categoryUrl: string;
}

const CategoryPageHero = ({ icon, title, gradient, description, stats, categoryUrl }: CategoryPageHeroProps) => (
  <section className="relative py-20 md:py-28 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.07]`} />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />

    <div className="container relative z-10">
      <motion.div initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-display uppercase tracking-widest mb-8 transition-colors duration-200">
          <ArrowLeft className="w-4 h-4" /> Back to Hub
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{icon}</span>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/25 rounded-sm">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-primary" /></span>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary font-display">{title} Hub</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9] mb-6 font-display">
          <span className="block">{title}</span>
          <span className="block text-gradient-red">Command Center</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 font-body leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-8 md:gap-12">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold font-display text-primary tabular-nums">{s.num}</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-display">{s.label}</span>
            </div>
          ))}
        </div>

        <a href={categoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary font-display text-sm uppercase tracking-wider font-bold transition-all duration-200 hover:brightness-110 active:scale-[0.97] glow-red rounded-sm text-primary-foreground">
          Browse All {title} Articles →
        </a>
      </motion.div>
    </div>
  </section>
);

export default CategoryPageHero;
