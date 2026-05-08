export const jsSnippets = {
  function: [
    `function debounce(fn, delay) {\n  let timer = null;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  };\n}`,
    `function throttle(func, limit) {\n  let inThrottle;\n  return function(...args) {\n    if (!inThrottle) {\n      func.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}`,
    `function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  const clone = Array.isArray(obj) ? [] : {};\n  for (const key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      clone[key] = deepClone(obj[key]);\n    }\n  }\n  return clone;\n}`,
    `function flattenArray(arr) {\n  return arr.reduce((flat, item) => {\n    return flat.concat(\n      Array.isArray(item) ? flattenArray(item) : item\n    );\n  }, []);\n}`,
    `function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}`,
    `function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    return function(...moreArgs) {\n      return curried.apply(this, args.concat(moreArgs));\n    };\n  };\n}`,
    `function pipe(...fns) {\n  return function(value) {\n    return fns.reduce((acc, fn) => fn(acc), value);\n  };\n}`,
    `function retry(fn, retries = 3, delay = 1000) {\n  return new Promise((resolve, reject) => {\n    const attempt = (n) => {\n      fn().then(resolve).catch((err) => {\n        if (n <= 0) return reject(err);\n        setTimeout(() => attempt(n - 1), delay);\n      });\n    };\n    attempt(retries);\n  });\n}`,
  ],
  class: [
    `class EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n  on(event, listener) {\n    if (!this.events[event]) {\n      this.events[event] = [];\n    }\n    this.events[event].push(listener);\n    return this;\n  }\n  emit(event, data) {\n    const listeners = this.events[event] || [];\n    listeners.forEach(fn => fn(data));\n  }\n}`,
    `class LinkedList {\n  constructor() {\n    this.head = null;\n    this.size = 0;\n  }\n  append(value) {\n    const node = { value, next: null };\n    if (!this.head) {\n      this.head = node;\n    } else {\n      let current = this.head;\n      while (current.next) current = current.next;\n      current.next = node;\n    }\n    this.size++;\n  }\n}`,
    `class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const val = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    if (this.cache.size > this.capacity) {\n      this.cache.delete(this.cache.keys().next().value);\n    }\n  }\n}`,
  ],
  loop: [
    `const results = [];\nfor (let i = 0; i < items.length; i++) {\n  if (items[i].active) {\n    results.push(items[i].value * 2);\n  }\n}\nreturn results.filter(Boolean);`,
    `const grouped = items.reduce((acc, item) => {\n  const key = item.category;\n  if (!acc[key]) acc[key] = [];\n  acc[key].push(item);\n  return acc;\n}, {});`,
    `for (const [key, value] of Object.entries(config)) {\n  if (typeof value === 'string') {\n    process.env[key] = value;\n  } else if (typeof value === 'object') {\n    Object.assign(merged, value);\n  }\n}`,
    `const unique = [...new Set(items)];\nconst filtered = unique.filter((item) => {\n  return item.score >= threshold && !excluded.includes(item.id);\n});\nreturn filtered.sort((a, b) => b.score - a.score);`,
  ],
  async: [
    `async function fetchUser(id) {\n  try {\n    const res = await fetch('/api/users/' + id);\n    if (!res.ok) throw new Error('Not found');\n    const data = await res.json();\n    return { success: true, data };\n  } catch (err) {\n    return { success: false, error: err.message };\n  }\n}`,
    `async function fetchWithRetry(url, retries = 3) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      const response = await fetch(url);\n      if (response.ok) return await response.json();\n    } catch (error) {\n      if (i === retries - 1) throw error;\n      await new Promise(r => setTimeout(r, 1000 * (i + 1)));\n    }\n  }\n}`,
    `async function processQueue(tasks) {\n  const results = [];\n  for (const task of tasks) {\n    try {\n      const result = await task();\n      results.push({ status: 'fulfilled', value: result });\n    } catch (error) {\n      results.push({ status: 'rejected', reason: error });\n    }\n  }\n  return results;\n}`,
  ],
  algo: [
    `function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
    `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}`,
    `function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[arr.length - 1];\n  const left = arr.filter(x => x < pivot);\n  const right = arr.filter(x => x > pivot);\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}`,
  ],
  oop: [
    `class Animal {\n  constructor(name, sound) {\n    this.name = name;\n    this.sound = sound;\n  }\n  speak() {\n    return this.name + ' says ' + this.sound;\n  }\n}\nclass Dog extends Animal {\n  constructor(name) {\n    super(name, 'woof');\n  }\n  fetch(item) {\n    return this.name + ' fetches ' + item;\n  }\n}`,
    `class Observable {\n  constructor() {\n    this.observers = new Set();\n  }\n  subscribe(observer) {\n    this.observers.add(observer);\n    return () => this.observers.delete(observer);\n  }\n  notify(data) {\n    this.observers.forEach(fn => fn(data));\n  }\n}`,
  ],
  symbol: [
    `const obj = { key: "value", nested: { a: [1, 2, 3] } };\nconst arr = [{ id: 1 }, { id: 2 }, { id: 3 }];\nconst fn = (x) => x * 2;\nconst str = \`Hello \${name}!\`;`,
    `if (a === b && c !== d) {\n  result = (x > 0) ? x : -x;\n  items.push({ ...defaults, ...overrides });\n  callback?.(result);\n}`,
    `const { name, age = 25 } = user;\nconst [first, ...rest] = items;\nconst merged = { ...obj1, ...obj2 };\nexport default { get, set, delete: remove };`,
    `switch (action.type) {\n  case 'INCREMENT': return { ...state, count: state.count + 1 };\n  case 'DECREMENT': return { ...state, count: state.count - 1 };\n  case 'RESET': return { ...state, count: 0 };\n  default: return state;\n}`,
  ],
  pattern: [
    `const router = {\n  routes: new Map(),\n  get(path, handler) {\n    this.routes.set(path, handler);\n  },\n  resolve(path) {\n    const handler = this.routes.get(path);\n    if (handler) return handler();\n    return null;\n  }\n};`,
    `const middleware = (req, res, next) => {\n  const start = Date.now();\n  res.on('finish', () => {\n    const duration = Date.now() - start;\n    console.log(req.method, req.url, res.statusCode, duration + 'ms');\n  });\n  next();\n};`,
  ],
};
