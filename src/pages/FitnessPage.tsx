import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryPageHero from "@/components/CategoryPageHero";
import CategoryQuiz from "@/components/CategoryQuiz";
import type { QuizStep, Recommendation } from "@/components/CategoryQuiz";
import { Dumbbell, Flame, StretchHorizontal, Zap, Sprout, Trophy, Target, Heart, Brain, Activity } from "lucide-react";

const steps: QuizStep[] = [
  {
    question: "What type of training excites you?",
    subtitle: "We'll build your perfect workout strategy around your preferred style.",
    options: [
      { label: "Strength Training", value: "strength", icon: <Dumbbell className="w-7 h-7" />, description: "Barbell, dumbbells, progressive overload — build raw power", visual: "from-blue-600/20 to-indigo-700/20", stat: "Hypertrophy" },
      { label: "HIIT & Cardio", value: "hiit", icon: <Flame className="w-7 h-7" />, description: "High-intensity intervals for maximum calorie burn", visual: "from-orange-600/20 to-red-700/20", stat: "Fat Torch" },
      { label: "Flexibility & Mobility", value: "flexibility", icon: <StretchHorizontal className="w-7 h-7" />, description: "Yoga, stretching, joint health, and injury prevention", visual: "from-emerald-600/20 to-teal-700/20", stat: "Recovery+" },
      { label: "Bodyweight & Functional", value: "bodyweight", icon: <Zap className="w-7 h-7" />, description: "No-equipment workouts you can do anywhere", visual: "from-purple-600/20 to-violet-700/20", stat: "Zero Gear" },
    ],
  },
  {
    question: "What's your experience level?",
    subtitle: "This shapes the intensity and complexity of your plan.",
    options: [
      { label: "Complete Beginner", value: "beginner", icon: <Sprout className="w-7 h-7" />, description: "New to structured fitness — ready to start right", visual: "from-lime-600/20 to-green-700/20", stat: "0–3 months" },
      { label: "Intermediate", value: "intermediate", icon: <Target className="w-7 h-7" />, description: "6+ months consistent training, ready for more", visual: "from-amber-600/20 to-yellow-700/20", stat: "6–18 months" },
      { label: "Advanced", value: "advanced", icon: <Trophy className="w-7 h-7" />, description: "2+ years, looking for optimization and plateaus", visual: "from-purple-600/20 to-violet-700/20", stat: "2+ years" },
    ],
  },
  {
    question: "What's your primary fitness goal?",
    subtitle: "This determines which articles and calculators we recommend.",
    options: [
      { label: "Build Muscle Mass", value: "muscle", icon: <Dumbbell className="w-7 h-7" />, description: "Hypertrophy-focused programs for maximum gains", visual: "from-blue-600/20 to-cyan-700/20", stat: "+LBM" },
      { label: "Burn Fat", value: "fat-loss", icon: <Flame className="w-7 h-7" />, description: "Lean out while maintaining performance", visual: "from-orange-600/20 to-red-700/20", stat: "-BF%" },
      { label: "Improve Endurance", value: "endurance", icon: <Activity className="w-7 h-7" />, description: "Boost VO2 Max and cardiovascular fitness", visual: "from-emerald-600/20 to-teal-700/20", stat: "+VO2" },
      { label: "Overall Wellness", value: "wellness", icon: <Heart className="w-7 h-7" />, description: "Longevity, joint health, and sustainable fitness", visual: "from-pink-600/20 to-rose-700/20", stat: "Holistic" },
    ],
  },
];

const getRec = (answers: string[]): Recommendation => {
  const [style, level, goal] = answers;
  const levelLabel = level === "beginner" ? "a beginner" : level === "intermediate" ? "an intermediate" : "an advanced athlete";

  const recs: Record<string, Recommendation> = {
    "strength+muscle": {
      title: "Your Strength & Hypertrophy Blueprint",
      subtitle: `Tailored for ${levelLabel} building muscle`,
      description: "Progressive overload is the king of muscle growth. Focus on compound lifts, train each muscle 2x/week, and eat in a 300–500 cal surplus.",
      tip: "Track your lifts. If you're not progressing in weight or reps every 1–2 weeks, something needs adjusting.",
      links: [
        { label: "Boost VO2 Max: Unlock Peak Performance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/", tag: "Performance" },
        { label: "Low-Impact Workout Routines Guide", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Recovery" },
        { label: "Creatine: The Complete No-BS Guide", url: "https://gearuptofit.com/running/creatine-for-runners/", tag: "Supplement" },
      ],
      calculators: [
        { label: "Lean Body Mass Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/lean-body-mass-calculator/", tag: "Essential" },
        { label: "BMR Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/basal-metabolic-rate-calculation-tool/" },
        { label: "Calorie Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calorie-calculation-tool/" },
      ],
    },
    "strength+fat-loss": {
      title: "Strength Training for Fat Loss",
      subtitle: `Tailored for ${levelLabel} cutting fat`,
      description: "Lifting heavy while cutting preserves muscle. Combine compound lifts with a moderate calorie deficit for optimal recomposition.",
      tip: "Don't drop calories too low — a 300–500 deficit with high protein (1.6g/kg+) preserves muscle while cutting.",
      links: [
        { label: "Low-Impact Workout Routines", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Start Here" },
        { label: "Why Water Fasting Is Dangerous", url: "https://gearuptofit.com/nutrition/why-water-fasting-is-an-unhealthy-way-to-lose-weight-dangers/", tag: "Warning" },
        { label: "HIIT for Flexibility Benefits", url: "https://gearuptofit.com/fitness/hiit-for-flexibility/", tag: "Cross-Train" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/", tag: "Essential" },
        { label: "Body Fat Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/body-fat-calculator/" },
        { label: "Macro Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/macro-calculator/" },
      ],
    },
    "hiit+fat-loss": {
      title: "Your HIIT Fat-Burning Protocol",
      subtitle: `Tailored for ${levelLabel} torching fat`,
      description: "HIIT is the most time-efficient way to burn fat. 20–30 minute sessions, 3–4x per week, with proper recovery between sessions.",
      tip: "Pair HIIT with 2 low-impact recovery sessions per week to avoid burnout and overtraining.",
      links: [
        { label: "HIIT for Flexibility: 7 Benefits", url: "https://gearuptofit.com/fitness/hiit-for-flexibility/", tag: "Must Read" },
        { label: "Low-Impact Workout Guide", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Recovery" },
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/", tag: "Science" },
      ],
      calculators: [
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/", tag: "Essential" },
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/" },
      ],
    },
    "flexibility+wellness": {
      title: "Your Flexibility & Wellness Path",
      subtitle: `Tailored for ${levelLabel} prioritizing mobility`,
      description: "Mobility work prevents injury, reduces pain, and improves every other type of training. Start with 15 minutes daily.",
      tip: "Hold stretches for 30–60 seconds minimum. Anything less doesn't create lasting tissue change.",
      links: [
        { label: "HIIT for Flexibility: 7 Benefits", url: "https://gearuptofit.com/fitness/hiit-for-flexibility/", tag: "Start Here" },
        { label: "Low-Impact Workout Routines", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Essential" },
        { label: "VO2 Max for Endurance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/" },
      ],
      calculators: [
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/", tag: "Baseline" },
        { label: "Ideal Body Weight", url: "https://gearuptofit.com/fitness-and-health-calculators/ideal-body-weight-ibw-calculator/" },
      ],
    },
  };

  const key = `${style}+${goal}`;
  return recs[key] || {
    title: "Your Custom Fitness Plan",
    subtitle: `Tailored for ${levelLabel}`,
    description: "Based on your selections, here are the best resources to kickstart your fitness journey with proven, science-backed methods.",
    tip: "Consistency beats perfection. Show up 4x/week for 8 weeks and you'll see transformative results.",
    links: [
      { label: "Low-Impact Workout Routines Guide", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Start Here" },
      { label: "Boost VO2 Max for Performance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/", tag: "Science" },
      { label: "HIIT for Flexibility Benefits", url: "https://gearuptofit.com/fitness/hiit-for-flexibility/" },
    ],
    calculators: [
      { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/", tag: "Essential" },
      { label: "Advanced Fitness Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/advanced-fitness-calculator/", tag: "All-in-One" },
    ],
  };
};

const FitnessPage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SiteHeader />
    <main>
      <CategoryPageHero icon="💪" title="Fitness" gradient="from-blue-600 to-indigo-700" description="Workout routines, HIIT training, strength programs, and exercise science — all backed by research and real-world testing." stats={[{ num: "50+", label: "Fitness Articles" }, { num: "12+", label: "Training Plans" }, { num: "16", label: "Calculators" }]} categoryUrl="https://gearuptofit.com/fitness/" />
      <CategoryQuiz steps={steps} getRecommendation={getRec} badge="Fitness Quiz · 30 Seconds" heading={<>Find Your <span className="text-gradient-red block mt-2">Perfect Workout</span></>} subheading="Answer 3 quick questions and get a personalized training plan with the exact articles, routines, and calculators for your goals." stepLabels={["Style", "Level", "Goal"]} />
    </main>
    <SiteFooter />
  </div>
);

export default FitnessPage;
