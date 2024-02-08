import { Link } from "@tanstack/react-router";
import { Game } from "../types/api";

export function GameItem({ game }: { game: Game }) {
	return (
		<div className="game item">
			<div className="ui small image">
				<img src={`/${game.icon}`} alt="game-icon" />
			</div>
			<div className="content">
				<div className="header">
					<b className="name">{game.name}</b>
				</div>
				<div className="description">{game.description}</div>
				<div className="extra">
					<Link
						to="/games/$code"
						params={{ code: game.code }}
						className="play ui right floated secondary button inverted"
					>
						Play
						<i className="right chevron icon" />
					</Link>
				</div>
			</div>
		</div>
	);
}
