import { createLazyFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../components/login-form";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<>
			<LoginForm />
			<div className="ingame" style={{ display: "none" }}>
				<div className="ui grid centered">
					<div className="three wide column">
						<div className="ui right floated secondary button inverted">
							<i className="left chevron icon" />
							Back
						</div>
					</div>
					<div className="ten wide column">
						<div id="game-launch" />
					</div>
					<div className="three wide column" />
				</div>
			</div>
		</>
	);
}
