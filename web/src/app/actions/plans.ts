'use server'

import { createClient } from '@/lib/supabase/server'

export async function generateInitialPlan() {
  const supabase = await createClient()

  // 1. Get current Auth User and their profile
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) throw new Error('User not authenticated')

  const { data: userData, error: userDataError } = await supabase
    .from('users')
    .select('*, goals(*)')
    .eq('id', user.id)
    .single()

  if (userDataError || !userData) throw new Error('Failed to retrieve user data')

  // 2. Create the base Plan
  const { data: plan, error: planError } = await supabase
    .from('plans')
    .insert({ user_id: user.id, is_active: false })
    .select()
    .single()

  if (planError) throw new Error('Failed to initialize plan record')

  // 3. Create the initial Plan Version
  const { data: version, error: versionError } = await supabase
    .from('plan_versions')
    .insert({ 
      plan_id: plan.id, 
      version_number: 1, 
      is_active: true,
      ai_logic_snapshot: {
        goal: userData.goals?.title || 'General Fitness',
        logic: 'Initial AI allocation based on onboarding',
        reason: 'Kickstarting your journey with foundational movements.'
      }
    })
    .select()
    .single()

  if (versionError) throw new Error('Failed to create initial plan version')

  // 4. Create Routines for Day 1
  // In a real app, this would be a loop for 7 days with AI logic
  const day1Title = userData.goals?.title === 'Pain Relief' ? 'Foundation Mobility' : 'Kickstart Strength'

  const { data: routine, error: routineError } = await supabase
    .from('routines')
    .insert({
      plan_version_id: version.id,
      day_number: 1,
      title: day1Title
    })
    .select()
    .single()

  if (routineError) throw new Error('Failed to create day 1 routine')

  // 5. Generate Nutrition Plan
  const calorieTarget = userData.goals?.title === 'Weight Management' ? 1600 : 2200
  const proteinTarget = userData.goals?.title === 'Improve Fitness' ? 150 : 100

  const { data: nutritionPlan, error: nutritionPlanError } = await supabase
    .from('nutrition_plans')
    .insert({
      user_id: user.id,
      plan_version_id: version.id,
      daily_calories_target: calorieTarget,
      daily_protein_target: proteinTarget,
      daily_carbs_target: 200,
      daily_fat_target: 70
    })
    .select()
    .single()

  if (nutritionPlanError) throw new Error('Failed to generate nutrition plan')

  // Create Day 1 Meal Plan (Mock)
  const { data: dailyMealPlan, error: dailyMealPlanError } = await supabase
    .from('daily_meal_plans')
    .insert({
      nutrition_plan_id: nutritionPlan.id,
      day_of_week: 'Monday'
    })
    .select()
    .single()

  if (!dailyMealPlanError && dailyMealPlan) {
    await supabase.from('meals').insert([
      { daily_meal_plan_id: dailyMealPlan.id, meal_type: 'Breakfast', meal_name: 'Oatmeal', calories: 350, protein: 12, carbs: 55, fat: 8 },
      { daily_meal_plan_id: dailyMealPlan.id, meal_type: 'Lunch', meal_name: 'Grilled Chicken Salad', calories: 520, protein: 40, carbs: 10, fat: 35 },
      { daily_meal_plan_id: dailyMealPlan.id, meal_type: 'Dinner', meal_name: 'Baked Salmon', calories: 480, protein: 35, carbs: 5, fat: 30 }
    ])
  }

  // 6. Fetch and Assign Exercises (Mock AI distribution)
  const exerciseTitles = userData.goals?.title === 'Pain Relief' 
     ? ['Bird Dog', 'Dead Bug', 'Plank']
     : ['Barbell Squat', 'Push-ups', 'Plank']

  const { data: exercises, error: exerciseError } = await supabase
    .from('exercises')
    .select('id')
    .in('title', exerciseTitles)

  if (exerciseError || !exercises) throw new Error('Failed to allocate exercises')

  // 6. Bulk Insert Routine Exercises
  const routineExerciseData = exercises.map((ex, idx) => ({
    routine_id: routine.id,
    exercise_id: ex.id,
    order_index: (idx + 1) * 10,
    sets: 3,
    reps: 12,
    rest_seconds: 60
  }))

  const { error: finalError } = await supabase
    .from('routine_exercises')
    .insert(routineExerciseData)

  if (finalError) throw new Error('Failed to assign movements to your routine')

  return { plan_id: plan.id, version_id: version.id }
}
