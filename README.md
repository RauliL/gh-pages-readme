# gh-pages-readme

Generate contents of [GitHub pages] automatically from `README.md` of your
repository, styled with [Bootstrap].

[GitHub pages]: https://pages.github.com
[Bootstrap]: https://getbootstrap.com

## Usage

Create branch called `gh-pages` in your repository, add file `index.html`
with following contents, then commit and push your changes:

```html
<script src="https://cdn.jsdelivr.net/npm/gh-pages-readme@1.0.0/lib/index.js"></script>
<script>
  ghpages.init('user/repository');
</script>
```

Replace `user/repository` with your GitHub username and name of the repository.

## Super duper advanced usage

You can pass second argument to `ghpages.init` function which specifies from
which branch the `README.md` will be retrieved from. By default it uses `main`
branch.

```javascript
ghpages.init('user/repository', 'development');
```
