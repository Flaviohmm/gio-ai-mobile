export interface Feature {
    emoji: string;
    title: string;
    description: string;
}

export type ScreenType = 'home' | 'editor';

export interface ImageResult {
    uri: string;
    prompt: string;
    timestamp: number;
}
