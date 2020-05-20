import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getBooks, getBook, addBook, updateBook, deleteBook } from './controllers.ts';

const router = new Router();

// fetch all books
router.get('/api/v1/books', getBooks);

// fetch single book
router.get('/api/v1/books/:id', getBook);

// add new book
router.post('/api/v1/books', addBook);

// update a book
router.put('/api/v1/books/:id', updateBook);

// delete a book
router.delete('/api/v1/books/:id', deleteBook);

export default router;
