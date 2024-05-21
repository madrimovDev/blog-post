import Link from "next/link";
import { getBlogs } from "./_utils/fetcher";
import Image from "next/image";

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
			{blogs.map((blog, i) => (
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
									{new Date(blog.frontmatter.publishDate).toLocaleDateString(
										"ru"
									)}
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
			))}
		</div>
	);
}

