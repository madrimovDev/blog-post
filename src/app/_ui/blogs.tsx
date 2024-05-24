"use client";
import Image from "next/image";
import { BlogData } from "../_utils/fetcher";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { memo, useMemo } from "react";

interface Props {
	blogs: BlogData[];
}
 function Blogs({ blogs }: Props) {
	const search = useSearchParams();
	const topic = search.get('topic')
	const filteredBlogs = useMemo(() => {
		return blogs.filter(blog => {
			if(topic && topic == 'all') return blog
			if(topic && blog.frontmatter.topic.includes(topic)) return blog
		})
	}, [topic, blogs])
	return (topic ? filteredBlogs : blogs).map((blog) => (
		<Link
			key={blog.slug}
			href={blog.slug}
		>
			<div className="card card-side bg-base-200 shadow-xl">
				<figure>
					<Image
						src={blog.frontmatter.preview}
						width={300}
						height={200}
						className="!h-auto"
						alt={blog.frontmatter.title}
					/>
				</figure>
				<div className="card-body">
					<div className="flex gap-4 mb-4">
						<p className="flex-none">
							{new Date(blog.frontmatter.publishDate).toLocaleDateString("ru")}
						</p>
						<p className="flex-none font-bold">{blog.frontmatter.author}</p>
					</div>
					<h2 className="card-title">{blog.frontmatter.title}</h2>
					<p className="">{blog.frontmatter.description}</p>
					<p className="h-full flex items-end">
						{blog.frontmatter.topic.map((t) => (
							<span
								key={t}
								className="badge"
							>
								{t}
							</span>
						))}
					</p>
				</div>
			</div>
		</Link>
	));
}

export default memo(Blogs)