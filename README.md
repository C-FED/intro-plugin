# intro-plugin
This a plugin of introduce website

#### 引入

```html
<script src="/intro.ood.js"></script>
```

#### 初始化

```js
var intro = introJS.init("#detailVm", {
    except: ["#leftNav", "#okms_top"]
});
```

#### 自适应

```js
intro.resize()
```

#### 下一步

```js
intro.next()
```

