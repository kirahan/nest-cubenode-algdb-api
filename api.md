# Algdb数据的国内备份
## 解决国内访问algdb缓慢的问题，每日更新，数据格式与algdb保持一致

## 技术栈
1. typescript
2. nestjs
3. mongodb
4. swagger

## 使用TS语言开发的纯API后端
- 使用了ts在vs code上有了很完善的类型提示
- 数据部分由python爬虫爬取
- 利用了nestjs集成的swagger自动生成了api文档页面
![](http://imagebed.solarsunrise.cn/blog/img/20200328010836.png)


<h1>algdb China</h1>
<p>algdb数据的国内缓存，解决国内访问algdb缓慢的问题，每日更新，数据格式与algdb保持一致</p>
<h3>接口文档</h3>
<li><a href="api-docs">/api-docs</a></li>
<h3>例子</h3>
<li><a href="algdb/puzzles">获取收录魔方种类/puzzles</a></li>
<li><a href="algdb/topcasegroups">获取热门case/topcasegroups</a></li>
<li><a href="algdb/stats">获取algdb网站统计/stats</a></li>
<li><a href="algdb/puzzleset">获取set公式集合列表/puzzleset</a></li>
<li><a href="algdb/puzzlesubset">获取subset子公式集列表/puzzlesubset</a></li>
<li><a href="algdb/puzzlesubset?set=vls">获取subset子公式集列表如vls/puzzlesubset?set=vls</a></li>
<li><a href="algdb/casegroup">获取casegroup列表/casegroup</a></li>
<li><a href="algdb/case">获取每个case的数据/case</a></li>
<li><a href="algdb/case?case=f2l1">获取f2l1数据/case?case=f2l1</a></li>
<h3>query参数</h3>
<p>大部分接口都支持分页操作</p>
<p>格式：algdb/name?size=50&page=1</p>
<p>部分接口可以精确查询，具体可在文档中看到</p>
<h3>反馈</h3>
<a >hanzhaoapply@gmail.com</a>
<a target="_blank" href="https://github.com/kirahan" about>github: kirahan</a>
<a target="_blank" href="https://kirahan.github.io">个人博客</a>
<h1>enjoy!</h1>