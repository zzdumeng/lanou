namespace Play {

  // const $: (string) => Element = document.querySelector.bind(document)
  const $ = document.querySelector;
  const $$: (string) => NodeList = document.querySelectorAll.bind(document)

  function f(s: string, b: number): string {
    
    return (this.a + s).repeat(b);
  }
  f.bind
  // document.querySelector
  function main() {
    const h2 = $('')
    console.log("hello play");
  }

  main()
}
