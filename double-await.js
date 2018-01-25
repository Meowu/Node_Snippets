// 3 ways to handle the double promise with fetch() and async + await 

const url = 'https://api.github.com/users/meowu'

async function get() {
  // 1. tack a promise onto the end
  const d1 = await fetch(url).then(data => data.json())

  // 2. Double await, BEDMAS rules everything around me
  // BEDMAS: Brackets Exponents Division Multiplication Addition Subtraction
  const d2 = await (await fetch(url)).json()

  // 3. capture promise in a variable
  // this could give you better line number errors
  const data = await fetch(url)

  // then convert it on next line
  const d3 = await data.json()

  // 4. create a utility function that returns the .json() promise
  const d4 = await getJSON(url)
}

function getJSON(...buffer) {
  return fetch(...buffer).then(data => data.json())
}

// asyncPipe
const asyncPipe = (...fns) => x => (
  fns.reduce(async (y, f) => f(await y), x)
)

// Compose monads
const composeM = method  => (...ms) => ms.reduce((f, g) => x => g(x)[method](f))

const composePromise = composeM('then')