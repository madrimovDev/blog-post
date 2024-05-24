'use client'
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function TopicItems({ topics }: { topics: string[]}) {
	const search = useSearchParams()
	const topic = search.get('topic')
	return (
		<div className="flex flex-wrap gap-2">
			{topics.map((t) => (
				<Link
					href={`/?topic=${t}`}
					className={clsx("badge cursor-pointer", {
						"badge-primary": topic === t,
						"badge-outline": topic !== t
					})}
					key={t}
				>
					#{t}
				</Link>
			))}
		</div>
	);
}
export default TopicItems