var board = JXG.JSXGraph.initBoard('graphOg', {axis:true, boundingbox: [-10, 10, 10, -10]}),
    boardT = JXG.JSXGraph.initBoard('graphT', {axis:true, boundingbox: [-10, 10, 10, -10]}),
    boardR = JXG.JSXGraph.initBoard('graphR', {axis:true, boundingbox: [-10, 10, 10, -10]}),
    eqEl = document.getElementById("eq"),
    aEl = document.getElementById("a"),
    bEl = document.getElementById("b"),
    cEl = document.getElementById("c"),
    dEl = document.getElementById("d"),
    eEl = document.getElementById("e"),
    fEl = document.getElementById("f"),
    calcBut = document.getElementById("calcular"),
    resolEl = document.getElementById("resolucao");

let a = 'a', 
    b = 'b', 
    c = 'c', 
    d = 'd', 
    e = 'e', 
    f = 'f';

updateEq();

aEl.addEventListener("keyup", (e) =>
{
    let val = aEl.value.trim();
    if(val === '' || 
       (val.split('^').length < 1 ||  val.split('^').length > 2) || 
       (val.split('^').length == 1 && isNaN(val)) ||
       (val.split('^').length == 2 && (isNaN(val.split('^')[0]) || isNaN(val.split('^')[1])))) 
        a = 'a';
    else
    {
        if (val.split('^').length == 1) a = parseFloat(aEl.value);
        else a = Math.pow(val.split('^')[0], val.split('^')[1]);
    }
    updateEq();
});

bEl.addEventListener("keyup", (e) =>
{
    let val = bEl.value.trim();
    if(val === '' || 
       (val.split('^').length < 1 ||  val.split('^').length > 2) || 
       (val.split('^').length == 1 && isNaN(val)) ||
       (val.split('^').length == 2 && (isNaN(val.split('^')[0]) || isNaN(val.split('^')[1])))) 
        b = 'b';
    else
    {
        if (val.split('^').length == 1) b = parseFloat(bEl.value);
        else b = Math.pow(val.split('^')[0], val.split('^')[1]);
    }
    updateEq();
});

cEl.addEventListener("keyup", (e) =>
{
    let val = cEl.value.trim();
    if(val === '' || 
       (val.split('^').length < 1 ||  val.split('^').length > 2) || 
       (val.split('^').length == 1 && isNaN(val)) ||
       (val.split('^').length == 2 && (isNaN(val.split('^')[0]) || isNaN(val.split('^')[1])))) 
        c = 'c';
    else
    {
        if (val.split('^').length == 1) c = parseFloat(cEl.value);
        else c = Math.pow(val.split('^')[0], val.split('^')[1]);
    }
    updateEq();
});

dEl.addEventListener("keyup", (e) =>
{
    let val = dEl.value.trim();
    if(val === '' || 
       (val.split('^').length < 1 ||  val.split('^').length > 2) || 
       (val.split('^').length == 1 && isNaN(val)) ||
       (val.split('^').length == 2 && (isNaN(val.split('^')[0]) || isNaN(val.split('^')[1])))) 
        d = 'd';
    else
    {
        if (val.split('^').length == 1) d = parseFloat(dEl.value);
        else d = Math.pow(val.split('^')[0], val.split('^')[1]);
    }
    updateEq();
});

eEl.addEventListener("keyup", (kkk) =>
{
    let val = eEl.value.trim();
    if(val === '' || 
       (val.split('^').length < 1 ||  val.split('^').length > 2) || 
       (val.split('^').length == 1 && isNaN(val)) ||
       (val.split('^').length == 2 && (isNaN(val.split('^')[0]) || isNaN(val.split('^')[1])))) 
        e = 'e';
    else
    {
        if (val.split('^').length == 1) e = parseFloat(eEl.value);
        else e = Math.pow(val.split('^')[0], val.split('^')[1]);
    }
    updateEq();
});

fEl.addEventListener("keyup", (e) =>
{
    let val = fEl.value.trim();
    if(val === '' || 
       (val.split('^').length < 1 ||  val.split('^').length > 2) || 
       (val.split('^').length == 1 && isNaN(val)) ||
       (val.split('^').length == 2 && (isNaN(val.split('^')[0]) || isNaN(val.split('^')[1])))) 
        f = 'f';
    else
    {
        if (val.split('^').length == 1) f = parseFloat(fEl.value);
        else f = Math.pow(val.split('^')[0], val.split('^')[1]);
    }
    updateEq();
});

calcBut.addEventListener("click", (opa) =>
{
    if(isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f))
    {
        alert("Um ou mais valores inválidos!");
        return;
    }
    graphOg();
    graph();
});

function updateEq()
{
    eqEl.innerText = `${a}x² + ${b}xy + ${c}y² + ${d}x + ${e}y + ${f} = 0`;
}

function graphOg()
{
    board = JXG.JSXGraph.initBoard('graphOg', {axis:true, boundingbox: [-10, 10, 10, -10]});
    board.create('conic', [a, c, f, b/2, d/2, e/2]);
}

function graph() {
    let txtResolucao = "";

    let m = [ 
                [parseFloat(a), b/2, d/2],
                [b/2, parseFloat(c), e/2],
                [d/2, e/2, parseFloat(f)]
            ]; console.log(m);
    
    let detMen = m[0][0] * m[1][1] - (m[0][1] * m[1][0]);
    
    let h = 0,
        k = ((m[1][0] * m[0][2]) - (m[1][2] * m[0][0]))/((m[1][1] * m[0][0]) - (m[1][0] * m[0][1]));
    
    h = ((-m[0][1] * k) - m[0][2])/m[0][0];

    let D = (d/2)*h + (e/2)*k + f;

    if(detMen == 0)
    {
        txtResolucao += 
            `<i>Translação:</i> <br><br>
            g(x, y) = ${a}x² + ${b}xy + ${c}y² + ${d}x + ${e}y + ${f} = 0 <br>
            M = <table class="tabelaMatriz"> 
                    <tr>
                        <th>${m[0][0]}</th>
                        <th>${m[0][1]}</th> 
                        <th>${m[0][2]}</th>
                    </tr>
                    <tr>
                        <th>${m[1][0]}</th>
                        <th>${m[1][1]}</th> 
                        <th>${m[1][2]}</th>
                    </tr>
                    <tr>
                        <th>${m[2][0]}</th>
                        <th>${m[2][1]}</th> 
                        <th>${m[2][2]}</th>
                    </tr>
                </table>&nbsp; => <br><br>
                <table class="tabelaMatriz"> 
                    <tr>
                        <th>${m[0][0]}</th>
                        <th>${m[0][1]}</th>
                    </tr>
                    <tr>
                        <th>${m[1][0]}</th>
                        <th>${m[1][1]}</th> 
                    </tr>
                </table>
            = ${m[0][0] * m[1][1]} - ${m[0][1] * m[1][0]} = ${detMen} => ${detMen} ${(detMen != 0) ? "!= 0" : "= 0"}<br><br>
            Impossível translar!
            `;
            
        resolEl.innerHTML = txtResolucao;
        return;
    }

    txtResolucao += 
    `<i>Translação:</i> <br><br>
    g(x, y) = ${a}x² + ${b}xy + ${c}y² + ${d}x + ${e}y + ${f} = 0 <br>
    M = 
    <table class="tabelaMatriz"> 
        <tr>
            <th>a</th>
            <th>b/2</th> 
            <th>d/2</th>
        </tr>
        <tr>
            <th>b/2</th>
            <th>c</th> 
            <th>e/2</th>
        </tr>
        <tr>
            <th>d/2</th>
            <th>e/2</th> 
            <th>f</th>
        </tr>
    </table> = 
    <table class="tabelaMatriz"> 
        <tr>
            <th>${m[0][0]}</th>
            <th>${m[0][1]}</th> 
            <th>${m[0][2]}</th>
        </tr>
        <tr>
            <th>${m[1][0]}</th>
            <th>${m[1][1]}</th> 
            <th>${m[1][2]}</th>
        </tr>
        <tr>
            <th>${m[2][0]}</th>
            <th>${m[2][1]}</th> 
            <th>${m[2][2]}</th>
        </tr>
    </table>&nbsp; => <br><br>
    <table class="tabelaMatriz"> 
        <tr>
            <th>a</th>
            <th>b/2</th>
        </tr>
        <tr>
            <th>b/2</th>
            <th>c</th> 
        </tr>
    </table> = 
    <table class="tabelaMatriz"> 
        <tr>
            <th>${m[0][0]}</th>
            <th>${m[0][1]}</th>
        </tr>
        <tr>
            <th>${m[1][0]}</th>
            <th>${m[1][1]}</th> 
        </tr>
    </table>
    => ${m[0][0] * m[1][1]} - ${m[0][1] * m[1][0]} = ${detMen} => ${detMen} ${(detMen != 0) ? "!= 0" : "= 0"}<br><br>
    <div class="sistema">
        <img src="bracket.png">
        <span style="float: right">
            (a)*h + (b/2)*k + (d/2) = 0<br>
            (b/2)*h + c*k + (d/2) = 0
        </span>
    </div>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=> <br>
    <div class="sistema">
        <img src="bracket.png">
        <span style="float: right">
            ${m[0][0]}h + ${m[0][1]}k + ${m[0][2]} = 0<br>
            ${m[1][0]}h + ${m[1][1]}k + ${m[1][2]} = 0
        </span>
    </div> 
    => O' = (h, k) => h = ${h}, k = ${k} => <br><br>
    => g'(u, v) = a'*u² + b'*uv + c'*v² + (d/2)*h + (e/2)*k + f = 0 <br>
    => g'(u, v) = ${a}u² + ${b}uv + ${c}v² + ${D} = 0 <br><br>
    `;
    
    let A = ((a + c) + b*Math.sqrt(1 + Math.pow((a - c)/b, 2)))/2,
        C = (a + c) - A;

    txtResolucao += 
    `
    <i>Rotação:</i> <br><br>
    cotg(2*θ) = (a - c)/2 = (${a} - ${c})/${b} = ${(a - c)/b} <br>
    <div class="sistema">
        <img src="bracket.png">
        <span style="float: right">
            a' + c' = a + c<br>
            a' - c' = b*√(1 + cotg(2*θ)²)
        </span>
    </div>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=> <br>
    <div class="sistema">
        <img src="bracket.png">
        <span style="float: right">
            a' + c' = ${a} + ${c}<br>
            a' - c' = ${b}*√(1 + ${(a - c)/b})
        </span>
    </div>
    => a' = ${A}, b' = ${C} => <br><br>
    => g"(t, w) = a'*t² + c'*w² + f' = 0 <br>
    => g"(t, w) = ${A}t² + ${C}w² = ${-D} <br>
    `

    resolEl.innerHTML = txtResolucao;
    boardT = JXG.JSXGraph.initBoard('graphT', {axis:true, boundingbox: [-10, 10, 10, -10]});
    boardT.create('conic', [a, c, D, b/2, 0, 0]);

    boardR = JXG.JSXGraph.initBoard('graphR', {axis:true, boundingbox: [-10, 10, 10, -10]});
    boardR.create('conic', [A, C, D, 0, 0, 0]);
}

function centerGraph(graph, X, Y) {
    graph.zoomIn(X*5, Y*5);
}