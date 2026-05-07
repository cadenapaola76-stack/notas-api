import CategoryService from '../../application/use-cases/category.service.js';
import {describe, jest} from '@jest/globals';

const mockCategoryRepository = { 
save: jest.fn(), 

};

describe('CategoryService - Pruebas Unitarias', () => {
let categoryService;

    beforeEach(() => {
        //limpiamos la memoria
        jest.clearAllMocks();
        categoryService = new CategoryService(mockCategoryRepository);
    });

    describe('createCategory', () =>{
    test('Crear: crear y guardar una categoria correctamente', async () => {
        const data = { description: 'Categoria 1', userId: 'user_123' };
        mockCategoryRepository.save.mockResolvedValue({ id: 1, ...data });

         const result = await categoryService.createCategory(data);

        expect(mockCategoryRepository.save).toHaveBeenCalledTimes(1);
        expect(result.description).toBe('Categoria 1');
        expect(result.userId).toBe('user_123');
    });

    
    });
});