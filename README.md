## intro-plugin
>This a plugin of introduce website

![intro-plugin](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/intro-plugin.gif)


### Example

check this file `dist/index.html`

### Import

```html
    <!-- import css  -->
    <link href=./dist/css/Intro.min.css rel=stylesheet />
    <!-- import js -->
    <script src=./dist/Intro.min.js></script>
    <div id="app" class="container">
        <!-- data-step 序号 (从1开始) -->
        <!-- data-intro 提示信息 -->
        <!-- data-required 必须（设置此项后，无法跳过此步引导，需要手动触发next方法） -->
        <div class="item" data-step="1" data-intro="为了更好地推荐成果、学者、群组，请您填写基本信息！">
            啦啦啦啦
        </div>
        <div class="item" data-step="2" data-intro="为了更好地推荐成果、学者、群组，请您填写基本信息！">
            啦啦啦啦
        </div>
    </div>
    <script>
        let intro=new Intro("#app",{
            refreshToTop:true
        });
    <script>
```

### API

```js
new Intro(el[,config]);
```

<table>
    <thead>
        <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>el</td>
            <td>容器</td>
            <td>string</td>
            <td>--</td>
        </tr>
        <tr>
            <td>config</td>
            <td>配置</td>
            <td>object</td>
            <td>见下面的config</td>
        </tr>
    </tbody>
</table>


#### config

<table>
    <thead>
        <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>except</td>
            <td>不参与引导的元素白名单，(默认是不可点击页面上的任何元素)</td>
            <td>string[]</td>
            <td>[]</td>
        </tr>
        <tr>
            <td>isCanScroll</td>
            <td>是否可以滚动</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>refreshToTop</td>
            <td>刷新页面后是否回到页面顶部</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
    </tbody>
</table>

#### method
<table>
    <thead>
        <tr>
            <th>方法名</th>
            <th>说明</th>
            <th>参数</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>next</td>
            <td>无参数默认进行下一步，(参数 从1开始)</td>
            <td>Function(index?)</td>
        </tr>
        <tr>
            <td>skip</td>
            <td>跳过引导</td>
            <td>--</td>
        </tr>
        <tr>
            <td>destory</td>
            <td>销毁Intro实例</td>
            <td>--</td>
        </tr> 
    </tbody>
</table>



### MIT license
Copyright (c) 2018 yangfan2016 &lt;15234408101@163.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
built upon love by [docor](https://github.com/turingou/docor.git) v0.3.0
