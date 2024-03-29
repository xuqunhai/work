# 安全防护措施不到位带来的问题
- 影响站点功能
- 泄露用户授权隐私
- 带来经济损失

# 前端安全知识

## 基础安全知识
- XSS
  - 根据攻击脚本引入位置
    - 存储型XSS
      - 从数据库读取后插入页面 <div>【<script>alert();</script>】</div>
    - 反射型XSS
      - 网页URL参数注入 <div>【ur.query.name】</div>
    - DOM XSS
      - 攻击脚本插入DOM属性后被解析 <p class="class-a 【"><script>alert();</script><p class="class-b】"></p>
  - 防范方法
    - 验证输入到页面的内容数据是否安全，进行必要转义 【< &lt; >&gt; '&#39 "&quot;  &nbsp;】
- SQL
  - 服务器未做校验就直接拼接成sql语句执行，所以需检查是否包含非法内容
- CSRF
  - 模拟数据请求服务器，因服务器未验证导致请求成功执行
  - 通过Token验证请求是否为源站点页面提交：服务器返回实时token，浏览器提交时带上token，服务器验证token是否与session临时保存的token一致
  - 这里安全是相对的，只是破解时间变长了，不容易被攻击，如可通过域名伪造和拉取源站实时token来提交破解

## 网络劫持
资源请求没加载到预期内容
- 分类
  - DNS劫持
    - 篡改DNS服务器域名解析记录，返回用户错误的DNS查询结果，让用户访问到另一个IP，实现获取用户资料或破坏原网址正常服务目的
  - HTTP劫持
    - 在浏览器和服务器之间的网关或防火墙上监视特定数据，便于修改数据包，让浏览器解析错误数据或弹出广告
- 防范
  - 尽量使用https协议