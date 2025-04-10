// Dynamically fetch the Firebase API key from an environment variable or secure endpoint
export async function getFirebaseConfig() {
  const response = await fetch('/firebase-config.json');
  if (!response.ok) {
    throw new Error('Failed to load Firebase configuration');
  }
  return await response.json();
}