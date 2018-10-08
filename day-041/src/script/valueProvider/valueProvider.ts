interface ValueProvider {
  slaves: ValueProvider.Slave[];
  attach(cb: Function);
  detach(cb: Function);
  reset();
  start();
  pause();
}


namespace ValueProvider {
  export interface Reaction {

  }
  export interface Slave {
    element: HTMLElement,
    // function should accept the output of valueprovider,
    // and output an object which is css property and value.
    // (output) => {property: value}
    callback: Function,
  }
}

export default ValueProvider;