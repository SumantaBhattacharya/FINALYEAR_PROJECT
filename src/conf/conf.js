const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteReviewsCollectionId: String(import.meta.env.VITE_APPWRITE_REVIEWS_COLLECTION_ID),
    TINY_API_KEY: String(import.meta.env.VITE_TINYMCE_ID), // Tiny API key
    GEMINI_API_KEY: String(import.meta.env.VITE_GEMINI_API_KEY)
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf