import { Category } from '../../model/Category';
import { CategoriesRepository } from '../../repositories/CategoriesRepository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute(): Category[] {
    const cotegories = this.categoriesRepository.list();

    return cotegories;
  }
}

export { ListCategoriesUseCase };
