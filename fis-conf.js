fis.config.set('modules.postpackager', 'simple');

//对零散资源进行合并，保证一个文件里只有一个script标签
fis.config.set('settings.postpackager.simple.autoCombine', true);

//对加上了?__sprite参数的图片进行合并
fis.config.set('modules.spriter', 'csssprites');
fis.config.set('settings.spriter.csssprites.margin', 5);

//强制合并后的script标签出现在文件里而不是一定要有body标签才出现
fis.config.set('settings.postpackager.simple.forceOutput', true);

fis.config.merge({
    modules : {
        parser : {
            less : ['less']
        }
    },
    project : {
        exclude : /^.*\/_.*\//i //任何以_开头的文件或文件夹都不会被处理
    },
    roadmap : {
        domain : 'http://localhost/warnMonitor',
        path : [
            {
                //任何以_开头的文件或文件名都不要release,static文件夹是产出文件夹不要处理
                reg : /(.*\/_.*|\/static\/*|\/.+\.md)/i,
                //编译的时候不要产出了
                release : false
            },
            {
                //files文件夹放置不需要编译的静态文件，比如广告图、文档、压缩包等
                reg : /^(\/files\/.*)$/i,
                release : '/static/$1',
                url: '/static/$1',
                useHash: false,
                useCompile: false
            },
            {
                //已经压缩的资源不要再次压缩，二次压缩会导致非常慢的编译速度
                reg : /^(.*\/.+\.min\.(?:js|css|less))$/i,
                release : '/static/$1',
                url: '/static/$1',
                useOptimizer: false
            },
            {
                //app/modules属于模块文件 不要编译
                reg : /^(.*app\/js\/module\/.*)$/i,
                release : '/static/$1',
                useHash: false,
                url: '/static/$1',
                useOptimizer: false
            },
            {
                //静态文件发布到static目录下
                reg : /^(.*\/(?:js|css|img)\/.*)/i,
                release : '/static/$1',
                url: '/static$1',
                useSprite: true
            },
            {
                //静态文件发布到static目录下
                reg : '**.html',
                release : '/static/$&'
            },
            {
                //静态文件发布到static目录下
                reg : /^(.*\/(?:font)\/.*)/i,
                release : '/static/$1',
                useHash: false
            }

        ],
        ext : {
            //less后缀的文件将输出为css后缀
            //并且在parser之后的其他处理流程中被当做css文件处理
            less : 'css',
            //coffee后缀的文件将输出为js文件
            //并且在parser之后的其他处理流程中被当做js文件处理
            coffee : 'js',
            //md后缀的文件将输出为html文件
            //并且在parser之后的其他处理流程中被当做html文件处理
            md : 'html'
        }
    },
    deploy : {
        remotestatic : {
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver : 'http://localhost/receiver.php',
            //从当前模块找文件
            from : '/static/',
            //保存到远端机器的/www目录下
            //这个参数会跟随post请求一起发送
            to : 'www/'

        },
        remotetpl : {
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver : 'http://localhost/path/to/receiver.php',
            //从当前模块找文件
            from : '/static',
            //保存到远端机器的/www目录下
            //这个参数会跟随post请求一起发送
            to : '/wamp/www/warnMonitor'

        },
        local:{
            receiver : 'http://localhost/path/to/receiver.php',
            from : '/static',
            to : '/wamp/www/warnMonitor'
        }
    }
});