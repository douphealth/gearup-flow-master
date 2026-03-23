import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Target,
  RotateCcw,
  Flame,
  Dumbbell,
  Heart,
  Wind,
  Sprout,
  Zap,
  Trophy,
  ClipboardList,
  Salad,
  Star,
  Calculator,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface QuizOption {
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

interface QuizStep {
  question: string;
  subtitle: string;
  options: QuizOption[];
}

interface RecommendationLink {
  label: string;
  url: string;
  tag?: string;
}

interface Recommendation {
  title: string;
  subtitle: string;
  description: string;
  tip: string;
  links: RecommendationLink[];
  calculators: RecommendationLink[];
}

/* ------------------------------------------------------------------ */
/*  Quiz content                                                       */
/* ------------------------------------------------------------------ */

const quizSteps: QuizStep[] = [
  {
    question: "What's driving you right now?",
    subtitle: "Your primary goal shapes everything — training, nutrition, and recovery.",
    options: [
      {
        label: "Burn Fat",
        value: "weight-loss",
        icon: <Flame className="w-6 h-6" />,
        description: "Shed body fat while preserving lean muscle mass",
      },
      {
        label: "Build Muscle",
        value: "muscle",
        icon: <Dumbbell className="w-6 h-6" />,
        description: "Grow stronger with hypertrophy-focused training",
      },
      {
        label: "Run Faster & Farther",
        value: "endurance",
        icon: <Wind className="w-6 h-6" />,
        description: "Boost VO2 max, race times, and cardio endurance",
      },
      {
        label: "Optimize Health",
        value: "health",
        icon: <Heart className="w-6 h-6" />,
        description: "Longevity, recovery, and overall wellness",
      },
    ],
  },
  {
    question: "Where are you on your journey?",
    subtitle: "This calibrates the intensity and complexity of our recommendations.",
    options: [
      {
        label: "Just Starting Out",
        value: "beginner",
        icon: <Sprout className="w-6 h-6" />,
        description: "Less than 6 months of consistent training",
      },
      {
        label: "Building Momentum",
        value: "intermediate",
        icon: <Zap className="w-6 h-6" />,
        description: "6–24 months of regular activity",
      },
      {
        label: "Seasoned Athlete",
        value: "advanced",
        icon: <Trophy className="w-6 h-6" />,
        description: "2+ years of dedicated training",
      },
    ],
  },
  {
    question: "How do you want to level up?",
    subtitle: "We'll match you with the exact resources that move the needle.",
    options: [
      {
        label: "Training Programs",
        value: "workouts",
        icon: <ClipboardList className="w-6 h-6" />,
        description: "Structured routines, HIIT, strength splits",
      },
      {
        label: "Nutrition Science",
        value: "nutrition",
        icon: <Salad className="w-6 h-6" />,
        description: "Macros, meal plans, supplement guides",
      },
      {
        label: "Gear & Reviews",
        value: "gear",
        icon: <Star className="w-6 h-6" />,
        description: "Tested shoes, watches, headphones, and more",
      },
      {
        label: "Fitness Calculators",
        value: "calculators",
        icon: <Calculator className="w-6 h-6" />,
        description: "BMI, TDEE, body fat, macros — crunch the numbers",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Recommendation engine                                              */
/* ------------------------------------------------------------------ */

const getRecommendation = (answers: string[]): Recommendation => {
  const [goal, level, interest] = answers;

  const levelLabel =
    level === "beginner"
      ? "a beginner"
      : level === "intermediate"
      ? "an intermediate"
      : "an advanced athlete";

  const recs: Record<string, Recommendation> = {
    "weight-loss+workouts": {
      title: "Your Fat-Burning Workout Blueprint",
      subtitle: `Tailored for ${levelLabel} focused on fat loss`,
      description:
        "Combine HIIT with low-impact recovery sessions for maximum calorie burn. Start with 3 sessions per week and build from there.",
      tip: "Track your TDEE first — without knowing your baseline, you're guessing.",
      links: [
        { label: "HIIT for Flexibility: 7 Surprising Benefits", url: "https://gearuptofit.com/fitness/hiit-for-flexibility/", tag: "Start Here" },
        { label: "Low-Impact Workout Routines: Complete Guide", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Recovery" },
        { label: "Why Water Fasting Is Dangerous", url: "https://gearuptofit.com/nutrition/why-water-fasting-is-an-unhealthy-way-to-lose-weight-dangers/", tag: "Must Read" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/", tag: "Essential" },
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/" },
        { label: "Body Fat % Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/body-fat-calculator/" },
      ],
    },
    "weight-loss+nutrition": {
      title: "Your Nutrition-First Fat Loss Plan",
      subtitle: `Tailored for ${levelLabel} focused on diet`,
      description:
        "Diet drives 80% of weight loss results. Understand your calorie needs, dial in your macros, then create a sustainable deficit.",
      tip: "Don't slash calories overnight. A 300–500 cal deficit is sustainable and preserves muscle.",
      links: [
        { label: "Macronutrients for Weight Loss", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-macronutrients-for-weight-loss/", tag: "Start Here" },
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/", tag: "Science" },
        { label: "Why Water Fasting Is Dangerous", url: "https://gearuptofit.com/nutrition/why-water-fasting-is-an-unhealthy-way-to-lose-weight-dangers/", tag: "Warning" },
      ],
      calculators: [
        { label: "Macro Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/macro-calculator/", tag: "Essential" },
        { label: "Meal Calorie Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/meal-calorie-calculator/" },
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/" },
      ],
    },
    "weight-loss+gear": {
      title: "Your Weight Loss Gear Essentials",
      subtitle: `Tailored for ${levelLabel} looking for the right tools`,
      description:
        "The right gear keeps you accountable. A quality smartwatch tracks calories burned, a good pair of shoes prevents injury, and proper nutrition tools make meal prep effortless.",
      tip: "A fitness tracker alone won't lose weight — pair it with a calorie target from our TDEE calculator.",
      links: [
        { label: "Huawei Watch GT Runner 2 Review", url: "https://gearuptofit.com/review/huawei-watch-gt-runner-2/", tag: "Top Pick" },
        { label: "Saucony Ride 19 Review", url: "https://gearuptofit.com/review/saucony-ride-19/", tag: "Best Value" },
        { label: "Low-Impact Workout Routines", url: "https://gearuptofit.com/fitness/low-impact-workout/" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/", tag: "Essential" },
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/" },
      ],
    },
    "weight-loss+calculators": {
      title: "Your Weight Loss Numbers Dashboard",
      subtitle: `Tailored for ${levelLabel} who loves data`,
      description:
        "You can't manage what you don't measure. Start with these calculators to establish your baseline, then track progress weekly.",
      tip: "Measure body fat %, not just scale weight. Muscle gain can mask fat loss.",
      links: [
        { label: "Why Water Fasting Is Dangerous", url: "https://gearuptofit.com/nutrition/why-water-fasting-is-an-unhealthy-way-to-lose-weight-dangers/", tag: "Must Read" },
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/", tag: "Start Here" },
        { label: "Body Fat % Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/body-fat-calculator/", tag: "Essential" },
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/" },
        { label: "Macro Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/macro-calculator/" },
        { label: "Ideal Body Weight", url: "https://gearuptofit.com/fitness-and-health-calculators/ideal-body-weight-ibw-calculator/" },
      ],
    },
    "muscle+workouts": {
      title: "Your Muscle-Building Blueprint",
      subtitle: `Tailored for ${levelLabel} chasing gains`,
      description:
        "Maximize hypertrophy with progressive overload, smart recovery, and performance-boosting supplements backed by research.",
      tip: "Progressive overload is king. Increase weight, reps, or volume each week.",
      links: [
        { label: "Boost VO2 Max for Performance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/", tag: "Performance" },
        { label: "Creatine: The Complete No-BS Guide", url: "https://gearuptofit.com/running/creatine-for-runners/", tag: "Supplements" },
        { label: "Low-Impact Recovery Routines", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Recovery" },
      ],
      calculators: [
        { label: "BMR Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/basal-metabolic-rate-calculation-tool/", tag: "Essential" },
        { label: "Lean Body Mass Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/lean-body-mass-calculator/" },
        { label: "Calorie Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calorie-calculation-tool/" },
      ],
    },
    "muscle+nutrition": {
      title: "Your Muscle-Fuel Nutrition Plan",
      subtitle: `Tailored for ${levelLabel} optimizing diet for gains`,
      description:
        "You can't out-train a bad diet. Dial in protein timing, caloric surplus, and macros to support lean muscle growth.",
      tip: "Aim for 1.6–2.2g protein per kg of bodyweight. Use the macro calculator to plan it.",
      links: [
        { label: "Creatine: The Complete No-BS Guide", url: "https://gearuptofit.com/running/creatine-for-runners/", tag: "Supplements" },
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/", tag: "Science" },
        { label: "Health Supplements Guide", url: "https://gearuptofit.com/health/supplements/" },
      ],
      calculators: [
        { label: "Macro Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/macro-calculator/", tag: "Essential" },
        { label: "Calorie Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calorie-calculation-tool/" },
        { label: "Meal Calorie Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/meal-calorie-calculator/" },
      ],
    },
    "muscle+gear": {
      title: "Your Muscle-Building Gear Guide",
      subtitle: `Tailored for ${levelLabel} who wants the right tools`,
      description: "Track performance, monitor recovery, and find the best gear to support your training.",
      tip: "A heart rate monitor helps you train in the right zones — don't just lift heavy without tracking.",
      links: [
        { label: "Huawei Watch GT Runner 2 Review", url: "https://gearuptofit.com/review/huawei-watch-gt-runner-2/", tag: "Tracking" },
        { label: "Bose QC Earbuds Review", url: "https://gearuptofit.com/review/headphones/bose-quietcomfort-earbuds-review/", tag: "Motivation" },
        { label: "Amazfit GTR 3 Pro Review", url: "https://gearuptofit.com/review/smartwatch/amazfit-gtr-3-pro-review/" },
      ],
      calculators: [
        { label: "BMR Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/basal-metabolic-rate-calculation-tool/", tag: "Essential" },
        { label: "Lean Body Mass", url: "https://gearuptofit.com/fitness-and-health-calculators/lean-body-mass-calculator/" },
      ],
    },
    "muscle+calculators": {
      title: "Your Strength Data Dashboard",
      subtitle: `Tailored for ${levelLabel} who trains by the numbers`,
      description: "Establish your baseline, calculate surplus calories, and track lean mass over time.",
      tip: "Weigh yourself at the same time daily. Use the weekly average, not daily fluctuations.",
      links: [
        { label: "Boost VO2 Max for Performance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/" },
        { label: "Creatine: The No-BS Guide", url: "https://gearuptofit.com/running/creatine-for-runners/" },
      ],
      calculators: [
        { label: "Lean Body Mass Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/lean-body-mass-calculator/", tag: "Start Here" },
        { label: "BMR Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/basal-metabolic-rate-calculation-tool/" },
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/" },
        { label: "Advanced Fitness Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/advanced-fitness-calculator/", tag: "All-in-One" },
      ],
    },
    "endurance+workouts": {
      title: "Your Endurance Training Hub",
      subtitle: `Tailored for ${levelLabel} chasing cardio gains`,
      description:
        "Build aerobic capacity with structured training, VO2 max optimization, and the right recovery protocols.",
      tip: "80% of your runs should be easy. The other 20%? That's where magic happens.",
      links: [
        { label: "Hoka Speedgoat 7 Review", url: "https://gearuptofit.com/running/hoka-speedgoat-7/", tag: "Trail" },
        { label: "Best Running Sunglasses 2026", url: "https://gearuptofit.com/running/best-running-sunglasses/", tag: "Gear" },
        { label: "Boost VO2 Max for Endurance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/", tag: "Science" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/", tag: "Essential" },
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/" },
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/" },
      ],
    },
    "endurance+nutrition": {
      title: "Your Runner's Fueling Strategy",
      subtitle: `Tailored for ${levelLabel} optimizing endurance nutrition`,
      description: "Fuel your runs with proper glycogen loading, hydration, and race-day nutrition protocols.",
      tip: "Never try new nutrition on race day. Test everything in training first.",
      links: [
        { label: "Creatine for Runners: Complete Guide", url: "https://gearuptofit.com/running/creatine-for-runners/", tag: "Supplements" },
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/", tag: "Science" },
        { label: "Health Supplements Guide", url: "https://gearuptofit.com/health/supplements/" },
      ],
      calculators: [
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/", tag: "Essential" },
        { label: "Water Intake Calculator", url: "https://gearuptofit.com/nutrition/how-water-can-benefit-your-health/" },
        { label: "Macro Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/macro-calculator/" },
      ],
    },
    "endurance+gear": {
      title: "Your Running Gear Arsenal",
      subtitle: `Tailored for ${levelLabel} seeking performance equipment`,
      description:
        "The right shoes, shades, and watch can shave minutes off your time. These are our most-tested, top-rated picks.",
      tip: "Rotate 2–3 pairs of shoes to extend their lifespan and reduce injury risk.",
      links: [
        { label: "Hoka Speedgoat 7 Review", url: "https://gearuptofit.com/running/hoka-speedgoat-7/", tag: "Trail GOAT" },
        { label: "Puma Deviate Nitro 4 Review", url: "https://gearuptofit.com/review/puma-deviate-nitro-4/", tag: "Super Trainer" },
        { label: "Adidas Adizero EVO SL EXO Review", url: "https://gearuptofit.com/review/adidas-adizero-evo-sl-exo/", tag: "Speed" },
        { label: "Best Running Sunglasses 2026", url: "https://gearuptofit.com/running/best-running-sunglasses/", tag: "Protection" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/" },
      ],
    },
    "endurance+calculators": {
      title: "Your Performance Metrics Hub",
      subtitle: `Tailored for ${levelLabel} who trains with data`,
      description: "Numbers don't lie. Track energy expenditure, calorie burn per run, and body composition over time.",
      tip: "Test your VO2 max every 8 weeks to track aerobic improvement.",
      links: [
        { label: "Boost VO2 Max for Endurance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/", tag: "Key Metric" },
        { label: "Hoka Speedgoat 7 Review", url: "https://gearuptofit.com/running/hoka-speedgoat-7/" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/", tag: "Start Here" },
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/", tag: "Essential" },
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/" },
        { label: "BMR Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/basal-metabolic-rate-calculation-tool/" },
      ],
    },
    "health+workouts": {
      title: "Your Wellness Workout Plan",
      subtitle: `Tailored for ${levelLabel} prioritizing longevity`,
      description: "Movement is medicine. Start with low-impact routines that protect joints while building functional strength.",
      tip: "Consistency beats intensity. 30 minutes daily outperforms 2-hour weekend warriors.",
      links: [
        { label: "Low-Impact Workout Routines", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Start Here" },
        { label: "HIIT for Flexibility", url: "https://gearuptofit.com/fitness/hiit-for-flexibility/", tag: "Mobility" },
        { label: "VO2 Max for Endurance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/" },
      ],
      calculators: [
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/", tag: "Essential" },
        { label: "Water Intake Calculator", url: "https://gearuptofit.com/nutrition/how-water-can-benefit-your-health/" },
        { label: "Body Fat Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/body-fat-calculator/" },
      ],
    },
    "health+nutrition": {
      title: "Your Wellness Nutrition Guide",
      subtitle: `Tailored for ${levelLabel} optimizing health through diet`,
      description: "Fuel your body with the right nutrients, stay hydrated, and avoid common diet myths that sabotage health.",
      tip: "Hydration is the most underrated health hack. Calculate your ideal intake first.",
      links: [
        { label: "Why Water Fasting Is Dangerous", url: "https://gearuptofit.com/nutrition/why-water-fasting-is-an-unhealthy-way-to-lose-weight-dangers/", tag: "Warning" },
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/", tag: "Science" },
        { label: "Health Supplements Guide", url: "https://gearuptofit.com/health/supplements/" },
      ],
      calculators: [
        { label: "Water Intake Calculator", url: "https://gearuptofit.com/nutrition/how-water-can-benefit-your-health/", tag: "Start Here" },
        { label: "Macro Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/macro-calculator/" },
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/" },
      ],
    },
    "health+gear": {
      title: "Your Health Tracking Toolkit",
      subtitle: `Tailored for ${levelLabel} monitoring wellness`,
      description: "Modern wearables give you 24/7 health data. Pick the right one and pair it with the right metrics.",
      tip: "Don't obsess over daily data — look at 7-day and 30-day trends instead.",
      links: [
        { label: "Huawei Watch GT Runner 2 Review", url: "https://gearuptofit.com/review/huawei-watch-gt-runner-2/", tag: "Health Focus" },
        { label: "Amazfit GTR 3 Pro Review", url: "https://gearuptofit.com/review/smartwatch/amazfit-gtr-3-pro-review/", tag: "Battery King" },
        { label: "Bose QC Earbuds Review", url: "https://gearuptofit.com/review/headphones/bose-quietcomfort-earbuds-review/" },
      ],
      calculators: [
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/", tag: "Essential" },
        { label: "BMR Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/basal-metabolic-rate-calculation-tool/" },
      ],
    },
    "health+calculators": {
      title: "Your Complete Health Dashboard",
      subtitle: `Tailored for ${levelLabel} who wants the full picture`,
      description:
        "Start with data. Use these calculators to establish your health baseline, then track progress over time.",
      tip: "Re-assess every 4–6 weeks. Your body adapts — your targets should too.",
      links: [
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/", tag: "Science" },
        { label: "Low-Impact Workout Guide", url: "https://gearuptofit.com/fitness/low-impact-workout/" },
      ],
      calculators: [
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/", tag: "Start Here" },
        { label: "Body Fat Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/body-fat-calculator/", tag: "Essential" },
        { label: "Ideal Body Weight", url: "https://gearuptofit.com/fitness-and-health-calculators/ideal-body-weight-ibw-calculator/" },
        { label: "Water Intake Calculator", url: "https://gearuptofit.com/nutrition/how-water-can-benefit-your-health/" },
        { label: "BMR Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/basal-metabolic-rate-calculation-tool/" },
      ],
    },
  };

  const key = `${goal}+${interest}`;
  return recs[key] || {
    title: "Your Personalized Fitness Plan",
    subtitle: `Tailored for ${levelLabel}`,
    description: "Here are the top resources we recommend based on your unique profile.",
    tip: "Consistency is the only shortcut. Pick one resource, apply it for 2 weeks, then reassess.",
    links: [
      { label: "Explore All Fitness Articles", url: "https://gearuptofit.com/fitness/" },
      { label: "Running Hub", url: "https://gearuptofit.com/running/" },
      { label: "Nutrition Guides", url: "https://gearuptofit.com/nutrition/" },
    ],
    calculators: [
      { label: "All Fitness Calculators", url: "https://fitness-calculators.gearuptofit.com/", tag: "Full Suite" },
    ],
  };
};

/* ------------------------------------------------------------------ */
/*  Step indicators                                                    */
/* ------------------------------------------------------------------ */

const StepIndicator = ({ current, total, showResults }: { current: number; total: number; showResults: boolean }) => (
  <div className="flex items-center justify-center gap-2 mb-10">
    {Array.from({ length: total }).map((_, i) => {
      const done = showResults || i < current;
      const active = !showResults && i === current;
      return (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            animate={{
              width: active ? 32 : 10,
              backgroundColor: done
                ? "hsl(0 72% 50%)"
                : active
                ? "hsl(0 72% 50%)"
                : "hsl(0 0% 20%)",
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-2.5 rounded-full"
          />
        </div>
      );
    })}
    {showResults && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <CheckCircle2 className="w-5 h-5 text-primary ml-1" />
      </motion.div>
    )}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const FitnessQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedThisStep, setSelectedThisStep] = useState<string | null>(null);

  const handleSelect = useCallback(
    (value: string) => {
      setSelectedThisStep(value);
      const newAnswers = [...answers];
      newAnswers[step] = value;
      setAnswers(newAnswers);

      setTimeout(() => {
        setSelectedThisStep(null);
        if (step < quizSteps.length - 1) {
          setStep(step + 1);
        } else {
          setShowResults(true);
        }
      }, 400);
    },
    [step, answers],
  );

  const handleBack = () => {
    if (step > 0) {
      setSelectedThisStep(null);
      setStep(step - 1);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedThisStep(null);
  };

  const recommendation = useMemo(
    () => (showResults ? getRecommendation(answers) : null),
    [showResults, answers],
  );

  return (
    <section id="quiz" className="py-24 md:py-36 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[80px]" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-sm mb-5">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold tracking-widest uppercase text-primary font-display">
              30-Second Fitness Quiz
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight font-display mb-4 leading-[0.92]">
            Cut the Clutter.{" "}
            <span className="text-gradient-red block mt-1">Find Your Path.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body max-w-lg mx-auto leading-relaxed">
            3 questions. Zero fluff. Get a personalized roadmap with articles, calculators, and tools matched to your exact goals.
          </p>
        </motion.div>

        {/* Quiz card */}
        <div className="max-w-2xl mx-auto">
          <StepIndicator current={step} total={quizSteps.length} showResults={showResults} />

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Question header */}
                <div className="mb-8">
                  <p className="text-xs font-display uppercase tracking-[0.2em] text-primary mb-3 font-semibold">
                    Step {step + 1} of {quizSteps.length}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold font-display uppercase tracking-tight leading-[1] mb-2">
                    {quizSteps[step].question}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm md:text-base">
                    {quizSteps[step].subtitle}
                  </p>
                </div>

                {/* Options */}
                <div className={`grid gap-3 ${quizSteps[step].options.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
                  {quizSteps[step].options.map((option, i) => {
                    const isSelected = selectedThisStep === option.value || answers[step] === option.value;
                    return (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => handleSelect(option.value)}
                        className={`group relative text-left p-5 md:p-6 border rounded-sm transition-all duration-250 ease-out active:scale-[0.96] overflow-hidden ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-[0_0_30px_hsl(0_72%_50%/0.2),inset_0_1px_0_hsl(0_72%_50%/0.15)]"
                            : "border-border bg-card hover:border-primary/40 hover:shadow-[0_4px_20px_hsl(0_0%_0%/0.3)]"
                        }`}
                      >
                        {/* Hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                          <div className={`w-10 h-10 rounded-sm flex items-center justify-center mb-3 transition-colors duration-200 ${
                            isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                          }`}>
                            {option.icon}
                          </div>
                          <span className={`font-display text-base md:text-lg uppercase tracking-wide font-bold block mb-1 transition-colors duration-200 ${
                            isSelected ? "text-primary" : "group-hover:text-primary"
                          }`}>
                            {option.label}
                          </span>
                          <span className="text-xs text-muted-foreground font-body leading-relaxed block">
                            {option.description}
                          </span>
                        </div>

                        {/* Selection indicator */}
                        {isSelected && (
                          <motion.div
                            layoutId="selected-check"
                            className="absolute top-3 right-3"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Back button */}
                {step > 0 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={handleBack}
                    className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-display uppercase tracking-widest transition-colors duration-200 active:scale-[0.97]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </motion.button>
                )}
              </motion.div>
            ) : (
              /* -------------------------------------------------------- */
              /*  Results                                                  */
              /* -------------------------------------------------------- */
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-card border border-border rounded-sm overflow-hidden">
                  {/* Results header */}
                  <div className="relative px-8 pt-8 pb-6 md:px-10 md:pt-10 md:pb-8 border-b border-border overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent" />
                    <div className="relative z-10">
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/15 border border-primary/30 rounded-sm mb-4"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[11px] font-display uppercase tracking-[0.2em] text-primary font-bold">
                          Your Personalized Results
                        </span>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold font-display uppercase tracking-tight leading-[0.95] mb-2"
                      >
                        {recommendation!.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        className="text-sm text-primary/80 font-display uppercase tracking-wider font-medium"
                      >
                        {recommendation!.subtitle}
                      </motion.p>
                    </div>
                  </div>

                  <div className="px-8 py-8 md:px-10 md:py-10 space-y-8">
                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-muted-foreground font-body text-base md:text-lg leading-relaxed"
                    >
                      {recommendation!.description}
                    </motion.p>

                    {/* Pro tip */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="flex gap-3 p-4 bg-primary/[0.06] border border-primary/15 rounded-sm"
                    >
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-display uppercase tracking-widest text-primary font-bold block mb-1">
                          Pro Tip
                        </span>
                        <p className="text-sm text-muted-foreground font-body leading-relaxed">
                          {recommendation!.tip}
                        </p>
                      </div>
                    </motion.div>

                    {/* Recommended articles */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.5 }}
                    >
                      <h4 className="text-xs font-display uppercase tracking-[0.2em] text-foreground mb-4 font-bold flex items-center gap-2">
                        <span className="w-6 h-[2px] bg-primary inline-block" />
                        Recommended Reading
                      </h4>
                      <div className="space-y-2">
                        {recommendation!.links.map((link, i) => (
                          <motion.a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.07, duration: 0.4 }}
                            className="group flex items-center justify-between p-4 border border-border rounded-sm hover:border-primary/40 hover:bg-primary/[0.04] transition-all duration-200 active:scale-[0.98]"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="font-body font-medium text-sm md:text-base group-hover:text-primary transition-colors duration-200 truncate">
                                {link.label}
                              </span>
                              {link.tag && (
                                <span className="hidden sm:inline-flex text-[10px] font-display uppercase tracking-widest px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-sm whitespace-nowrap flex-shrink-0">
                                  {link.tag}
                                </span>
                              )}
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 ml-3 transition-colors duration-200" />
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>

                    {/* Recommended calculators */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <h4 className="text-xs font-display uppercase tracking-[0.2em] text-foreground mb-4 font-bold flex items-center gap-2">
                        <span className="w-6 h-[2px] bg-primary inline-block" />
                        Crunch Your Numbers
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {recommendation!.calculators.map((calc, i) => (
                          <motion.a
                            key={calc.url}
                            href={calc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.75 + i * 0.06, duration: 0.35 }}
                            className="group flex items-center justify-between p-4 bg-primary/[0.04] border border-primary/15 rounded-sm hover:bg-primary/[0.08] hover:border-primary/30 transition-all duration-200 active:scale-[0.97]"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <Calculator className="w-4 h-4 text-primary/60 flex-shrink-0" />
                              <span className="font-display text-sm uppercase tracking-wide font-semibold group-hover:text-primary transition-colors duration-200 truncate">
                                {calc.label}
                              </span>
                            </div>
                            {calc.tag && (
                              <span className="text-[10px] font-display uppercase tracking-widest px-2 py-0.5 bg-primary/15 text-primary rounded-sm whitespace-nowrap flex-shrink-0 ml-2">
                                {calc.tag}
                              </span>
                            )}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-border"
                    >
                      <a
                        href="https://fitness-calculators.gearuptofit.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary font-display text-sm uppercase tracking-wider font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.97] glow-red rounded-sm"
                      >
                        All Calculators
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <button
                        onClick={handleRestart}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-display uppercase tracking-widest transition-colors duration-200 active:scale-[0.97]"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Retake Quiz
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FitnessQuiz;
