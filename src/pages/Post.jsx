import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import ReviewComponent from "../components/ReviewComponent";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10 px-4">
            <Container>
                {/* Featured Image with Buttons */}
                <div className="w-full flex justify-center mb-6 relative border border-gray-300 rounded-xl overflow-hidden p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full max-h-[500px] object-contain"
                    />

                    {isAuthor && (
                        <div className="absolute top-4 right-4 flex flex-wrap gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                onClick={deletePost}
                                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2"
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Post Title */}
                <div className="w-full mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        {post.title}
                    </h1>
                </div>

                {/* Post Content */}
                <div className="prose max-w-none text-gray-700">
                    {parse(post.content)}
                </div>

                {/* Review Section */}
                <div className="mt-10 border-t pt-6">
                    <ReviewComponent articleId={post.$id} />
                </div>
            </Container>
        </div>
    ) : null;
}
