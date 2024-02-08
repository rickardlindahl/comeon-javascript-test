import { Game } from "../types/api";

export function GameItem({
	game,
	onPlayClicked,
}: { game: Game; onPlayClicked: (game: Game) => void }) {
	return (
		<div className="game item">
			<div className="ui small image">
				<img src={game.icon} alt="game-icon" />
			</div>
			<div className="content">
				<div className="header">
					<b className="name">{game.name}</b>
				</div>
				<div className="description">{game.description}</div>
				<div className="extra">
					<button
						className="play ui right floated secondary button inverted"
						type="button"
						onClick={() => {
							onPlayClicked(game);
						}}
					>
						Play
						<i className="right chevron icon" />
					</button>
				</div>
			</div>
		</div>
	);
}
