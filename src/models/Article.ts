import { Interface } from "readline";
import { ArticlePage } from "../Pages/ArticlePage";

export interface Article {
    id: string,
    title: string,
    content: string,
    publishedDate: string,
    votes: number,
}