```
steps:
  - uses: pymc20/action-confluence@main
  with:
    pageId: 111111111
    pageTitle: test
    contentsJson: |
      {
        h1: "test",
        li: "test\ntest\ntest"
      }
  env:
    JIRA_URL: ${{ secrets.JIRA_URL }}     // DOMAIN.atlassian.net/
    JIRA_AUTH: ${{ secrets.JIRA_AUTH }}   // USER:TOKEN -> base64
```
