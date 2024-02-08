import { Category } from "../types/api";

type CategoryItemProps = {
	category: Category;
	onCategoryClick: (category: Category) => void;
	isActive: boolean;
};

export function CategoryItem({
	category,
	onCategoryClick,
	isActive,
}: CategoryItemProps) {
	function handleCategoryClick() {
		onCategoryClick(category);
	}

	return (
		<div
			className={`category item ${isActive ? "active" : ""}`}
			onClick={handleCategoryClick}
			onKeyUp={handleCategoryClick}
		>
			<div className="content">
				<div className="header">{category.name}</div>
			</div>
		</div>
	);
}
