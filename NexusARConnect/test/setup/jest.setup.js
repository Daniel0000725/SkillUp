/**
 * Configuration de base pour Jest
 */

// Configuration des variables d'environnement
process.env.NODE_ENV = 'test';

// Mocks globaux
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mocks pour les API navigateur
global.matchMedia = jest.fn(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Mocks pour les observateurs
class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}
global.ResizeObserver = ResizeObserverMock;

class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
    this.observe = jest.fn(element => {
      setTimeout(() => {
        this.callback([{ isIntersecting: true, target: element }]);
      }, 100);
    });
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
  }
}
global.IntersectionObserver = IntersectionObserverMock;

// Configuration des timers
jest.useFakeTimers();

// Utilitaires de test
global.simulate = {
  click: (element, options = {}) => {
    const event = new Event('click', { bubbles: true, cancelable: true, ...options });
    element.dispatchEvent(event);
    return event;
  },
  change: (element, value) => {
    element.value = value;
    const event = new Event('change', { bubbles: true });
    element.dispatchEvent(event);
    return event;
  },
  keyDown: (element, key, options = {}) => {
    const event = new KeyboardEvent('keydown', {
      key,
      code: `Key${key.toUpperCase()}`,
      keyCode: key.charCodeAt(0),
      which: key.charCodeAt(0),
      bubbles: true,
      cancelable: true,
      ...options,
    });
    element.dispatchEvent(event);
    return event;
  },
};

// Extensions de test
expect.extend({
  toHaveTextContent(received, text) {
    const textContent = received.textContent;
    const pass = textContent.includes(text);
    return {
      pass,
      message: () => `Expected element to have text content containing "${text}", but found "${textContent}"`,
    };
  },
  toBeInTheDocument(received) {
    const pass = document.body.contains(received);
    return {
      pass,
      message: () => `Expected element ${pass ? 'not ' : ''}to be in the document`,
    };
  },
});

// Nettoyage après chaque test
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
  document.body.innerHTML = '';
});
