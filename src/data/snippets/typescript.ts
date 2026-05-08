export const tsSnippets = {
  function: [
    `interface User {\n  id: number;\n  name: string;\n  email: string;\n  createdAt: Date;\n}\n\nfunction createUser(data: Partial<User>): User {\n  return {\n    id: Math.floor(Math.random() * 10000),\n    name: data.name ?? 'Anonymous',\n    email: data.email ?? '',\n    createdAt: new Date(),\n  };\n}`,
    `function groupBy<T, K extends string>(items: T[], key: (item: T) => K): Record<K, T[]> {\n  return items.reduce((acc, item) => {\n    const group = key(item);\n    if (!acc[group]) acc[group] = [];\n    acc[group].push(item);\n    return acc;\n  }, {} as Record<K, T[]>);\n}`,
    `function assertNever(value: never): never {\n  throw new Error(\`Unexpected value: \${value}\`);\n}`,
  ],
  class: [
    `class Observable<T> {\n  private subscribers = new Set<(val: T) => void>();\n\n  subscribe(fn: (val: T) => void): () => void {\n    this.subscribers.add(fn);\n    return () => this.subscribers.delete(fn);\n  }\n\n  emit(value: T): void {\n    this.subscribers.forEach(fn => fn(value));\n  }\n}`,
    `class Result<T, E> {\n  private constructor(\n    private readonly value?: T,\n    private readonly error?: E\n  ) {}\n\n  static ok<T>(value: T): Result<T, never> {\n    return new Result(value);\n  }\n\n  static err<E>(error: E): Result<never, E> {\n    return new Result(undefined, error);\n  }\n\n  isOk(): boolean {\n    return this.error === undefined;\n  }\n}`,
  ],
  loop: [
    `const grouped = items.reduce<Record<string, Item[]>>((acc, item) => {\n  const key = item.category;\n  if (!acc[key]) acc[key] = [];\n  acc[key].push(item);\n  return acc;\n}, {});`,
    `type FilterFn<T> = (item: T, index: number) => boolean;\n\nfunction filterMap<T, U>(arr: T[], filter: FilterFn<T>, map: (item: T) => U): U[] {\n  const result: U[] = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (filter(arr[i], i)) {\n      result.push(map(arr[i]));\n    }\n  }\n  return result;\n}`,
  ],
  async: [
    `async function withRetry<T>(\n  fn: () => Promise<T>,\n  retries = 3,\n  delay = 1000\n): Promise<T> {\n  try {\n    return await fn();\n  } catch (err) {\n    if (retries <= 0) throw err;\n    await new Promise(r => setTimeout(r, delay));\n    return withRetry(fn, retries - 1, delay * 2);\n  }\n}`,
    `async function parallel<T>(tasks: (() => Promise<T>)[], limit: number): Promise<T[]> {\n  const results: T[] = [];\n  const executing: Promise<void>[] = [];\n  for (const task of tasks) {\n    const p = task().then(r => { results.push(r); });\n    executing.push(p);\n    if (executing.length >= limit) {\n      await Promise.race(executing);\n    }\n  }\n  await Promise.all(executing);\n  return results;\n}`,
  ],
  algo: [
    `function twoSum(nums: number[], target: number): [number, number] {\n  const seen = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (seen.has(complement)) {\n      return [seen.get(complement)!, i];\n    }\n    seen.set(nums[i], i);\n  }\n  throw new Error("No solution found");\n}`,
  ],
  oop: [
    `abstract class Repository<T, ID> {\n  abstract findById(id: ID): Promise<T | null>;\n  abstract findAll(): Promise<T[]>;\n  abstract save(entity: T): Promise<T>;\n  abstract delete(id: ID): Promise<void>;\n}`,
  ],
  symbol: [
    `type DeepPartial<T> = {\n  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];\n};\n\nconst config: DeepPartial<Config> = {\n  database: { host: "localhost", port: 5432 },\n  server: { cors: { origin: "*" } },\n};`,
    `interface ApiResponse<T = unknown> {\n  data: T;\n  status: number;\n  message?: string;\n  errors?: Record<string, string[]>;\n}\n\ntype HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';`,
  ],
  pattern: [
    `const createStore = <T>(initialState: T) => {\n  let state = initialState;\n  const listeners = new Set<() => void>();\n  return {\n    getState: () => state,\n    setState: (updater: (prev: T) => T) => {\n      state = updater(state);\n      listeners.forEach(fn => fn());\n    },\n    subscribe: (fn: () => void) => {\n      listeners.add(fn);\n      return () => listeners.delete(fn);\n    },\n  };\n};`,
  ],
};
