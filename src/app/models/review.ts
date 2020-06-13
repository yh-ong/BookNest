export class Review {
    id: string;
    comments: [
        {
            rate: string;
            comment: string;
            date: string;
        }
    ]
}