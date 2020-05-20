import { Book } from './model.ts';

let books: Book[] = [
  {
    id: '1',
    title: 'Dzikir Pagi dan Petang',
    description: 'Buku panduan dzikir berdasarkan sunnah',
    price: 4500
  },
  {
    id: '2',
    title: 'Sifat Shalat Nabi',
    description: 'Buku panduan sholat berdasarkan sunnah Nabi',
    price: 50000
  },
  {
    id: '3',
    title: 'Al Quran - Al Hidayah',
    description: 'Alquran dengan terjemahan per kata',
    price: 90000
  },
];

// get all books => /api/v1/books
export const getBooks = ({response} : {response: any}) => {
  response.body = {
    success: true,
    data: books
  }
} 

// get single book => /api/v1/books/:id
export const getBook = ({params, response}: {params: {id: string}, response: any}) => {
  const book: Book | undefined = books.find(b => b.id === params.id);

  if(book) {
    response.status = 200;
    response.body = {
      success: true,
      data: book
    }
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: `Book with id ${params.id} is not found`
    }
  }
}

// post add book => /api/v1/books
export const addBook = async ({request, response}: {request: any, response: any}) => {
  const body = await request.body();

  if(!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: 'No data sent'
    }
  } else {
    const book: Book = body.value;
    const id = Math.random() + Math.random();
    book.id = id.toString();
    books.push(book);

    response.status = 201;
    response.body = {
      success: true,
      data: books
    }
  }
}

// put update book => /api/v1/books/:id
export const updateBook = async ({params, request, response}: {params: {id: string}, request: any, response: any}) => {
  const book: Book | undefined = books.find(b => b.id === params.id);
  
  if(book) {
    const body = await request.body();
    const updatedBook: {id?: string, title?: string, description?: string, price?: number} = body.value;
    
    books = books.map(b => b.id === params.id ? { ...b, ...updatedBook } : b);

    response.status = 201;
    response.body = {
      success: true,
      data: books
    }

  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: 'No data is found'
    }
  }
}

// delete single book => /api/v1/books/:id 
export const deleteBook = ({params, response}: {params: {id: string}, response: any}) => {
  const book: Book | undefined = books.find(b => b.id === params.id);

  if(book) {
    books = books.filter(b => b.id !== params.id);

    response.status = 201;
    response.body = {
      success: true,
      data: books
    }
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: 'No data is found'
    }
  }
}
