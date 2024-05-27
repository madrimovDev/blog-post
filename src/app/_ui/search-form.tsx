"use client";

import { useEffect, useRef, useState } from "react";
import { BlogData, getBlogsByTitle } from "../_utils/fetcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
	blogs: BlogData[];
}

export default function SearchForm({ blogs }: Props) {
	const [showDropDown, setShowDropDown] = useState(false);
	const [dropDownData, setDropDownData] = useState<BlogData[]>([]);
	const [typedStr, setTypedStr] = useState("");
	const formRef = useRef<HTMLFormElement>(null);
	const pathname = usePathname();
	const closeDropDown = () => {
		setDropDownData([]);
		setShowDropDown(false);
		setTypedStr("");
		formRef.current?.reset();
	};
	useEffect(() => {
		closeDropDown();
	}, [pathname]);
	return (
		<div className="relative">
			<form
				ref={formRef}
				action={async (formData) => {
					const title = formData.get("search") as string;
					setShowDropDown(true);
					setTypedStr(title);
					setDropDownData(
						blogs.filter((b) =>
							b.frontmatter.title.toLowerCase().includes(title.toLowerCase())
						)
					);
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
					<button
						onClick={closeDropDown}
						className="absolute top-2 right-2 btn btn-xs btn-ghost btn-square"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18 18 6M6 6l12 12"
							/>
						</svg>
					</button>
					{dropDownData.map((d) => {
						const title = d.frontmatter.title;
						const index = title.toLowerCase().indexOf(typedStr.toLowerCase());
						if (index === -1) {
							return title;
						}

						return (
							<Link
								href={d.slug}
								key={d.slug}
							>
								{title.substring(0, index)}
								<mark>{title.substring(index, index + typedStr.length)}</mark>
								{title.substring(index + typedStr.length)}
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}
