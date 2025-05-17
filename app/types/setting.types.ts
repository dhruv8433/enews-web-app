export interface WebTheme {
    background: {
        navigation: string;
        card: string;
        header: string;
        body: string;
        button: string;
    };
    text: {
        primary: string;
        secondary: string;
        heading: string;
        card: string;
        button: string;
        border: string;
    };
    icon: {
        default: string;
        main: string;
    };
    _id: string;
    name: string;
    created_at: string;
    updated_at: string;
    __v: number;
}

export interface WebConfig {
    fontFamily: string;
    fontSizeBase: string;
    headingFontSize: string;
    borderRadius: string;
    themes: WebTheme[];
}

export interface WebSettings {
    _id: string;
    name: string;
    footerText: string;
    googleAdsenseCode: string;
    headerLogo: string;
    footerLogo: string;
    themeName: string;
    config: WebConfig;
    created_at: string;
    updated_at: string;
    __v: number;
}

export interface WebSettingsResponse {
    statusCode: number;
    data: {
        webSettings: WebSettings;
    };
    message: string;
    success: boolean;
}
