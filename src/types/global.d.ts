interface Position {
    x: number;
    y: number;
}


interface AppOptions {
    __debug__?: any;

    lang: string;
    tilesFontSize: number;

    split: {
        isSplit: boolean;
        language: string;
        byNoOfChars: number;
    };
}
