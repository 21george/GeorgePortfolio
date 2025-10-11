import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

export const useTextAnimation = (options = {}) => {
  const splitInstances = useRef([]);

  const defaultOptions = {
    y: 20,
    autoAlpha: 0,
    stagger: 0.05,
    duration: 0.6,
    ease: "power2.out",
    delay: 0,
    splitType: "chars",
    ...options
  };

  const animateText = useCallback((selector, customOptions = {}) => {
    const finalOptions = { ...defaultOptions, ...customOptions };
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector) 
      : [selector];

    elements.forEach((element, index) => {
      if (!element) return;

      // Set initial opacity
      gsap.set(element, { opacity: 1 });

      // Create SplitText instance
      const split = SplitText.create(element, { type: finalOptions.splitType });
      splitInstances.current.push(split);

      // Animate each character/word/line
      gsap.from(split[finalOptions.splitType], {
        y: finalOptions.y,
        autoAlpha: finalOptions.autoAlpha,
        stagger: finalOptions.stagger,
        duration: finalOptions.duration,
        ease: finalOptions.ease,
        delay: finalOptions.delay + (index * 0.1)
      });
    });
  }, [defaultOptions]);

  const animateMultipleTexts = useCallback((selectors, baseDelay = 0) => {
    selectors.forEach((config, index) => {
      const { selector, options = {} } = typeof config === 'string' 
        ? { selector: config, options: {} } 
        : config;
      
      animateText(selector, {
        ...options,
        delay: baseDelay + (index * 0.1)
      });
    });
  }, [animateText]);

  const cleanup = useCallback(() => {
    splitInstances.current.forEach(split => {
      if (split && split.revert) {
        split.revert();
      }
    });
    splitInstances.current = [];
  }, []);

  return {
    animateText,
    animateMultipleTexts,
    cleanup
  };
};