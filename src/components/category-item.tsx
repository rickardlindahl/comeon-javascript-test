import { Category } from "../types/api";

export function CategoryItem({ category }: { category: Category }) {
	return (
		<div className="category item">
			<div className="content">
				<div className="header">{category.name}</div>
			</div>
		</div>
	);
}
