import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import lua from "react-syntax-highlighter/dist/cjs/languages/prism/lua";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("lua", lua);
const contentDir = path.join(process.cwd(), "src/app/_mdx-content");

export async function getBlogBySlug(slug: string) {
	const fileName = slug + ".mdx";
	const filePath = path.join(contentDir, fileName);
	const fileContent = fs.readFileSync(filePath, "utf8");
	const { frontmatter, content } = await compileMDX<{
		title: string;
		author: string;
		publishDate: string;
		preview: string;
		description: string;
		topic: string;
	}>({
		source: fileContent,
		options: { parseFrontmatter: true },
		components: {
			code({ className, ...props }) {
				const hasLang = /language-(\w+)/.exec(className || "");
				return hasLang ? (
					<SyntaxHighlighter
						style={oneDark}
						language={hasLang[1]}
						PreTag="div"
						className="mockup-code scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded"
						showLineNumbers={true}
						useInlineStyles={true}
					>
						{String(props.children).replace(/\n$/, "")}
					</SyntaxHighlighter>
				) : (
					<code
						className={className}
						{...props}
					/>
				);
			},
		},
	});
	return {
		frontmatter: {
			...frontmatter,
			topic: frontmatter.topic.split(","),
		},
		content,
		slug: path.parse(fileName).name,
	};
}
export type BlogData = Awaited<ReturnType<typeof getBlogBySlug>>

export async function getBlogs() {
	const files = fs.readdirSync(contentDir);
	const blogs = await Promise.all(
		files.map(async (file) => await getBlogBySlug(path.parse(file).name))
	);

	return blogs;
}

export async function getTopics() {
	const blogs = await getBlogs()
	const topics = blogs.map((b) => b.frontmatter.topic).flat();
	const clearedTopics = topics
	.filter((item, index) => {
		return topics.indexOf(item) === index;
	})
		.map((t) => t.trim());
	return clearedTopics
}

export async function getBlogsByTitle(title: string) {
	const files = fs.readdirSync(contentDir);
	const blogs = await Promise.all(
		files.map(async (file) => await getBlogBySlug(path.parse(file).name))
	);

	return blogs.filter((file) =>
		file.frontmatter.title
			.toLocaleLowerCase()
			.includes(title.toLocaleLowerCase())
	);
}

export function getAllBlogSlug() {
	const files = fs.readdirSync(contentDir);
	const slugs = files.map((file) => ({ slug: path.parse(file).name }));
	return slugs;
}
