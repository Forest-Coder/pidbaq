import ReactDOM from "react-dom/client";
import { Widget } from "./components/Widget";

// Define types for component props
interface WidgetProps {
    [key: string]: string;
}

const normalizeAttribute = (attribute: string): string => {
    return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

// Custom element class definition
class WidgetWebComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback(): void {
        const props: WidgetProps = this.getPropsFromAttributes();
        const root = ReactDOM.createRoot(this.shadowRoot!);
        root.render(<Widget projectId={props["projectId"]} />);
    }

    private getPropsFromAttributes(): WidgetProps {
        const props: WidgetProps = {};
        
        // Iterate through attributes and convert to camelCase
        for (const attr of this.attributes) {
            const normalizedKey = normalizeAttribute(attr.name);
            props[normalizedKey] = attr.value;
        }
        
        return props;
    }
}

export default WidgetWebComponent;