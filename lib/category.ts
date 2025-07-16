import { appwriteConfig, databases } from "./appwrite";

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );

    return categories.documents;
  } catch (error: any) {
    throw new Error("Failed to fetch categories", error);
  }
};
