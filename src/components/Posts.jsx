import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const Posts = () => {
    const { posts } = useContext(PostContext);

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
            {posts.map((post) => (
                <Card key={post.id} className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {post.title}
                        </Typography>
                        <Typography>{post.body}</Typography>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default Posts;
