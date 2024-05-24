import { Suspense } from "react";
import { getBlogs, getTopics } from "../_utils/fetcher";
import TopicItems from "./topic-items";

export default async function Topics() {
	const clearedTopics = await getTopics();
	clearedTopics.unshift("all");
	return (
		<Suspense>
			<TopicItems topics={clearedTopics} />
		</Suspense>
	);
}
