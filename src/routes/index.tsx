import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../components/login-form";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<>
			<div className="container sm:max-w-lg grid gap-8 py-4">
				<h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
					Log In
				</h1>
				<LoginForm />
			</div>
		</>
	);
}
