declare interface InitArgs {
  /**
   * Can be used to reset the configuration
   */
  force?: boolean;

  /**
   * If `undefined` the system will resolve to your cwd
   */
  path?: string;
}

declare interface ImportArgs {
  /**
   * If `true` the api will generate separated files for each category and item
   */
  separatedTokens?: boolean;

  /**
   * Convert tokens after import
   */
  convert?: boolean;

  /**
   * Handle a specific module
   */
  module?: string;
}

declare interface ConvertArgs {
  /**
   * Handle a specific module
   */
  module?: string;
}

declare interface DoAllArgs extends InitArgs, ConvertArgs {
  /**
   * Download and link fonts
   */
  link?: boolean;

  /**
   * If `true` the api will generate separated files for each category and item
   */
  separatedTokens?: boolean;
}

/**
 *  Generate sample meiuca-engine.config.js
 */
export function init(args?: InitArgs): void;

/**
 *  Generate tokens from Figma
 */
export function importFromFigma(args?: ImportArgs): Promise<void>;

/**
 *  Convert style tokens
 */
export function convertTokens(args?: ConvertArgs): void;

/**
 * @requires meiuca-engine-fonts
 *
 * Download and link fonts
 */
export function linkFonts(): Promise<void>;

/**
 *  Execute all commands
 */
export function doAll(args?: DoAllArgs): Promise<void>;
