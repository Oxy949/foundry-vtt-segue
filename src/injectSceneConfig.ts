import { prepareContext } from "./util/handlers";
import { MODULE_ID } from "./constants";

type SceneConfigClass = any & {
    __segueInjected?: boolean;
};

function getDefaultSceneConfig(): SceneConfigClass {
    const FoundrySceneConfig = (foundry.applications as any).sheets.SceneConfig as SceneConfigClass;
    const DocumentSheetConfig = (foundry.applications as any).apps?.DocumentSheetConfig;
    const sheetClassConfig = DocumentSheetConfig?.getSheetClassesForSubType?.("Scene");
    const defaultClassId = sheetClassConfig?.defaultClass;
    const sceneSheetClasses = (CONFIG as any).Scene?.sheetClasses ?? {};

    const DefaultSceneConfig = Object.values(sceneSheetClasses)
        .flatMap(sheetClasses => Object.entries(sheetClasses as Record<string, any>))
        .find(([id, sheetClass]) => id === defaultClassId || sheetClass?.id === defaultClassId)
        ?.[1]?.cls;

    return DefaultSceneConfig?.prototype instanceof FoundrySceneConfig ? DefaultSceneConfig : FoundrySceneConfig;
}

function wrapPrepareContext(config: SceneConfigClass): void {
    const originalPrepareContext = config.prototype._prepareContext;

    config.prototype._prepareContext = async function (...args: any[]): Promise<any> {
        return prepareContext.call(this, originalPrepareContext.bind(this), ...args);
    };
}

/**
 * Injects new scene tab and content into SceneConfig
 * new tab reference: https://foundryvtt.wiki/en/development/guides/Tabs-and-Templates/Tabs-in-AppV2
 */
export function injectSceneConfig(): void {
    const config = getDefaultSceneConfig();

    if (config.__segueInjected) {
        return;
    }
    config.__segueInjected = true;

    const parts = config.PARTS as Record<string, any>;

    // Rearrange footer, otherwise Save Changes button appears above the config hbs content
    const footer = parts.footer;
    delete parts.footer;
    parts.segue = {
        template: `modules/${MODULE_ID}/templates/scene-config.hbs`
    };
    parts.footer = footer;

    // tab definition
    config.TABS.sheet.tabs.push({
        id: "segue",
        label: "Segue",
        icon: "fa-regular fa-route",
    });

    wrapPrepareContext(config);
}
