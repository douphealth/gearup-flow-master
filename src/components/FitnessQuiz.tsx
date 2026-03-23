import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Target, RotateCcw } from "lucide-react";

interface QuizOption {
  label: string;
  value: string;
  emoji: string;
}

interface QuizStep {
  question: string;
  subtitle: string;
  options: QuizOption[];
}

interface Recommendation {
  title: string;
  description: string;
  links: { label: string; url: string }[];
  calculators: { label: string; url: string }[];
}

const quizSteps: QuizStep[] = [
  {
    question: "What's your primary fitness goal?",
    subtitle: "This helps us point you to the most relevant content.",
    options: [
      { label: "Lose Weight", value: "weight-loss", emoji: "🔥" },
      { label: "Build Muscle", value: "muscle", emoji: "💪" },
      { label: "Improve Endurance", value: "endurance", emoji: "🏃" },
      { label: "Stay Healthy", value: "health", emoji: "❤️" },
    ],
  },
  {
    question: "What's your experience level?",
    subtitle: "No judgment — everyone starts somewhere.",
    options: [
      { label: "Complete Beginner", value: "beginner", emoji: "🌱" },
      { label: "Somewhat Active", value: "intermediate", emoji: "⚡" },
      { label: "Advanced / Athlete", value: "advanced", emoji: "🏆" },
    ],
  },
  {
    question: "What interests you most?",
    subtitle: "Pick the content type that excites you.",
    options: [
      { label: "Workout Plans", value: "workouts", emoji: "📋" },
      { label: "Nutrition & Diet", value: "nutrition", emoji: "🥗" },
      { label: "Gear & Reviews", value: "gear", emoji: "⭐" },
      { label: "Health Calculators", value: "calculators", emoji: "🧮" },
    ],
  },
];

const getRecommendation = (answers: string[]): Recommendation => {
  const [goal, , interest] = answers;

  const recs: Record<string, Recommendation> = {
    "weight-loss+workouts": {
      title: "Your Fat-Burning Workout Plan",
      description:
        "Based on your goals, start with HIIT and low-impact routines to maximize calorie burn without overloading your joints.",
      links: [
        { label: "HIIT for Flexibility: 7 Benefits", url: "https://gearuptofit.com/fitness/hiit-for-flexibility/" },
        { label: "Low-Impact Workout Routines", url: "https://gearuptofit.com/fitness/low-impact-workout/" },
        { label: "Water Fasting Dangers (Avoid This)", url: "https://gearuptofit.com/nutrition/why-water-fasting-is-an-unhealthy-way-to-lose-weight-dangers/" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/" },
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/" },
        { label: "Body Fat Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/body-fat-calculator/" },
      ],
    },
    "weight-loss+nutrition": {
      title: "Your Nutrition-First Weight Loss Plan",
      description:
        "Diet is 80% of weight loss. Start by understanding your calorie needs, then plan meals that create a healthy deficit.",
      links: [
        { label: "Macronutrients for Weight Loss", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-macronutrients-for-weight-loss/" },
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/" },
        { label: "Why Water Fasting Is Dangerous", url: "https://gearuptofit.com/nutrition/why-water-fasting-is-an-unhealthy-way-to-lose-weight-dangers/" },
      ],
      calculators: [
        { label: "Macro Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/macro-calculator/" },
        { label: "Meal Calorie Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/meal-calorie-calculator/" },
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/" },
      ],
    },
    "muscle+workouts": {
      title: "Your Muscle-Building Starter Kit",
      description:
        "Maximize gains with science-backed routines, VO2 max optimization, and the right supplement strategy.",
      links: [
        { label: "Boost VO2 Max for Performance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/" },
        { label: "Creatine: The No-BS Guide", url: "https://gearuptofit.com/running/creatine-for-runners/" },
        { label: "Low-Impact Workout Routines", url: "https://gearuptofit.com/fitness/low-impact-workout/" },
      ],
      calculators: [
        { label: "BMR Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/basal-metabolic-rate-calculation-tool/" },
        { label: "Lean Body Mass Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/lean-body-mass-calculator/" },
        { label: "Calorie Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calorie-calculation-tool/" },
      ],
    },
    "endurance+workouts": {
      title: "Your Endurance Training Hub",
      description:
        "Level up your cardio with running-specific plans, the right shoes, and performance-tracking science.",
      links: [
        { label: "Hoka Speedgoat 7 Review", url: "https://gearuptofit.com/running/hoka-speedgoat-7/" },
        { label: "Best Running Sunglasses 2026", url: "https://gearuptofit.com/running/best-running-sunglasses/" },
        { label: "Boost VO2 Max for Endurance", url: "https://gearuptofit.com/fitness/vo2-max-for-endurance-performance/" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/" },
        { label: "Calorie Burn Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-your-calorie-burn-today/" },
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/" },
      ],
    },
    "endurance+gear": {
      title: "Your Running Gear Guide",
      description:
        "The right gear makes all the difference. Here are our most-tested, top-rated picks for endurance athletes.",
      links: [
        { label: "Hoka Speedgoat 7 Review", url: "https://gearuptofit.com/running/hoka-speedgoat-7/" },
        { label: "Puma Deviate Nitro 4 Review", url: "https://gearuptofit.com/review/puma-deviate-nitro-4/" },
        { label: "Adidas Adizero EVO SL EXO Review", url: "https://gearuptofit.com/review/adidas-adizero-evo-sl-exo/" },
        { label: "Best Running Sunglasses 2026", url: "https://gearuptofit.com/running/best-running-sunglasses/" },
      ],
      calculators: [
        { label: "TDEE Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/total-daily-energy-expenditure-calculation-tool/" },
      ],
    },
    "health+calculators": {
      title: "Your Health Dashboard",
      description:
        "Start with data. Use these calculators to establish your baseline, then explore the guides below.",
      links: [
        { label: "Glycogen Metabolism Explained", url: "https://gearuptofit.com/nutrition/glycogen-metabolism/" },
        { label: "Low-Impact Workout Guide", url: "https://gearuptofit.com/fitness/low-impact-workout/" },
      ],
      calculators: [
        { label: "BMI Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/calculate-bmi-bmr-and-whr-now/" },
        { label: "Body Fat Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/body-fat-calculator/" },
        { label: "Ideal Body Weight", url: "https://gearuptofit.com/fitness-and-health-calculators/ideal-body-weight-ibw-calculator/" },
        { label: "Water Intake Calculator", url: "https://gearuptofit.com/nutrition/how-water-can-benefit-your-health/" },
        { label: "BMR Calculator", url: "https://gearuptofit.com/fitness-and-health-calculators/basal-metabolic-rate-calculation-tool/" },
      ],
    },
  };

  const key = `${goal}+${interest}`;
  if (recs[key]) return recs[key];

  // Fallback: goal-based
  const fallbacks: Record<string, Recommendation> = {
    "weight-loss": recs["weight-loss+workouts"],
    muscle: recs["muscle+workouts"],
    endurance: recs["endurance+workouts"],
    health: recs["health+calculators"],
  };

  return (
    fallbacks[goal] || {
      title: "Your Personalized Fitness Plan",
      description: "Here are the top resources we recommend based on your profile.",
      links: [
        { label: "Explore All Fitness Articles", url: "https://gearuptofit.com/fitness/" },
        { label: "Running Hub", url: "https://gearuptofit.com/running/" },
        { label: "Nutrition Guides", url: "https://gearuptofit.com/nutrition/" },
      ],
      calculators: [
        { label: "All Fitness Calculators", url: "https://fitness-calculators.gearuptofit.com/" },
      ],
    }
  );
};

const FitnessQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSelect = useCallback(
    (value: string) => {
      const newAnswers = [...answers];
      newAnswers[step] = value;
      setAnswers(newAnswers);

      if (step < quizSteps.length - 1) {
        setTimeout(() => setStep(step + 1), 300);
      } else {
        setTimeout(() => setShowResults(true), 300);
      }
    },
    [step, answers],
  );

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setShowResults(false);
  };

  const recommendation = showResults ? getRecommendation(answers) : null;
  const progress = showResults ? 100 : ((step + 1) / quizSteps.length) * 100;

  return (
    <section id="quiz" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/15 border border-primary/30 rounded-sm mb-4">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium tracking-wide uppercase text-primary font-display">
              Personalized Path
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight font-display mb-3 leading-[0.95]">
            Find Your <span className="text-gradient-red">Perfect Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body max-w-xl mx-auto">
            Answer 3 quick questions. We'll cut through the noise and point you exactly where you need to go.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="h-1 bg-muted rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-8">
                  <p className="text-xs font-display uppercase tracking-widest text-primary mb-2">
                    Question {step + 1} of {quizSteps.length}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold font-display uppercase tracking-tight mb-1">
                    {quizSteps[step].question}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {quizSteps[step].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quizSteps[step].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={`group relative text-left p-5 border rounded-sm transition-all duration-200 ease-out active:scale-[0.97] ${
                        answers[step] === option.value
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(0_72%_50%/0.15)]"
                          : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{option.emoji}</span>
                      <span className="font-display text-lg uppercase tracking-wide font-semibold group-hover:text-primary transition-colors duration-200">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-display uppercase tracking-wider transition-colors duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-card border border-border rounded-sm p-8 md:p-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/15 border border-primary/30 rounded-sm mb-4">
                    <span className="text-xs font-display uppercase tracking-widest text-primary font-semibold">
                      Your Results
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold font-display uppercase tracking-tight mb-2">
                    {recommendation!.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-lg mb-8 leading-relaxed">
                    {recommendation!.description}
                  </p>

                  {/* Recommended articles */}
                  <div className="mb-8">
                    <h4 className="text-xs font-display uppercase tracking-widest text-primary mb-4 font-semibold">
                      📖 Recommended Reading
                    </h4>
                    <div className="space-y-2">
                      {recommendation!.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between p-4 bg-muted/50 border border-border rounded-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 active:scale-[0.98]"
                        >
                          <span className="font-body font-medium group-hover:text-primary transition-colors duration-200">
                            {link.label}
                          </span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Recommended calculators */}
                  <div className="mb-8">
                    <h4 className="text-xs font-display uppercase tracking-widest text-primary mb-4 font-semibold">
                      🧮 Use These Calculators
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {recommendation!.calculators.map((calc) => (
                        <a
                          key={calc.url}
                          href={calc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-sm hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 active:scale-[0.97]"
                        >
                          <span className="font-display text-sm uppercase tracking-wide font-semibold group-hover:text-primary transition-colors duration-200">
                            {calc.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-display uppercase tracking-wider transition-colors duration-200"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retake Quiz
                  </button>
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
