import { createFileRoute } from "@tanstack/react-router";
import { PostScreen } from "@/components/post-screen";

export const Route = createFileRoute("/post")({
  component: PostScreen,
});
