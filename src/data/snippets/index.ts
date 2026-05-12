import { jsSnippets } from './javascript';
import { tsSnippets } from './typescript';
import { pySnippets } from './python';
import { rustSnippets, goSnippets, cppSnippets, javaSnippets, sqlSnippets } from './other-languages';
import type { LanguageId, SnippetType } from '@/lib/constants';

type SnippetMap = Record<string, string[]>;

const ALL_SNIPPETS: Record<string, SnippetMap> = {
  js: jsSnippets,
  ts: tsSnippets,
  py: pySnippets,
  rust: rustSnippets,
  go: goSnippets,
  cpp: cppSnippets,
  java: javaSnippets,
  sql: sqlSnippets,
  html: {
    function: [
      `<header class="navbar">\n  <nav>\n    <a href="/" class="logo">Brand</a>\n    <ul class="nav-links">\n      <li><a href="/about">About</a></li>\n      <li><a href="/contact">Contact</a></li>\n    </ul>\n  </nav>\n</header>`,
    ],
    class: [
      `<form action="/submit" method="POST">\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" required />\n  <label for="password">Password:</label>\n  <input type="password" id="password" name="password" />\n  <button type="submit">Sign In</button>\n</form>`,
    ],
    loop: [`<ul id="list">\n  <li data-id="1">Item One</li>\n  <li data-id="2">Item Two</li>\n  <li data-id="3">Item Three</li>\n</ul>`],
    symbol: [`<div class="container" data-theme="dark">\n  <section id="hero" aria-label="Hero Section">\n    <h1>Welcome &mdash; <em>Start Here</em></h1>\n    <p>Build &amp; ship faster.</p>\n  </section>\n</div>`],
  },
  css: {
    function: [
      `.card {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1.5rem;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0,0,0,0.15);\n}`,
    ],
    class: [
      `@media (max-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n  .sidebar {\n    display: none;\n  }\n  .hero-title {\n    font-size: 1.8rem;\n  }\n}`,
    ],
    loop: [`.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.6rem 1.2rem;\n  font-weight: 600;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-primary {\n  background: var(--accent);\n  color: #000;\n}\n.btn-primary:hover {\n  opacity: 0.9;\n}`],
    symbol: [`:root {\n  --bg: #080a0f;\n  --text: #dde4f0;\n  --accent: #00d4ff;\n  --radius: 10px;\n}\n\n.tooltip::after {\n  content: attr(data-tip);\n  position: absolute;\n  top: -100%;\n  left: 50%;\n  transform: translateX(-50%);\n}`],
  },
  ruby: {
    function: [
      `def fibonacci(n)\n  return n if n <= 1\n  fibonacci(n - 1) + fibonacci(n - 2)\nend`,
      `def group_by_key(items, key)\n  items.each_with_object({}) do |item, acc|\n    group = item[key]\n    acc[group] ||= []\n    acc[group] << item\n  end\nend`,
    ],
    class: [
      `class Stack\n  def initialize\n    @items = []\n  end\n\n  def push(item)\n    @items.push(item)\n  end\n\n  def pop\n    raise "Stack is empty" if @items.empty?\n    @items.pop\n  end\n\n  def peek\n    @items.last\n  end\nend`,
    ],
    symbol: [`hash = { name: "Alice", age: 30, scores: [90, 85] }\nresult = hash[:scores].select { |s| s >= 88 }\nputs "Found: #{result.length} items"`],
  },
  php: {
    function: [
      `function fibonacci(int $n): int {\n    if ($n <= 1) return $n;\n    return fibonacci($n - 1) + fibonacci($n - 2);\n}`,
      `function arrayGroupBy(array $items, string $key): array {\n    $result = [];\n    foreach ($items as $item) {\n        $group = $item[$key] ?? 'other';\n        $result[$group][] = $item;\n    }\n    return $result;\n}`,
    ],
    class: [
      `class UserController extends Controller {\n    public function show(Request $request, int $id): JsonResponse {\n        $user = User::findOrFail($id);\n        return response()->json([\n            'data' => $user,\n            'status' => 'success',\n        ]);\n    }\n}`,
    ],
    symbol: [`$config = [\n    'database' => [\n        'host' => 'localhost',\n        'port' => 3306,\n        'name' => 'app_db',\n    ],\n    'debug' => $_ENV['APP_DEBUG'] ?? false,\n];\n$dsn = "mysql:host={$config['database']['host']};dbname={$config['database']['name']}";`],
  },
};

export function getSnippet(lang: LanguageId, type: SnippetType, level?: number): string {
  const langSnippets = ALL_SNIPPETS[lang];
  if (!langSnippets) return ALL_SNIPPETS.js.function[0];
  const typeSnippets = langSnippets[type] || langSnippets.function;
  if (!typeSnippets || typeSnippets.length === 0) {
    const fallback = langSnippets.function || Object.values(langSnippets)[0];
    return fallback ? fallback[Math.floor(Math.random() * fallback.length)] : '';
  }
  if (level) {
    let pool = [...typeSnippets];
    // If the specific category has very few snippets, pad it with other snippets from the same language
    // to ensure levels 1-30 show different code!
    if (pool.length < 10) {
      const allForLang = Object.values(langSnippets).flat();
      // Add unique snippets from other categories
      const otherSnippets = allForLang.filter(s => !pool.includes(s));
      pool = [...pool, ...otherSnippets];
    }

    // Sort by length to ensure Level 1 is simple and difficulty increases
    const sorted = pool.sort((a, b) => a.length - b.length);
    // Use modulo to cycle through snippets so high levels don't repeat the exact same snippet
    return sorted[(level - 1) % sorted.length];
  }
  return typeSnippets[Math.floor(Math.random() * typeSnippets.length)];
}

export function getSnippetCount(lang: LanguageId): number {
  const langSnippets = ALL_SNIPPETS[lang];
  if (!langSnippets) return 0;
  return Object.values(langSnippets).reduce((sum, arr) => sum + arr.length, 0);
}

export function getAllSnippetsForLang(lang: LanguageId): string[] {
  const langSnippets = ALL_SNIPPETS[lang];
  if (!langSnippets) return [];
  return Object.values(langSnippets).flat();
}

export { ALL_SNIPPETS };
