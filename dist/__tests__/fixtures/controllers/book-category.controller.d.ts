import { Book, Category } from '../models';
import { BookRepository } from '../repositories';
export declare class BookCategoryController {
    bookRepository: BookRepository;
    constructor(bookRepository: BookRepository);
    getCategory(id: typeof Book.prototype.id): Promise<Category>;
}
