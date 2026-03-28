'use client';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Utensils, Check, ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';

export default function NutritionPlan() {
  const [checkedMeals, setCheckedMeals] = useState<Record<string, boolean>>({});

  const weekPlan = [
    {
      day: 'Monday',
      meals: [
        { id: 'm1-1', name: 'Breakfast', foods: 'Oatmeal with berries and almonds', calories: 350, protein: 12, carbs: 55, fat: 8 },
        { id: 'm1-2', name: 'Lunch', foods: 'Grilled chicken with quinoa and vegetables', calories: 520, protein: 40, carbs: 45, fat: 15 },
        { id: 'm1-3', name: 'Snack', foods: 'Greek yogurt with honey', calories: 180, protein: 15, carbs: 20, fat: 5 },
        { id: 'm1-4', name: 'Dinner', foods: 'Baked salmon with sweet potato and broccoli', calories: 480, protein: 35, carbs: 40, fat: 18 },
      ],
    },
    {
      day: 'Tuesday',
      meals: [
        { id: 'm2-1', name: 'Breakfast', foods: 'Scrambled eggs with whole grain toast', calories: 380, protein: 25, carbs: 35, fat: 15 },
        { id: 'm2-2', name: 'Lunch', foods: 'Turkey wrap with hummus and vegetables', calories: 450, protein: 30, carbs: 50, fat: 12 },
        { id: 'm2-3', name: 'Snack', foods: 'Apple with peanut butter', calories: 200, protein: 8, carbs: 25, fat: 8 },
        { id: 'm2-4', name: 'Dinner', foods: 'Lean beef stir-fry with brown rice', calories: 510, protein: 38, carbs: 48, fat: 16 },
      ],
    },
  ];

  const toggleMeal = (mealId: string) => {
    setCheckedMeals({ ...checkedMeals, [mealId]: !checkedMeals[mealId] });
  };

  const getDayTotals = (meals: typeof weekPlan[0]['meals']) => {
    return meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fat: acc.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl mb-2">Nutrition Plan</h1>
            <p className="text-gray-400">
              Your personalized meal plan designed to support your fitness goals
            </p>
          </div>

          {/* Daily Target */}
          <div className="bg-[#0f0f0f] rounded-2xl border border-white/10 p-6 mb-8">
            <h2 className="text-xl mb-4">Daily Targets</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Calories</p>
                <p className="text-2xl text-[#6dccc4]">1850</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Protein</p>
                <p className="text-2xl text-[#6dccc4]">120g</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Carbs</p>
                <p className="text-2xl text-[#6dccc4]">180g</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Fat</p>
                <p className="text-2xl text-[#6dccc4]">65g</p>
              </div>
            </div>
          </div>

          {/* Weekly Plan */}
          <Accordion.Root type="single" collapsible defaultValue="Monday">
            {weekPlan.map((dayPlan) => {
              const totals = getDayTotals(dayPlan.meals);
              return (
                <Accordion.Item
                  key={dayPlan.day}
                  value={dayPlan.day}
                  className="bg-[#0f0f0f] rounded-2xl border border-white/10 mb-4 overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <Utensils className="w-6 h-6 text-[#6dccc4]" />
                        <div className="text-left">
                          <h3 className="text-xl">{dayPlan.day}</h3>
                          <p className="text-sm text-gray-400">
                            {totals.calories} cal • {totals.protein}g protein
                          </p>
                        </div>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200 accordion-chevron" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden accordion-content">
                    <div className="px-6 pb-6 space-y-4">
                      {dayPlan.meals.map((meal) => (
                        <div
                          key={meal.id}
                          className="bg-[#1a1a1a] rounded-lg p-4 border border-white/10"
                        >
                          <div className="flex items-start gap-4">
                            <button
                              onClick={() => toggleMeal(meal.id)}
                              className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors mt-1 ${
                                checkedMeals[meal.id]
                                  ? 'border-[#6dccc4] bg-[#6dccc4]'
                                  : 'border-white/20'
                              }`}
                            >
                              {checkedMeals[meal.id] && (
                                <Check className="w-4 h-4 text-[#1a1a1a]" />
                              )}
                            </button>
                            <div className="flex-1">
                              <h4 className="text-lg mb-1">{meal.name}</h4>
                              <p className="text-gray-400 mb-3">{meal.foods}</p>
                              <div className="grid grid-cols-4 gap-2 text-sm">
                                <div>
                                  <p className="text-gray-400">Calories</p>
                                  <p className="text-[#6dccc4]">{meal.calories}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400">Protein</p>
                                  <p className="text-[#6dccc4]">{meal.protein}g</p>
                                </div>
                                <div>
                                  <p className="text-gray-400">Carbs</p>
                                  <p className="text-[#6dccc4]">{meal.carbs}g</p>
                                </div>
                                <div>
                                  <p className="text-gray-400">Fat</p>
                                  <p className="text-[#6dccc4]">{meal.fat}g</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Day Totals */}
                      <div className="bg-[#6dccc4]/10 rounded-lg p-4 border border-[#6dccc4]/20">
                        <h4 className="text-sm text-gray-400 mb-2">Daily Totals</h4>
                        <div className="grid grid-cols-4 gap-2 text-sm">
                          <div>
                            <p className="text-gray-400">Calories</p>
                            <p className="text-[#6dccc4]">{totals.calories}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Protein</p>
                            <p className="text-[#6dccc4]">{totals.protein}g</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Carbs</p>
                            <p className="text-[#6dccc4]">{totals.carbs}g</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Fat</p>
                            <p className="text-[#6dccc4]">{totals.fat}g</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
        </div>
      </div>

      <Footer />

      <style>{`
        .accordion-content {
          overflow: hidden;
        }
        .accordion-content[data-state='open'] {
          animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
        }
        .accordion-content[data-state='closed'] {
          animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
        }
        .accordion-chevron[data-state='open'] {
          transform: rotate(180deg);
        }
        @keyframes slideDown {
          from {
            height: 0;
          }
          to {
            height: var(--radix-accordion-content-height);
          }
        }
        @keyframes slideUp {
          from {
            height: var(--radix-accordion-content-height);
          }
          to {
            height: 0;
          }
        }
      `}</style>
    </div>
  );
}
