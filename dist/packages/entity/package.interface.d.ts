export interface Package {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    sentDate: string;
    deliveredDate?: string;
}
