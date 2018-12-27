
> doWhateverElseYouNeed函数直到查询完成，此时它将执行showResult回调函数。这可能非常令人困惑，使您的代码难以阅读，但它非常强大，而在服务器端，它允许
大量的连接。现在您已了解Node.js可以执行的操作，您可以在http://nodejs.org/下载它。按照说明根据您的操作系统安装Node.js.安装完成后，Windows上将有一个命令行界面和一个Node.js窗口。使用命令行，您可以启动应用程序并安装其他软件包，您将在后面的示例中学习这些软件包。

一个带Leaflet的基本Node.js服务器
在第一个示例中，您将创建一个简单的Node.js服务器并提供LeafletEssentials.html。您可以在任何文本编辑器中编写代码并将其另存为.js文件。创建一个文件夹来存储您的文件，并在文件夹中放置LeafletEssentials.html的副本。这将是我们将与Node.js一起提供的文件。接下来，您将创建服务器，


上面的代码使用了两个模块：http和fs。您可以使用require（模块）导入这些模块。这两个模块都是标准的Node.js模块，不需要任何额外的下载。上面的代码导入了http模块和
然后调用createServer（）方法。它使用一个匿名函数，分别接受请求和响应请求和res。 if块测试以查看对服务器的请求是否等于根目录;在此示例中，浏览器是否指向http：// localhost：3000。最后一行代码正在侦听端口3000.如果请求是根目录，则代码会写入标头。覆盖HTTP协议和标头超出了本书的范围。但是，要知道发送响应时，如果成功则为状态200，如果不成功则为状态404，并且响应具有内容类型text / html。最后，代码导入fs模块并使用pipe（）读入并写出LeafletEssentials.html的内容。 Pipe是发送文件的首选方法;但是，您也可以使用res.end（'HTML'）手动将HTML写为字符串。管道允许您做一些整洁的事情，例如读取和写出视频文件，以便用户可以在仍然从服务器接收数据时播放它。将HTML写为字符串会使代码变得冗长而复杂;从不介意试图逃避大多数HTML中所需的所有引号。在上一个示例中，您将了解可以存储HTML的模板库。


使用工具中的命令，导航到保存server.js代码的目录，然后键入node server.js运行它。将浏览器指向http：// localhost：3000。您应该看到加载的地图
Node.js，AJAX和Leaflet
现在您已经运行并提供了Leaflet网页的Node.js服务器，您可以使用相同的服务器进行异步JavaScript和XML（AJAX）调用。你是用JavaScript编程的，所以即使在AJAX中有XML，你也应该使用JSON;它比JavaScript中的XML更容易处理。在第一个示例的基础上，以下代码添加了另一个页面，并在错误请求上发送错误消息：

前面的代码对第一个示例进行了两处更改;它增加了两条新路线。第一个if语句是相同的，返回LeafletEssentials.html。 else if语句检查浏览器是否指向http：// localhost：3000 / getpoints。如果是，则服务器返回JSON字符串[{“lat”：35，“long”： -  106}]。最后，如果用户请求不存在的页面，服务器将返回404错误消息，指出找不到该页面，并将返回他们正在寻找的页面的值-req.url。前面的服务器需要更改LeafletEssentials.html文件。您将需要订阅者用于click事件并在发生时进行AJAX调用。在AJAX之前，您需要向服务器提交表单或提出请求，然后重定向到显示结果的新页面。 AJAX允许您向服务器发出请求，返回结果，并在不重新加载整个页面的情况下显示它们。在此示例中，您将对getpoints URL进行AJAX调用。您将收到一个点的JSON表示。然后，您将添加一个代表返回点的标记 - 无需刷新网页：



此示例在用户单击地图时返回相同的点。这个例子
可以通过每次用户点击时返回不同的点来改进
地图。为此，只需使用随机数生成器返回新的纬度
经度。这里的关键是设置最大值和最小值以便指向该点
离我们当前的位置很近。以下代码使用Math.random（）