import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryPageHero from "@/components/CategoryPageHero";
import CategoryQuiz from "@/components/CategoryQuiz";
import type { QuizStep, Recommendation } from "@/components/CategoryQuiz";
import { Flame, Dumbbell, Heart, Zap, Leaf, Wheat, Timer, UtensilsCrossed, Pill, Scale } from "lucide-react";

const steps: QuizStep[] = [
  {
    question: "What's your nutrition goal?",
    subtitle: "Your primary goal determines macro ratios, calorie targets, and meal strategies.",
    options: [
      { label: "Fat Loss", value: "fat-loss", icon: <Flame className="w-7 h-7" />, description: "Create a sustainable deficit while preserving muscle", visual: "from-orange-600/20 to-red-700/20", stat: "-500 cal/day" },
      { label: "Muscle Fuel", value: "muscle", icon: <Dumbbell className="w-7 h-7" />, description: "Caloric surplus with optimal protein for growth", visual: "from-blue-600/20 to-indigo-700/20", stat: "+300 cal/day" },
      { label: "General Health", value: "health", icon: <Heart className="w-7 h-7" />, description: "Balanced nutrition for longevity and wellness", visual: "from-emerald-600/20 to-teal-700/20", stat: "Balance" },
      { label: "Athletic Performance", value: "performance", icon: <Zap className="w-7 h-7" />, description: "Fuel for training, racing, and recovery", visual: "from-amber-600/20 to-yellow-700/20", stat: "Periodized" },
    ],
  },
  {
    question: "Any dietary preferences?",
    subtitle: "We'll filter recommendations that match your eating style.",
    options: [
      { label: "No Restrictions", value: "none", icon: <UtensilsCrossed className="w-7 h-7" />, description: "Flexible dieting — eat what works for you", visual: "from-slate-600/20 to-gray-700/20", stat: "Flexible" },
      { label: "Plant-Based", value: "plant", icon: <Leaf className="w-7 h-7" />, description: "Vegetarian or vegan nutrition strategies", visual: "from-green-600/20 to-lime-700/20", stat: "Vegan/Veg" },
      { label: "Keto / Low-Carb", value: "keto", icon: <Wheat className="w-7 h-7" />, description: "High-fat, low-carb metabolic approach", visual: "from-amber-600/20 to-orange-700/20", stat: "<50g carbs" },
      { label: "Intermittent Fasting", value: "if", icon: <Timer className="w-7 h-7" />, description: "Time-restricted eating for metabolic benefits", visual: "from-purple-600/20 to-violet-700/20", stat: "16:8 / 20:4" },
    ],
  },
  {
    question: "What's your biggest nutrition challenge?",
    subtitle: "We'll address your specific pain point head-on.",
    options: [
      { label: "Meal Planning", value: "planning", icon: <UtensilsCrossed className="w-7 h-7" />, description: "Knowing what to eat and when — simplified", visual: "from-cyan-600/20 to-blue-700/20", stat: "Structure" },
      { label: "Supplements Confusion", value: "supplements", icon: <Pill className="w-7 h-7" />, description: "Which supplements actually work and which are BS", visual: "from-purple-600/20 to-pink-700/20", stat: "Evidence" },
      { label: "Calorie Tracking", value: "tracking", icon: <Scale className="w-7 h-7" />, description: "Understanding portions, macros, and calories", visual: "from-orange-600/20 to-red-700/20", stat: "Data" },
      { label: "Energy & Recovery", value: "energy", icon: <Zap className="w-7 h-7" />, description: "Fueling workouts and bouncing back faster", visual: "from-emerald-600/20 to-teal-700/20", stat: "Performance" },
    ],
  },
];

const getRec = (answers: string[]): Recommendation => {
  const [goal, , challenge] = answers;

  const recs: Record<string, Recommendation> = {
    "fat-loss+tracking": {
      title: "Your Fat Loss Tracking System",
      subtitle: "Data-driven approach to sustainable fat loss",
      description: "You can't manage what you don't measure. Use these calculators to establish your TDEE, set a moderate deficit, and track macros weekly.",
      tip: "Measure body fat %, not just scale weight. Muscle gain can mask fat loss on the scale.",
      links: [
        { label: "Why Water Fasting Is Dangerous", url: "https://gearuptofit.com/nutrition/why-water-fasting-is-an-unhealthy-way-to-lose-weight-dangers/", tag: "Must Read" },
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/", tag: "Science" },
        { label: "Macronutrients for Weight Loss", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-macronutrients-for-weight-loss/" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/", tag: "Start Here" },
        { label: "Macro Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/macro-calculator/", tag: "Essential" },
        { label: "Body Fat Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/body-fat-calculator/" },
        { label: "Meal Calorie Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/meal-calorie-calculator/" },
      ],
    },
    "muscle+supplements": {
      title: "Your Muscle-Building Supplement Stack",
      subtitle: "Science-backed supplements for muscle growth",
      description: "90% of supplements are a waste of money. Here are the 3 that actually work: creatine, protein powder, and caffeine. Everything else is optional.",
      tip: "Creatine monohydrate (5g/day) is the most researched and effective supplement for muscle growth. Period.",
      links: [
        { label: "Creatine: The Complete No-BS Guide", url: "https://gearuptofit.com/running/creatine-for-runners/", tag: "Must Read" },
        { label: "Health Supplements Guide", url: "https://gearuptofit.com/health/supplements/", tag: "Full Guide" },
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/", tag: "Science" },
      ],
      calculators: [
        { label: "Macro Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/macro-calculator/", tag: "Essential" },
        { label: "Calorie Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calorie-calculation-tool/" },
        { label: "Lean Body Mass Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/lean-body-mass-calculator/" },
      ],
    },
    "performance+energy": {
      title: "Your Performance Fueling Strategy",
      subtitle: "Optimize nutrition for peak athletic output",
      description: "Performance nutrition is about timing, quantity, and quality. Pre-workout carbs, intra-workout fuel, and post-workout protein — get all three right.",
      tip: "Eat 30–60g carbs 1–2 hours before training. Post-workout: 20–40g protein within 30 minutes.",
      links: [
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/", tag: "Science" },
        { label: "Creatine for Runners Guide", url: "https://gearuptofit.com/running/creatine-for-runners/", tag: "Supplement" },
        { label: "Health Supplements Guide", url: "https://gearuptofit.com/health/supplements/" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/", tag: "Essential" },
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/" },
        { label: "Macro Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/macro-calculator/" },
      ],
    },
    "health+planning": {
      title: "Your Healthy Meal Planning Guide",
      subtitle: "Simple, balanced nutrition for everyday wellness",
      description: "Healthy eating doesn't need to be complicated. Focus on whole foods, adequate protein, plenty of vegetables, and proper hydration.",
      tip: "Prep meals on Sunday. Having healthy food ready eliminates 80% of poor food decisions.",
      links: [
        { label: "Why Water Fasting Is Dangerous", url: "https://gearuptofit.com/nutrition/why-water-fasting-is-an-unhealthy-way-to-lose-weight-dangers/", tag: "Warning" },
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/", tag: "Science" },
        { label: "Health Supplements Guide", url: "https://gearuptofit.com/health/supplements/" },
      ],
      calculators: [
        { label: "Meal Calorie Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/meal-calorie-calculator/", tag: "Start Here" },
        { label: "Meal Planner", url: "https://gearuptofit.com/fitness-and-health-calculators/meal-planning-with-calorie-control/", tag: "Essential" },
        { label: "Water Intake Guide", url: "https://gearuptofit.com/nutrition/how-water-can-benefit-your-health/" },
      ],
    },
  };

  const key = `${goal}+${challenge}`;
  return recs[key] || {
    title: "Your Personalized Nutrition Plan",
    subtitle: "Science-backed nutrition for your goals",
    description: "Based on your answers, here are the top nutrition resources to optimize your diet, understand your body's needs, and fuel your performance.",
    tip: "Start with calculating your TDEE — it's the foundation of every successful nutrition strategy.",
    links: [
      { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/", tag: "Science" },
      { label: "Why Water Fasting Is Dangerous", url: "https://gearuptofit.com/nutrition/why-water-fasting-is-an-unhealthy-way-to-lose-weight-dangers/", tag: "Warning" },
      { label: "Creatine: The No-BS Guide", url: "https://gearuptofit.com/running/creatine-for-runners/" },
    ],
    calculators: [
      { label: "Macro Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/macro-calculator/", tag: "Essential" },
      { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/" },
      { label: "Meal Calorie Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/meal-calorie-calculator/" },
    ],
  };
};

const NutritionPage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SiteHeader />
    <main>
      <CategoryPageHero icon="🥗" title="Nutrition" gradient="from-emerald-600 to-green-700" description="Science-backed diet guides, supplement research, macros, and meal planning — no fads, just evidence." stats={[{ num: "35+", label: "Nutrition Articles" }, { num: "16", label: "Diet Calculators" }, { num: "100%", label: "Science-Backed" }]} categoryUrl="https://gearuptofit.com/nutrition/" />
      <CategoryQuiz steps={steps} getRecommendation={getRec} badge="Nutrition Quiz · 30 Seconds" heading={<>Fuel Your <span className="text-gradient-red block mt-2">Body Right</span></>} subheading="Answer 3 questions about your nutrition goals, dietary preferences, and challenges — get a personalized plan with the exact guides and calculators you need." stepLabels={["Goal", "Diet", "Challenge"]} />
    </main>
    <SiteFooter />
  </div>
);

export default NutritionPage;
