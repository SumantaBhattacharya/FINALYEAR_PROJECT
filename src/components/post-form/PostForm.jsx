import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { generateImageDescription } from "../../utils/generateImageDescription";

export default function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            status: post?.status || "active",
            content: post?.content || "",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState(null);

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        if (post) {
            reset({
                title: post.title,
                slug: post.$id,
                status: post.status,
                content: post.content || "",
            });
        }
    }, [post, reset]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                const newSlug = slugTransform(value.title);
                setValue("slug", newSlug, { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
        const plainTextContent = data.content.replace(/<[^>]*>/g, "");

        if (plainTextContent.length > 5000) {
            console.error("Content exceeds the 5000 character limit.");
            return;
        }

        try {
            const postData = {
                title: data.title,
                slug: data.slug,
                content: data.content,
                status: data.status,
                featuredImage: post?.featuredImage || null,
            };

            const imageFile = data.image?.[0];

            // Upload image if new one is selected
            if (imageFile) {
                const uploadedFile = await appwriteService.uploadFile(imageFile);
                postData.featuredImage = uploadedFile?.$id;

                // Delete old image if updating and new image is uploaded
                if (post?.featuredImage && post?.featuredImage !== uploadedFile?.$id) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
            }

            let dbPost;

            if (post) {
                dbPost = await appwriteService.updatePost(post.$id, postData);
            } else {
                postData.userId = userData.$id;
                dbPost = await appwriteService.createPost(postData);
            }

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("Submission error:", error);
            setGenerationError(error.message);
        }
    };

    const handleGenerateDescription = async () => {
        try {
            setIsGenerating(true);
            setGenerationError(null);

            const imageFile = watch("image")?.[0];
            if (!imageFile) throw new Error("Please select an image first");

            const description = await generateImageDescription(imageFile);

            const currentContent = watch("content") || "";
            const newContent = `${currentContent}<p><em>${description}</em></p>`;
            setValue("content", newContent, { shouldValidate: true });
        } catch (error) {
            console.error("Generation error:", error);
            setGenerationError(error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap" dir="ltr">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    {...register("title", { required: "Title is required" })}
                    error={errors.title?.message}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    {...register("slug", { required: "Slug is required" })}
                    error={errors.slug?.message}
                />

                <RTE
                    label="Content:"
                    name="content"
                    control={control}
                    defaultValue={post?.content || ""}
                />
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {
                        validate: {
                            validType: (files) =>
                                !files?.[0] || files?.[0]?.type.startsWith("image/") || "Invalid image format",
                            maxSize: (files) =>
                                !files?.[0] || files?.[0]?.size <= 5 * 1024 * 1024 || "Max file size is 5MB",
                        },
                        required: !post ? "Image is required" : false,
                    })}
                    error={errors.image?.message}
                />

                {post?.featuredImage && (
                    <div className="w-full mt-4 mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Button
                    type="button"
                    bgColor="bg-blue-500"
                    onClick={handleGenerateDescription}
                    disabled={isGenerating}
                    className="rounded-2xl border-2 border-dashed border-black bg-[#DBEAFE] px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none
    mt-4 mb-4 flex items-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            stroke="black"
                            fill="black"
                            d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                        />
                        <path
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            stroke="black"
                            fill="black"
                            d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                        />
                        <path
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            stroke="black"
                            fill="black"
                            d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                        />
                    </svg>
                    {isGenerating ? "Generating..." : "Generate Image Description"}
                </Button>


                {generationError && (
                    <div className="mt-2 text-red-500 text-sm">{generationError}</div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: "Status is required" })}
                    error={errors.status?.message}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full mt-4"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
