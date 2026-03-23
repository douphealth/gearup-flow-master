import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryPageHero from "@/components/CategoryPageHero";
import CategoryQuiz from "@/components/CategoryQuiz";
import type { QuizStep, Recommendation } from "@/components/CategoryQuiz";
import { Heart, Moon, Bone, Brain, Activity, Armchair, Dumbbell, Trophy, Calculator, BookOpen, Pill, ClipboardList } from "lucide-react";

const steps: QuizStep[] = [
  {
    question: "What's your primary health focus?",
    subtitle: "We'll prioritize resources for your most important health concern.",
    options: [
      { label: "Heart & Cardio", value: "heart", icon: <Heart className="w-7 h-7" />, description: "Cardiovascular health, blood pressure, and heart rate", visual: "from-red-600/20 to-rose-700/20", stat: "Vital" },
      { label: "Recovery & Sleep", value: "recovery", icon: <Moon className="w-7 h-7" />, description: "Sleep quality, muscle recovery, and stress management", visual: "from-indigo-600/20 to-blue-700/20", stat: "7–9 hrs" },
      { label: "Joint & Bone Health", value: "joints", icon: <Bone className="w-7 h-7" />, description: "Injury prevention, flexibility, and bone density", visual: "from-amber-600/20 to-yellow-700/20", stat: "Longevity" },
      { label: "Mental Wellness", value: "mental", icon: <Brain className="w-7 h-7" />, description: "Exercise for mood, focus, and cognitive function", visual: "from-purple-600/20 to-violet-700/20", stat: "Mind-Body" },
    ],
  },
  {
    question: "How active are you currently?",
    subtitle: "This calibrates the intensity of our health recommendations.",
    options: [
      { label: "Mostly Sedentary", value: "sedentary", icon: <Armchair className="w-7 h-7" />, description: "Desk job, under 5,000 steps/day", visual: "from-slate-600/20 to-gray-700/20", stat: "<5K steps" },
      { label: "Moderately Active", value: "moderate", icon: <Activity className="w-7 h-7" />, description: "Regular walking, some structured exercise", visual: "from-emerald-600/20 to-teal-700/20", stat: "5–10K steps" },
      { label: "Very Active", value: "active", icon: <Dumbbell className="w-7 h-7" />, description: "Structured training 4–5x per week", visual: "from-blue-600/20 to-indigo-700/20", stat: "10K+ steps" },
      { label: "Competitive Athlete", value: "athlete", icon: <Trophy className="w-7 h-7" />, description: "High-volume training, racing, competition", visual: "from-amber-600/20 to-orange-700/20", stat: "Elite" },
    ],
  },
  {
    question: "How do you prefer to learn?",
    subtitle: "We'll match you with the right type of health resources.",
    options: [
      { label: "Calculators & Data", value: "calculators", icon: <Calculator className="w-7 h-7" />, description: "Numbers, metrics, and tracking tools", visual: "from-cyan-600/20 to-blue-700/20", stat: "16 Tools" },
      { label: "In-Depth Articles", value: "articles", icon: <BookOpen className="w-7 h-7" />, description: "Science-backed guides and deep dives", visual: "from-green-600/20 to-emerald-700/20", stat: "Research" },
      { label: "Supplement Research", value: "supplements", icon: <Pill className="w-7 h-7" />, description: "Evidence-based supplement guides", visual: "from-purple-600/20 to-pink-700/20", stat: "Evidence" },
      { label: "Action Plans", value: "plans", icon: <ClipboardList className="w-7 h-7" />, description: "Step-by-step routines and protocols", visual: "from-orange-600/20 to-red-700/20", stat: "Apply Now" },
    ],
  },
];

const getRec = (answers: string[]): Recommendation => {
  const [focus, , approach] = answers;

  const recs: Record<string, Recommendation> = {
    "heart+calculators": {
      title: "Your Cardiovascular Health Dashboard",
      subtitle: "Track and optimize your heart health metrics",
      description: "Cardiovascular health is the #1 predictor of longevity. Use these calculators to establish baseline metrics, then track improvements over time.",
      tip: "VO2 Max is the single best predictor of all-cause mortality. Even small improvements (2–3 points) significantly reduce health risk.",
      links: [
        { label: "Boost VO2 Max for Performance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/", tag: "Key Metric" },
        { label: "Low-Impact Workout Routines", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Start Here" },
      ],
      calculators: [
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/", tag: "Baseline" },
        { label: "Body Fat Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/body-fat-calculator/", tag: "Essential" },
        { label: "BMR Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/basal-metabolic-rate-calculation-tool/" },
        { label: "Ideal Body Weight", url: "https://gearuptofit.com/fitness-and-health-calculators/ideal-body-weight-ibw-calculator/" },
      ],
    },
    "recovery+articles": {
      title: "Your Recovery & Sleep Optimization Guide",
      subtitle: "Science-backed recovery strategies",
      description: "Recovery is when your body actually gets stronger. Optimize sleep quality, manage stress, and use low-impact movement to accelerate recovery.",
      tip: "Sleep is the #1 performance enhancer. Aim for 7–9 hours in a cool, dark room. Consistency matters more than duration.",
      links: [
        { label: "Low-Impact Workout Routines", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Recovery" },
        { label: "HIIT for Flexibility Benefits", url: "https://gearuptofit.com/fitness/hiit-for-flexibility/", tag: "Mobility" },
        { label: "Health Supplements Guide", url: "https://gearuptofit.com/health/supplements/", tag: "Supplements" },
      ],
      calculators: [
        { label: "BMR Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/basal-metabolic-rate-calculation-tool/", tag: "Baseline" },
        { label: "Water Intake Guide", url: "https://gearuptofit.com/nutrition/how-water-can-benefit-your-health/" },
      ],
    },
    "joints+plans": {
      title: "Your Joint Health Action Plan",
      subtitle: "Protect your joints for long-term fitness",
      description: "Joint health determines how long you can stay active. Low-impact training, mobility work, and proper warm-ups prevent 80% of joint issues.",
      tip: "Warm up for 5–10 minutes before every workout. Cold muscles and stiff joints are the #1 cause of preventable injuries.",
      links: [
        { label: "Low-Impact Workout Routines", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Essential" },
        { label: "HIIT for Flexibility: 7 Benefits", url: "https://gearuptofit.com/fitness/hiit-for-flexibility/", tag: "Mobility" },
        { label: "Health Supplements Guide", url: "https://gearuptofit.com/health/supplements/" },
      ],
      calculators: [
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/", tag: "Weight Check" },
        { label: "Ideal Body Weight", url: "https://gearuptofit.com/fitness-and-health-calculators/ideal-body-weight-ibw-calculator/" },
      ],
    },
    "mental+supplements": {
      title: "Your Mental Wellness Protocol",
      subtitle: "Exercise and supplements for mental health",
      description: "Exercise is the most underrated antidepressant. Combined with evidence-based supplements, it creates a powerful mental wellness foundation.",
      tip: "30 minutes of moderate exercise is as effective as antidepressants for mild-to-moderate depression (per multiple meta-analyses).",
      links: [
        { label: "Health Supplements Guide", url: "https://gearuptofit.com/health/supplements/", tag: "Evidence" },
        { label: "Low-Impact Workout Routines", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Start Here" },
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/" },
      ],
      calculators: [
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/", tag: "Baseline" },
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/" },
      ],
    },
  };

  const key = `${focus}+${approach}`;
  return recs[key] || {
    title: "Your Health Optimization Plan",
    subtitle: "Personalized wellness recommendations",
    description: "Based on your health priorities and activity level, here are the most impactful resources to improve your overall wellness and longevity.",
    tip: "Start with one habit change at a time. Stack wins over 2–4 weeks before adding the next. Sustainable > aggressive.",
    links: [
      { label: "Low-Impact Workout Routines", url: "https://gearuptofit.com/fitness/low-impact-workout/", tag: "Start Here" },
      { label: "Health Supplements Guide", url: "https://gearuptofit.com/health/supplements/", tag: "Research" },
      { label: "VO2 Max for Performance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/" },
    ],
    calculators: [
      { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/", tag: "Essential" },
      { label: "Body Fat Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/body-fat-calculator/" },
      { label: "Advanced Fitness Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/advanced-fitness-calculator/", tag: "All-in-One" },
    ],
  };
};

const HealthPage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SiteHeader />
    <main>
      <CategoryPageHero icon="❤️" title="Health" gradient="from-rose-600 to-pink-700" description="Wellness tips, recovery science, supplements research, and health tools — evidence-based approaches to living longer and better." stats={[{ num: "30+", label: "Health Articles" }, { num: "16", label: "Health Calculators" }, { num: "100%", label: "Evidence-Based" }]} categoryUrl="https://gearuptofit.com/health/" />
      <CategoryQuiz steps={steps} getRecommendation={getRec} badge="Health Quiz · 30 Seconds" heading={<>Optimize Your <span className="text-gradient-red block mt-2">Wellness</span></>} subheading="Answer 3 questions about your health focus, activity level, and learning style — get a personalized wellness plan with targeted guides and tools." stepLabels={["Focus", "Activity", "Approach"]} />
    </main>
    <SiteFooter />
  </div>
);

export default HealthPage;
