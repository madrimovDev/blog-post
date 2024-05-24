import Link from "next/link";
import { getBlogs } from "../_utils/fetcher";
import Topics from "./topics";

export default async function ContentList() {
	const blogs = await getBlogs();
	return (
		<div className="sticky top-40 flex flex-col gap-4 border-l border-neutral pl-4 ml-4 ">
			{blogs.map((b) => {
				return (
					<Link
						key={b.slug}
						href={b.slug}
					>
						<div className="bg-neutral p-4 rounded-md shadow-md">
							<h4 className="font-bold text-sm">{b.frontmatter.title}</h4>
							<p className="text-xs text-nowrap text-ellipsis overflow-hidden mt-2">
								{b.frontmatter.description}
							</p>
						</div>
					</Link>
				);
			})}
			<Topics />
		</div>
	);
}
