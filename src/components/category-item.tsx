import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Category } from "../types/api";

type CategoryItemProps = {
	category: Category;
	isActive: boolean;
};

export function CategoryItem({ category, isActive }: CategoryItemProps) {
	return (
		<Button asChild variant={isActive ? "default" : "secondary"}>
			<Link
				to="/casino/explore"
				search={(prev) => ({ ...prev, categoryId: category.id })}
			>
				{category.name}
			</Link>
		</Button>
	);
}
