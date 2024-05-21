"use client";
import { usePathname, useRouter } from "next/navigation";

export default function BreadCrumbs() {
	const pathname = usePathname();
	const router = useRouter();
	const isHome = pathname === "/";
	if (isHome) return null;
	return (
		<div className="my-4">
			<button
				onClick={() => router.back()}
				className="btn btn-ghost btn-primary btn-sm"
			>
				Go back
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-4 h-4"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
					/>
				</svg>
			</button>
		</div>
	);
}

