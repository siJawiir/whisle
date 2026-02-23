declare module "typewriter-effect/dist/core" {
  export interface Options {
    strings?: string[];
    cursor?: string;
    delay?: "natural" | number;
    deleteSpeed?: "natural" | number;
    loop?: boolean;
    autoStart?: boolean;
    devMode?: boolean;
    skipAddStyles?: boolean;
    pauseFor?: number;
    onCreateTextNode?: (character: string, textNode: Text) => Text | null;
    onRemoveNode?: (options: { character: string; textNode: Text }) => void;
  }

  export default class Typewriter {
    constructor(container: HTMLElement | null, options: Options);
    typeString(string: string): Typewriter;
    pauseFor(ms: number): Typewriter;
    deleteAll(speed?: "natural" | number): Typewriter;
    start(): Typewriter;
    stop(): Typewriter;
  }
}
