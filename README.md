```
steps:
  - uses: pymc20/action-confluence
  with:
    pageId: 111111111
    pageTitle: test
    contentsJson: |
      {
        h1: "test",
        li: "test\ntest\ntest"
      }
  env:
    JIRA_URL: ${{ secrets.JIRA_URL }}
    JIRA_AUTH: ${{ secrets.JIRA_AUTH }}
```