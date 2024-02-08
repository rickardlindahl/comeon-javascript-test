import { Link } from "@tanstack/react-router";
import { Category } from "../types/api";

type CategoryItemProps = {
	category: Category;
	isActive: boolean;
};

export function CategoryItem({ category, isActive }: CategoryItemProps) {
	return (
		<Link
			className={`category item button secondary inverted ${
				isActive ? "active" : ""
			}`}
			to="/casino/explore"
			search={(prev) => ({ ...prev, filterCategories: category.id })}
		>
			<div className="content">
				<div className="header">{category.name}</div>
			</div>
		</Link>
	);
}
