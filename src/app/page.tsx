import { getBlogs } from "./_utils/fetcher";
import Topics from "./_ui/topics";
import Blogs from "./_ui/blogs";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Welcome to my blogs",
	description:
		"Hello! I will write blogs on interesting topics related to programming on this blog. Among these topics are Frontend, Backend, JavaScript, TypeScript, ReactJS, NextJS, and other programming-related topics. It will be useful for you to use these blogs to stay updated on the latest news in the field of programming.",
};

export default async function BlogsPage() {
	const blogs = await getBlogs();
	return (
		<div className="flex flex-col gap-8">
			<div className="prose max-w-none my-10">
				<h1>Welcome to my blogs</h1>
				<p>
					Hello! I will write blogs on interesting topics related to programming
					on this blog. Among these topics are Frontend, Backend, JavaScript,
					TypeScript, ReactJS, NextJS, and other programming-related topics. It
					will be useful for you to use these blogs to stay updated on the
					latest news in the field of programming.
				</p>
			</div>
			<Topics />
			<Suspense>
				<Blogs blogs={blogs} />
			</Suspense>
		</div>
	);
}
