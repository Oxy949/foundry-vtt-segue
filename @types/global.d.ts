declare global {
    var game: Game;
    var ui: Ui;
    var Hooks: Hooks;

    interface Game {
        i18n: {
            localize(key: string): string;
        };
        settings: {
            register(module: string, key: string, data: any): void;
            get(module: string, key: string): any;
            set(module: string, key: string, value: any): Promise<any>;
        };
        user?: User;
        scenes?: Collection<Scene>;
        modules: Collection<{ version?: string }>;
        segue?: SegueApi;
    }

    interface Ui {
        notifications: {
            info(message: string): void;
            warn(message: string): void;
            error(message: string): void;
        };
    }

    interface Hooks {
        on(hook: string, fn: Function): void;
        off(hook: string, fn: Function): void;
        once(hook: string, fn: Function): void;
        call(hook: string, ...args: any[]): boolean;
        callAll(hook: string, ...args: any[]): boolean;
    }

    interface User {
        isGM: boolean;
    }

    interface Scene extends foundry.abstract.Document {
        name: string;
        active: boolean;
        getFlag(scope: string, key: string): any;
        setFlag(scope: string, key: string, value: any): Promise<any>;
        activate(): Promise<void>;
    }

    interface SegueStartOptions {
        force?: boolean;
    }

    interface SegueSceneConfig {
        enabled: boolean;
        displayText: string;
        fadeOutDuration: number;
        textDisplayDuration: number;
        fadeInDuration: number;
        textSize: number;
        textColor: string;
        fontFamily: string;
        textFadeInDuration: number;
        textFadeOutDuration: number;
    }

    interface SegueApi {
        start(scene: string | Scene, options?: SegueStartOptions): Promise<void>;
        execute(scene: string | Scene, options?: SegueStartOptions): Promise<void>;
        getSceneConfiguration(scene: string | Scene): SegueSceneConfig | undefined;
    }

    namespace foundry {
        namespace abstract {
            interface Document {
                getFlag(scope: string, key: string): any;
                setFlag(scope: string, key: string, value: any): Promise<any>;
                id?: string;
                _id?: string;
                documentName?: string;
            }
        }
    }


    interface JQuery {
        data(key: string): any;
        find(selector: string): JQuery;
        append(content: string | JQuery | HTMLElement): JQuery;
        animate(properties: object, duration?: number, easing?: string): JQuery;
        promise(): Promise<JQuery>;
        css(properties: object): JQuery;
        remove(): JQuery;
    }

    interface Collection<T> extends Map<string, T> {
        get(key: string): T | undefined;
    }

    interface ContextMenuEntry {
        name: string;
        icon?: string;
        condition?(li: JQuery): boolean;
        callback?(li: JQuery): void | Promise<void>;
    }

    const $: JQueryStatic;
    interface JQueryStatic {
        (selector: string | HTMLElement | JQuery): JQuery;
        (html: string): JQuery;
    }

    function loadTemplates(paths: string[]): Promise<void>;

    interface FontOptions {
        value: string;
        label: string;
    }

    type FontArray = FontOptions[];
}

export {};
