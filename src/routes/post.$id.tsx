import { createFileRoute } from "@tanstack/react-router";
import { PostScreen } from "@/components/post-screen";

export const Route = createFileRoute("/post/$id")({
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  return <PostScreen id={id} />;
}
