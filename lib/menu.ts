import { GetMenuParams } from "@/type";
import { Query } from "react-native-appwrite";
import { appwriteConfig, databases } from "./appwrite";

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal(`categories`, category));

    if (query) queries.push(Query.search(`name`, query));

    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    );
    if (!menus.documents) {
      throw new Error("No documents found");
    }
    return menus.documents;
  } catch (error: any) {
    throw new Error("Failed to fetch menu", error);
  }
};
