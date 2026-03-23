import { motion } from "framer-motion";
import { Clock, Flame, TrendingUp, ExternalLink } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface TickerArticle {
  title: string;
  url: string;
  category: string;
  tag: "NEW" | "TRENDING" | "UPDATED" | "HOT";
  readTime: string;
  imageUrl: string;
}

const tickerArticles: TickerArticle[] = [
  {
    title: "Hoka Speedgoat 7 Review: The GOAT Is Back",
    url: "https://gearuptofit.com/running/hoka-speedgoat-7/",
    category: "Running",
    tag: "NEW",
    readTime: "12 min",
    imageUrl: "https://gearuptofit.com/wp-content/uploads/2026/03/Hoka-Speedgoat-7-Review.webp",
  },
  {
    title: "Best Running Sunglasses in 2026: Tested Picks",
    url: "https://gearuptofit.com/running/best-running-sunglasses/",
    category: "Running",
    tag: "TRENDING",
    readTime: "15 min",
    imageUrl: "https://gearuptofit.com/wp-content/uploads/2026/03/Best-Running-Sunglasses-in-2026.webp",
  },
  {
    title: "Creatine for Runners: The Complete No-BS Guide",
    url: "https://gearuptofit.com/running/creatine-for-runners/",
    category: "Nutrition",
    tag: "HOT",
    readTime: "10 min",
    imageUrl: "https://gearuptofit.com/wp-content/uploads/2026/03/Creatine-for-Runners.webp",
  },
  {
    title: "Puma Deviate Nitro 4: Ultimate Super Trainer?",
    url: "https://gearuptofit.com/review/puma-deviate-nitro-4/",
    category: "Reviews",
    tag: "NEW",
    readTime: "11 min",
    imageUrl: "https://gearuptofit.com/wp-content/uploads/2026/03/Puma-Deviate-Nitro-4-Review.webp",
  },
  {
    title: "Adidas Adizero EVO SL EXO: Definitive Guide",
    url: "https://gearuptofit.com/review/adidas-adizero-evo-sl-exo/",
    category: "Reviews",
    tag: "TRENDING",
    readTime: "9 min",
    imageUrl: "https://gearuptofit.com/wp-content/uploads/2026/03/Adidas-Adizero-EVO-SL-EXO-Review.webp",
  },
  {
    title: "Huawei Watch GT Runner 2: Accuracy Deep Dive",
    url: "https://gearuptofit.com/review/huawei-watch-gt-runner-2/",
    category: "Reviews",
    tag: "UPDATED",
    readTime: "14 min",
    imageUrl: "https://gearuptofit.com/wp-content/uploads/2026/02/Huawei-Watch-GT-Runner-2-Review.webp",
  },
  {
    title: "Low-Impact Workout Routines: Complete Guide",
    url: "https://gearuptofit.com/fitness/low-impact-workout/",
    category: "Fitness",
    tag: "HOT",
    readTime: "8 min",
    imageUrl: "https://gearuptofit.com/wp-content/uploads/2025/11/Low-Impact-Workout-Routines-4.png",
  },
  {
    title: "Water Fasting: The Dangers Nobody Tells You",
    url: "https://gearuptofit.com/nutrition/why-water-fasting-is-an-unhealthy-way-to-lose-weight-dangers/",
    category: "Nutrition",
    tag: "TRENDING",
    readTime: "9 min",
    imageUrl: "https://gearuptofit.com/wp-content/uploads/2025/12/featured-86660-1766836887383.webp",
  },
  {
    title: "VO2 Max: Unlock Peak Endurance Performance",
    url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/",
    category: "Fitness",
    tag: "UPDATED",
    readTime: "7 min",
    imageUrl: "https://gearuptofit.com/wp-content/uploads/2024/03/Understanding-VO2-Max-and-its-Implications-for-Endurance-Performance.webp",
  },
  {
    title: "Saucony Ride 19: Best Daily Trainer Under $150",
    url: "https://gearuptofit.com/review/saucony-ride-19/",
    category: "Reviews",
    tag: "NEW",
    readTime: "11 min",
    imageUrl: "https://gearuptofit.com/wp-content/uploads/2026/02/Saucony-Ride-19-Review.webp",
  },
];

const tagColors: Record<string, string> = {
  NEW: "bg-primary text-primary-foreground",
  TRENDING: "bg-amber-500/90 text-black",
  UPDATED: "bg-emerald-500/90 text-black",
  HOT: "bg-orange-500/90 text-black",
};

const tagIcons: Record<string, typeof Flame> = {
  NEW: Flame,
  TRENDING: TrendingUp,
  UPDATED: Clock,
  HOT: Flame,
};

const LivePulse = () => (
  <span className="relative flex h-2.5 w-2.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
  </span>
);

const TickerCard = ({ article }: { article: TickerArticle }) => {
  const TagIcon = tagIcons[article.tag];

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] bg-card border border-border rounded-sm overflow-hidden card-hover cursor-pointer"
    >
      <div className="relative h-[140px] sm:h-[160px] md:h-[180px] overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Tag badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-display font-bold uppercase tracking-widest rounded-sm ${tagColors[article.tag]}`}
          >
            <TagIcon className="w-3 h-3" />
            {article.tag}
          </span>
        </div>

        {/* Category + read time */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[11px] font-display uppercase tracking-widest text-primary font-semibold">
            {article.category}
          </span>
          <span className="text-[11px] text-white/70 flex items-center gap-1 font-body">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold uppercase tracking-tight font-display leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground group-hover:text-primary transition-colors duration-200">
          <span className="font-body">Read Article</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
};

const LiveTicker = () => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate articles for seamless infinite scroll
  const duplicated = [...tickerArticles, ...tickerArticles];

  // Use a reasonable average card width for animation calculation
  const singleSetWidth = tickerArticles.length * (300 + 16);

  return (
    <section className="py-8 sm:py-12 md:py-16 border-y border-border/50 bg-card/30 overflow-hidden">
      <div className="container mb-5 sm:mb-8 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <LivePulse />
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-tight font-display">
              Latest from GearUpToFit
            </h2>
            <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-display uppercase tracking-widest bg-primary/15 text-primary border border-primary/30 rounded-sm font-semibold">
              Live Feed
            </span>
          </div>
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="text-xs font-display uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 px-3 py-1.5 border border-border rounded-sm hover:border-primary/40 active:scale-[0.97]"
          >
            {isPaused ? (
              <>
                <span className="w-0 h-0 border-l-[6px] border-l-current border-y-[4px] border-y-transparent" />
                Resume
              </>
            ) : (
              <>
                <span className="flex gap-0.5">
                  <span className="w-[3px] h-3 bg-current rounded-sm" />
                  <span className="w-[3px] h-3 bg-current rounded-sm" />
                </span>
                Pause
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Infinite scrolling ticker */}
      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left/right fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4"
          animate={{
            x: isPaused ? undefined : [-0, -singleSetWidth],
          }}
          transition={
            isPaused
              ? { type: "tween", duration: 0 }
              : {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: tickerArticles.length * 5,
                    ease: "linear",
                  },
                }
          }
          style={{ width: "max-content" }}
        >
          {duplicated.map((article, i) => (
            <TickerCard key={`${article.url}-${i}`} article={article} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LiveTicker;
