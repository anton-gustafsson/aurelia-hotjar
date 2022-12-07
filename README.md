# aurelia-hotjar
Tiny plugin to implement Hotjar into your aurelia web application written in typescript

# Installation
```bash
npm install aurelia-hotjar
```

# Use / Example
```typescript
  import { PLATFORM } from 'aurelia-pal';
  import { HotjarConfig } from 'aurelia-hotjar';
  
  export function configure(aurelia) {
    aurelia.use
      .standardConfiguration()
      .developmentLogging()
      .plugin(PLATFORM.moduleName('aurelia-hotjar'), (configuration: HotjarConfig) => {
        configuration.id = 1234567;
      });
  
    aurelia.start().then(a => a.setRoot());
  }

```
## Configuration
- **id**: Hotjar ID, this will be visible on the hotjar site 

- **snippetVersion** (optional): Hotjar Snippet Version. The current Code Tracking version. Defaults to **6**

- **disabled** (optional): Feature flag to disable the plugin from adding tracking, could be used if you have multiple deployment environments. Defaults to **false**

You can learn more from [Understanding the Tracking Code](https://help.hotjar.com/hc/en-us/articles/115011639927-Understanding-the-Tracking-Code) in the Hotjar docs. Please note that in the tracking code
* Hotjar ID is called hjid 
* Hotjar Snippet Version is called hjsv
