declare interface InitArgs {
  /**
   * Can be used to reset the configuration
   */
  force?: boolean;
}

declare interface ImportArgs {
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

/**
 *  Generate sample jota-web.config.js
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
 * @requires module figma-dash-fonts
 *
 * Download and link fonts
 */
export function linkFonts(): void;

/**
 *  Execute all commands
 */
export function doAll(
  args?: InitArgs &
    ConvertArgs & {
      /**
       * Download and link fonts
       */
      link?: boolean;
    }
): Promise<void>;
