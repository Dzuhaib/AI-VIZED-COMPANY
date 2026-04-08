declare module 'animejs' {
  interface AnimeParams {
    targets?: string | object | object[] | NodeList | null
    duration?: number
    delay?: number | ((el: Element, i: number, total: number) => number)
    easing?: string
    loop?: boolean | number
    direction?: string
    autoplay?: boolean
    [key: string]: unknown
  }

  interface AnimeInstance {
    play(): void
    pause(): void
    restart(): void
    reverse(): void
    seek(time: number): void
    add(params: AnimeParams, offset?: string | number): AnimeInstance
    finished: Promise<void>
  }

  function anime(params: AnimeParams): AnimeInstance
  namespace anime {
    function timeline(params?: AnimeParams): AnimeInstance
    function stagger(
      value: number | string,
      options?: { start?: number; from?: string | number; direction?: string; easing?: string; grid?: number[]; axis?: string }
    ): (el: Element, i: number) => number
    function set(targets: AnimeParams['targets'], params: AnimeParams): void
    function get(targets: AnimeParams['targets'], prop: string): string | number
    function setDashoffset(el: Element): number
    function random(min: number, max: number): number
    const running: AnimeInstance[]
    function remove(targets: AnimeParams['targets']): void
    let speed: number
  }

  export = anime
}
