---
title: "Test of playgrounds"
slug: "test-of-playgrounds"
hidden: true
createdAt: "2021-04-15T02:01:17.795Z"
updatedAt: "2022-11-22T10:49:06.002Z"
---
A draft for https://fpjs.myjetbrains.com/youtrack/issue/JSAGENT-144

Direct iframe start

<iframe
  src="https://stackblitz.com/edit/fpjs-pro-3-npm?devtoolsheight=1000&embed=1&file=index.js&hideExplorer=1&hideNavigation=1&theme=light&test=<<test>>"
  loading="lazy"
></iframe>

Direct iframe end

### CodePen 
[block:html]
{
  "html": "<iframe height=\"457\" style=\"width: 100%;\" scrolling=\"no\" title=\"FingerprintJS Pro NPM example\" src=\"https://codepen.io/TheFinesse/embed/oNByMEw?height=457&theme-id=light&default-tab=js,result\" frameborder=\"no\" loading=\"lazy\" allowtransparency=\"true\" allowfullscreen=\"true\">\n  See the Pen <a href='https://codepen.io/TheFinesse/pen/oNByMEw'>FingerprintJS Pro NPM example</a> by Surgie\n  (<a href='https://codepen.io/TheFinesse'>@TheFinesse</a>) on <a href='https://codepen.io'>CodePen</a>.\n</iframe>"
}
[/block]
### CodeSandbox
[block:html]
{
  "html": "<iframe src=\"https://codesandbox.io/embed/quirky-wildflower-7pc3y?codemirror=1&fontsize=12&hidenavigation=1&theme=light\"\n     style=\"width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;\"\n     title=\"quirky-wildflower-7pc3y\"\n     allow=\"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking\"\n     sandbox=\"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts\"\n   ></iframe>"
}
[/block]
### JSFiddle
[block:html]
{
  "html": "<iframe width=\"100%\" height=\"400\" src=\"//jsfiddle.net/TheFinesse/npjq0ewg/2/embedded/js,result/\" allowfullscreen=\"allowfullscreen\" allowpaymentrequest frameborder=\"0\"></iframe>"
}
[/block]
### Stackblitz

Tabs:
[block:html]
{
  "html": "<style>\n  /* Any random identifier is ok to prevent collisions */\n  #fpjs-123-cdn, #fpjs-123-npm {\n    transform-origin: 0 0;\n    transform: scale(0.8);\n    width: 125%;\n    height: 550px;\n    margin-bottom: -110px;\n    border: none;\n  }\n</style>\n<!-- Uses the built-in Readme styles -->\n<div class=\"CodeTabs-toolbar\">\n  <button\n    type=\"button\"\n    class=\"CodeTabs_active\"\n    onclick=\"\n      document.querySelector('#fpjs-123-cdn').style.display = '';\n      document.querySelector('#fpjs-123-npm').style.display = 'none';\n\n      for (const button of this.parentNode.children) {\n        button.classList.remove('CodeTabs_active');\n      }\n      this.classList.add('CodeTabs_active');\n    \"\n  >\n    CDN\n  </button>\n  <button\n   \ttype=\"button\"\n    onclick=\"\n      const iframe = document.querySelector('#fpjs-123-npm');\n      if (!iframe.hasAttribute('src')) {\n        iframe.setAttribute('src', iframe.getAttribute('not-src'));\n      }\n      iframe.style.display = '';\n      document.querySelector('#fpjs-123-cdn').style.display = 'none';\n\n      for (const button of this.parentNode.children) {\n        button.classList.remove('CodeTabs_active');\n      }\n      this.classList.add('CodeTabs_active');\n    \"\n  >\n    NPM\n  </button>\n</div>\n<iframe\n  id=\"fpjs-123-cdn\"\n  src=\"https://stackblitz.com/edit/fpjs-pro-3-cdn?devtoolsheight=1000&embed=1&file=index.html&hideExplorer=1&hideNavigation=1&theme=light\"\n  loading=\"lazy\"\n></iframe>\n<iframe\n  id=\"fpjs-123-npm\"\n  not-src=\"https://stackblitz.com/edit/fpjs-pro-3-npm?devtoolsheight=1000&embed=1&file=index.js&hideExplorer=1&hideNavigation=1&theme=light\"\n  loading=\"lazy\"\n  style=\"display: none;\"\n></iframe>"
}
[/block]
Click to load:
[block:html]
{
  "html": "<iframe\n\tsrc=\"https://stackblitz.com/edit/fpjs-pro-3-cdn?devtoolsheight=1000&embed=1&file=index.html&hideExplorer=1&hideNavigation=1&theme=light&ctl=1\"\n\tframeborder=\"0\"\n\tstyle=\"transform-origin: 0 0; transform: scale(0.8); width: 125%; height: 660px; margin-bottom: -132px;\"\n  loading=\"lazy\"\n></iframe>"
}
[/block]
### JSBin
[block:html]
{
  "html": "<iframe width=\"100%\" height=\"400\" src=\"https://jsbin.com/jurozotufa/edit?html,console\" frameborder=\"0\"></iframe>"
}
[/block]