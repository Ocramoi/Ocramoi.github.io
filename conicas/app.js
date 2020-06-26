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
    limpaBut = document.getElementById("limpar"),
    resolEl = document.getElementById("resolucao"),
    dVerts = 0,
    tipoTxt;

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
    board = JXG.JSXGraph.initBoard('graphOg', {axis:true, boundingbox: [-10, 10, 10, -10]});
    boardT = JXG.JSXGraph.initBoard('graphT', {axis:true, boundingbox: [-10, 10, 10, -10]});
    boardR = JXG.JSXGraph.initBoard('graphR', {axis:true, boundingbox: [-10, 10, 10, -10]});
    graphOg(10);
    graph();
});

limpaBut.addEventListener("click", (opa) =>
{
    aEl.value = ""; a = "a";
    bEl.value = ""; b = "b";
    cEl.value = ""; c = "c";
    dEl.value = ""; d = "d";
    eEl.value = ""; e = "e";
    fEl.value = ""; f = "f";
    updateEq();
});

function updateEq()
{
    eqEl.innerText = `${a}x² + ${b}xy + ${c}y² + ${d}x + ${e}y + ${f} = 0`;
}

function graphOg(mC)
{
    board = JXG.JSXGraph.initBoard('graphOg', {axis:true, boundingbox: [-mC, mC, mC, -mC]});
    board.create('conic', [a, c, f, b/2, d/2, e/2]);
}

function graph() {
    if(b != 0)
    {
        let cotan2 = (a - c)/b,
            sine2 = 1 / Math.sqrt(1 + Math.pow((a - c) / b, 2)),
            cosine2 = cotan2 * sine2,
            mainDeterminant = -2.0,
            _aDeterminant = -(a + c) - (b/sine2),
            _cDeterminant = -(a + c) + (b/sine2),
            sine = Math.sqrt((1 - cosine2) / 2),
            cosine = Math.sqrt((cosine2 + 1) / 2),
            tmpD = d,
            tmpE = e,
            RA = a, RB = b, RC = c, RD = d, RE = e, RF = f;

        if (d) 
            RD = (tmpD * cosine) + (tmpE * sine);
        if (e)
            RE = (cosine * tmpE) - (sine * tmpD);
        
        RA = _aDeterminant / mainDeterminant;
        RC = _cDeterminant / mainDeterminant;
        RB = 0;
        tipoTxt = tipoConica(RA, RB, RC, RD, RE, RF);
        document.getElementById("classConica").innerText = tipoTxt;
    }
    else
    {
        tipoTxt = tipoConica(a, b, c, d, e, f);
        document.getElementById("classConica").innerText = tipoTxt;
    }

    let txtResolucao = "";

    let m = [ 
                [parseFloat(a), b/2, d/2],
                [b/2, parseFloat(c), e/2],
                [d/2, e/2, parseFloat(f)]
            ];
    
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
            Impossível translar!<br>
            `;
            
        resolEl.innerHTML = txtResolucao;

        if(b != 0)
        {
            let A = ((a + c) + b*Math.sqrt(1 + Math.pow((a - c)/b, 2)))/2,
                C = (a + c) - A,
                cotan2 = (a - c)/b,
                sine2 = 1 / Math.sqrt(1 + Math.pow((a - c)/b, 2)),
                cosine2 = cotan2 * sine2,
                mainDeterminant = -2.0,
                _aDeterminant = -(a + c) -(b/sine2),
                _cDeterminant = -(a + c) + (b/sine2),
                sine = Math.sqrt((1 - cosine2) / 2),
                cosine = Math.sqrt((cosine2 + 1) / 2 );
            
            txtResolucao += 
            `
            <i>Rotação:</i> <br><br>
            cotg(2*θ) = (a - c)/b = (${a} - ${c})/${b} = ${(a - c)/b} <br>
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
                    a' - c' = ${b}*√(1 + ${(a - c)/b}²)
                </span>
            </div>
            => a' = ${A}, b' = ${C} => <br><br>
            => g"(t, w) = a'*t² + c'*w² + d'*x + e'*y + f' = 0 <br>
            => g"(t, w) = ${A}t² + ${C}w² + ${d*cosine + e*sine}*x + ${-d*sine + e*cosine}*y = ${-f} [EQ. REDUZIDA!]<br>
            `;

            resolEl.innerHTML = txtResolucao;

            completaTabela(A, 0, C, d, e, f);

            graphOg(10);

            boardR = JXG.JSXGraph.initBoard('graphR', {axis:true, boundingbox: [-dVerts, dVerts, dVerts, -dVerts]});
            boardR.create('conic', [A, C, f, 0, d/2, e/2]);
        }
        else
        {
            txtResolucao += 
            `
            <i>Rotação:</i> <br><br>
            cotg(2*θ) = (a - c)/b = (${a} - ${c})/${b} = ∄ => <br><br>
            Impossível rotar!`;
            resolEl.innerHTML = txtResolucao;

            completaTabela(a, b, c, d, e, f);
        }

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
    => g'(u, v) = ${a}u² + ${b}uv + ${c}v² + ${D} = 0 ${(b == 0) ? "[EQ. REDUZIDA!]" : ''}<br><br>
    `;

    if(b != 0)
    {
        let A = ((a + c) + b*Math.sqrt(1 + Math.pow((a - c)/b, 2)))/2,
            C = (a + c) - A;

        txtResolucao += 
        `
        <i>Rotação:</i> <br><br>
        cotg(2*θ) = (a - c)/b = (${a} - ${c})/${b} = ${(a - c)/b} <br>
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
                a' - c' = ${b}*√(1 + ${(a - c)/b}²)
            </span>
        </div>
        => a' = ${A}, b' = ${C} => <br><br>
        => g"(t, w) = a'*t² + c'*w² + f' = 0 <br>
        => g"(t, w) = ${A}*t² + ${C}*w² = ${-D} [EQ. REDUZIDA!]<br>
        `

        resolEl.innerHTML = txtResolucao;

        completaTabela(A, 0, C, 0, 0, D);

        boardT = JXG.JSXGraph.initBoard('graphT', {axis:true, boundingbox: [-dVerts, dVerts, dVerts, -dVerts]});
        graphOg(dVerts);
        centerGraph(board, h, k);
        boardT.create('conic', [a, c, D, b/2, 0, 0]);

        boardR = JXG.JSXGraph.initBoard('graphR', {axis:true, boundingbox: [-dVerts, dVerts, dVerts, -dVerts]});
        boardR.create('conic', [A, C, D, 0, 0, 0]);
    }
    else
    {
        txtResolucao += 
        `
        <i>Rotação:</i> <br><br>
        cotg(2*θ) = (a - c)/b = (${a} - ${c})/${b} = ∄ => <br><br>
        Impossível rotacionar!`;
        resolEl.innerHTML = txtResolucao;

        completaTabela(a, b, c, 0, 0, D);

        boardT = JXG.JSXGraph.initBoard('graphT', {axis:true, boundingbox: [-dVerts, dVerts, dVerts, -dVerts]});
        graphOg(dVerts);
        centerGraph(board, h, k);

        boardT.create('conic', [a, c, D, b/2, 0, 0]);
    }
}

function centerGraph(graph, X, Y) {
    graph.zoomIn(X*5, Y*5);
}

function tipoConica(ta, tb, tc, td, te, tf) {
    let discriminant1 = ta + tc,
        discriminant2 = ta * tc,
        discriminant3 = (ta * tc * tf) - ((Math.pow(td, 2) * tc + Math.pow(te, 2) * ta) / 4),
        delta = (ta * tf) + (tf * tc);

    if (discriminant2 != 0) {
        if (discriminant3 != 0) {
            if (discriminant2 < 0) 
                return "Hipérbole";
            if (discriminant1 * discriminant3 > 0) 
                return "Conjunto vazio";

            if (a != c || b != 0) 
                return "Elipse";

            return "Circunferência";
        }

        if (discriminant2 < 0) 
            return "Duas retas concorrentes";

        return "Ponto";
    }

    if(discriminant3 != 0) 
        return "Parábola";
    if (delta < 0)
        return "Duas retas paralelas";
    if(delta == 0) 
        return "Reta";
    
    return "Conjunto vazio";
}

function completaTabela(ta, tb, tc, td, te, tf) {
    document.getElementById("cellValFocal").innerText = "NA";
    document.getElementById("cellFocos").innerText = "NA";
    document.getElementById("cellCentro").innerText = "NA";
    document.getElementById("cellVertices").innerText = "NA";
    document.getElementById("cellDiretriz").innerText = "NA";
    document.getElementById("cellAssintotas").innerText = "NA";

    if(tipoTxt == "Elipse")
    {
        let p = Math.sqrt(Math.abs((tf / ta) - (tf / tc)));
        document.getElementById("cellValFocal").innerText = p.toFixed(3);
        document.getElementById("cellFocos").innerText = `f1 = (${(td + p).toFixed(3)}, ${te.toFixed(3)}), f2 = (${(td - p).toFixed(3)}, ${te.toFixed(3)})`;
        document.getElementById("cellCentro").innerText = `C = (${(td/tf).toFixed(3)}, ${(te/tf).toFixed(3)})`;
        document.getElementById("cellVertices").innerText = `v1 = (±√${Math.abs(tf/ta).toFixed(3)}, 0), v2 = (0, ±√${Math.abs(tf/tc).toFixed(3)})`;
        dVerts = Math.sqrt(Math.abs(tf/ta));
    }
    else if(tipoTxt == "Parábola")
    {
        let p;
        if(ta) {
            p = ta/4;
            document.getElementById("cellValFocal").innerText = p.toFixed(3);
            document.getElementById("cellFocos").innerText = `f = (0, ${p.toFixed(3)})`;
            document.getElementById("cellDiretriz").innerHTML = `<b>r:</b> y = -${p.toFixed(3)}`;
            document.getElementById("cellVertices").innerText = `v = (0, ${(-(tf/te)).toFixed(3)})`;
            dVerts = Math.abs(tf/te);
		} else {
            p = tc/4;
            document.getElementById("cellValFocal").innerText = p.toFixed(3);
            document.getElementById("cellFocos").innerText = `f = (${p.toFixed(3)}, 0)`;
            document.getElementById("cellDiretriz").innerHTML = `<b>r:</b> x = -${p.toFixed(3)}`;
            document.getElementById("cellVertices").innerText = `v = (${(-(tf/te)).toFixed(3)}, 0)`;
            dVerts = Math.abs(tf/te);
		}
    }
    else if(tipoTxt == "Hipérbole") {
        let ha = Math.abs(tf/ta),
            hc = Math.abs(tf/tc),
            x = Math.sqrt(ha+hc);
        document.getElementById("cellValFocal").innerText = x.toFixed(3);
		if(hc > 0) {
            document.getElementById("cellFocos").innerText = `f1 = (${x.toFixed(3)}, 0), f2 = (${-x.toFixed(3)} , 0)`;
            document.getElementById("cellVertices").innerText = `v1 = (${Math.sqrt(hc).toFixed(3)}, 0), v2 = (0, ${-Math.sqrt(hc).toFixed(3)})`;
            document.getElementById("cellAssintotas").innerHTML = `<b>r:</b> y = x * √(${hc.toFixed(3)}/${ha.toFixed(3)}) => y = x * √(${(hc/ha).toFixed(3)}) e <br>
                                                                   <b>r:</b> y = x * -√(${hc.toFixed(3)}/${ha.toFixed(3)}) => y = x * -√(${(hc/ha).toFixed(3)})`;
            document.getElementById("cellCentro").innerText = `C = (0, 0)`;
            dVerts = Math.sqrt(ha);
		} else {
            document.getElementById("cellFocos").innerText = `f1 = (0, ${x.toFixed(3)}), f2 = (0, ${-x.toFixed(3)})`;
            document.getElementById("cellVertices").innerText = `v1 = (0, ${Math.sqrt(hc).toFixed(3)}), v2 = (${-Math.sqrt(hc).toFixed(3)}, 0)`;
            document.getElementById("cellAssintotas").innerHTML = `<b>r:</b> y = x * √(${ha.toFixed(3)}/${hc.toFixed(3)}) => y = x * √(${(ha/hc).toFixed(3)}) e <br>
                                                                   <b>r:</b> y = x * -√(${ha.toFixed(3)}/${hc.toFixed(3)}) => y = x * -√(${(ha/hc).toFixed(3)})`;
            document.getElementById("cellCentro").innerText = `C = (0, 0)`;
            dVerts = Math.sqrt(hc);
		}
    }
    
    dVerts *= 3;
}