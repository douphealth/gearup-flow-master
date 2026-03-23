import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, RotateCcw, Zap, Calculator,
  CheckCircle2, Sparkles, ExternalLink, ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared types                                                       */
/* ------------------------------------------------------------------ */

export interface QuizOption {
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  visual: string;
  stat?: string;
}

export interface QuizStep {
  question: string;
  subtitle: string;
  options: QuizOption[];
}

export interface RecommendationLink {
  label: string;
  url: string;
  tag?: string;
}

export interface Recommendation {
  title: string;
  subtitle: string;
  description: string;
  tip: string;
  links: RecommendationLink[];
  calculators: RecommendationLink[];
}

interface CategoryQuizProps {
  steps: QuizStep[];
  getRecommendation: (answers: string[]) => Recommendation;
  sectionId?: string;
  badge?: string;
  heading: React.ReactNode;
  subheading: string;
  stepLabels: string[];
}

/* ------------------------------------------------------------------ */
/*  Progress bar                                                       */
/* ------------------------------------------------------------------ */

const ProgressBar = ({ current, total, showResults, labels }: { current: number; total: number; showResults: boolean; labels: string[] }) => {
  const progress = showResults ? 100 : (current / total) * 100;
  return (
    <div className="relative mb-12">
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
      </div>
      <div className="flex justify-between mt-3">
        {Array.from({ length: total }).map((_, i) => {
          const done = showResults || i < current;
          const active = !showResults && i === current;
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{ scale: active ? 1.2 : 1, backgroundColor: done || active ? "hsl(var(--primary))" : "hsl(var(--border))" }}
                className="w-3 h-3 rounded-full" transition={{ duration: 0.3 }}
              >
                {done && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-full h-full flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-primary-foreground" /></motion.div>}
              </motion.div>
              <span className={`text-[10px] font-display uppercase tracking-widest ${active ? "text-primary font-bold" : done ? "text-primary/60" : "text-muted-foreground"}`}>{labels[i]}</span>
            </div>
          );
        })}
        <div className="flex flex-col items-center gap-1.5">
          <motion.div animate={{ scale: showResults ? 1.2 : 1, backgroundColor: showResults ? "hsl(var(--primary))" : "hsl(var(--border))" }} className="w-3 h-3 rounded-full" transition={{ duration: 0.3 }} />
          <span className={`text-[10px] font-display uppercase tracking-widest ${showResults ? "text-primary font-bold" : "text-muted-foreground"}`}>Results</span>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main reusable quiz                                                 */
/* ------------------------------------------------------------------ */

const CategoryQuiz = ({ steps, getRecommendation: getRec, sectionId = "quiz", badge = "Interactive · 30 Seconds · Free", heading, subheading, stepLabels }: CategoryQuizProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedThisStep, setSelectedThisStep] = useState<string | null>(null);

  const handleSelect = useCallback((value: string) => {
    setSelectedThisStep(value);
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);
    setTimeout(() => {
      setSelectedThisStep(null);
      if (step < steps.length - 1) setStep(step + 1);
      else setShowResults(true);
    }, 400);
  }, [step, answers, steps.length]);

  const handleBack = () => { if (step > 0) { setSelectedThisStep(null); setStep(step - 1); } };
  const handleRestart = () => { setStep(0); setAnswers([]); setShowResults(false); setSelectedThisStep(null); };

  const recommendation = useMemo(() => (showResults ? getRec(answers) : null), [showResults, answers, getRec]);

  return (
    <section id={sectionId} className="py-28 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      </div>

      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-primary/10 border border-primary/25 rounded-sm mb-6">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-primary" /></span>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary font-display">{badge}</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight font-display mb-5 leading-[0.88]">{heading}</h2>
          <p className="text-muted-foreground text-base md:text-lg font-body max-w-xl mx-auto leading-relaxed">{subheading}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <ProgressBar current={step} total={steps.length} showResults={showResults} labels={stepLabels} />
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 50, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -50, filter: "blur(8px)" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-primary text-primary-foreground font-display font-bold text-sm">{step + 1}</span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold font-display uppercase tracking-tight leading-[0.95] mb-3">{steps[step].question}</h3>
                  <p className="text-muted-foreground font-body text-sm md:text-base max-w-lg">{steps[step].subtitle}</p>
                </div>
                <div className={`grid gap-4 ${steps[step].options.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
                  {steps[step].options.map((option, i) => {
                    const isSelected = selectedThisStep === option.value || answers[step] === option.value;
                    return (
                      <motion.button key={option.value} initial={{ opacity: 0, y: 16, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.45, delay: i * 0.08 }} onClick={() => handleSelect(option.value)}
                        className={`group relative text-left rounded-sm transition-all duration-300 ease-out active:scale-[0.96] overflow-hidden ${isSelected ? "ring-2 ring-primary shadow-[0_0_40px_hsl(var(--primary)/0.25)]" : "hover:shadow-[0_8px_32px_hsl(0_0%_0%/0.4)]"}`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${option.visual} transition-opacity duration-300 ${isSelected ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`} />
                        <div className={`relative z-10 p-6 md:p-7 border rounded-sm transition-colors duration-300 ${isSelected ? "border-primary bg-primary/5" : "border-border bg-card/80 group-hover:border-primary/40"}`}>
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-sm flex items-center justify-center transition-all duration-300 ${isSelected ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-muted text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary"}`}>{option.icon}</div>
                            {option.stat && <span className={`text-[10px] font-display uppercase tracking-widest px-2.5 py-1 rounded-sm border transition-colors duration-300 ${isSelected ? "bg-primary/15 text-primary border-primary/30" : "bg-muted/50 text-muted-foreground border-border group-hover:text-primary group-hover:border-primary/20"}`}>{option.stat}</span>}
                          </div>
                          <span className={`font-display text-lg md:text-xl uppercase tracking-wide font-bold block mb-2 transition-colors duration-200 ${isSelected ? "text-primary" : "group-hover:text-foreground"}`}>{option.label}</span>
                          <span className="text-sm text-muted-foreground font-body leading-relaxed block">{option.description}</span>
                          <div className={`flex items-center gap-1.5 mt-4 text-xs font-display uppercase tracking-widest transition-all duration-300 ${isSelected ? "text-primary" : "text-muted-foreground/0 group-hover:text-muted-foreground"}`}><span>Select</span><ChevronRight className="w-3.5 h-3.5" /></div>
                        </div>
                        {isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }} className="absolute top-4 right-4 z-20"><CheckCircle2 className="w-6 h-6 text-primary drop-shadow-lg" /></motion.div>}
                      </motion.button>
                    );
                  })}
                </div>
                {step > 0 && (
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} onClick={handleBack} className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-display uppercase tracking-widest transition-colors duration-200 active:scale-[0.97]">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <div className="bg-card border border-border rounded-sm overflow-hidden shadow-2xl shadow-primary/5">
                  <div className="relative px-8 pt-10 pb-8 md:px-12 md:pt-12 md:pb-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.12] via-primary/[0.04] to-transparent" />
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 border border-primary/30 rounded-sm mb-5">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-display uppercase tracking-[0.2em] text-primary font-bold">Your Personalized Results</span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-tight leading-[0.9] mb-3">{recommendation!.title}</h3>
                      <p className="text-sm md:text-base text-primary/80 font-display uppercase tracking-wider font-medium">{recommendation!.subtitle}</p>
                    </div>
                    <div className="absolute bottom-0 left-8 right-8 md:left-12 md:right-12 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>

                  <div className="px-8 py-10 md:px-12 md:py-12 space-y-10">
                    <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-2xl">{recommendation!.description}</p>
                    <div className="relative p-5 md:p-6 bg-primary/[0.06] border-l-4 border-l-primary border border-primary/15 rounded-sm">
                      <div className="flex gap-3">
                        <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-display uppercase tracking-[0.2em] text-primary font-bold block mb-1.5">Pro Tip</span>
                          <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed">{recommendation!.tip}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-xs font-display uppercase tracking-[0.2em] text-foreground mb-5 font-bold flex items-center gap-2"><span className="w-8 h-[2px] bg-primary inline-block" />Recommended Reading</h4>
                        <div className="space-y-2.5">
                          {recommendation!.links.map((link, i) => (
                            <motion.a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.08 }}
                              className="group flex items-center justify-between p-4 border border-border rounded-sm hover:border-primary/40 hover:bg-primary/[0.04] transition-all duration-200 active:scale-[0.98]">
                              <div className="flex items-center gap-3 min-w-0"><div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /><span className="font-body font-medium text-sm group-hover:text-primary transition-colors duration-200 truncate">{link.label}</span></div>
                              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                                {link.tag && <span className="hidden sm:inline-flex text-[10px] font-display uppercase tracking-widest px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-sm whitespace-nowrap">{link.tag}</span>}
                                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                      {recommendation!.calculators.length > 0 && (
                        <div>
                          <h4 className="text-xs font-display uppercase tracking-[0.2em] text-foreground mb-5 font-bold flex items-center gap-2"><span className="w-8 h-[2px] bg-primary inline-block" />Crunch Your Numbers</h4>
                          <div className="space-y-2.5">
                            {recommendation!.calculators.map((calc, i) => (
                              <motion.a key={calc.url} href={calc.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.07 }}
                                className="group flex items-center justify-between p-4 bg-primary/[0.04] border border-primary/15 rounded-sm hover:bg-primary/[0.08] hover:border-primary/30 transition-all duration-200 active:scale-[0.97]">
                                <div className="flex items-center gap-3 min-w-0"><Calculator className="w-4 h-4 text-primary/70 flex-shrink-0" /><span className="font-display text-sm uppercase tracking-wide font-semibold group-hover:text-primary transition-colors duration-200 truncate">{calc.label}</span></div>
                                {calc.tag && <span className="text-[10px] font-display uppercase tracking-widest px-2.5 py-0.5 bg-primary/15 text-primary rounded-sm whitespace-nowrap flex-shrink-0 ml-2">{calc.tag}</span>}
                              </motion.a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-border">
                      <a href="https://gearuptofit.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary font-display text-sm uppercase tracking-wider font-bold transition-all duration-200 hover:brightness-110 active:scale-[0.97] glow-red rounded-sm text-primary-foreground">
                        Explore GearUpToFit <ArrowRight className="w-4 h-4" />
                      </a>
                      <button onClick={handleRestart} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-display uppercase tracking-widest transition-colors duration-200 active:scale-[0.97]">
                        <RotateCcw className="w-4 h-4" /> Retake Quiz
                      </button>
                    </div>
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

export default CategoryQuiz;
