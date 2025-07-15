export type FeedbackFormType = {
    name : string,
    content: string,
    issueDate: string,
    usagePeriod: string[],
    feedbackType: string,
    appVersion: string,
    screenShot: any,
    
    // not required
    gender?: string,
    feedbackSection?: string[],
    rating?: number,
    recommend?: number,
    satisfaction?: string,
    themeColor?: any,
    deviceInfo?: string[],
}

