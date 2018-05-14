# intro-plugin
This a plugin of introduce website

#### 引入

```html
<script src="/intro.ood.js"></script>
``` 

#### 标记引导的顺序和数据

```html
<div data-step="1" 
     data-required="true"  
     data-intro="为了更好地推荐成果、学者、群组，请您填写基本信息！">
     ......
</div>
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

#### HTMLAttr

<table>
    <thead>
        <tr>
            <th>属性</th>
            <th>类型</th>
            <th>备注</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>data-step</td>
            <td>Number</td>
            <td>引导的顺序，从1开始计数</td>
        </tr>
        <tr>
            <td>data-intro</td>
            <td>String</td>
            <td>提示的信息</td>
        </tr>
        <tr>
            <td>data-required</td>
            <td>Boolean</td>
            <td>是否是必须项</td>
        </tr>
    </tbody>
</table>

#### Attributes

<table>
    <thead>
        <tr>
            <th>属性</th>
            <th>类型</th>
            <th>备注</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>el</td>
            <td>String</td>
            <td>selector 引导页遮罩的容器</td>
        </tr>
        <tr>
            <td>config</td>
            <td>Object</td>
            <td>{<br/>
            except:[String selector], // 遮罩白名单  <br/>
            isCanScroll:false, // 是否可以滚动页面，默认不能 <br/>
        }</td>
        </tr>
    </tbody>
</table>

#### Methods

<table>
    <thead>
        <tr>
            <th>方法名</th>
            <th>备注</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>next</td>
            <td>进行下一步</td>
        </tr>
        <tr>
            <td>resize</td>
            <td>提示框自适应</td>
        </tr>
    </tbody>
</table>
