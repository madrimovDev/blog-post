import Link from "next/link";
import { getBlogs } from "./_utils/fetcher";
import Image from "next/image";
import Topics from "./_ui/topics";
import { useSearchParams } from "next/navigation";
import Blogs from "./_ui/blogs";
import { Suspense } from "react";

export default async function BlogsPage() {
	const blogs = await getBlogs();
	return (
		<div className="flex flex-col gap-8">
			<div className="prose max-w-none my-10">
				<h1>Welcome to my blogs</h1>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
					inventore tempore eveniet? Ab omnis numquam quisquam aliquam quas,
					doloribus consequuntur temporibus corporis, perspiciatis, eligendi
					ullam voluptas quaerat blanditiis officiis. Nam!
				</p>
			</div>
			<Topics />
			<Suspense>
				<Blogs blogs={blogs} />
			</Suspense>
		</div>
	);
}
