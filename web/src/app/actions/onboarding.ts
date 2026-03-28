'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { generateInitialPlan } from './plans'

export async function submitOnboarding(formData: Record<string, any>) {
  const supabase = await createClient()

  // 1. Get current Auth User
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('Submission failed: User not authenticated')
    throw new Error('You must be logged in to submit onboarding.')
  }

  // 2. Fetch Goal ID
  const { data: goalData, error: goalError } = await supabase
    .from('goals')
    .select('id')
    .ilike('title', `%${formData.goal.replace('-', ' ')}%`) // Simple matching for id like 'pain-relief'
    .single()

  if (goalError && formData.goal) {
     console.error('Goal matching failed:', goalError)
  }

  // 3. Update User Profile in Database
  const { error: profileError } = await supabase
    .from('users')
    .upsert({
      id: user.id,
      goal_id: goalData?.id,
      profile_data: {
        ...formData,
        submitted_at: new Date().toISOString()
      },
      is_active: true
    })

  if (profileError) {
    console.error('Profile update failed:', profileError)
    throw new Error('Failed to update your profile. Please try again.')
  }

  // 4. Generate Initial AI Plan
  try {
    await generateInitialPlan()
  } catch (err) {
    console.error('Plan generation failed:', err)
    // We continue anyway, as the profile was saved
  }

  // 5. Redirect to Dashboard
  redirect('/home')
}
