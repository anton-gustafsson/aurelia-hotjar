import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(_: FrameworkConfiguration, callback: (config: HotjarConfig) => void): void {
  let config = new HotjarConfig();
  callback(config);

  if(config.disabled === true) {
    return;
  }

  if (!config.id) {
		throw new Error('Hotjar ID is not defined');
	}

  if (!config.snippetVersion) {
		console.warn('Hotjar Snippet Version is not defined, defaults to version 6');
    config.snippetVersion = 6
	}

  setupHotjar(config);
}

export class HotjarConfig {
    id?: number;
    snippetVersion?: number;
    disabled?: boolean
}

declare global {
  interface Window {
    hj: any;
    _hjSettings: any;
  }
}

function setupHotjar(hotjarConfig: HotjarConfig) {
  (function(h,o,t,j){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:hotjarConfig.id,hjsv:hotjarConfig.snippetVersion};
    
    let a = o.getElementsByTagName('head')[0];
    let r=o.createElement('script');r.async=true;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
};