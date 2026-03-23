import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryPageHero from "@/components/CategoryPageHero";
import CategoryQuiz from "@/components/CategoryQuiz";
import type { QuizStep, Recommendation } from "@/components/CategoryQuiz";
import { Timer, Mountain, Route, Footprints, MapPin, CloudSun, Shirt, Gauge, Salad, Star } from "lucide-react";

const steps: QuizStep[] = [
  {
    question: "What's your race distance?",
    subtitle: "Your target distance shapes training volume, nutrition, and gear needs.",
    options: [
      { label: "5K Speed", value: "5k", icon: <Timer className="w-7 h-7" />, description: "Short, fast, and intense — chase that PR", visual: "from-cyan-600/20 to-blue-700/20", stat: "3.1 miles" },
      { label: "10K–Half Marathon", value: "half", icon: <Route className="w-7 h-7" />, description: "The sweet spot of speed meets endurance", visual: "from-emerald-600/20 to-teal-700/20", stat: "6.2–13.1 mi" },
      { label: "Marathon", value: "marathon", icon: <Footprints className="w-7 h-7" />, description: "The ultimate endurance challenge — 26.2 miles", visual: "from-amber-600/20 to-orange-700/20", stat: "26.2 miles" },
      { label: "Trail & Ultra", value: "trail", icon: <Mountain className="w-7 h-7" />, description: "Off-road, technical, multi-hour adventures", visual: "from-green-600/20 to-lime-700/20", stat: "30+ miles" },
    ],
  },
  {
    question: "Where do you run most?",
    subtitle: "Your terrain determines shoe choice, injury risk, and training specifics.",
    options: [
      { label: "Road & Pavement", value: "road", icon: <MapPin className="w-7 h-7" />, description: "Sidewalks, asphalt, and smooth surfaces", visual: "from-slate-600/20 to-gray-700/20", stat: "Cushion" },
      { label: "Trails & Dirt", value: "trail", icon: <Mountain className="w-7 h-7" />, description: "Rocks, roots, mud — technical terrain", visual: "from-green-600/20 to-emerald-700/20", stat: "Grip" },
      { label: "Track & Speed", value: "track", icon: <Gauge className="w-7 h-7" />, description: "Intervals, tempo runs, speed work", visual: "from-red-600/20 to-orange-700/20", stat: "Lightweight" },
      { label: "Mixed Everything", value: "mixed", icon: <CloudSun className="w-7 h-7" />, description: "A bit of everything — versatility matters", visual: "from-purple-600/20 to-violet-700/20", stat: "All-Around" },
    ],
  },
  {
    question: "What do you need most right now?",
    subtitle: "We'll match you with the exact resources to level up.",
    options: [
      { label: "Shoe Recommendations", value: "shoes", icon: <Shirt className="w-7 h-7" />, description: "Find the perfect pair for your foot and terrain", visual: "from-blue-600/20 to-indigo-700/20", stat: "Reviews" },
      { label: "Training Strategy", value: "training", icon: <Route className="w-7 h-7" />, description: "VO2 Max, periodization, speed work plans", visual: "from-emerald-600/20 to-teal-700/20", stat: "Science" },
      { label: "Runner's Nutrition", value: "nutrition", icon: <Salad className="w-7 h-7" />, description: "Fueling, hydration, and supplement protocols", visual: "from-orange-600/20 to-amber-700/20", stat: "Fuel Up" },
      { label: "Gear & Accessories", value: "gear", icon: <Star className="w-7 h-7" />, description: "Sunglasses, watches, headphones, and more", visual: "from-pink-600/20 to-rose-700/20", stat: "Tech" },
    ],
  },
];

const getRec = (answers: string[]): Recommendation => {
  const [distance, terrain, need] = answers;

  const recs: Record<string, Recommendation> = {
    "trail+shoes": {
      title: "Your Trail Running Shoe Guide",
      subtitle: "Best trail shoes for technical terrain",
      description: "Trail shoes need aggressive lugs, rock plates, and secure fit. We've tested 50+ models on every surface — mud, rock, scree, and wet granite.",
      tip: "Rotate between 2–3 trail shoes to extend lifespan. Use aggressive-lug shoes for mud and lighter shoes for dry trails.",
      links: [
        { label: "Hoka Speedgoat 7 Review (Trail GOAT)", url: "https://gearuptofit.com/running/hoka-speedgoat-7/", tag: "Top Pick" },
        { label: "Best Running Sunglasses 2026", url: "https://gearuptofit.com/running/best-running-sunglasses/", tag: "Protection" },
        { label: "Saucony Ride 19 Review", url: "https://gearuptofit.com/review/saucony-ride-19/", tag: "Road Alt" },
      ],
      calculators: [
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/", tag: "Essential" },
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/" },
      ],
    },
    "road+shoes": {
      title: "Your Road Running Shoe Guide",
      subtitle: "Top road shoes for comfort and speed",
      description: "Road shoes need responsive foam, reliable cushioning, and smooth transitions. Here are our top tested picks for every budget.",
      tip: "Replace road shoes every 300–500 miles. Track mileage in your running app to know when it's time.",
      links: [
        { label: "Puma Deviate Nitro 4 Review", url: "https://gearuptofit.com/review/puma-deviate-nitro-4/", tag: "Super Trainer" },
        { label: "Adidas Adizero EVO SL EXO Review", url: "https://gearuptofit.com/review/adidas-adizero-evo-sl-exo/", tag: "Speed" },
        { label: "Saucony Ride 19 Review", url: "https://gearuptofit.com/review/saucony-ride-19/", tag: "Best Value" },
      ],
      calculators: [
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/" },
      ],
    },
    "5k+training": {
      title: "Your 5K Speed Protocol",
      subtitle: "Get faster at the 5K distance",
      description: "5K success comes from VO2 Max intervals, tempo runs, and race-specific pace work. Train 4–5 days per week with 2 quality sessions.",
      tip: "80% of your weekly mileage should be easy. The 20% of hard work is where breakthroughs happen.",
      links: [
        { label: "Boost VO2 Max for Performance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/", tag: "Key Metric" },
        { label: "Creatine for Runners Guide", url: "https://gearuptofit.com/running/creatine-for-runners/", tag: "Supplement" },
        { label: "Best Running Sunglasses 2026", url: "https://gearuptofit.com/running/best-running-sunglasses/", tag: "Gear" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/", tag: "Essential" },
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/" },
      ],
    },
    "marathon+nutrition": {
      title: "Your Marathon Fueling Strategy",
      subtitle: "Nutrition for 26.2 miles",
      description: "Marathon nutrition starts weeks before race day. Glycogen loading, in-race fueling, and post-race recovery all require precise planning.",
      tip: "Never try new nutrition on race day. Test EVERYTHING in training runs first — gels, drinks, timing.",
      links: [
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/", tag: "Science" },
        { label: "Creatine for Runners Guide", url: "https://gearuptofit.com/running/creatine-for-runners/", tag: "Supplement" },
        { label: "Why Water Fasting Is Dangerous", url: "https://gearuptofit.com/nutrition/why-water-fasting-is-an-unhealthy-way-to-lose-weight-dangers/", tag: "Warning" },
      ],
      calculators: [
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/", tag: "Essential" },
        { label: "Macro Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/macro-calculator/" },
        { label: "Water Intake Guide", url: "https://gearuptofit.com/nutrition/how-water-can-benefit-your-health/" },
      ],
    },
  };

  const key = `${distance}+${need}`;
  if (key === "trail+shoes" && terrain === "trail") return recs["trail+shoes"];
  return recs[key] || {
    title: "Your Running Performance Plan",
    subtitle: `Optimized for ${distance === "5k" ? "5K" : distance === "half" ? "10K–Half" : distance === "marathon" ? "Marathon" : "Trail & Ultra"} on ${terrain} terrain`,
    description: "Here are the best resources matched to your running profile. From shoe reviews to training science, everything you need is here.",
    tip: "Build mileage gradually — increase by no more than 10% per week to avoid injury.",
    links: [
      { label: "Hoka Speedgoat 7 Review", url: "https://gearuptofit.com/running/hoka-speedgoat-7/", tag: "Trail" },
      { label: "Best Running Sunglasses 2026", url: "https://gearuptofit.com/running/best-running-sunglasses/", tag: "Gear" },
      { label: "Creatine for Runners Guide", url: "https://gearuptofit.com/running/creatine-for-runners/", tag: "Science" },
      { label: "Boost VO2 Max for Endurance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/" },
    ],
    calculators: [
      { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/", tag: "Essential" },
      { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/" },
    ],
  };
};

const RunningPage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SiteHeader />
    <main>
      <CategoryPageHero icon="🏃" title="Running" gradient="from-emerald-600 to-teal-700" description="Shoe reviews, training plans, race strategies, and running gear — tested by real runners on real trails and roads." stats={[{ num: "40+", label: "Running Articles" }, { num: "50+", label: "Shoes Tested" }, { num: "150+", label: "Trail Miles" }]} categoryUrl="https://gearuptofit.com/running/" />
      <CategoryQuiz steps={steps} getRecommendation={getRec} badge="Running Quiz · 30 Seconds" heading={<>Find Your <span className="text-gradient-red block mt-2">Running Edge</span></>} subheading="Answer 3 questions about your distance, terrain, and needs — get a precision-matched running plan with the best shoes, training, and nutrition." stepLabels={["Distance", "Terrain", "Need"]} />
    </main>
    <SiteFooter />
  </div>
);

export default RunningPage;
