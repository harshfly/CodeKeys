export const rustSnippets = {
  function: [
    `fn fibonacci(n: u64) -> u64 {\n    match n {\n        0 => 0,\n        1 => 1,\n        _ => fibonacci(n - 1) + fibonacci(n - 2),\n    }\n}`,
    `fn parse_config(path: &str) -> Result<Config, Box<dyn Error>> {\n    let contents = fs::read_to_string(path)?;\n    let config: Config = serde_json::from_str(&contents)?;\n    Ok(config)\n}`,
  ],
  class: [
    `struct Stack<T> {\n    items: Vec<T>,\n}\n\nimpl<T> Stack<T> {\n    fn new() -> Self {\n        Stack { items: Vec::new() }\n    }\n    fn push(&mut self, item: T) {\n        self.items.push(item);\n    }\n    fn pop(&mut self) -> Option<T> {\n        self.items.pop()\n    }\n}`,
  ],
  loop: [
    `let result: Vec<i32> = items\n    .iter()\n    .filter(|x| x.active)\n    .map(|x| x.value * 2)\n    .collect();\nprintln!("{:?}", result);`,
  ],
  async: [
    `async fn fetch_user(id: u32) -> Result<User, Error> {\n    let url = format!("/api/users/{}", id);\n    let resp = reqwest::get(&url).await?;\n    if !resp.status().is_success() {\n        return Err(Error::NotFound);\n    }\n    let user = resp.json::<User>().await?;\n    Ok(user)\n}`,
  ],
  algo: [
    `fn binary_search(arr: &[i32], target: i32) -> Option<usize> {\n    let (mut left, mut right) = (0, arr.len());\n    while left < right {\n        let mid = left + (right - left) / 2;\n        match arr[mid].cmp(&target) {\n            std::cmp::Ordering::Equal => return Some(mid),\n            std::cmp::Ordering::Less => left = mid + 1,\n            std::cmp::Ordering::Greater => right = mid,\n        }\n    }\n    None\n}`,
  ],
  oop: [
    `trait Shape {\n    fn area(&self) -> f64;\n    fn perimeter(&self) -> f64;\n}\n\nstruct Circle {\n    radius: f64,\n}\n\nimpl Shape for Circle {\n    fn area(&self) -> f64 {\n        std::f64::consts::PI * self.radius.powi(2)\n    }\n    fn perimeter(&self) -> f64 {\n        2.0 * std::f64::consts::PI * self.radius\n    }\n}`,
  ],
  symbol: [
    `let result: Result<Vec<&str>, Box<dyn Error>> = Ok(vec!["a", "b"]);\nlet value = match result {\n    Ok(v) => v.iter().map(|s| s.len()).sum::<usize>(),\n    Err(_) => 0,\n};`,
  ],
  pattern: [
    `enum Command {\n    Quit,\n    Echo(String),\n    Move { x: i32, y: i32 },\n    Color(u8, u8, u8),\n}\n\nfn process(cmd: Command) {\n    match cmd {\n        Command::Quit => println!("Quitting"),\n        Command::Echo(msg) => println!("{}", msg),\n        Command::Move { x, y } => println!("Moving to ({}, {})", x, y),\n        Command::Color(r, g, b) => println!("rgb({}, {}, {})", r, g, b),\n    }\n}`,
  ],
};

export const goSnippets = {
  function: [
    `package main\n\nimport "fmt"\n\nfunc reverseString(s string) string {\n\trunes := []rune(s)\n\tfor i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {\n\t\trunes[i], runes[j] = runes[j], runes[i]\n\t}\n\treturn string(runes)\n}`,
    `func contains(slice []string, item string) bool {\n\tfor _, v := range slice {\n\t\tif v == item {\n\t\t\treturn true\n\t\t}\n\t}\n\treturn false\n}`,
  ],
  class: [
    `type Queue struct {\n\titems []interface{}\n\tmu    sync.Mutex\n}\n\nfunc (q *Queue) Enqueue(item interface{}) {\n\tq.mu.Lock()\n\tdefer q.mu.Unlock()\n\tq.items = append(q.items, item)\n}\n\nfunc (q *Queue) Dequeue() (interface{}, bool) {\n\tq.mu.Lock()\n\tdefer q.mu.Unlock()\n\tif len(q.items) == 0 {\n\t\treturn nil, false\n\t}\n\titem := q.items[0]\n\tq.items = q.items[1:]\n\treturn item, true\n}`,
  ],
  loop: [
    `results := make([]int, 0, len(items))\nfor i, v := range items {\n\tif v > 0 {\n\t\tresults = append(results, i*v)\n\t}\n}\nfmt.Println(results)`,
  ],
  async: [
    `func fetchData(ctx context.Context, url string) ([]byte, error) {\n\treq, err := http.NewRequestWithContext(ctx, "GET", url, nil)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\tresp, err := http.DefaultClient.Do(req)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\tdefer resp.Body.Close()\n\treturn io.ReadAll(resp.Body)\n}`,
  ],
  algo: [
    `func mergeSort(arr []int) []int {\n\tif len(arr) <= 1 {\n\t\treturn arr\n\t}\n\tmid := len(arr) / 2\n\tleft := mergeSort(arr[:mid])\n\tright := mergeSort(arr[mid:])\n\treturn merge(left, right)\n}`,
  ],
  oop: [
    `type Animal interface {\n\tSpeak() string\n\tName() string\n}\n\ntype Dog struct {\n\tname string\n}\n\nfunc (d *Dog) Speak() string {\n\treturn "Woof!"\n}\n\nfunc (d *Dog) Name() string {\n\treturn d.name\n}`,
  ],
  symbol: [
    `ch := make(chan int, 10)\ngo func() {\n\tfor i := 0; i < 10; i++ {\n\t\tch <- i * i\n\t}\n\tclose(ch)\n}()\nfor val := range ch {\n\tfmt.Printf("Received: %d\\n", val)\n}`,
  ],
  pattern: [
    `func withTimeout(ctx context.Context, d time.Duration, fn func(context.Context) error) error {\n\tctx, cancel := context.WithTimeout(ctx, d)\n\tdefer cancel()\n\tdone := make(chan error, 1)\n\tgo func() { done <- fn(ctx) }()\n\tselect {\n\tcase err := <-done:\n\t\treturn err\n\tcase <-ctx.Done():\n\t\treturn ctx.Err()\n\t}\n}`,
  ],
};

export const cppSnippets = {
  function: [
    `#include <iostream>\n#include <vector>\n\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}`,
    `std::string trim(const std::string& str) {\n    size_t first = str.find_first_not_of(' ');\n    if (first == std::string::npos) return "";\n    size_t last = str.find_last_not_of(' ');\n    return str.substr(first, last - first + 1);\n}`,
  ],
  class: [
    `template<typename T>\nclass Stack {\nprivate:\n    std::vector<T> items;\npublic:\n    void push(const T& item) {\n        items.push_back(item);\n    }\n    T pop() {\n        if (items.empty())\n            throw std::runtime_error("Stack underflow");\n        T top = items.back();\n        items.pop_back();\n        return top;\n    }\n    bool empty() const { return items.empty(); }\n};`,
  ],
  loop: [
    `std::vector<int> result;\nresult.reserve(items.size());\nfor (const auto& item : items) {\n    if (item.active && item.value > 0) {\n        result.push_back(item.value * 2);\n    }\n}\nstd::sort(result.begin(), result.end());`,
  ],
  async: [
    `#include <future>\n\nstd::future<std::string> fetchAsync(const std::string& url) {\n    return std::async(std::launch::async, [url]() {\n        return httpGet(url);\n    });\n}`,
  ],
  algo: [
    `int binarySearch(const std::vector<int>& arr, int target) {\n    int left = 0;\n    int right = static_cast<int>(arr.size()) - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
  ],
  oop: [
    `class Shape {\npublic:\n    virtual ~Shape() = default;\n    virtual double area() const = 0;\n    virtual std::string name() const = 0;\n};\n\nclass Circle : public Shape {\n    double radius;\npublic:\n    explicit Circle(double r) : radius(r) {}\n    double area() const override {\n        return M_PI * radius * radius;\n    }\n    std::string name() const override { return "Circle"; }\n};`,
  ],
  symbol: [
    `std::map<std::string, std::vector<int>> data;\ndata["scores"] = {90, 85, 92, 78};\nauto it = data.find("scores");\nif (it != data.end()) {\n    for (const auto& [key, values] : data) {\n        std::cout << key << ": " << values.size() << std::endl;\n    }\n}`,
  ],
  pattern: [
    `template<typename... Args>\nvoid log(const std::string& fmt, Args&&... args) {\n    auto now = std::chrono::system_clock::now();\n    auto time = std::chrono::system_clock::to_time_t(now);\n    std::cout << std::ctime(&time) << " ";\n    (std::cout << ... << std::forward<Args>(args)) << "\\n";\n}`,
  ],
};

export const javaSnippets = {
  function: [
    `import java.util.*;\n\npublic class Main {\n    public int fibonacci(int n) {\n        if (n <= 1) return n;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n}`,
    `public static <T> List<T> filter(List<T> list, Predicate<T> predicate) {\n    return list.stream()\n        .filter(predicate)\n        .collect(Collectors.toList());\n}`,
  ],
  class: [
    `public class Stack<T> {\n    private final Deque<T> items = new ArrayDeque<>();\n\n    public void push(T item) {\n        Objects.requireNonNull(item);\n        items.push(item);\n    }\n\n    public T pop() {\n        if (items.isEmpty()) {\n            throw new EmptyStackException();\n        }\n        return items.pop();\n    }\n\n    public boolean isEmpty() {\n        return items.isEmpty();\n    }\n}`,
  ],
  loop: [
    `List<Integer> results = items.stream()\n    .filter(Item::isActive)\n    .mapToInt(item -> item.getValue() * 2)\n    .boxed()\n    .sorted()\n    .collect(Collectors.toList());`,
  ],
  async: [
    `CompletableFuture<User> fetchUser(long id) {\n    return CompletableFuture\n        .supplyAsync(() -> userRepository.findById(id)\n            .orElseThrow(() -> new UserNotFoundException(id)))\n        .thenApply(user -> {\n            user.setLastAccessed(Instant.now());\n            return user;\n        });\n}`,
  ],
  algo: [
    `public int binarySearch(int[] arr, int target) {\n    int left = 0;\n    int right = arr.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
  ],
  oop: [
    `public interface Repository<T, ID> {\n    Optional<T> findById(ID id);\n    List<T> findAll();\n    T save(T entity);\n    void deleteById(ID id);\n}\n\n@Service\npublic class UserService {\n    private final Repository<User, Long> userRepo;\n\n    public UserService(Repository<User, Long> repo) {\n        this.userRepo = repo;\n    }\n}`,
  ],
  symbol: [
    `Map<String, List<Integer>> grouped = items.stream()\n    .collect(Collectors.groupingBy(\n        Item::getCategory,\n        Collectors.mapping(Item::getValue, Collectors.toList())\n    ));\nOptional<Integer> max = grouped.values().stream()\n    .flatMap(Collection::stream)\n    .max(Integer::compareTo);`,
  ],
  pattern: [
    `@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n    @Autowired\n    private UserService userService;\n\n    @GetMapping("/{id}")\n    public ResponseEntity<User> getUser(@PathVariable Long id) {\n        return userService.findById(id)\n            .map(ResponseEntity::ok)\n            .orElse(ResponseEntity.notFound().build());\n    }\n}`,
  ],
};

export const sqlSnippets = {
  function: [
    `SELECT\n  u.id,\n  u.name,\n  COUNT(o.id) AS order_count,\n  COALESCE(SUM(o.total), 0) AS lifetime_value\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nWHERE u.created_at > NOW() - INTERVAL '30 days'\nGROUP BY u.id, u.name\nORDER BY lifetime_value DESC\nLIMIT 20;`,
  ],
  class: [
    `CREATE TABLE sessions (\n  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  token        TEXT NOT NULL UNIQUE,\n  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n  expires_at   TIMESTAMPTZ NOT NULL\n);\nCREATE INDEX idx_sessions_user ON sessions(user_id);`,
  ],
  loop: [
    `WITH ranked AS (\n  SELECT\n    *,\n    ROW_NUMBER() OVER (\n      PARTITION BY category\n      ORDER BY score DESC\n    ) AS rn\n  FROM products\n  WHERE deleted_at IS NULL\n)\nSELECT * FROM ranked WHERE rn = 1;`,
  ],
  async: [
    `INSERT INTO audit_log (\n  user_id, action, resource, metadata, created_at\n)\nSELECT\n  $1, $2, $3,\n  jsonb_build_object(\n    'before', $4::jsonb,\n    'after',  $5::jsonb\n  ),\n  NOW()\nRETURNING id, created_at;`,
  ],
  algo: [
    `SELECT\n  date_trunc('hour', created_at) AS hour,\n  COUNT(*)                       AS events,\n  AVG(duration_ms)               AS avg_ms,\n  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY duration_ms) AS p95\nFROM events\nWHERE created_at > NOW() - INTERVAL '24 hours'\nGROUP BY 1\nORDER BY 1;`,
  ],
  oop: [
    `CREATE OR REPLACE FUNCTION update_updated_at()\nRETURNS TRIGGER AS $$\nBEGIN\n  NEW.updated_at = NOW();\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER set_updated_at\n  BEFORE UPDATE ON users\n  FOR EACH ROW\n  EXECUTE FUNCTION update_updated_at();`,
  ],
  symbol: [
    `SELECT CASE\n  WHEN age < 18 THEN 'minor'\n  WHEN age BETWEEN 18 AND 65 THEN 'adult'\n  ELSE 'senior'\nEND AS age_group,\nCOUNT(*) AS total\nFROM users\nWHERE status IN ('active', 'pending')\nGROUP BY age_group;`,
  ],
  pattern: [
    `WITH RECURSIVE org_tree AS (\n  SELECT id, name, manager_id, 1 AS depth\n  FROM employees\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.id, e.name, e.manager_id, t.depth + 1\n  FROM employees e\n  JOIN org_tree t ON e.manager_id = t.id\n)\nSELECT * FROM org_tree ORDER BY depth, name;`,
  ],
};
