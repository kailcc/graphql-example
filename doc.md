### 如何查询

```graphql
# query -> [操作类型]
# myquery -> [操作名称]
# ($author: String) -> [变量定义] 可选
  query myquery($author: String) {
    books {
      title
      author
    }
  }
```

###