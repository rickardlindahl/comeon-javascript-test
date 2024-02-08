import { Category } from "../types/api";

export function CategoryItem({
	category,
	onCategoryClick,
}: { category: Category; onCategoryClick: (category: Category) => void }) {
	function handleCategoryClick() {
		onCategoryClick(category);
	}

	return (
		<div
			className="category item"
			onClick={handleCategoryClick}
			onKeyUp={handleCategoryClick}
		>
			<div className="content">
				<div className="header">{category.name}</div>
			</div>
		</div>
	);
}
