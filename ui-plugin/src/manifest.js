import manifest from '@neos-project/neos-ui-extensibility';

import './plugin.css';
import makeNormanNodelyPlugin from "./NormanNodelyPlugin";

manifest('Shel.Neos.SubTrees:TabbedPageTree', {}, (globalRegistry, { frontendConfiguration }) => {
    const containerRegistry = globalRegistry.get('containers');
    const normanNodelyConfig = frontendConfiguration['Shel.Neos.Norman.Nodely:Plugin'];

    containerRegistry.set('PrimaryToolbar/Left/Brand', makeNormanNodelyPlugin(normanNodelyConfig));
});
