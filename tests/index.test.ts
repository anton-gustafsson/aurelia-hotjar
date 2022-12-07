import { describe, expect, it, vi, beforeEach } from 'vitest'
import { configure, HotjarConfig } from './../src/index'
import { FrameworkConfiguration, Aurelia, Loader } from 'aurelia-framework';

describe('configure', () => {

    beforeEach(() => {
        let elements = document.getElementsByTagName('script');
        for (let i = 0; i < elements.length; i++) {
            elements[i].remove();
        }
    });

    let frameworkConfig: FrameworkConfiguration = new FrameworkConfiguration(new Aurelia(new Loader()));

    it('Ok - Should add script tag', () => {
        
        configure(frameworkConfig, (config: HotjarConfig) => {
            config.id = 123,
            config.snippetVersion = 6
        });
    
        expect(document.querySelectorAll('script')[0].src).toBe('https://static.hotjar.com/c/hotjar-123.js?sv=6')
    })

    it('Disabled set to false - Should add script tag', () => {
        
        configure(frameworkConfig, (config: HotjarConfig) => {
            config.id = 123,
            config.snippetVersion = 6,
            config.disabled = false
        });
    
        expect(document.querySelectorAll('script')[0].src).toBe('https://static.hotjar.com/c/hotjar-123.js?sv=6')
    })

    it('No Hotjar ID - Should throw an error', () => {
        expect(() => {
            configure(frameworkConfig, () => {});
        }).toThrow('Hotjar ID is not defined');
    })

    it('No snippet version - Should warn in console and add script tag', () => {
        console.warn = vi.fn();
        
        configure(frameworkConfig, (config: HotjarConfig) => {
            config.id = 456
        });

        expect(console.warn).toBeCalledWith("Hotjar Snippet Version is not defined, defaults to version 6")
        expect(document.querySelectorAll('script')[0].src).toBe('https://static.hotjar.com/c/hotjar-456.js?sv=6')
    })

    it('Disabled - Should not add script tag', () => {
        configure(frameworkConfig, (config: HotjarConfig) => {
            config.id = 123,
            config.snippetVersion = 6,
            config.disabled = true
        });
        expect(document.querySelectorAll('script').length).toBe(0)
    })
})