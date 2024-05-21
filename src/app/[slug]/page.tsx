import { Metadata } from "next";
import { getAllBlogSlug, getBlogBySlug } from "../_utils/fetcher";

export async function generateStaticParams() {
	return getAllBlogSlug();
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const blog = await getBlogBySlug(params.slug);
	return {
		title: blog.frontmatter.title,
		creator: blog.frontmatter.author,
		publisher: blog.frontmatter.author,
		description: blog.frontmatter.description,
		openGraph: {
			title: blog.frontmatter.title,
			description: blog.frontmatter.description,
			url: `https://blog.madrimov.uz/${params.slug}`,
			type: "article",
			images: [{ url: blog.frontmatter.preview }],
		},
	};
}

export default async function BlogPage({
	params,
}: {
	params: { slug: string };
}) {
	const blog = await getBlogBySlug(params.slug);
	return <main className="mt-10 prose max-w-none">{blog.content}</main>;
}

