// import { hydrateRoot } from "react-dom/client";
// import { Widget } from "./components/Widget";
//@ts-ignore
import WidgetWebComponent from "./web-component";

customElements.define("pid-baq", WidgetWebComponent);



// function initializeWidget() {
//     if (document.readyState !== 'loading') {
//         onReady();
//     } else {
//         document.addEventListener('DOMContentLoaded', onReady);
//     }
// }

// function onReady() {
//     try {
//         const element = document.createElement('div');
//         const shadow = element.attachShadow({ mode: 'open' });
//         const shadowRoot = document.createElement('div');
//         const projectId = getProjectId();

//         shadowRoot.id = 'widget-root';

//         const component = (
//             <Widget projectId={projectId} />
//         );

//         shadow.appendChild(shadowRoot);
//         injectStyle(shadowRoot);
//         hydrateRoot(shadowRoot, component);

//         document.body.appendChild(element);
//     } catch (error) {
//         console.warn('Widget initialization failed:', error);
//     }
// }

// function injectStyle(shadowRoot: HTMLElement) {
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     const fileName = process.env.WIDGET_NAME || 'widget';
//     link.href = process.env.WIDGET_CSS_URL || `/${fileName}.css`;
//     shadowRoot.appendChild(link);
// }

// function getProjectId() {
//     const script = document.currentScript as HTMLScriptElement;
//     const clientKey = script?.getAttribute('data-project-id');

//     if (!clientKey) {
//         throw new Error('Missing data-project-id attribute');
//     }

//     return clientKey;
// }

// initializeWidget();