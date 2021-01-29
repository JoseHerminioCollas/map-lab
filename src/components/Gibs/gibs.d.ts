namespace A {
  export interface B {
    abc: string
  }
}
declare namespace GibsNasa {
  export interface Product {
    description: string
    imageLayer: string
    dateRange: string[]
    tileMatrixSets: string[]
    format: string
  }
  export interface Products {
    multibandImagery: Product[]
  }
  export interface GibsSelectorCallback {
    (product: GibsNasa.Product, date: string): void
  }
  export interface GibsSelectorComponent {
    ({ selectGibsProduct }: { selectGibsProduct: GibsSelectorCallback }): React.Element
  }
  export interface GibsMap {
    (props): React.Element
  }
}
export as namespace GibsNasa