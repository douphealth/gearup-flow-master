import { useState } from "react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryPageHero from "@/components/CategoryPageHero";
import CategoryQuiz from "@/components/CategoryQuiz";
import type { QuizStep, Recommendation } from "@/components/CategoryQuiz";
import { Footprints, Mountain, MapPin, Gauge, DollarSign, Crown, Sparkles, Watch, Headphones, Battery, Wifi, Heart, Music, Mic, Shield } from "lucide-react";

/* ===== SHOE FINDER ===== */
const shoeSteps: QuizStep[] = [
  {
    question: "What terrain do you run on?",
    subtitle: "Your surface determines outsole, cushioning, and stability needs.",
    options: [
      { label: "Road & Pavement", value: "road", icon: <MapPin className="w-7 h-7" />, description: "Smooth surfaces — need cushion and responsiveness", visual: "from-slate-600/20 to-gray-700/20", stat: "Cushion" },
      { label: "Trail & Off-Road", value: "trail", icon: <Mountain className="w-7 h-7" />, description: "Technical terrain — need grip and protection", visual: "from-green-600/20 to-emerald-700/20", stat: "Traction" },
      { label: "Track & Speed", value: "track", icon: <Gauge className="w-7 h-7" />, description: "Racing and intervals — need lightweight speed", visual: "from-red-600/20 to-orange-700/20", stat: "Lightweight" },
      { label: "Mixed Terrain", value: "mixed", icon: <Footprints className="w-7 h-7" />, description: "Road-to-trail versatility", visual: "from-blue-600/20 to-indigo-700/20", stat: "Versatile" },
    ],
  },
  {
    question: "What's your pace preference?",
    subtitle: "This determines the shoe's foam, plate, and weight characteristics.",
    options: [
      { label: "Easy & Daily", value: "daily", icon: <Heart className="w-7 h-7" />, description: "Comfortable for long easy runs and everyday training", visual: "from-emerald-600/20 to-teal-700/20", stat: "Max Cushion" },
      { label: "Tempo & Threshold", value: "tempo", icon: <Gauge className="w-7 h-7" />, description: "Faster training runs, tempo work", visual: "from-amber-600/20 to-yellow-700/20", stat: "Responsive" },
      { label: "Race Day Speed", value: "race", icon: <Crown className="w-7 h-7" />, description: "Carbon plate, super foam, maximum propulsion", visual: "from-red-600/20 to-rose-700/20", stat: "Carbon Plate" },
    ],
  },
  {
    question: "What's your budget?",
    subtitle: "Great shoes exist at every price point — we've tested them all.",
    options: [
      { label: "Under $100", value: "budget", icon: <DollarSign className="w-7 h-7" />, description: "Best performance per dollar — smart picks", visual: "from-green-600/20 to-lime-700/20", stat: "Value" },
      { label: "$100–$160", value: "mid", icon: <Sparkles className="w-7 h-7" />, description: "Sweet spot — premium tech without premium tax", visual: "from-blue-600/20 to-indigo-700/20", stat: "Sweet Spot" },
      { label: "$160+", value: "premium", icon: <Crown className="w-7 h-7" />, description: "Top-of-the-line, no compromises", visual: "from-amber-600/20 to-orange-700/20", stat: "Premium" },
    ],
  },
];

const getShoeRec = (answers: string[]): Recommendation => {
  const [terrain] = answers;
  if (terrain === "trail") {
    return {
      title: "Your Perfect Trail Shoes",
      subtitle: "Top-tested trail running shoes for technical terrain",
      description: "We've tested these shoes on mud, rock, scree, wet granite, roots, gravel, sand, and fire roads. Here are the ones that earned our recommendation.",
      tip: "Buy half a size up for trail shoes — your feet swell on long runs and descents. Always try shoes at the end of the day when feet are largest.",
      links: [
        { label: "Hoka Speedgoat 7 Review (150+ miles tested)", url: "https://gearuptofit.com/running/hoka-speedgoat-7/", tag: "Trail GOAT" },
        { label: "Best Running Sunglasses 2026", url: "https://gearuptofit.com/running/best-running-sunglasses/", tag: "Eye Protection" },
        { label: "Saucony Ride 19 Review", url: "https://gearuptofit.com/review/saucony-ride-19/", tag: "Road Alt" },
      ],
      calculators: [
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/", tag: "Trail Calories" },
      ],
    };
  }
  return {
    title: "Your Perfect Running Shoes",
    subtitle: "Top-rated shoes matched to your running style",
    description: "Based on your terrain, pace, and budget, these are the shoes we'd personally recommend after extensive real-world testing.",
    tip: "Rotate 2–3 pairs of shoes to extend their lifespan and reduce repetitive stress injuries.",
    links: [
      { label: "Puma Deviate Nitro 4 Review", url: "https://gearuptofit.com/review/puma-deviate-nitro-4/", tag: "Super Trainer" },
      { label: "Adidas Adizero EVO SL EXO Review", url: "https://gearuptofit.com/review/adidas-adizero-evo-sl-exo/", tag: "Speed" },
      { label: "Saucony Ride 19 Review", url: "https://gearuptofit.com/review/saucony-ride-19/", tag: "Best Value" },
      { label: "Hoka Speedgoat 7 Review", url: "https://gearuptofit.com/running/hoka-speedgoat-7/", tag: "Trail" },
    ],
    calculators: [
      { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/", tag: "Weight Impact" },
    ],
  };
};

/* ===== SMARTWATCH FINDER ===== */
const watchSteps: QuizStep[] = [
  {
    question: "What's your primary watch use?",
    subtitle: "Your main use case determines which features matter most.",
    options: [
      { label: "Running & GPS", value: "running", icon: <MapPin className="w-7 h-7" />, description: "Accurate GPS, pace tracking, training plans", visual: "from-emerald-600/20 to-teal-700/20", stat: "GPS First" },
      { label: "Health Monitoring", value: "health", icon: <Heart className="w-7 h-7" />, description: "Heart rate, sleep, SpO2, stress tracking", visual: "from-red-600/20 to-rose-700/20", stat: "24/7 Health" },
      { label: "All-Around Fitness", value: "fitness", icon: <Gauge className="w-7 h-7" />, description: "Multi-sport tracking with smart features", visual: "from-blue-600/20 to-indigo-700/20", stat: "Versatile" },
      { label: "Battery Life Priority", value: "battery", icon: <Battery className="w-7 h-7" />, description: "Multi-day or multi-week battery life", visual: "from-amber-600/20 to-yellow-700/20", stat: "14+ days" },
    ],
  },
  {
    question: "What's your budget range?",
    subtitle: "We've tested watches at every price point.",
    options: [
      { label: "Under $200", value: "budget", icon: <DollarSign className="w-7 h-7" />, description: "Impressive value without breaking the bank", visual: "from-green-600/20 to-lime-700/20", stat: "Value" },
      { label: "$200–$400", value: "mid", icon: <Sparkles className="w-7 h-7" />, description: "Best feature-to-price ratio", visual: "from-blue-600/20 to-indigo-700/20", stat: "Sweet Spot" },
      { label: "$400+", value: "premium", icon: <Crown className="w-7 h-7" />, description: "Flagship features and build quality", visual: "from-amber-600/20 to-orange-700/20", stat: "Premium" },
    ],
  },
  {
    question: "Which ecosystem do you prefer?",
    subtitle: "Ecosystem compatibility affects app availability and smart features.",
    options: [
      { label: "No Preference", value: "any", icon: <Wifi className="w-7 h-7" />, description: "Open to any brand or ecosystem", visual: "from-slate-600/20 to-gray-700/20", stat: "Flexible" },
      { label: "Best for Running", value: "running-first", icon: <Footprints className="w-7 h-7" />, description: "Prioritize running features above all else", visual: "from-emerald-600/20 to-teal-700/20", stat: "Runner" },
      { label: "Best Battery Life", value: "battery-first", icon: <Battery className="w-7 h-7" />, description: "Charge once, wear for weeks", visual: "from-amber-600/20 to-yellow-700/20", stat: "Endurance" },
    ],
  },
];

const getWatchRec = (): Recommendation => ({
  title: "Your Ideal Smartwatch Match",
  subtitle: "Personally tested and compared for your needs",
  description: "We've worn each of these watches for 2+ weeks of real training. Here are our honest, no-BS picks based on your priorities.",
  tip: "Don't chase specs alone — comfort, battery, and ecosystem matter more for long-term use than raw sensor accuracy.",
  links: [
    { label: "Huawei Watch GT Runner 2 Review", url: "https://gearuptofit.com/review/huawei-watch-gt-runner-2/", tag: "Best Runner" },
    { label: "Amazfit GTR 3 Pro Review", url: "https://gearuptofit.com/review/smartwatch/amazfit-gtr-3-pro-review/", tag: "Battery King" },
  ],
  calculators: [
    { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/", tag: "Compare Data" },
    { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/" },
  ],
});

/* ===== HEADPHONE FINDER ===== */
const headphoneSteps: QuizStep[] = [
  {
    question: "Where will you use these headphones?",
    subtitle: "Your primary use case determines the form factor and features needed.",
    options: [
      { label: "Running & Outdoor", value: "running", icon: <Footprints className="w-7 h-7" />, description: "Sweat-proof, secure fit, ambient awareness", visual: "from-emerald-600/20 to-teal-700/20", stat: "IP67+" },
      { label: "Gym & Lifting", value: "gym", icon: <Shield className="w-7 h-7" />, description: "Bass-heavy, noise canceling, durable", visual: "from-blue-600/20 to-indigo-700/20", stat: "ANC" },
      { label: "Commute & Travel", value: "commute", icon: <Wifi className="w-7 h-7" />, description: "Best noise cancellation, comfort, long battery", visual: "from-purple-600/20 to-violet-700/20", stat: "30+ hrs" },
      { label: "All-Around Use", value: "all", icon: <Music className="w-7 h-7" />, description: "Versatile for every situation", visual: "from-amber-600/20 to-orange-700/20", stat: "Versatile" },
    ],
  },
  {
    question: "What's your budget?",
    subtitle: "Great audio exists at every price point.",
    options: [
      { label: "Under $100", value: "budget", icon: <DollarSign className="w-7 h-7" />, description: "Surprising quality at accessible prices", visual: "from-green-600/20 to-lime-700/20", stat: "Value" },
      { label: "$100–$200", value: "mid", icon: <Sparkles className="w-7 h-7" />, description: "Premium features without premium price", visual: "from-blue-600/20 to-indigo-700/20", stat: "Best Buy" },
      { label: "$200+", value: "premium", icon: <Crown className="w-7 h-7" />, description: "Flagship noise cancellation and sound quality", visual: "from-amber-600/20 to-orange-700/20", stat: "Flagship" },
    ],
  },
  {
    question: "What matters most to you?",
    subtitle: "Your #1 priority narrows down the perfect pick.",
    options: [
      { label: "Sound Quality", value: "sound", icon: <Music className="w-7 h-7" />, description: "Rich, detailed, immersive audio experience", visual: "from-purple-600/20 to-violet-700/20", stat: "Hi-Fi" },
      { label: "Noise Cancellation", value: "anc", icon: <Shield className="w-7 h-7" />, description: "Block out the world, focus on your music", visual: "from-blue-600/20 to-cyan-700/20", stat: "ANC" },
      { label: "Comfort & Fit", value: "comfort", icon: <Heart className="w-7 h-7" />, description: "Wear for hours without fatigue", visual: "from-emerald-600/20 to-teal-700/20", stat: "Ergonomic" },
      { label: "Call Quality", value: "calls", icon: <Mic className="w-7 h-7" />, description: "Crystal clear calls and voice assistant", visual: "from-amber-600/20 to-orange-700/20", stat: "AI Mic" },
    ],
  },
];

const getHeadphoneRec = (): Recommendation => ({
  title: "Your Perfect Workout Headphones",
  subtitle: "Tested in real workouts, runs, and daily use",
  description: "We've tested these headphones during runs, gym sessions, and daily commutes. Here's what actually delivers on its promises.",
  tip: "For running, prioritize secure fit and ambient mode over noise cancellation — you need to hear traffic and your surroundings.",
  links: [
    { label: "Bose QC Earbuds Review (Best ANC)", url: "https://gearuptofit.com/review/headphones/bose-quietcomfort-earbuds-review/", tag: "Best ANC" },
  ],
  calculators: [],
});

/* ===== REVIEWS PAGE ===== */
type QuizType = "shoes" | "watches" | "headphones";

const quizConfigs: Record<QuizType, { steps: QuizStep[]; getRec: (a: string[]) => Recommendation; badge: string; heading: React.ReactNode; sub: string; labels: string[] }> = {
  shoes: { steps: shoeSteps, getRec: getShoeRec, badge: "Shoe Finder · 30 Seconds", heading: <>Find Your <span className="text-gradient-red block mt-2">Perfect Shoe</span></>, sub: "Answer 3 questions about your terrain, pace, and budget — get personally tested shoe recommendations.", labels: ["Terrain", "Pace", "Budget"] },
  watches: { steps: watchSteps, getRec: getWatchRec, badge: "Watch Finder · 30 Seconds", heading: <>Find Your <span className="text-gradient-red block mt-2">Ideal Watch</span></>, sub: "Answer 3 questions about your use case, budget, and preferences — get honest smartwatch recommendations.", labels: ["Use", "Budget", "Pref"] },
  headphones: { steps: headphoneSteps, getRec: getHeadphoneRec, badge: "Headphone Finder · 30 Seconds", heading: <>Find Your <span className="text-gradient-red block mt-2">Best Sound</span></>, sub: "Answer 3 questions about your use case, budget, and priorities — get our top headphone picks.", labels: ["Use", "Budget", "Priority"] },
};

const tabs: { key: QuizType; label: string; icon: React.ReactNode }[] = [
  { key: "shoes", label: "Running Shoes", icon: <Footprints className="w-4 h-4" /> },
  { key: "watches", label: "Smartwatches", icon: <Watch className="w-4 h-4" /> },
  { key: "headphones", label: "Headphones", icon: <Headphones className="w-4 h-4" /> },
];

const ReviewsPage = () => {
  const [activeQuiz, setActiveQuiz] = useState<QuizType>("shoes");
  const config = quizConfigs[activeQuiz];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />
      <main>
        <CategoryPageHero icon="⭐" title="Reviews" gradient="from-amber-600 to-orange-700" description="In-depth, real-world tested gear reviews — running shoes, smartwatches, headphones, and more. No sponsored content, just honest opinions." stats={[{ num: "45+", label: "Gear Reviews" }, { num: "500+", label: "Hours Tested" }, { num: "100%", label: "Unbiased" }]} categoryUrl="https://gearuptofit.com/review/" />

        {/* Quiz selector tabs */}
        <section className="pt-8 pb-0">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight font-display mb-3">Choose Your Product Finder</h2>
              <p className="text-muted-foreground font-body">Select a category to find your perfect gear match.</p>
            </motion.div>
            <div className="flex justify-center gap-2 mb-0">
              {tabs.map((tab) => (
                <button key={tab.key} onClick={() => setActiveQuiz(tab.key)} className={`flex items-center gap-2 px-6 py-3 font-display text-sm uppercase tracking-widest font-semibold transition-all duration-200 rounded-sm active:scale-[0.97] ${activeQuiz === tab.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"}`}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <CategoryQuiz key={activeQuiz} steps={config.steps} getRecommendation={config.getRec} badge={config.badge} heading={config.heading} subheading={config.sub} stepLabels={config.labels} />
      </main>
      <SiteFooter />
    </div>
  );
};

export default ReviewsPage;
