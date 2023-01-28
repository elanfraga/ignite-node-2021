import { Category } from '../../entities/Category';
import { CategoriesRepository } from '../../repositories/implemantations/CategoriesRepository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute(): Category[] {
    const cotegories = this.categoriesRepository.list();

    return cotegories;
  }
}

export { ListCategoriesUseCase };
