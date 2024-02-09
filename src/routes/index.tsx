import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../components/login-form";
import { z } from "zod";
import { NOT_LOGGED_IN } from "../lib/codes";

const indexSearchSchema = z.object({
	error: z.enum([NOT_LOGGED_IN]).optional(),
});

export const Route = createFileRoute("/")({
	component: Index,
	validateSearch: indexSearchSchema,
});

function Index() {
	const { error } = Route.useSearch();

	return (
		<>
			<div className="container sm:max-w-lg">
				<LoginForm />
				{error === NOT_LOGGED_IN && <p>You must be logged in to play games</p>}
			</div>
		</>
	);
}
