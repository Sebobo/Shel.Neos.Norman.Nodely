import manifest from '@neos-project/neos-ui-extensibility';

import './plugin.css';
import NormanNodelyPlugin from "./NormanNodelyPlugin";

manifest('Shel.Neos.SubTrees:TabbedPageTree', {}, (globalRegistry, { configuration }) => {
    const containerRegistry = globalRegistry.get('containers');

    containerRegistry.set('PrimaryToolbar/Left/Brand', NormanNodelyPlugin);
});
