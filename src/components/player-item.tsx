import { Player } from "../types/api";

export function PlayerItem({ player }: { player: Player }) {
	return (
		<div className="player item">
			<img className="ui avatar image" src={`/${player.avatar}`} alt="avatar" />

			<div className="content">
				<div className="header">
					<b className="name">{player.name}</b>
				</div>
				<div className="description event">{player.event}</div>
			</div>
		</div>
	);
}
