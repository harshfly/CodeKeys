export const pySnippets = {
  function: [
    `def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)`,
    `def fibonacci(n: int) -> int:\n    if n <= 1:\n        return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b`,
    `def flatten(nested: list) -> list:\n    result = []\n    for item in nested:\n        if isinstance(item, list):\n            result.extend(flatten(item))\n        else:\n            result.append(item)\n    return result`,
    `def memoize(func):\n    cache = {}\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = func(*args)\n        return cache[args]\n    return wrapper`,
  ],
  class: [
    `class Stack:\n    def __init__(self):\n        self._items = []\n\n    def push(self, item):\n        self._items.append(item)\n\n    def pop(self):\n        if not self._items:\n            raise IndexError("Stack is empty")\n        return self._items.pop()\n\n    def peek(self):\n        return self._items[-1] if self._items else None`,
    `class LinkedList:\n    def __init__(self):\n        self.head = None\n        self.size = 0\n\n    def append(self, value):\n        node = {"value": value, "next": None}\n        if not self.head:\n            self.head = node\n        else:\n            current = self.head\n            while current["next"]:\n                current = current["next"]\n            current["next"] = node\n        self.size += 1`,
  ],
  loop: [
    `results = []\nfor i, item in enumerate(items):\n    if item.get('active', False):\n        value = item['value'] * 2\n        results.append((i, value))\nreturn sorted(results, key=lambda x: x[1])`,
    `squared = [x ** 2 for x in range(10) if x % 2 == 0]\nflattened = [item for sublist in matrix for item in sublist]\nmapping = {k: v for k, v in zip(keys, values) if v is not None}`,
    `with open("data.csv", "r") as file:\n    reader = csv.DictReader(file)\n    for row in reader:\n        if float(row["score"]) >= threshold:\n            results.append({\n                "name": row["name"],\n                "score": float(row["score"]),\n            })`,
  ],
  async: [
    `import asyncio\n\nasync def fetch_all(urls):\n    async with aiohttp.ClientSession() as session:\n        tasks = [fetch_one(session, url) for url in urls]\n        return await asyncio.gather(*tasks)`,
    `async def process_stream(reader):\n    async for line in reader:\n        data = json.loads(line)\n        if data.get("type") == "event":\n            await handle_event(data)\n        elif data.get("type") == "error":\n            logger.error(f"Stream error: {data}")`,
  ],
  algo: [
    `def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)`,
    `def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1`,
  ],
  oop: [
    `class Vehicle:\n    def __init__(self, make, model, year):\n        self.make = make\n        self.model = model\n        self.year = year\n\n    def __repr__(self):\n        return f'{self.year} {self.make} {self.model}'\n\n    def age(self):\n        from datetime import date\n        return date.today().year - self.year`,
  ],
  symbol: [
    `data = {"users": [{"name": "Alice", "age": 30}]}\nresult = data.get("users", [])[0]["name"]\ncondition = (x > 0) and (y < 10) or (z == 0)\nformatted = f"Result: {value:.2f} ({percentage:.1%})"`,
  ],
  pattern: [
    `@app.route("/api/users/<int:user_id>", methods=["GET"])\ndef get_user(user_id: int):\n    user = db.session.query(User).get(user_id)\n    if not user:\n        return jsonify({"error": "Not found"}), 404\n    return jsonify(user.to_dict())`,
  ],
};
