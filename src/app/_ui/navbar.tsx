import Link from "next/link";
import Script from "next/script";
import SearchForm from "./search-form";

export default function Navbar() {
	return (
		<>
			<div className="sticky z-10 top-4 mb-10 glass rounded-box navbar bg-base-100">
				<div className="flex-1">
					<a className="btn btn-ghost text-xl">{"</>"}</a>
					<Link
						href="/"
						className="ml-4 font-bold"
					>
						Blogs
					</Link>
				</div>
				<div className="flex-none">
					<SearchForm />
				</div>
			</div>
		</>
	);
}
