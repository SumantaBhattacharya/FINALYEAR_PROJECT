import conf from "../conf/conf.js";
import {
  Client,
  ID,
  Databases,
  Storage,
  Query,
  Permission,
  Role,
} from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    const projectId = conf.appwriteProjectId;
    const bucketId = conf.appwriteBucketId;

    const baseUrl = conf.appwriteUrl.endsWith("/v1")
      ? conf.appwriteUrl
      : `${conf.appwriteUrl}/v1`;

    const imageUrl = `${baseUrl}/storage/buckets/${bucketId}/files/${fileId}/download?project=${projectId}`;
    // console.log("Generated image URL:", imageUrl);
    return imageUrl;
  }

  async createReview({ articleId, userId, rating, comment, createdAt }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteReviewsCollectionId, // Verify this ID
        ID.unique(),
        {
          articleId,
          userId,
          rating,
          comment,
          createdAt,
        },
        [
          Permission.read(Role.any()), // Adjust permissions as needed
          Permission.delete(Role.user(userId)),
          Permission.update(Role.user(userId)),
        ]
      );
    } catch (error) {
      console.error("Appwrite service :: createReview :: error", error);
      throw error; // Propagate the error
    }
  }

  // Get all reviews for a specific article (post)
  async getReviewsByArticle(articleId) {
    console.log("Attempting to fetch reviews for article:", articleId);
    console.log("Using database ID:", conf.appwriteDatabaseId);
    console.log("Using collection ID:", conf.appwriteReviewsCollectionId);
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteReviewsCollectionId,
        [Query.equal("articleId", articleId)]
      );
      console.log("Reviews response:", response);
      return response;
    } catch (error) {
      console.log("Appwrite service :: getReviewsByArticle :: error", error);
      // return false;
      throw error;
    }
  }

  async updateReview(reviewId, { rating, comment }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteReviewsCollectionId,
        reviewId,
        {
          rating,
          comment,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateReview :: error", error);
      throw error;
    }
  }

  async deleteReview(reviewId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteReviewsCollectionId,
        reviewId
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteReview :: error", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
