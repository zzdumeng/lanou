function isLucky(n: number, luck: number, l: number = 1) {
  const d = 10 ** (l-1)

  const divider = parseInt(String(n / d), 10)
  const m = Number(divider) % 10 
  return m === luck
}

function is7(n: number) {
  // return  n % 10 === 7
  return isLucky(n, 7)
}

function sum() {

}


function main() {
  let sum = 0
  for(let i=0; i< 100; i++) {
    if(is7(i)) {
      console.log(i)
      sum += i
    }
  }
  console.log('sum is ', sum)
}

main()