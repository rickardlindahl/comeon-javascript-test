import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Category } from "../types/api";

type CategoryItemProps = {
	category: Category;
	isActive: boolean;
};

export function CategoryItem({ category, isActive }: CategoryItemProps) {
	return (
		<Button asChild variant={isActive ? "default" : "outline"}>
			<Link
				to="/casino/explore"
				search={(prev) => ({ ...prev, categoryId: category.id })}
			>
				<div className="content">
					<div className="header">{category.name}</div>
				</div>
			</Link>
		</Button>
	);
}
