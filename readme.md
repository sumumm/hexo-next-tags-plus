# <p align="center"><font size=5>自用NexT主题标签外挂插件</font></p>

【个人主页】

<table>
    <tr>
        <td align="center" width=150px>GitHub Pages</td>
        <td align="left" width=450px>
            <a href="https://sumumm.github.io/" target="_blank">https://sumumm.github.io/</a>
        </td>
    </tr>
    <tr>
        <td align="center" width=150px>Gitee Pages</td>
        <td align="left" >
            <a href="https://sumumm.gitee.io/" target="_blank">https://sumumm.gitee.io/</a>
        </td>
    </tr>
</table>

【说明】

&emsp;&emsp;原作者项目插件为`butterfly`主题，而自己使用的是`NexT`主题，所以`folk`后进行了修改裁剪，仅供自己学习使用。如有需求，还请使用原作者插件(我当时用的版本是【`hexo-butterfly-tag-plugins-plus@1.0.12`】，最后一次提交的版本号为【`1.0.12，剔除无效属性：d3285167987d445653eab05f49685dd7825bf740`】)。

- 原作者插件项目

<table>
    <tr>
        <td align="center">原项目</td>
        <td align="center">项目地址</td>
    </tr>
    <tr>
        <td align="left">hexo-butterfly-tag-plugins-plus</td>
        <td align="left"><a href="https://github.com/Akilarlxh/hexo-butterfly-tag-plugins-plus" target="_blank">https://github.com/Akilarlxh/hexo-butterfly-tag-plugins-plus</td>
    </tr>
</table>


- 参考博客

<table>
    <tr>
        <td align="center">参考博客</td>
        <td align="center">博客文章</td>
    </tr>
    <tr>
        <td align="left">Akilarの糖果屋</td>
        <td align="left"><a href="https://akilar.top/posts/e2bf861f/" target="_blank">DIY 外挂标签的简单写法与应用</td>
    </tr>
    <tr>
        <td align="left">Akilarの糖果屋</td>
        <td align="left"><a href="https://akilar.top/posts/615e2dec/" target="_blank">Tag Plugins Plus</td>
    </tr>
</table>

【支持标签】

以下为自己修改过后支持的功能，店长原版插件标签挺多的，我只留下了自己用得到的几个。还是那句话，有需要的话就用店长原版插件，本插件仅供自己学习使用。

- 行内文本样式 `text`

- 行内文本 `span`

- 段落文本 `p`

- 复选列表 `checkbox`

- 单选列表 `radio`

- 时间轴 `timeline`

- `Github` 卡片 `ghcard`

- 折叠框 `folding`

- 分栏 `tab`

- 上标标签 `tip`

- 按钮 `btns`

- 诗词 `poems`

【安装与配置】

```yml
# ------------------------------------------------
# Instructions: tag-plus 标签外挂加强版
# Plugins: npm install hexo-next-tag-plus --save
# ------------------------------------------------
# [blogRoot]/_config.next.yml 或者 [blogRoot]/_config.yml 添加以下内容
TagPlus:
  enable: true   # 插件开关
  priority: 5    # 过滤器优先级
  CDN:
    tag_plus: https://npm.elemecdn.com/hexo-next-tag-plus@latest/lib/tag_plus.css
```