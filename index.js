
'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

/** --------------------------------------------------------- */
/** 获取配置项
 */
hexo.extend.filter.register('after_generate', function (locals) {
  /* 首先获取整体的配置项名称 */
  const config = hexo.config.TagPlus || hexo.theme.config.TagPlus
  if (!(config && config.enable)) return; /* 配置项未开启，则直接返回，不再加载插件 */
  /* 集体声明配置项 */
  const data = {
    tag_plus: config.CDN.tag_plus ? urlFor(config.CDN.tag_plus) : 'https://npm.elemecdn.com/hexo-next-tag-plus@latest/lib/tag_plus.css'
  }

  /* head引入资源 */
  const css_text = `<link rel="stylesheet" href="${data.tag_plus}" media="defer" onload="this.media='all'">`

  /* 注入 CSS 样式 */
  hexo.extend.injector.register('head_end', css_text, "default");

},hexo.extend.helper.register('priority', function(){
  /* 过滤器优先级，priority 值越低，过滤器会越早执行，默认priority是10 */
  const pre_priority = hexo.config.TagPlus.priority ?  hexo.config.TagPlus.priority : hexo.theme.config.TagPlus.priority
  const priority = pre_priority ? pre_priority : 10
  return priority
})
)

/** --------------------------------------------------------- */
/** 行内文本样式 text
 * inline-labels.js
 */
hexo.extend.tag.register('u', function(args) {
  return `<u>${args.join(' ')}</u>`;
});
hexo.extend.tag.register('emp', function(args) {
  return `<emp>${args.join(' ')}</emp>`;
});
hexo.extend.tag.register('wavy', function(args) {
  return `<wavy>${args.join(' ')}</wavy>`;
});
hexo.extend.tag.register('del', function(args) {
  return `<del>${args.join(' ')}</del>`;
});
hexo.extend.tag.register('kbd', function(args) {
  return `<kbd>${args.join(' ')}</kbd>`;
});
hexo.extend.tag.register('psw', function(args) {
  return `<psw>${args.join(' ')}</psw>`;
});

/** --------------------------------------------------------- */
/** 行内文本 span 段落文本 p
 * span.js
 */

/** span */
function postSpan(args) {
  args = args.join(' ').split(',')
  let p0 = args[0].trim()
  let p1 = args[1].trim()
  return `<span class='p ${p0}'>${p1}</span>`;
}
hexo.extend.tag.register('span', postSpan);
/** p */
function postP(args) {
  args = args.join(' ').split(',')
  let p0 = args[0].trim()
  let p1 = args[1].trim()
  return `<p class='p ${p0}'>${p1}</p>`;
}
hexo.extend.tag.register('p', postP);
/** --------------------------------------------------------- */
/** 复选列表 checkbox 单选列表 radio
 * checkbox.js
 */
/** checkbox */
function postCheckbox(args) {
  args = args.join(' ').split(',')
  var cls = ''
  var text = ''
  var checked = false
  if (args.length > 1) {
    cls = (args[0] || '').trim()
    if (cls.length > 0) {
      cls = ' ' + cls
    }
    if (cls.indexOf('checked') > -1) {
      checked = true
    }
    text = (args[1] || '').trim()
  } else if (args.length > 0) {
    text = (args[0] || '').trim()
  }
  if (text.length > 0) {
    return `<div class='checkbox${cls}'><input type="checkbox" ${ checked ? 'checked="checked"' : '' }/>
            ${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}
            </div>`
  }
}
hexo.extend.tag.register('checkbox', postCheckbox);
/** radio */
function postRadio(args) {
  args = args.join(' ').split(',')
  var cls = ''
  var text = ''
  var checked = false
  if (args.length > 1) {
    cls = (args[0] || '').trim()
    if (cls.length > 0) {
      cls = ' ' + cls
    }
    if (cls.indexOf('checked') > -1) {
      checked = true
    }
    text = (args[1] || '').trim()
  } else if (args.length > 0) {
    text = (args[0] || '').trim()
  }
  if (text.length > 0) {
    return `<div class='checkbox${cls}'><input type="radio" ${ checked ? 'checked="checked"' : '' }/>
            ${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}
            </div>`
  }
}
hexo.extend.tag.register('radio', postRadio);

/** --------------------------------------------------------- */
/** 时间轴 timeline
 * timeline.js
 */
function postTimeline(args, content) {
  if (args.length > 0) {
    return `<div class="timeline"><p class='p h2'>${args}</p>${content}</div>`;
  } else {
    return `<div class="timeline">${content}</div>`;
  }
}
function postTimenode(args, content) {
  args = args.join(' ').split(',')
  var time = args[0]
  return `<div class="timenode"><div class="meta"><p>${hexo.render.renderSync({text: time, engine: 'markdown'})}</p></div><div class="body">${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}</div></div>`;
}
hexo.extend.tag.register('timeline', postTimeline, {ends: true});
hexo.extend.tag.register('timenode', postTimenode, {ends: true});

/** --------------------------------------------------------- */
/** Github 卡片 ghcard
 * ghcard.js
 * https://github.com/anuraghazra/github-readme-stats
 */
hexo.extend.tag.register('ghcard', function(args) {
  args = args.join(' ').split(', ');
  let path = args[0].trim();
  let card = '';
  card += '<a class="ghcard" rel="external nofollow noopener noreferrer" href="https://github.com/' + path + '">';
  let url = '';
  if (path.includes('/')) {
    /* repo */
    let ps = path.split('/');
    url += 'https://github-readme-stats.vercel.app/api/pin/?username=' + ps[0] + "&repo=" + ps[1];
  } 
  else {
    /* user */
    url += 'https://github-readme-stats.vercel.app/api/?username=' + path;
  }
  if (args.length > 1) {
    for (let i = 1; i < args.length; i++) {
      let tmp = args[i].trim();
      url += "&" + tmp;
    }
  }
  if (!url.includes('&show_owner=')) {
    url += '&show_owner=true';
  }
  card += '<img src="' + url + '"/>';
  card += '</a>';
  return card;
});

hexo.extend.tag.register('ghcardgroup', function(args, content) {
  let ret = '';
  /* wrap */
  ret += '<div class="ghcard-group">';
  ret += content;
  ret += '</div>';
  return ret;
}, {ends: true});

/** --------------------------------------------------------- */
/** 折叠框 folding
 * folding.js
 */
function postFolding(args, content) {
  args = args.join(' ').split(',');
  let style = ''
  let title = ''
  if (args.length > 1) {
    style = args[0].trim()
    title = args[1].trim()
  } else if (args.length > 0) {
    title = args[0].trim()
  }
  if (style != undefined) {
    return `<details class="folding-tag" ${style}><summary> ${title} </summary>
              <div class='content'>
              ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
              </div>
            </details>`;
  }
  else {
    return `<details class="folding-tag"><summary> ${title} </summary>
              <div class='content'>
              ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
              </div>
            </details>`;
  }
}
hexo.extend.tag.register('folding', postFolding, {ends: true});

/** --------------------------------------------------------- */
/** 分栏 tab
 * NexT主题内置
 */

/** --------------------------------------------------------- */
/** 上标标签 tip
 * tip.js
 */
function tip (args, content) {
  return `<div class="tip ${args.join(' ')}">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div>`
}

hexo.extend.tag.register('tip',tip, { ends: true })

/** --------------------------------------------------------- */
/** 按钮 btns
 * btns.js
 */
function postBtns(args, content) {
  return `<div class="btns ${args.join(' ')}">
            ${content}
          </div>`;
}
function postCell(args, content) {
  args = args.join(' ').split(',')
  let text = args[0] || ''
  let url = args[1] || ''
  text = text.trim()
  url = url.trim()
  if (url.length > 0) {
    url = "href='" + url + "'"
  }
  let icon = ''
  let img = 'https://npm.elemecdn.com/hexo-next-tag-plus@latest/lib/assets/default.svg'
  if (args.length > 2) {
    if (args[2].indexOf(' fa-') > -1) {
      icon = args[2].trim()
    } else {
      img = args[2].trim()
    }
  }
  if (icon.length > 0) {
    return `<a class="button" ${url} title='${text}'><i class='${icon}'></i>${text}</a>`
  } else {
    return `<a class="button" ${url} title='${text}'><img src='${img}'>${text}</a>`
  }
}
hexo.extend.tag.register('btns', postBtns, {ends: true});
hexo.extend.tag.register('cell', postCell);

