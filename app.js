$(document).ready(() =>
{
    $("#inPesq").text("");
    atualiza("");
    atvs();
});

$("#inSim").on("click", e =>
{
    atualiza($("#inPesq").val());
});

$("#inPesq").on("keydown", e =>
{
    atualiza($("#inPesq").val());
});

function atualiza(txtPesquisa)
{
    $("#exibe").empty();
    var arPesq = [];
    arPesq = professores.filter(el => el.materia.toLowerCase().includes(txtPesquisa.toLowerCase()) || el.nome.toLowerCase().includes(txtPesquisa.toLowerCase()));
    if(arPesq.length != 0)
    {
        for(mat in arPesq)
        {
            $('#exibe').append( "<div class='elExibe'>"+
                                    "<div id='elMateria'><b>Matéria:</b> " + professores[mat].materia + "</div>" +
                                    "<div id='elProf'><b>Professor:</b> " + professores[mat].nome + "</div>" +
                                    "<div id='elSala'><b>Sala:</b> " + professores[mat].sala + "</div>" +
                                    "<div id='elEmail'><b>Email:</b> <a href='mailto:'" + professores[mat].email + "' target='_blank'>" + professores[mat].email + "</a></div>" +
                                    "<div id='elOnline'><b>Online:</b><br>" + professores[mat].online + "</div>" +
                                "</div>");
        }
    }
    else
    {
        $('#exibe').append("<div class='elExibe'><b size='1.5rem'>Nenhuma matéria/professor encontrado</b></div>")
    }
}

function atvs()
{
    var atv = 0;
    for(atv; atv < atividades.length - 1; atv++)
    {
        $('#atvsExibe').append("<div class='elAtividade'><b>Data: </b>" + atividades[atv].dia + "<br><b>Atividade: </b>" + atividades[atv].atividade + "</div><hr>");
    }
    $('#atvsExibe').append("<div class='elAtividade'><b>Data: </b>" + atividades[atv].dia + "<br><b>Atividade: </b>" + atividades[atv].atividade + "</div>");
}