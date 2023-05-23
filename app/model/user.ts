export async function createUserProfile(user, supabase) {
  try {
    // Insert the user profile data into the database
    const { data, error } = await supabase.from("profile").insert([
      {
        id: user.id,
        username: user.user_metadata.name,
        email: user.email,
        // Additional profile data can be added here
        cart: [],
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    console.log("User profile created:", data);
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
}
