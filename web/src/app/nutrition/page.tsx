'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Utensils, Check, ChevronDown, Flame, Fish, Wheat, Droplets } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'
import { createClient } from '@/lib/supabase/client'

export default function NutritionPage() {
  const [nutritionPlan, setNutritionPlan] = useState<any>(null)
  const [checkedMeals, setCheckedMeals] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchNutrition() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Fetch active nutrition plan with meals
      const { data, error } = await supabase
        .from('nutrition_plans')
        .select(`
          *,
          daily_meal_plans (
            *,
            meals (*)
          )
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single()

      if (!error && data) {
         setNutritionPlan(data)
      }
      setLoading(false)
    }

    fetchNutrition()
  }, [])

  const toggleMeal = (mealId: string) => {
    setCheckedMeals({ ...checkedMeals, [mealId]: !checkedMeals[mealId] })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
           <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Utensils className="w-8 h-8 text-primary" />
           </div>
           <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Balancing Macros...</p>
        </div>
      </div>
    )
  }

  if (!nutritionPlan) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <div className="flex-1 flex items-center justify-center p-10">
              <div className="text-center max-w-md">
                 <h2 className="text-3xl font-black mb-4">No Plan Active</h2>
                 <p className="text-muted-foreground text-lg mb-8">Complete your onboarding or contact support to generate your personalized nutrition strategy.</p>
              </div>
          </div>
          <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/5">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-5xl font-black mb-4 tracking-tight leading-none">Nutrition Plan</h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary pl-6">
              Fuelling your body for <span className="text-foreground font-bold italic underline decoration-primary/30 decoration-4">optimal performance</span> and recovery.
            </p>
          </div>

          {/* Daily Goal Card */}
          <div className="bg-card rounded-[2.5rem] border border-border p-10 mb-12 shadow-xl shadow-primary/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10 group-hover:scale-110 transition-transform duration-1000" />
            
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8 ml-1">Daily Targets</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-muted/30 rounded-3xl p-6 border border-border/50 group/item hover:bg-muted transition-colors">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground group-hover/item:text-primary transition-colors">
                  <Flame className="w-4 h-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Calories</p>
                </div>
                <p className="text-3xl font-black text-foreground">{nutritionPlan.daily_calories_target}</p>
              </div>
              
              <div className="bg-muted/30 rounded-3xl p-6 border border-border/50 group/item hover:bg-muted transition-colors">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground group-hover/item:text-primary transition-colors">
                  <Fish className="w-4 h-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Protein</p>
                </div>
                <p className="text-3xl font-black text-foreground">{nutritionPlan.daily_protein_target}g</p>
              </div>

              <div className="bg-muted/30 rounded-3xl p-6 border border-border/50 group/item hover:bg-muted transition-colors">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground group-hover/item:text-primary transition-colors">
                  <Wheat className="w-4 h-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Carbs</p>
                </div>
                <p className="text-3xl font-black text-foreground">{nutritionPlan.daily_carbs_target}g</p>
              </div>

              <div className="bg-muted/30 rounded-3xl p-6 border border-border/50 group/item hover:bg-muted transition-colors">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground group-hover/item:text-primary transition-colors">
                  <Droplets className="w-4 h-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Fat</p>
                </div>
                <p className="text-3xl font-black text-foreground">{nutritionPlan.daily_fat_target}g</p>
              </div>
            </div>
          </div>

          {/* Weekly Interactive Plan */}
          <Accordion.Root type="single" collapsible defaultValue={nutritionPlan.daily_meal_plans[0]?.day_of_week} className="space-y-4">
            {nutritionPlan.daily_meal_plans.map((dayPlan: any) => (
              <Accordion.Item
                key={dayPlan.id}
                value={dayPlan.day_of_week}
                className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between p-8 group text-left">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Utensils className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{dayPlan.day_of_week}</h3>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Balanced Protocol Active</p>
                      </div>
                    </div>
                    <ChevronDown className="w-6 h-6 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                  <div className="px-8 pb-8 space-y-4">
                    {dayPlan.meals.map((meal: any) => (
                      <div
                        key={meal.id}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                          checkedMeals[meal.id]
                            ? 'bg-primary/5 border-primary'
                            : 'bg-muted/30 border-border/50 hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-start gap-6">
                          <button
                            onClick={() => toggleMeal(meal.id)}
                            className={`flex-shrink-0 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all mt-1 ${
                              checkedMeals[meal.id]
                                ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                                : 'border-border bg-background'
                            }`}
                          >
                            {checkedMeals[meal.id] && <Check className="w-5 h-5 stroke-[4]" />}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                               <h4 className="text-xl font-bold">{meal.meal_name}</h4>
                               <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full">{meal.calories} kcal</span>
                            </div>
                            <p className="text-muted-foreground font-medium mb-6 italic leading-relaxed">{meal.foods_description || 'Custom nutrition allocation'}</p>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center p-2 rounded-xl bg-background/50 border border-border/30">
                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-1 tracking-tighter">Protein</p>
                                <p className="font-bold text-sm">{meal.protein}g</p>
                              </div>
                              <div className="text-center p-2 rounded-xl bg-background/50 border border-border/30">
                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-1 tracking-tighter">Carbs</p>
                                <p className="font-bold text-sm">{meal.carbs}g</p>
                              </div>
                              <div className="text-center p-2 rounded-xl bg-background/50 border border-border/30">
                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-1 tracking-tighter">Fat</p>
                                <p className="font-bold text-sm">{meal.fat}g</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </main>

      <Footer />
    </div>
  )
}
