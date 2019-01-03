L.TileLayer.Kitten = L.TileLayer.extend({
    getTileUrl(coords) {
        let i = Math.ceil(Math.random() * 4);
        return `http://placekitten.com/256/256?image=${i}`;
    },
    getAttribution() {
        return `<a href='http://placekitten.com/attribution.html'>PlaceKitten</a>`;
    }
});

/*
L.GridLayer.createTile()。L.TileLayer假设存在一系列网格图片（比如<img>元素），L.GridLayer并不这样认为，
它允许创建任意的一系列HTML网格元素。
 L.GridLayer允许创建除了<div>、<canvas>或者<picture>（或者任意东西）之外的一系列网格<img>元素。
 createTile()仅仅返回给定瓦片坐标的HTML元素实例。知晓如果在DOM中操作元素是很重要的：Leaflet能够处理HTML元素实例
 ，因此使用诸如JQuery等JS库创建的元素，Leaflet处理起来存在一些问题。
*/
// 扩展另一个

L.GridLayer.DebugCoords=L.GridLayer.extend({
    /*
    如果元素需要进行一些异步的初始化，那么使用第二个函数参数done 
    然后当瓦片已经就绪（比如当一张图片已经完全加载）或者存在错误时调用它。这里我们仅仅人为的延迟瓦片加载
    */
    createTile(coords,done){
        console.log(coords);
        let tile=document.createElement('div');
        tile.innerHTML=[coords.x,coords.y,coords.z].join(',');
        console.log(tile);
        console.log(tile.innerHTML);
        tile.style.outline='1px solid red';

        // 当第一张图片以及完全加载或者存在错误时调用

        setTimeout(()=>{
            done(null,tile)
        },500+Math.random()*1500);
        return tile;
    }
});


/*

使用定制的GridLayer,插件可以有效的控制HTML元素组成表格。一些插件已经采用该方式使用<canvas>实现了高级渲染。
        一个很基础的<canva> GridLayer是下面这样的
*/

L.GridLayer.CanvasCircles = L.GridLayer.extend({
    createTile: function (coords) {
        let tile = document.createElement('canvas');
 
        let tileSize = this.getTileSize();
        console.log(tileSize);
        tile.setAttribute('width', tileSize.x);
        tile.setAttribute('height', tileSize.y);
 
        let ctx = tile.getContext('2d');
 
        // Draw whatever is needed in the canvas context
        // For example, circles which get bigger as we zoom in
        ctx.beginPath();
        ctx.arc(tileSize.x/2, tileSize.x/2, 4 + coords.z*4, 0, 2*Math.PI, false);
        ctx.fill();
 
        return tile;
    }
});
