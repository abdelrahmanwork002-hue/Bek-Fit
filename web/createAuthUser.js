// script to create test user directly into database
const { Client } = require('pg');

async function addUser() {
  const connectionString = "postgresql://postgres.jrquvdxljubokjbghtam:t%2FBa3uaWG%2FRg%2FGR@aws-1-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    
    console.log("Connected to DB, attempting to insert user...");

    const checkRes = await client.query("SELECT id FROM auth.users WHERE email = 'abdelrahman.work002@gmail.com'");

    if (checkRes.rows.length === 0) {
      const email = 'abdelrahman.work002@gmail.com';
      const password = 'Pass@Pass2';

      await client.query(`
        INSERT INTO auth.users (
          instance_id,
          id,
          aud,
          role,
          email,
          encrypted_password,
          email_confirmed_at,
          recovery_sent_at,
          last_sign_in_at,
          raw_app_meta_data,
          raw_user_meta_data,
          created_at,
          updated_at,
          confirmation_token,
          email_change,
          email_change_token_new,
          recovery_token
        ) VALUES (
          '00000000-0000-0000-0000-000000000000',
          uuid_generate_v4(),
          'authenticated',
          'authenticated',
          $1,
          crypt($2, gen_salt('bf')),
          now(),
          NULL,
          NULL,
          '{"provider":"email","providers":["email"]}',
          '{"full_name":"Abdelrahman"}',
          now(),
          now(),
          '',
          '',
          '',
          ''
        )
      `, [email, password]);
      console.log("Created user in auth.users.");
    } else {
       const userId = checkRes.rows[0].id;
       await client.query(`UPDATE auth.users SET encrypted_password = crypt($1, gen_salt('bf')) WHERE id = $2`, ['Pass@Pass2', userId]);
       console.log("Updated existing user password.");
    }

    // Since we created the user, the trigger public.handle_new_user() will have fired
    // Or if it didn't, let's just make sure they exist in public.users and flag as admin
    await client.query(`UPDATE public.users SET is_admin = true WHERE email = 'abdelrahman.work002@gmail.com'`);
    console.log("Assigned Admin rights to test user.");

  } catch (err) {
    console.error("Database operation failed:", err);
  } finally {
    await client.end();
  }
}

addUser();
