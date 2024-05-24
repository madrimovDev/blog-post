"use client";

import { useState } from "react";
import { BlogData, getBlogsByTitle } from "../_utils/fetcher";

export default function SearchForm() {
	const [showDropDown, setShowDropDown] = useState(false);
	const [dropDownData, setDropDownData] = useState<BlogData[]>([]);
	return (
		<div className="relative">
			<form
				action={async (formData) => {
					const title = formData.get("search") as string;
					// const blogs = await getBlogsByTitle(title);
					setShowDropDown(true);
					// setDropDownData(blogs);
				}}
			>
				<label className="input input-bordered  flex items-center gap-2">
					<input
						type="text"
						name="search"
						className="grow"
						placeholder="Search"
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						className="w-4 h-4 opacity-70"
					>
						<path
							fillRule="evenodd"
							d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
							clipRule="evenodd"
						/>
					</svg>
				</label>
			</form>
			{showDropDown && (
				<div className="absolute w-full top-full mt-2 bg-neutral p-4 rounded-md shadow-md">
					
				</div>
			)}
		</div>
	);
}
