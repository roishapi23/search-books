export interface BookInfo{
  id: string,
  title: string,
  subtitle: string,
  authors: string[],
  publishedDate: string,
  previewLink: string,
  imageLinks: {smallThumbnail: string, thumbnail:string },
  categories: string[],
  language:string,
  description?: string,
  textSnippet?: string,
  pageCount?: number,
}
