import Link from "next/link";
import SearchForm from "./search-form";
import { getBlogs } from "../_utils/fetcher";

export default async function Navbar() {
	const blogs = await getBlogs()
	return (
		<>
			<div className="sticky z-10 top-4 mb-10 glass rounded-box navbar bg-base-100">
				<div className="flex-1">
					<a className="btn btn-ghost text-xl">{"</>"}</a>
					<Link
						href="https://madrimov.uz"
						target="_blank"
						className="ml-4 font-bold text-sm sm:text-base"
					>
						Portfolio
					</Link>
					<Link
						href="/"
						className="ml-4 font-bold text-sm sm:text-base"
					>
						Blogs
					</Link>
				</div>
				<div className="flex-none hidden sm:block">
					<SearchForm blogs={blogs} />
				</div>
			</div>
		</>
	);
}
