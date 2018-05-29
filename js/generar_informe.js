function genPDF() {
    var doc = new jsPDF();
    orientation: 'landscape',
    doc.text(20,20, 'Esto es una prueba');
    doc.addPage();
    doc.text(20,20, 'Esto es una prueba');
    doc.save('test_de_informes.pdf')
}

$('#button').click(function(){
    genPDF()
});