import { DetailedLayout, LayoutPanelSlot, ModuleManager, ModuleParamKey, PanelRegistry } from "@/__lib__/layout";
import { useSearchParams } from "@/util";
import { useEffect, useState } from "react";
import {
    SampleModuleInfo,
    setupSampleModule,
    SampleListPanelInfo,
    SampleDetailPanelInfo,
} from "./module";

export const SampleAppInfo = {
    name: 'sample' as const,
};

export const SampleApp = () => {
    const { params, updateSearchParams } = useSearchParams();
    const moduleKey = params.get(ModuleParamKey) ?? '';
    const primaryPanelKey = params.get(LayoutPanelSlot.PRIMARY) ?? '';
    const secondaryPanelKey = params.get(LayoutPanelSlot.SECONDARY) ?? '';
    const extensionPanelKey = params.get(LayoutPanelSlot.EXTENSION) ?? '';

    const [primaryPanel, setPrimaryPanel] = useState<PanelRegistry>();
    const [secondaryPanel, setSecondaryPanel] = useState<PanelRegistry>();
    const [extensionPanel, setExtensionPanel] = useState<PanelRegistry>();

    useEffect(() => {
        const moduleManager = ModuleManager.getModuleManager();
        moduleManager.setupModule(SampleModuleInfo.name, setupSampleModule());

        const hasModuleKey = !!moduleKey;
        const hasPanelKey = primaryPanelKey || secondaryPanelKey || extensionPanelKey;

        if (!hasModuleKey || !hasPanelKey) {
            // redirect to default route of this app
            updateSearchParams(prev => {
                if (!hasModuleKey) {
                    prev.set(ModuleParamKey, SampleModuleInfo.name);
                }
                if (!hasPanelKey) {
                    prev.set(LayoutPanelSlot.PRIMARY, SampleListPanelInfo.name);
                    prev.set(LayoutPanelSlot.SECONDARY, SampleDetailPanelInfo.name);
                    prev.delete(LayoutPanelSlot.EXTENSION);
                }
                return prev;
            });
        } else {
            // mapping module & panel key to get Component for displaying
            const moduleRegistry = moduleManager.getModule(moduleKey);
            setPrimaryPanel(moduleRegistry?.getPanel(primaryPanelKey));
            setSecondaryPanel(moduleRegistry?.getPanel(secondaryPanelKey));
            setExtensionPanel(moduleRegistry?.getPanel(extensionPanelKey));
        }
    }, [moduleKey, primaryPanelKey, secondaryPanelKey, extensionPanelKey]);

    return (
        <DetailedLayout
            PrimaryComponent={primaryPanel?.Component}
            SecondaryComponent={secondaryPanel?.Component}
            ExtensionComponent={extensionPanel?.Component}
        />
    );
};
